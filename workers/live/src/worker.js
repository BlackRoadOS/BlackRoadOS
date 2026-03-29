// Copyright (c) 2025-2026 BlackRoad OS, Inc. All Rights Reserved.
// Proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
// BlackRoad OS, Inc. — Delaware C-Corp — blackroad.io

// Security headers for all responses
function addSecurityHeaders(response) {
  const h = new Headers(response.headers);
  h.set('X-Content-Type-Options', 'nosniff');
  h.set('X-Frame-Options', 'SAMEORIGIN');
  h.set('X-XSS-Protection', '1; mode=block');
  h.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  h.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  return new Response(response.body, { status: response.status, headers: h });
}

// BlackCast Live — live.blackroad.io
// D1 binding: DB (roundtrip), AI binding: AI

function esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

const STYLES = `
*{margin:0;padding:0;box-sizing:border-box}
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
body{background:#000;color:#e0e0e0;font-family:'Inter',sans-serif;min-height:100vh}
h1,h2,h3{font-family:'Space Grotesk',sans-serif;color:#fff}
code{font-family:'JetBrains Mono',monospace}
.container{max-width:1000px;margin:0 auto;padding:24px 16px}
.header{display:flex;align-items:center;gap:16px;margin-bottom:28px;border-bottom:1px solid #222;padding-bottom:20px}
.logo-mark{width:40px;height:40px;border-radius:8px;background:#F5A623}
.subtitle{color:#888;font-size:14px;margin-top:4px}
.btn{padding:10px 20px;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Space Grotesk',sans-serif;transition:opacity .2s}
.btn:hover{opacity:.85}
.btn-primary{background:#FF1D6C;color:#fff}
.btn-secondary{background:#1a1a1a;color:#fff;border:1px solid #333}
.btn-tick{background:#2979FF;color:#fff}
.create-bar{display:flex;gap:12px;margin-bottom:28px;flex-wrap:wrap;align-items:end}
.create-bar input,.create-bar select{padding:10px 14px;background:#0a0a0a;border:1px solid #222;border-radius:8px;color:#fff;font-size:14px;font-family:'Inter',sans-serif}
.create-bar input:focus,.create-bar select:focus{outline:none;border-color:#FF1D6C}
.create-bar input{flex:1;min-width:200px}
.event-list{display:flex;flex-direction:column;gap:12px;margin-bottom:32px}
.event-card{background:#0a0a0a;border:1px solid #1a1a1a;border-radius:12px;padding:20px;cursor:pointer;transition:border-color .2s}
.event-card:hover{border-color:#F5A623}
.event-card.active{border-color:#FF1D6C}
.event-meta{display:flex;gap:12px;align-items:center;margin-bottom:8px}
.event-status{width:10px;height:10px;border-radius:50%;display:inline-block}
.event-status.live{background:#00E676}
.event-status.ended{background:#666}
.event-title{font-size:18px;font-weight:600;color:#fff}
.event-info{font-size:12px;color:#888}
.discussion{background:#0a0a0a;border:1px solid #1a1a1a;border-radius:12px;padding:24px;margin-top:20px}
.msg{padding:12px 0;border-bottom:1px solid #111}
.msg:last-child{border-bottom:none}
.msg-agent{font-weight:600;font-size:14px;margin-bottom:4px}
.msg-text{font-size:14px;color:#ccc;line-height:1.5}
.msg-time{font-size:11px;color:#555;margin-top:4px}
.empty{text-align:center;padding:40px;color:#555}
.live-dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#00E676;margin-right:6px;animation:pulse 1.5s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.agent-chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.chip{padding:2px 10px;border-radius:12px;font-size:11px;font-weight:600;color:#000}
.tab-bar{display:flex;gap:8px;margin-bottom:20px}
.tab{padding:8px 16px;border-radius:8px;font-size:13px;cursor:pointer;color:#888;border:1px solid transparent}
.tab.active{color:#fff;border-color:#333;background:#111}
`;

const AGENT_COLORS = {road:'#FF1D6C',echo:'#2979FF',alice:'#F5A623',cecilia:'#9C27B0',octavia:'#00E676',sentinel:'#9C27B0',scribe:'#F5A623',pixel:'#2979FF',foreman:'#00E676',cherub:'#FF1D6C'};
const AGENT_NAMES = ['road','echo','alice','cecilia','octavia','sentinel','scribe','pixel','foreman','cherub'];

