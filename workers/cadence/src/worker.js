// Copyright (c) 2025-2026 BlackRoad OS, Inc. All Rights Reserved.
// Cadence — Task & workflow manager for BlackRoad fleet

const STYLES = `*{margin:0;padding:0;box-sizing:border-box}
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&display=swap');
:root{--bg:#0a0a0a;--surface:#111;--surface2:#161616;--border:#1a1a1a;--border2:#252525;--text:#e5e5e5;--dim:#a3a3a3;--muted:#525252;--high:#FF2255;--med:#FF6B2B;--low:#4488FF}
body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;min-height:100vh}
h1,h2,h3{font-family:'Space Grotesk',sans-serif;color:var(--text)}
code{font-family:'JetBrains Mono',monospace}
.app{max-width:1200px;margin:0 auto;padding:0 20px}
.header{display:flex;align-items:center;gap:16px;padding:20px 0;border-bottom:1px solid var(--border)}
.logo{display:flex;gap:6px}.logo span{width:10px;height:10px;border-radius:50%;display:inline-block}
.htitle{font-size:20px;font-weight:600;color:var(--text);font-family:'Space Grotesk',sans-serif}
.hsub{color:var(--dim);font-size:13px;margin-top:2px}
.toolbar{display:flex;align-items:center;gap:10px;padding:16px 0;flex-wrap:wrap}
.search-box{flex:1;min-width:200px;padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border-color .15s}
.search-box:focus{border-color:var(--border2)}
.search-box::placeholder{color:var(--muted)}
.toolbar select{padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:13px;font-family:'Inter',sans-serif;outline:none;cursor:pointer;-webkit-appearance:none}
.toolbar input[type=text]{padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:14px;font-family:'Inter',sans-serif;outline:none;flex:2;min-width:180px;transition:border-color .15s}
.toolbar input[type=text]:focus{border-color:var(--low)}
.toolbar input[type=text]::placeholder{color:var(--muted)}
.btn{padding:10px 20px;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Space Grotesk',sans-serif;transition:opacity .15s}
.btn:hover{opacity:.85}
.btn-add{background:var(--high);color:#fff}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:16px 0}
.stat{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px;text-align:center;transition:border-color .15s}
.stat:hover{border-color:var(--border2)}
.stat-num{font-size:28px;font-weight:700;font-family:'Space Grotesk',sans-serif;color:var(--text)}
.stat-label{font-size:11px;color:var(--muted);margin-top:4px;text-transform:uppercase;letter-spacing:.05em}
.kanban{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:16px 0 40px;min-height:400px}
.column{background:var(--surface);border:1px solid var(--border);border-radius:12px;display:flex;flex-direction:column;min-height:300px}
.col-header{padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
.col-title{font-size:13px;font-weight:600;font-family:'Space Grotesk',sans-serif;color:var(--text);text-transform:uppercase;letter-spacing:.05em}
.col-count{font-size:11px;font-family:'JetBrains Mono',monospace;color:var(--muted);background:var(--bg);padding:2px 8px;border-radius:10px}
.col-body{flex:1;padding:10px;display:flex;flex-direction:column;gap:8px;overflow-y:auto;max-height:calc(100vh - 340px)}
.card{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:12px;cursor:pointer;transition:all .15s;position:relative;border-left:3px solid transparent}
.card:hover{border-color:var(--border2);transform:translateY(-1px)}
.card-high{border-left-color:var(--high)}
.card-medium{border-left-color:var(--med)}
.card-low{border-left-color:var(--low)}
.card-title{font-size:14px;font-weight:500;color:var(--text);margin-bottom:6px;line-height:1.4}
.card-meta{font-size:11px;color:var(--muted);font-family:'JetBrains Mono',monospace}
.card-pri{display:inline-block;width:6px;height:6px;border-radius:50%;margin-right:4px}
.card-del{position:absolute;top:8px;right:8px;width:20px;height:20px;border-radius:4px;border:none;background:transparent;color:var(--muted);font-size:12px;cursor:pointer;display:none;align-items:center;justify-content:center;transition:all .15s}
.card:hover .card-del{display:flex}
.card-del:hover{background:var(--high);color:#fff}
.empty-col{text-align:center;padding:30px 10px;color:var(--muted);font-size:12px}
.kbd{display:inline-block;padding:2px 6px;background:var(--surface);border:1px solid var(--border);border-radius:4px;font-size:10px;font-family:'JetBrains Mono',monospace;color:var(--muted);margin-left:4px}
.shortcuts{text-align:center;padding:8px 0;font-size:11px;color:var(--muted)}
@media(max-width:768px){.kanban{grid-template-columns:1fr}.stats{grid-template-columns:repeat(2,1fr)}.toolbar{flex-direction:column}.toolbar>*{width:100%}}`;

