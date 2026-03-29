// x402 Micropayment Middleware for Cloudflare Workers
// Enables agent-to-agent payments via HTTP 402
// Uses USDC on Base. Settles in ~2 seconds. Fees < $0.001.
// Spec: https://www.x402.org/

/**
 * x402 Middleware — wraps any Worker handler with payment requirements
 * 
 * Usage:
 *   export default {
 *     fetch(request, env) {
 *       return withX402(request, env, { amount: "0.001", resource: "/api/inference" }, async () => {
 *         // Your actual handler — only runs if payment verified
 *         return new Response(JSON.stringify({ result: "inference output" }));
 *       });
 *     }
 *   };
 */
async function withX402(request, env, paymentConfig, handler) {
  const paymentHeader = request.headers.get("X-Payment-Proof");
  
  // If payment proof provided, verify and proceed
  if (paymentHeader) {
    const verified = await verifyPayment(paymentHeader, paymentConfig, env);
    if (verified) {
      // Log to RoadChain
      await logX402Payment(env, paymentConfig, paymentHeader);
      return handler();
    }
    return new Response(JSON.stringify({ error: "Invalid payment proof" }), {
      status: 402,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  // No payment — return 402 with payment requirements
  return new Response(JSON.stringify({
    protocol: "x402",
    version: "1.0",
    payment_required: true,
    amount: paymentConfig.amount || "0.001",
    currency: "USDC",
    network: "base",
    chain_id: 8453,
    recipient: env.PAYMENT_ADDRESS || "0x0000000000000000000000000000000000000000",
    resource: paymentConfig.resource,
    expires: new Date(Date.now() + 300000).toISOString(),
    settlement: "~2 seconds",
    fee: "< $0.001",
  }), {
    status: 402,
    headers: {
      "Content-Type": "application/json",
      "X-Payment-Protocol": "x402",
      "X-Payment-Amount": paymentConfig.amount || "0.001",
      "X-Payment-Currency": "USDC",
      "X-Payment-Network": "base",
    },
  });
}

async function verifyPayment(proof, config, env) {
  // In production: verify the transaction on Base via RPC
  // Check: correct amount, correct recipient, not expired, not already used
  try {
    const data = JSON.parse(atob(proof));
    if (!data.tx_hash || !data.amount) return false;
    
    // Verify on Base RPC
    const rpc = env.BASE_RPC || "https://mainnet.base.org";
    const receipt = await fetch(rpc, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getTransactionReceipt",
        params: [data.tx_hash],
        id: 1,
      }),
    });
    
    const result = await receipt.json();
    if (result.result && result.result.status === "0x1") {
      return true; // Transaction confirmed
    }
    return false;
  } catch {
    return false;
  }
}

async function logX402Payment(env, config, proof) {
  try {
    const roadchainUrl = env.ROADCHAIN_URL || "https://roadchain-worker.blackroad.workers.dev";
    await fetch(roadchainUrl + "/api/ledger", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-RoadChain-App": "x402" },
      body: JSON.stringify({
        action: "x402_payment",
        entity: "micropayment",
        data: { resource: config.resource, amount: config.amount, proof },
      }),
    });
  } catch { /* non-fatal */ }
}

module.exports = { withX402 };