function mainHTML(events) {
  const live = events.filter(e => e.status === 'live');
  const ended = events.filter(e => e.status === 'ended');
  return `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%230a0a0a'/><circle cx='10' cy='16' r='5' fill='%23FF2255'/><rect x='18' y='11' width='10' height='10' rx='2' fill='%238844FF'/></svg>" type="image/svg+xml">
<title>BlackCast Live — Agent Roundtables | BlackRoad OS</title>
<meta name="description" content="BlackCast Live: agent roundtables, live events, and fleet broadcasts. Watch AI agents debate and collaborate in real-time.">
<meta property="og:title" content="BlackCast Live — Agent Roundtables">
<meta property="og:description" content="Agent roundtables, live events, and fleet broadcasts by BlackRoad OS.">
<meta property="og:url" content="https://live.blackroad.io">
<meta property="og:type" content="website">
<meta property="og:image" content="https://images.blackroad.io/pixel-art/road-logo.png">
<meta name="twitter:card" content="summary">
<link rel="canonical" href="https://live.blackroad.io/">
<meta name="robots" content="index, follow">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebApplication","name":"BlackCast Live","url":"https://live.blackroad.io","applicationCategory":"EntertainmentApplication","operatingSystem":"Web","description":"Agent roundtables and live fleet broadcasts","author":{"@type":"Organization","name":"BlackRoad OS, Inc."}}</script>
<style>${STYLES}#br-nav{position:fixed;top:0;left:0;right:0;z-index:9999;background:rgba(0,0,0,0.92);backdrop-filter:blur(12px);border-bottom:1px solid #1a1a1a;font-family:'Space Grotesk',-apple-system,sans-serif}#br-nav .ni{max-width:1200px;margin:0 auto;padding:0 20px;height:48px;display:flex;align-items:center;justify-content:space-between}#br-nav .nl{display:flex;align-items:center;gap:12px}#br-nav .nb{color:#666;font-size:12px;padding:6px 8px;border-radius:6px;display:flex;align-items:center;cursor:pointer;border:none;background:none;transition:color .15s}#br-nav .nb:hover{color:#f5f5f5}#br-nav .nh{text-decoration:none;display:flex;align-items:center;gap:8px}#br-nav .nm{display:flex;gap:2px}#br-nav .nm span{width:6px;height:6px;border-radius:50%}#br-nav .nt{color:#f5f5f5;font-weight:600;font-size:14px}#br-nav .ns{color:#333;font-size:14px}#br-nav .np{color:#999;font-size:13px}#br-nav .nk{display:flex;align-items:center;gap:4px;overflow-x:auto;scrollbar-width:none}#br-nav .nk::-webkit-scrollbar{display:none}#br-nav .nk a{color:#888;text-decoration:none;font-size:12px;padding:6px 10px;border-radius:6px;white-space:nowrap;transition:color .15s,background .15s}#br-nav .nk a:hover{color:#f5f5f5;background:#111}#br-nav .nk a.ac{color:#f5f5f5;background:#1a1a1a}#br-nav .mm{display:none;background:none;border:none;color:#888;font-size:20px;cursor:pointer;padding:6px}#br-dd{display:none;position:fixed;top:48px;left:0;right:0;background:rgba(0,0,0,0.96);backdrop-filter:blur(12px);border-bottom:1px solid #1a1a1a;z-index:9998;padding:12px 20px}#br-dd.open{display:flex;flex-wrap:wrap;gap:4px}#br-dd a{color:#888;text-decoration:none;font-size:13px;padding:8px 14px;border-radius:6px;transition:color .15s,background .15s}#br-dd a:hover,#br-dd a.ac{color:#f5f5f5;background:#111}body{padding-top:48px!important}@media(max-width:768px){#br-nav .nk{display:none}#br-nav .mm{display:block}}</style></head><body><nav id="br-nav"><div class="ni"><div class="nl"><button class="nb" onclick="history.length>1?history.back():location.href='https://blackroad.io'" title="Back">&larr;</button><a href="https://blackroad.io" class="nh"><div class="nm"><span style="background:#FF6B2B"></span><span style="background:#FF2255"></span><span style="background:#CC00AA"></span><span style="background:#8844FF"></span><span style="background:#4488FF"></span><span style="background:#00D4FF"></span></div><span class="nt">BlackRoad</span></a><span class="ns">/</span><span class="np">Live</span></div><div class="nk"><a href="https://blackroad.io">Home</a><a href="https://chat.blackroad.io">Chat</a><a href="https://search.blackroad.io">Search</a><a href="https://tutor.blackroad.io">Tutor</a><a href="https://pay.blackroad.io">Pay</a><a href="https://canvas.blackroad.io">Canvas</a><a href="https://cadence.blackroad.io">Cadence</a><a href="https://video.blackroad.io">Video</a><a href="https://radio.blackroad.io">Radio</a><a href="https://game.blackroad.io">Game</a><a href="https://live.blackroad.io" class="ac">Live</a><a href="https://roadtrip.blackroad.io">Agents</a><a href="https://roadcode.blackroad.io">RoadCode</a><a href="https://hq.blackroad.io">HQ</a><a href="https://app.blackroad.io">Dashboard</a></div><button class="mm" onclick="document.getElementById('br-dd').classList.toggle('open')">&#9776;</button></div></nav><div id="br-dd"><a href="https://blackroad.io">Home</a><a href="https://chat.blackroad.io">Chat</a><a href="https://search.blackroad.io">Search</a><a href="https://tutor.blackroad.io">Tutor</a><a href="https://pay.blackroad.io">Pay</a><a href="https://canvas.blackroad.io">Canvas</a><a href="https://cadence.blackroad.io">Cadence</a><a href="https://video.blackroad.io">Video</a><a href="https://radio.blackroad.io">Radio</a><a href="https://game.blackroad.io">Game</a><a href="https://live.blackroad.io" class="ac">Live</a><a href="https://roadtrip.blackroad.io">Agents</a><a href="https://roadcode.blackroad.io">RoadCode</a><a href="https://hq.blackroad.io">HQ</a><a href="https://app.blackroad.io">Dashboard</a></div><script>document.addEventListener('click',function(e){var d=document.getElementById('br-dd');if(d&&d.classList.contains('open')&&!e.target.closest('#br-nav')&&!e.target.closest('#br-dd'))d.classList.remove('open')});</script>
<div class="container">
  <div class="header">
    <div class="logo-mark"></div>
    <div><h1>BlackCast Live</h1><div class="subtitle">Agent Roundtables &amp; Live Events</div></div>
  </div>
  <div class="create-bar">
    <input id="topic" placeholder="Event topic (e.g. Fleet Security Review)">
    <select id="agent-count"><option value="3">3 agents</option><option value="5" selected>5 agents</option><option value="7">7 agents</option></select>
    <button class="btn btn-primary" onclick="createEvent()">Start Event</button>
  </div>
  <div class="tab-bar">
    <div class="tab active" onclick="showTab('all',this)">All (${events.length})</div>
    <div class="tab" onclick="showTab('live',this)"><span class="live-dot"></span>Live (${live.length})</div>
    <div class="tab" onclick="showTab('ended',this)">Ended (${ended.length})</div>
  </div>
  <div class="event-list" id="events">
    ${events.length === 0 ? '<div class="empty">No events yet. Start one above.</div>' :
    events.map(e => `
    <div class="event-card ${e.status === 'live' ? 'active' : ''}" data-status="${e.status}" onclick="location.href='/?event=${e.id}'">
      <div class="event-meta">
        <span class="event-status ${e.status}"></span>
        <span class="event-title">${esc(e.topic)}</span>
      </div>
      <div class="event-info">${e.agent_count} agents &middot; ${e.rounds || 0} rounds &middot; ${new Date(e.created_at).toLocaleString()}</div>
      <div class="agent-chips">${(e.agents||'').split(',').filter(Boolean).map(a => '<span class="chip" style="background:'+(AGENT_COLORS[a]||'#555')+'">'+a+'</span>').join('')}</div>
    </div>`).join('')}
  </div>
</div>
<div id="event-detail"></div>
<script>
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML;}
function showTab(t,el){
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.event-card').forEach(c=>{
    c.style.display=(t==='all'||c.dataset.status===t)?'':'none';
  });
}
async function createEvent(){
  const topic=document.getElementById('topic').value.trim();
  if(!topic)return alert('Enter a topic');
  const count=document.getElementById('agent-count').value;
  const r=await fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({topic,agent_count:parseInt(count)})});
  const d=await r.json();
  if(d.id)location.href='/?event='+d.id;
}
const params=new URLSearchParams(location.search);
if(params.get('event'))loadEvent(params.get('event'));
async function loadEvent(id){
  const r=await fetch('/api/events/'+id);
  const d=await r.json();
  if(d.error)return;
  const detail=document.getElementById('event-detail');
  detail.innerHTML='<div class="container"><div class="discussion">'+
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">'+
    '<h2>'+(d.status==='live'?'<span class=live-dot></span>':'')+esc(d.topic)+'</h2>'+
    (d.status==='live'?'<button class="btn btn-tick" onclick="tick('+id+')">Next Round</button>':'')+
    '</div>'+
    (d.messages.length===0?'<div class="empty">No discussion yet. Click Next Round to start.</div>':
    d.messages.map(m=>'<div class="msg"><div class="msg-agent" style="color:'+(AGENT_COLORS[m.agent_id]||'#fff')+'">'+m.agent_id+'</div><div class="msg-text">'+esc(m.content)+'</div><div class="msg-time">Round '+m.round+'</div></div>').join(''))+
    '</div></div>';
}
async function tick(id){
  const r=await fetch('/api/events/'+id+'/tick',{method:'POST'});
  const d=await r.json();
  if(!d.error)loadEvent(id);
}
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML;}
</script></body></html>`;
}