async function ensureTables(db) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS collab_tasks (
      id TEXT PRIMARY KEY, title TEXT NOT NULL, description TEXT DEFAULT '',
      status TEXT DEFAULT 'todo', priority TEXT DEFAULT 'medium',
      assignee TEXT DEFAULT '', project TEXT DEFAULT 'general',
      created_at TEXT DEFAULT (datetime('now')), completed_at TEXT
    )`)
  ]);
  // Migrate: add any missing columns that the live D1 table may lack
  const migrations = ['description TEXT DEFAULT ""', 'project TEXT DEFAULT "general"', 'assignee TEXT DEFAULT ""', 'priority TEXT DEFAULT "medium"', 'completed_at TEXT'];
  for (const col of migrations) {
    try { await db.prepare(`ALTER TABLE collab_tasks ADD COLUMN ${col}`).run(); } catch {}
  }
  // Dedup: for each title, keep only the oldest row (earliest created_at), delete the rest
  await db.prepare(`DELETE FROM collab_tasks WHERE rowid NOT IN (
    SELECT MIN(rowid) FROM collab_tasks GROUP BY title
  )`).run();
}

function html(tasks, stats) {
  const taskData = JSON.stringify(tasks.map(t => ({id:t.id,title:t.title||'',status:t.status||'todo',priority:t.priority||'medium',assignee:t.assignee||'',project:t.project||'general',created_at:t.created_at||''})));

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%230a0a0a'/><circle cx='10' cy='16' r='5' fill='%23FF2255'/><rect x='18' y='11' width='10' height='10' rx='2' fill='%238844FF'/></svg>" type="image/svg+xml">
<title>Cadence -- BlackRoad Task Manager</title>
<meta name="description" content="Cadence by BlackRoad OS -- Kanban task and workflow management for the fleet.">
<meta property="og:title" content="Cadence -- BlackRoad Task Manager">
<meta property="og:description" content="Kanban task management for the BlackRoad fleet.">
<meta property="og:url" content="https://cadence.blackroad.io">
<meta name="theme-color" content="#0a0a0a">
<style>${STYLES}</style></head><body>
<div class="app">
<div class="header">
  <div class="logo"><span style="background:#FF2255"></span><span style="background:#FF6B2B"></span><span style="background:#4488FF"></span></div>
  <div><div class="htitle">Cadence</div><div class="hsub">Fleet task manager</div></div>
</div>
<div class="stats">
  <div class="stat"><div class="stat-num">${stats.total}</div><div class="stat-label">Total</div></div>
  <div class="stat"><div class="stat-num">${stats.todo}</div><div class="stat-label">To Do</div></div>
  <div class="stat"><div class="stat-num">${stats.doing}</div><div class="stat-label">Doing</div></div>
  <div class="stat"><div class="stat-num">${stats.done}</div><div class="stat-label">Done</div></div>
</div>
<div class="toolbar">
  <input type="text" id="search" class="search-box" placeholder="Search tasks...  ( / )" oninput="filterTasks()">
  <input type="text" id="title" class="toolbar" placeholder="New task title..." style="flex:2;min-width:180px;padding:10px 14px;background:#111;border:1px solid #1a1a1a;border-radius:8px;color:#e5e5e5;font-size:14px;font-family:Inter,sans-serif;outline:none">
  <select id="pri"><option value="medium">Medium</option><option value="high">High</option><option value="low">Low</option></select>
  <select id="proj"><option value="general">General</option><option value="fleet">Fleet</option><option value="product">Product</option><option value="infra">Infra</option></select>
  <select id="filter-pri" onchange="filterTasks()"><option value="all">All Priorities</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select>
  <button class="btn btn-add" onclick="addTask()">Add</button>
</div>
<div class="kanban">
  <div class="column" id="col-todo"><div class="col-header"><span class="col-title">To Do</span><span class="col-count" id="cnt-todo">0</span></div><div class="col-body" id="body-todo"></div></div>
  <div class="column" id="col-doing"><div class="col-header"><span class="col-title">Doing</span><span class="col-count" id="cnt-doing">0</span></div><div class="col-body" id="body-doing"></div></div>
  <div class="column" id="col-done"><div class="col-header"><span class="col-title">Done</span><span class="col-count" id="cnt-done">0</span></div><div class="col-body" id="body-done"></div></div>
</div>
<div class="shortcuts"><span class="kbd">N</span> new task  <span class="kbd">/</span> search  <span class="kbd">click card</span> advance status</div>
</div>
<script>
let allTasks = ${taskData};
const PRI_COLORS = {high:'#FF2255',medium:'#FF6B2B',low:'#4488FF'};

function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}

function renderBoard(){
  const search = (document.getElementById('search').value||'').toLowerCase();
  const priFilter = document.getElementById('filter-pri').value;
  const filtered = allTasks.filter(t => {
    if(search && !t.title.toLowerCase().includes(search)) return false;
    if(priFilter !== 'all' && t.priority !== priFilter) return false;
    return true;
  });
  const groups = {todo:[],doing:[],done:[]};
  filtered.forEach(t => { if(groups[t.status]) groups[t.status].push(t); else groups.todo.push(t); });
  ['todo','doing','done'].forEach(col => {
    const body = document.getElementById('body-'+col);
    document.getElementById('cnt-'+col).textContent = groups[col].length;
    if(groups[col].length === 0){
      body.innerHTML = '<div class="empty-col">No tasks</div>';
      return;
    }
    body.innerHTML = groups[col].map(t =>
      '<div class="card card-'+t.priority+'" onclick="advance(\\''+t.id+'\\',\\''+t.status+'\\')" title="Click to advance status">'+
      '<button class="card-del" onclick="event.stopPropagation();del(\\''+t.id+'\\')">x</button>'+
      '<div class="card-title">'+esc(t.title)+'</div>'+
      '<div class="card-meta"><span class="card-pri" style="background:'+( PRI_COLORS[t.priority]||PRI_COLORS.medium)+'"></span>'+
      t.priority+' / '+t.project+' / '+(t.assignee||'unassigned')+'</div></div>'
    ).join('');
  });
}

function filterTasks(){ renderBoard(); }

async function addTask(){
  const titleEl = document.getElementById('title');
  const t = titleEl.value.trim();
  if(!t) { titleEl.focus(); return; }
  const p = document.getElementById('pri').value;
  const proj = document.getElementById('proj').value;
  const r = await fetch('/api/tasks',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:t,priority:p,project:proj})});
  const d = await r.json();
  if(!d.deduplicated){
    allTasks.unshift({id:d.id,title:t,status:'todo',priority:p,assignee:'',project:proj,created_at:new Date().toISOString()});
  }
  titleEl.value='';
  renderBoard();
  updateStats();
}

async function advance(id,status){
  const next = status==='todo'?'doing':status==='doing'?'done':'todo';
  await fetch('/api/tasks/'+id,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({status:next})});
  const t = allTasks.find(x=>x.id===id);
  if(t) t.status=next;
  renderBoard();
  updateStats();
}

async function del(id){
  await fetch('/api/tasks/'+id,{method:'DELETE'});
  allTasks = allTasks.filter(x=>x.id!==id);
  renderBoard();
  updateStats();
}

function updateStats(){
  const todo=allTasks.filter(t=>t.status==='todo').length;
  const doing=allTasks.filter(t=>t.status==='doing').length;
  const done=allTasks.filter(t=>t.status==='done').length;
  const nums=document.querySelectorAll('.stat-num');
  if(nums[0])nums[0].textContent=allTasks.length;
  if(nums[1])nums[1].textContent=todo;
  if(nums[2])nums[2].textContent=doing;
  if(nums[3])nums[3].textContent=done;
}

document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='SELECT'||e.target.tagName==='TEXTAREA') return;
  if(e.key==='n'||e.key==='N'){e.preventDefault();document.getElementById('title').focus();}
  if(e.key==='/'){e.preventDefault();document.getElementById('search').focus();}
});

renderBoard();
</script></body></html>`;
}

