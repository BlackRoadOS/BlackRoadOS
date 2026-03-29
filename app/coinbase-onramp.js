// Coinbase Onramp — embed fiat-to-crypto directly in BlackRoad
// Users buy USDC/ROAD without leaving the app
// Documentation: https://docs.cdp.coinbase.com/onramp/introduction/welcome

/**
 * Generate a Coinbase Onramp URL for a user
 * @param {Object} options
 * @param {string} options.address - User's wallet address (Base)
 * @param {string} options.asset - Asset to buy (USDC, ETH, ROAD)
 * @param {string} options.amount - Amount in USD
 * @param {string} options.redirectUrl - URL to return to after purchase
 * @returns {string} Coinbase Onramp URL
 */
function getCoinbaseOnrampUrl({ address, asset = "USDC", amount = "10", redirectUrl = "https://app.blackroad.io" }) {
  const params = new URLSearchParams({
    appId: "YOUR_CDP_PROJECT_ID", // Set from env
    destinationWallets: JSON.stringify([{
      address,
      blockchains: ["base"],
      assets: [asset],
    }]),
    defaultAsset: asset,
    defaultAmount: amount,
    defaultPaymentMethod: "CARD",
    handlingRequestedUrls: true,
    partnerUserId: address, // For tracking
    redirectUrl,
  });

  return `https://pay.coinbase.com/buy/select-asset?${params.toString()}`;
}

/**
 * Generate a Coinbase Offramp URL for cash-out
 * @param {Object} options
 * @param {string} options.address - User's wallet address
 * @param {string} options.asset - Asset to sell (USDC, ROAD)
 * @param {string} options.redirectUrl - URL to return to after sale
 * @returns {string} Coinbase Offramp URL
 */
function getCoinbaseOfframpUrl({ address, asset = "USDC", redirectUrl = "https://app.blackroad.io" }) {
  const params = new URLSearchParams({
    appId: "YOUR_CDP_PROJECT_ID",
    addresses: JSON.stringify({ [address]: ["base"] }),
    assets: JSON.stringify([asset]),
    redirectUrl,
  });

  return `https://pay.coinbase.com/sell?${params.toString()}`;
}

/**
 * Embed the Coinbase Onramp widget in a page
 * Usage: <div id="coinbase-onramp"></div>
 *        embedOnramp(document.getElementById('coinbase-onramp'), { address: '0x...' })
 */
function embedOnramp(container, options) {
  const url = getCoinbaseOnrampUrl(options);
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.cssText = 'width:100%;height:500px;border:none;border-radius:12px;';
  iframe.allow = 'payment';
  container.appendChild(iframe);
}

module.exports = { getCoinbaseOnrampUrl, getCoinbaseOfframpUrl, embedOnramp };