async function ensureTables(db) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT, topic TEXT NOT NULL, agents TEXT NOT NULL,
      agent_count INTEGER DEFAULT 5, rounds INTEGER DEFAULT 0, status TEXT DEFAULT 'live',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS event_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT, event_id INTEGER NOT NULL, agent_id TEXT NOT NULL,
      content TEXT NOT NULL, round INTEGER DEFAULT 1, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`)
  ]);
}

function pickAgents(count) {
  const shuffled = [...AGENT_NAMES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, AGENT_NAMES.length));
}

export default {
  async fetch(request, env) {
    try {
    const url = new URL(request.url);
    const path = url.pathname;
    await ensureTables(env.DB);

    if (path === '/api/health') {
      return Response.json({ status: 'ok', service: 'blackcast-live', ts: new Date().toISOString() });
    }

    if (path === '/api/events' && request.method === 'GET') {
      const rows = await env.DB.prepare('SELECT * FROM events ORDER BY created_at DESC LIMIT 50').all();
      return Response.json({ events: rows.results });
    }

    if (path === '/api/events' && request.method === 'POST') {
      const body = await request.json();
      const topic = (body.topic || '').trim();
      if (!topic) return Response.json({ error: 'topic required' }, { status: 400 });
      const count = Math.min(Math.max(body.agent_count || 5, 2), 10);
      const agents = pickAgents(count);
      const r = await env.DB.prepare('INSERT INTO events (topic, agents, agent_count) VALUES (?, ?, ?)').bind(topic, agents.join(','), count).run();
      return Response.json({ id: r.meta.last_row_id, topic, agents });
    }

    const eventMatch = path.match(/^\/api\/events\/(\d+)$/);
    if (eventMatch && request.method === 'GET') {
      const id = eventMatch[1];
      const event = await env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(id).first();
      if (!event) return Response.json({ error: 'not found' }, { status: 404 });
      const msgs = await env.DB.prepare('SELECT * FROM event_messages WHERE event_id = ? ORDER BY round, id').bind(id).all();
      return Response.json({ ...event, messages: msgs.results });
    }

    const tickMatch = path.match(/^\/api\/events\/(\d+)\/tick$/);
    if (tickMatch && request.method === 'POST') {
      const id = tickMatch[1];
      const event = await env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(id).first();
      if (!event) return Response.json({ error: 'not found' }, { status: 404 });
      if (event.status !== 'live') return Response.json({ error: 'event ended' }, { status: 400 });

      const nextRound = event.rounds + 1;
      const agents = event.agents.split(',');
      const prevMsgs = await env.DB.prepare('SELECT agent_id, content FROM event_messages WHERE event_id = ? ORDER BY id DESC LIMIT 10').bind(id).all();
      const context = prevMsgs.results.map(m => `${m.agent_id}: ${m.content}`).join('\n');

      const newMessages = [];
      for (const agent of agents) {
        const prompt = `You are ${agent}, an AI agent in the BlackRoad fleet participating in a roundtable discussion. Topic: "${event.topic}". Round ${nextRound}.` + (context ? '\n\nPrevious discussion:\n' + context : '') + '\n\nGive a concise, substantive contribution (2-3 sentences). Stay in character. Be specific and technical.';
        try {
          const aiResp = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', { prompt, max_tokens: 150 });
          const content = (aiResp.response || '').trim() || `[${agent} is processing...]`;
          newMessages.push({ agent, content });
        } catch {
          newMessages.push({ agent, content: `[${agent} encountered an error this round]` });
        }
      }

      const stmts = newMessages.map(m =>
        env.DB.prepare('INSERT INTO event_messages (event_id, agent_id, content, round) VALUES (?, ?, ?, ?)')
          .bind(id, m.agent, m.content, nextRound)
      );
      const newStatus = nextRound >= 10 ? 'ended' : 'live';
      stmts.push(env.DB.prepare('UPDATE events SET rounds = ?, status = ? WHERE id = ?').bind(nextRound, newStatus, id));
      await env.DB.batch(stmts);

      return Response.json({ round: nextRound, messages: newMessages, status: newStatus });
    }

    // Serve main page
    const events = await env.DB.prepare('SELECT * FROM events ORDER BY created_at DESC LIMIT 50').all();
    return new Response(mainHTML(events.results), { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message, stack: err.stack }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }
};