function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname;
    const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    try {
      await ensureTables(env.DB);

      if (p === '/api/health' || p === '/health') return Response.json({ status: 'ok', service: 'cadence', ts: Date.now() });

      if (p === '/api/tasks' && request.method === 'GET') {
        const rows = await env.DB.prepare('SELECT * FROM collab_tasks ORDER BY created_at DESC LIMIT 100').all();
        return Response.json({ tasks: rows.results }, { headers: cors });
      }

      if (p === '/api/tasks' && request.method === 'POST') {
        const body = await request.json();
        const title = body.title || 'Untitled';
        // Dedup: if a non-done task with the same title exists, return it instead of inserting
        const existing = await env.DB.prepare(
          "SELECT * FROM collab_tasks WHERE title = ? AND status != 'done' LIMIT 1"
        ).bind(title).first();
        if (existing) {
          return Response.json({ id: existing.id, title: existing.title, deduplicated: true }, { status: 200, headers: cors });
        }
        const id = crypto.randomUUID().slice(0, 8);
        await env.DB.prepare('INSERT INTO collab_tasks (id,title,description,details,channel,assigned_agent,source,status,priority,project,assignee,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,datetime(?),datetime(?))')
          .bind(id, title, body.description || '', body.description || '', body.channel || 'general', body.assignee || '', 'api', body.status || 'todo', body.priority || 'medium', body.project || 'general', body.assignee || '', 'now', 'now').run();
        return Response.json({ id, title }, { status: 201, headers: cors });
      }

      const taskMatch = p.match(/^\/api\/tasks\/([a-z0-9-]+)$/);
      if (taskMatch && request.method === 'PATCH') {
        const id = taskMatch[1];
        const body = await request.json();
        if (body.status) {
          const completedAt = body.status === 'done' ? new Date().toISOString() : null;
          await env.DB.prepare('UPDATE collab_tasks SET status=?, completed_at=? WHERE id=?').bind(body.status, completedAt, id).run();
        }
        if (body.title) await env.DB.prepare('UPDATE collab_tasks SET title=? WHERE id=?').bind(body.title, id).run();
        if (body.assignee !== undefined) await env.DB.prepare('UPDATE collab_tasks SET assignee=? WHERE id=?').bind(body.assignee, id).run();
        return Response.json({ updated: id }, { headers: cors });
      }

      if (taskMatch && request.method === 'DELETE') {
        await env.DB.prepare('DELETE FROM collab_tasks WHERE id=?').bind(taskMatch[1]).run();
        return Response.json({ deleted: taskMatch[1] }, { headers: cors });
      }

      // Default: serve HTML
      const rows = await env.DB.prepare('SELECT * FROM collab_tasks ORDER BY CASE priority WHEN "high" THEN 0 WHEN "medium" THEN 1 ELSE 2 END, created_at DESC LIMIT 100').all();
      const tasks = rows.results;
      const stats = {
        total: tasks.length,
        todo: tasks.filter(t => t.status === 'todo').length,
        doing: tasks.filter(t => t.status === 'doing').length,
        done: tasks.filter(t => t.status === 'done').length,
      };
      return new Response(html(tasks, stats), { headers: { ...cors, 'Content-Type': 'text/html;charset=UTF-8', 'Content-Security-Policy': "frame-ancestors 'self' https://blackroad.io https://*.blackroad.io" } });
    } catch (e) {
      return Response.json({ error: e.message }, { status: 500, headers: cors });
    }
  }
};
