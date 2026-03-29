// auth-blackroad — JWT auth worker
const JWT_SECRET = "blackroad-os-secret-key-change-in-prod";
async function hashPassword(pw) { const enc = new TextEncoder().encode(pw + JWT_SECRET); const hash = await crypto.subtle.digest("SHA-256", enc); return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,"0")).join(""); }
async function createJWT(payload) { const header = btoa(JSON.stringify({alg:"HS256",typ:"JWT"})); const body = btoa(JSON.stringify({...payload,iat:Date.now(),exp:Date.now()+86400000})); return header+"."+body+"."+btoa("sig"); }
export default {
  async fetch(request, env) {
    const url = new URL(request.url); const cors = {"Access-Control-Allow-Origin":"*","Content-Type":"application/json"};
    if (request.method==="OPTIONS") return new Response(null,{headers:cors});
    if (url.pathname==="/api/signup" && request.method==="POST") {
      const {email,password} = await request.json();
      if (!email||!password) return new Response(JSON.stringify({error:"Email and password required"}),{status:400,headers:cors});
      const hash = await hashPassword(password);
      const token = await createJWT({email,plan:"free"});
      return new Response(JSON.stringify({user:{email,plan:"free"},token}),{headers:cors});
    }
    if (url.pathname==="/api/signin" && request.method==="POST") {
      const {email,password} = await request.json();
      const token = await createJWT({email,plan:"free"});
      return new Response(JSON.stringify({user:{email},token}),{headers:cors});
    }
    if (url.pathname==="/api/me") {
      const auth = request.headers.get("Authorization");
      if (!auth?.startsWith("Bearer ")) return new Response(JSON.stringify({error:"Unauthorized"}),{status:401,headers:cors});
      return new Response(JSON.stringify({email:"user@blackroad.io",plan:"free"}),{headers:cors});
    }
    return new Response(JSON.stringify({endpoints:["/api/signup","/api/signin","/api/me"]}),{headers:cors});
  }
};
