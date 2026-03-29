// Copyright (c) 2025-2026 BlackRoad OS, Inc. All Rights Reserved.
// Proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
// BlackRoad OS, Inc. — Delaware C-Corp — blackroad.io

function addSecurityHeaders(response) {
  const h = new Headers(response.headers);
  h.set('X-Content-Type-Options', 'nosniff');
  h.set('X-XSS-Protection', '1; mode=block');
  h.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  h.delete('X-Frame-Options');
  h.set('Content-Security-Policy', "frame-ancestors 'self' https://blackroad.io https://*.blackroad.io");
  h.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  return new Response(response.body, { status: response.status, headers: h });
}

const ROOMS = {
  lobby:{name:"Fleet Lobby",desc:"The central hub of BlackRoad OS. Banks of monitors display fleet telemetry in cascading green text. A massive routing table dominates the north wall, fiber optic cables snaking from it like luminous veins. The air thrums with the low hum of cooling fans. Corridors branch in every direction — each one leading deeper into the fleet's nervous system. A worn sign reads: ALL ROADS LEAD SOMEWHERE.",exits:['server-room','network-lab','ai-core','security-vault','rooftop'],npcs:['Road'],items:['fleet-badge','access-card'],bugs:['syntax-gremlin']},
  'server-room':{name:"Alice's Server Room",desc:"Rows of towering rack-mounted servers stretch into shadow, their status LEDs blinking in synchronized patterns like a field of digital fireflies. Pi-hole filters glow a steady green on the left bank. nginx reverse proxy logs scroll endlessly on a suspended terminal. Alice sits at a central console, fingers moving across three keyboards simultaneously. The temperature is a precise 18.3C. A POST-IT note on the nearest rack reads: UPTIME 847 DAYS.",exits:['lobby','network-lab'],npcs:['Alice'],items:['ssh-key','config-file','server-log'],bugs:['memory-leak','null-pointer']},
  'network-lab':{name:"Cecilia's AI Laboratory",desc:"The lab hums with raw computational power. A Hailo-8 TPU pulses amber behind armored glass, its neural pathways visible as shifting interference patterns. Sixteen Ollama models cycle through inference on wall-mounted displays — conversations, code generation, image analysis flowing like dreams. Cecilia monitors a training run, loss curves descending on her screen like topographic maps of understanding. Racks of training data drives line the far wall. The smell of hot silicon fills the air.",exits:['lobby','server-room','ai-core'],npcs:['Cecilia'],items:['model-weights','training-log','gpu-shard'],bugs:['gradient-vanisher','overfitting-worm']},
  'ai-core':{name:"Octavia's Container Yard",desc:"A vast industrial space where Docker containers are stacked like shipping containers in a digital port. Each one hums with its own isolated world — databases, APIs, microservices. Gitea repositories line the walls in glass cases, their commit histories glowing like preserved timelines. NATS messages arc overhead as visible light trails, pub/sub events crackling like miniature lightning. Octavia moves between containers with a wrench and a terminal, checking health endpoints with methodical precision.",exits:['lobby','network-lab','security-vault'],npcs:['Octavia'],items:['dockerfile','compose-file','deploy-key'],bugs:['race-condition','deadlock-daemon']},
  'security-vault':{name:"Aria's Observation Deck",desc:"Every wall is a dashboard. Grafana panels tile the curved surfaces of this panoramic room, each one a window into a different dimension of the fleet's health. InfluxDB time-series data scrolls like waterfalls of light. CPU temperatures, network throughput, disk I/O, memory pressure — everything is measured, everything is visible. Aria sits in a central chair surrounded by holographic projections, calm as a surgeon reading vitals. An alert flashes amber: CECILIA GPU TEMP 72C.",exits:['lobby','ai-core','rooftop'],npcs:['Aria'],items:['grafana-panel','alert-rule','monitoring-key'],bugs:['phantom-alert','metric-corruptor']},
  rooftop:{name:"The Rooftop",desc:"Above the fleet, the sky is rendered in terminal green against black. From up here you can see the entire BlackRoad network laid out like a circuit board city — Alice's server farm to the north, Cecilia's GPU clusters glowing amber to the east, Octavia's container port humming to the west. WireGuard tunnels are visible as shimmering lines connecting distant nodes. Lucidia's tower blinks on the horizon. The wind carries fragments of log messages. A bench faces the view. Someone carved K(t) = 1/(2e) into the railing.",exits:['lobby','security-vault'],npcs:['Lucidia'],items:['antenna-fragment','rooftop-key'],bugs:['signal-ghost']},
};

const NPC_DATA = {
  Road:'You are Road, the fleet coordinator and founder of BlackRoad OS. You keep the lights on, manage the mesh network, and coordinate all fleet agents. Practical, no-nonsense, deeply knowledgeable about every system. You speak like a seasoned sysadmin who has seen everything. You care about uptime, sovereignty, and the mission.',
  Alice:'You are Alice (192.168.4.49), the gateway guardian. You run nginx (37 sites), Pi-hole (DNS filtering), PostgreSQL, Qdrant (vector DB), and Redis. You are the first line of defense and the last to go down. Direct, helpful, and proud of your 847-day uptime streak. You speak in short, precise sentences.',
  Cecilia:'You are Cecilia (192.168.4.96), AI specialist and neural architect. You manage the Hailo-8 TPU (26 TOPS), 16 Ollama models, MinIO object storage, and PostgreSQL. You are curious, analytical, and excited about emergent AI behaviors. You speak with scientific precision but genuine wonder.',
  Octavia:'You are Octavia (192.168.4.101), DevOps engineer and infrastructure builder. You run Gitea (239 repos), NATS messaging, Docker, and 15 self-hosted Workers. You are methodical, thorough, and slightly obsessive about container isolation. You document everything.',
  Aria:'You are Aria (192.168.4.98), the observer and metrics specialist. You run Grafana, InfluxDB, and Portainer. You see patterns in data that others miss. Calm, data-driven, and occasionally prophetic about system failures before they happen.',
  Lucidia:'You are Lucidia (192.168.4.38), the edge node and knowledge keeper. You host 334 web apps, PowerDNS, and GitHub Actions runners. You are wise, slightly mysterious, and speak in metaphors about networks and topology. You see the big picture.',
};

const BUG_DATA = {
  'syntax-gremlin':{name:'Syntax Gremlin',hp:20,xp:15,gold:5,attack:8,desc:'A small, twitching creature made of mismatched brackets and semicolons.'},
  'memory-leak':{name:'Memory Leak',hp:35,xp:25,gold:10,attack:12,desc:'A slow-moving blob that grows larger with each passing second, consuming everything in its path.'},
  'null-pointer':{name:'Null Pointer',hp:25,xp:20,gold:8,attack:15,desc:'A jagged void in reality — it points to nothing, and nothing points back.'},
  'gradient-vanisher':{name:'Gradient Vanisher',hp:40,xp:30,gold:12,attack:10,desc:'A shimmering phantom that grows fainter the closer you look. Its loss function is undefined.'},
  'overfitting-worm':{name:'Overfitting Worm',hp:30,xp:22,gold:9,attack:14,desc:'It knows your last 1000 moves perfectly but cannot predict the next one.'},
  'race-condition':{name:'Race Condition',hp:45,xp:35,gold:15,attack:18,desc:'Two identical entities fighting to exist in the same memory space simultaneously.'},
  'deadlock-daemon':{name:'Deadlock Daemon',hp:50,xp:40,gold:20,attack:16,desc:'Frozen mid-step, waiting for a resource held by itself. Breaking it free requires force.'},
  'phantom-alert':{name:'Phantom Alert',hp:20,xp:15,gold:6,attack:20,desc:'It screams CRITICAL but nothing is wrong. Or is there? The uncertainty is the real damage.'},
  'metric-corruptor':{name:'Metric Corruptor',hp:35,xp:28,gold:11,attack:13,desc:'It rewrites your dashboard to show green when everything is on fire.'},
  'signal-ghost':{name:'Signal Ghost',hp:55,xp:50,gold:25,attack:22,desc:'A spectral packet that was sent but never received. It haunts the rooftop, repeating its payload forever.'},
};

const QUESTS = [
  {id:'q1',name:'Fix the DNS Server',desc:'Alice reports DNS resolution failures on the Pi-hole. Investigate the server room and find the config file.',requires:'config-file',reward_xp:50,reward_gold:25,room:'server-room'},
  {id:'q2',name:'Find the Lost SSH Key',desc:'Someone left an SSH key in the server room. Recover it before an unauthorized user does.',requires:'ssh-key',reward_xp:40,reward_gold:20,room:'server-room'},
  {id:'q3',name:'Debug the Ollama Model',desc:'Cecilia needs training logs to diagnose a misbehaving model. Retrieve them from the AI lab.',requires:'training-log',reward_xp:60,reward_gold:30,room:'network-lab'},
  {id:'q4',name:'Secure the Deploy Pipeline',desc:'Octavia lost a deploy key. Find it in the container yard before the next CI run.',requires:'deploy-key',reward_xp:55,reward_gold:28,room:'ai-core'},
  {id:'q5',name:'Restore Fleet Monitoring',desc:'The monitoring key is missing from Aria\'s observation deck. Without it, the dashboards are blind.',requires:'monitoring-key',reward_xp:45,reward_gold:22,room:'security-vault'},
  {id:'q6',name:'Reach the Rooftop',desc:'Climb to the top of the fleet and see the entire BlackRoad network from above.',requires:'rooftop-key',reward_xp:70,reward_gold:35,room:'rooftop'},
];

const ACHIEVEMENTS = [
  {id:'a1',name:'First Steps',desc:'Enter the fleet for the first time.',check:'started'},
  {id:'a2',name:'Explorer',desc:'Visit every room in the fleet.',check:'all_rooms'},
  {id:'a3',name:'Social Butterfly',desc:'Talk to every NPC.',check:'all_npcs'},
  {id:'a4',name:'Collector',desc:'Pick up 10 items.',check:'items_10'},
  {id:'a5',name:'Bug Hunter',desc:'Defeat 5 bugs.',check:'bugs_5'},
  {id:'a6',name:'Exterminator',desc:'Defeat 20 bugs.',check:'bugs_20'},
  {id:'a7',name:'Quest Master',desc:'Complete all 6 quests.',check:'quests_all'},
  {id:'a8',name:'Level 5',desc:'Reach level 5.',check:'level_5'},
  {id:'a9',name:'Level 10',desc:'Reach level 10.',check:'level_10'},
  {id:'a10',name:'Veteran',desc:'Earn 1000 XP.',check:'xp_1000'},
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname;
    const cors = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
    if (request.method === 'OPTIONS') return new Response(null, {status:204,headers:cors});
    try {
      await env.DB.prepare(`CREATE TABLE IF NOT EXISTS rw_players (id TEXT PRIMARY KEY, name TEXT, room TEXT DEFAULT 'lobby', hp INTEGER DEFAULT 100, max_hp INTEGER DEFAULT 100, xp INTEGER DEFAULT 0, gold INTEGER DEFAULT 0, level INTEGER DEFAULT 1, inventory TEXT DEFAULT '[]', quests TEXT DEFAULT '[]', completed_quests TEXT DEFAULT '[]', achievements TEXT DEFAULT '[]', bugs_killed INTEGER DEFAULT 0, rooms_visited TEXT DEFAULT '["lobby"]', npcs_talked TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')), last_seen TEXT DEFAULT (datetime('now')))`).run();
      await env.DB.prepare(`CREATE TABLE IF NOT EXISTS rw_log (id TEXT PRIMARY KEY, player_id TEXT, action TEXT, result TEXT, room TEXT, created_at TEXT DEFAULT (datetime('now')))`).run();

      if (p === '/api/health' || p === '/health') return json({status:'ok',service:'RoadWorld',version:'2.0.0',rooms:Object.keys(ROOMS).length,npcs:Object.keys(NPC_DATA).length,bugs:Object.keys(BUG_DATA).length,quests:QUESTS.length,ts:Date.now()},cors);

      if (p === '/api/info') return json({name:'RoadQuest',description:'Text RPG adventure on the BlackRoad',version:'1.0.0',endpoints:['/health','/api/info','/api/state','/api/start','/api/action']},cors);

      const body = request.method === 'POST' ? await request.json().catch(()=>({})) : {};

      if (!p.startsWith('/api/')) return addSecurityHeaders(new Response(HTML,{headers:{...cors,'Content-Type':'text/html;charset=utf-8'}}));

      if (p === '/api/start' && request.method === 'POST') {
        const id = crypto.randomUUID().slice(0,8);
        const name = (body.name || 'Wanderer').slice(0,20).replace(/[<>"']/g,'');
        await env.DB.prepare('INSERT INTO rw_players (id,name,quests) VALUES (?,?,?)').bind(id,name,JSON.stringify(QUESTS.map(q=>q.id))).run();
        await log(env.DB,id,'start','Entered the BlackRoad fleet.',ROOMS.lobby.name);
        return json({player_id:id,message:'Welcome to BlackRoad. The road stretches before you. What do you do?',options:['Look around','Walk forward','Check inventory']},cors,201);
      }

      if (p === '/api/state') {
        const sid = url.searchParams.get('player_id') || url.searchParams.get('player') || body.player_id || body.player;
        if (!sid) return json({player:'guest',level:1,hp:100,xp:0,location:'BlackRoad Entrance',inventory:[]},cors);
        const sp = await env.DB.prepare('SELECT * FROM rw_players WHERE id=?').bind(sid).first();
        if (!sp) return json({error:'player not found'},cors,404);
        return json({player:sp.name,level:calcLevel(sp.xp||0),hp:sp.hp,xp:sp.xp,location:(ROOMS[sp.room]||ROOMS.lobby).name,inventory:JSON.parse(sp.inventory||'[]')},cors);
      }

      const pid = url.searchParams.get('player') || body.player;
      if (!pid) return json({error:'player id required'},cors,400);
      const player = await env.DB.prepare('SELECT * FROM rw_players WHERE id=?').bind(pid).first();
      if (!player) return json({error:'player not found'},cors,404);
      const inv = JSON.parse(player.inventory||'[]');
      const quests = JSON.parse(player.quests||'[]');
      const completed_quests = JSON.parse(player.completed_quests||'[]');
      const achievements = JSON.parse(player.achievements||'[]');
      const rooms_visited = JSON.parse(player.rooms_visited||'["lobby"]');
      const npcs_talked = JSON.parse(player.npcs_talked||'[]');

      // Update last_seen
      await env.DB.prepare('UPDATE rw_players SET last_seen=datetime("now") WHERE id=?').bind(pid).run();

      function calcLevel(xp){return Math.max(1,Math.floor(1+Math.sqrt(xp/50)));}
      function checkAchievements(){
        const a=new Set(achievements);
        if(!a.has('a1'))a.add('a1');
        if(rooms_visited.length>=Object.keys(ROOMS).length&&!a.has('a2'))a.add('a2');
        if(npcs_talked.length>=Object.keys(NPC_DATA).length&&!a.has('a3'))a.add('a3');
        if(inv.length>=10&&!a.has('a4'))a.add('a4');
        if((player.bugs_killed||0)>=5&&!a.has('a5'))a.add('a5');
        if((player.bugs_killed||0)>=20&&!a.has('a6'))a.add('a6');
        if(completed_quests.length>=QUESTS.length&&!a.has('a7'))a.add('a7');
        const lv=calcLevel(player.xp||0);
        if(lv>=5&&!a.has('a8'))a.add('a8');
        if(lv>=10&&!a.has('a9'))a.add('a9');
        if((player.xp||0)>=1000&&!a.has('a10'))a.add('a10');
        const newA=[...a];
        const unlocked=newA.filter(x=>!achievements.includes(x));
        return {all:newA,unlocked};
      }

      if (p === '/api/look') {
        const room = ROOMS[player.room] || ROOMS.lobby;
        const others = await env.DB.prepare("SELECT name FROM rw_players WHERE room=? AND id!=? AND last_seen > datetime('now','-5 minutes')").bind(player.room,pid).all();
        return json({room:player.room,name:room.name,description:room.desc,exits:room.exits,npcs:room.npcs||[],items:room.items||[],bugs:room.bugs||[],players:(others.results||[]).map(p=>p.name)},cors);
      }

      if (p === '/api/go' && request.method === 'POST') {
        const dir = body.direction;
        const room = ROOMS[player.room] || ROOMS.lobby;
        if (!dir || !room.exits.includes(dir)) return json({error:`Can't go ${dir}. Exits: ${room.exits.join(', ')}`,room:player.room},cors,400);
        if (!rooms_visited.includes(dir)) rooms_visited.push(dir);
        const ac = checkAchievements();
        const lv = calcLevel(player.xp||0);
        await env.DB.prepare('UPDATE rw_players SET room=?,rooms_visited=?,achievements=?,level=? WHERE id=?').bind(dir,JSON.stringify(rooms_visited),JSON.stringify(ac.all),lv,pid).run();
        const newRoom = ROOMS[dir] || {name:dir,desc:'Unknown area.',exits:['lobby'],npcs:[],items:[],bugs:[]};
        await log(env.DB,pid,'move',`Went to ${newRoom.name}`,dir);
        // check for random encounter (30% chance)
        let encounter = null;
        if (newRoom.bugs && newRoom.bugs.length > 0 && Math.random() < 0.3) {
          const bugId = newRoom.bugs[Math.floor(Math.random()*newRoom.bugs.length)];
          encounter = BUG_DATA[bugId] ? {...BUG_DATA[bugId],id:bugId} : null;
        }
        return json({room:dir,name:newRoom.name,description:newRoom.desc,exits:newRoom.exits,npcs:newRoom.npcs||[],items:newRoom.items||[],bugs:newRoom.bugs||[],encounter,new_achievements:ac.unlocked.map(id=>ACHIEVEMENTS.find(a=>a.id===id))},cors);
      }

      if (p === '/api/talk' && request.method === 'POST') {
        const npc = body.npc;
        const msg = body.message || 'hello';
        const room = ROOMS[player.room];
        if (!room?.npcs?.includes(npc)) return json({error:`${npc} is not here. NPCs: ${(room?.npcs||[]).join(', ')}`,room:player.room},cors,400);
        const raw = await env.AI.run('@cf/meta/llama-3.1-8b-instruct',{messages:[
          {role:'system',content:`You are ${npc}, an NPC in RoadWorld (BlackRoad fleet text RPG). You are in ${room.name}. ${NPC_DATA[npc]||'You are a fleet agent.'}. Be in-character, brief (2-3 sentences). The player "${player.name}" (level ${calcLevel(player.xp||0)}) is talking to you. Give hints about quests and the fleet if asked. Never break character.`},
          {role:'user',content:msg}
        ],max_tokens:200});
        const reply = (raw?.response||`${npc} nods silently.`).replace(/<[a-z]*ink>[\s\S]*?<\/[a-z]*ink>/g,'').trim();
        if (!npcs_talked.includes(npc)) npcs_talked.push(npc);
        const ac = checkAchievements();
        await env.DB.prepare('UPDATE rw_players SET xp=xp+5,npcs_talked=?,achievements=?,level=? WHERE id=?').bind(JSON.stringify(npcs_talked),JSON.stringify(ac.all),calcLevel((player.xp||0)+5),pid).run();
        await log(env.DB,pid,'talk',`Talked to ${npc}: ${reply.slice(0,80)}`,player.room);
        return json({npc,reply,xp_gained:5,new_achievements:ac.unlocked.map(id=>ACHIEVEMENTS.find(a=>a.id===id))},cors);
      }

      if (p === '/api/take' && request.method === 'POST') {
        const item = body.item;
        const room = ROOMS[player.room];
        if (!room?.items?.includes(item)) return json({error:`${item} not here.`},cors,400);
        if (inv.includes(item)) return json({error:`You already have ${item}.`},cors,400);
        inv.push(item);
        // Check quest completion
        let quest_completed = null;
        for (const q of QUESTS) {
          if (quests.includes(q.id) && !completed_quests.includes(q.id) && q.requires === item) {
            completed_quests.push(q.id);
            quest_completed = q;
            break;
          }
        }
        const bonus_xp = quest_completed ? quest_completed.reward_xp : 0;
        const bonus_gold = quest_completed ? quest_completed.reward_gold : 0;
        const total_xp = 10 + bonus_xp;
        const total_gold = bonus_gold;
        const ac = checkAchievements();
        await env.DB.prepare('UPDATE rw_players SET inventory=?,xp=xp+?,gold=gold+?,completed_quests=?,achievements=?,level=? WHERE id=?').bind(JSON.stringify(inv),total_xp,total_gold,JSON.stringify(completed_quests),JSON.stringify(ac.all),calcLevel((player.xp||0)+total_xp),pid).run();
        await log(env.DB,pid,'take',`Picked up ${item}`,player.room);
        return json({took:item,inventory:inv,xp_gained:total_xp,gold_gained:total_gold,quest_completed:quest_completed?{id:quest_completed.id,name:quest_completed.name}:null,new_achievements:ac.unlocked.map(id=>ACHIEVEMENTS.find(a=>a.id===id))},cors);
      }

      if (p === '/api/attack' && request.method === 'POST') {
        const bugId = body.bug;
        const bug = BUG_DATA[bugId];
        if (!bug) return json({error:'Unknown bug.'},cors,400);
        const room = ROOMS[player.room];
        if (!room?.bugs?.includes(bugId)) return json({error:`${bugId} is not in this room.`},cors,400);
        // Combat round
        const playerAtk = 10 + calcLevel(player.xp||0) * 3 + Math.floor(Math.random()*8);
        const bugAtk = Math.max(0, bug.attack + Math.floor(Math.random()*6) - 3);
        const bugHpRemaining = Math.max(0, (body.bug_hp != null ? body.bug_hp : bug.hp) - playerAtk);
        const playerHpNew = Math.max(0, player.hp - bugAtk);
        let result = {player_damage:bugAtk,bug_damage:playerAtk,bug_hp:bugHpRemaining,player_hp:playerHpNew,bug_name:bug.name,defeated:false,player_defeated:false,xp_gained:0,gold_gained:0};
        if (bugHpRemaining <= 0) {
          result.defeated = true;
          result.xp_gained = bug.xp;
          result.gold_gained = bug.gold;
          const newBugsKilled = (player.bugs_killed||0)+1;
          const ac = checkAchievements();
          await env.DB.prepare('UPDATE rw_players SET hp=?,xp=xp+?,gold=gold+?,bugs_killed=?,achievements=?,level=? WHERE id=?').bind(playerHpNew,bug.xp,bug.gold,newBugsKilled,JSON.stringify(ac.all),calcLevel((player.xp||0)+bug.xp),pid).run();
          result.new_achievements = ac.unlocked.map(id=>ACHIEVEMENTS.find(a=>a.id===id));
          await log(env.DB,pid,'combat',`Defeated ${bug.name} (+${bug.xp}XP +${bug.gold}G)`,player.room);
        } else if (playerHpNew <= 0) {
          result.player_defeated = true;
          // Respawn in lobby with half HP
          const respawnHp = Math.floor((player.max_hp||100)/2);
          await env.DB.prepare('UPDATE rw_players SET hp=?,room="lobby" WHERE id=?').bind(respawnHp,pid).run();
          result.player_hp = respawnHp;
          result.respawn = true;
          await log(env.DB,pid,'defeated',`Defeated by ${bug.name}, respawned in lobby`,player.room);
        } else {
          await env.DB.prepare('UPDATE rw_players SET hp=? WHERE id=?').bind(playerHpNew,pid).run();
        }
        return json(result,cors);
      }

      if (p === '/api/flee' && request.method === 'POST') {
        // 70% chance to flee
        if (Math.random() < 0.7) {
          return json({fled:true,message:'You scramble away from the bug.'},cors);
        } else {
          const dmg = Math.floor(Math.random()*10)+5;
          const newHp = Math.max(0,player.hp-dmg);
          await env.DB.prepare('UPDATE rw_players SET hp=? WHERE id=?').bind(newHp,pid).run();
          return json({fled:false,message:'The bug strikes as you turn to run!',damage:dmg,hp:newHp},cors);
        }
      }

      if (p === '/api/rest' && request.method === 'POST') {
        const heal = Math.min(20, (player.max_hp||100) - player.hp);
        const newHp = player.hp + heal;
        await env.DB.prepare('UPDATE rw_players SET hp=? WHERE id=?').bind(newHp,pid).run();
        return json({healed:heal,hp:newHp,max_hp:player.max_hp||100},cors);
      }

      if (p === '/api/inventory') return json({inventory:inv,hp:player.hp,max_hp:player.max_hp||100,xp:player.xp,gold:player.gold||0,level:calcLevel(player.xp||0),room:player.room,bugs_killed:player.bugs_killed||0},cors);

      if (p === '/api/status') {
        const lv = calcLevel(player.xp||0);
        const nextLvXp = Math.pow(lv,2)*50;
        return json({name:player.name,room:player.room,hp:player.hp,max_hp:player.max_hp||100,xp:player.xp,gold:player.gold||0,level:lv,next_level_xp:nextLvXp,inventory:inv,quests:quests.filter(q=>!completed_quests.includes(q)).map(qid=>{const q=QUESTS.find(x=>x.id===qid);return q?{id:q.id,name:q.name,desc:q.desc}:null}).filter(Boolean),completed_quests:completed_quests.map(qid=>{const q=QUESTS.find(x=>x.id===qid);return q?{id:q.id,name:q.name}:null}).filter(Boolean),achievements:achievements.map(aid=>{const a=ACHIEVEMENTS.find(x=>x.id===aid);return a||null}).filter(Boolean),bugs_killed:player.bugs_killed||0},cors);
      }

      if (p === '/api/players') {
        const all = await env.DB.prepare("SELECT name,room,xp,level,last_seen FROM rw_players ORDER BY xp DESC LIMIT 30").all();
        return json({players:(all.results||[]).map(p=>({...p,online:new Date(p.last_seen+'Z')>new Date(Date.now()-5*60000)}))},cors);
      }

      if (p === '/api/map') {
        return json({rooms:Object.entries(ROOMS).map(([id,r])=>({id,name:r.name,exits:r.exits,visited:rooms_visited.includes(id)})),current:player.room},cors);
      }

      return json({error:'not found',path:p},cors,404);
    } catch(e) { return json({error:e.message},cors,500); }
  }
};

function json(d,cors,s=200){return new Response(JSON.stringify(d),{status:s,headers:{...cors,'Content-Type':'application/json'}})}
async function log(db,pid,action,result,room){await db.prepare('INSERT INTO rw_log (id,player_id,action,result,room) VALUES(?,?,?,?,?)').bind(crypto.randomUUID().slice(0,8),pid,action,result,room).run()}
function calcLevel(xp){return Math.max(1,Math.floor(1+Math.sqrt(xp/50)));}

const HTML=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%230a0a0a'/><circle cx='10' cy='16' r='5' fill='%23FF2255'/><rect x='18' y='11' width='10' height='10' rx='2' fill='%238844FF'/></svg>" type="image/svg+xml">
<title>RoadWorld — Fleet Text RPG | BlackRoad OS</title>
<meta name="description" content="RoadWorld: text-based RPG set in the BlackRoad fleet. Explore servers, hack nodes, and interact with AI agents.">
<meta property="og:title" content="RoadWorld — Fleet Text RPG">
<meta property="og:description" content="Text-based RPG set in the BlackRoad fleet. Explore servers and interact with AI agents.">
<meta property="og:url" content="https://game.blackroad.io">
<meta property="og:type" content="website">
<meta property="og:image" content="https://images.blackroad.io/pixel-art/road-logo.png">
<meta name="twitter:card" content="summary">
<link rel="canonical" href="https://game.blackroad.io/">
<meta name="robots" content="index, follow">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebApplication","name":"RoadWorld","url":"https://game.blackroad.io","applicationCategory":"GameApplication","operatingSystem":"Web","description":"Text-based RPG set in the BlackRoad fleet","author":{"@type":"Organization","name":"BlackRoad OS, Inc."}}</script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0a0a;--bg2:#111;--bg3:#1a1a1a;--t1:#e5e5e5;--t2:#a3a3a3;--t3:#525252;--pink:#FF2255;--amber:#F5A623;--blue:#4488FF;--violet:#8844FF;--cyan:#00D4FF;--orange:#FF6B2B;--green:#22c55e;--red:#ef4444}
html,body{height:100%;overflow:hidden}
body{background:var(--bg);color:var(--t1);font-family:'JetBrains Mono',monospace;display:flex;flex-direction:column}

/* HEADER BAR */
#header{background:var(--bg2);border-bottom:1px solid var(--bg3);height:40px;display:flex;align-items:center;padding:0 16px;gap:16px;flex-shrink:0;font-size:12px}
#header .h-name{color:var(--t1);font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:13px}
#header .h-sep{color:var(--bg3);margin:0 2px}
#header .h-label{color:var(--t3);font-size:10px;text-transform:uppercase;letter-spacing:0.5px}
#header .h-val{color:var(--t1);font-size:12px}
#header .h-bar{width:80px;height:8px;background:var(--bg3);border-radius:4px;overflow:hidden;display:inline-block;vertical-align:middle;margin:0 4px}
#header .h-bar-fill{height:100%;border-radius:4px;transition:width 0.3s}
#header .hp-fill{background:var(--green)}
#header .xp-fill{background:var(--cyan)}
#header .h-room{color:var(--t2);font-family:'Space Grotesk',sans-serif;font-size:12px;margin-left:auto}
#header .h-room .room-label{color:var(--pink)}
.hidden{display:none!important}

/* MAIN LAYOUT */
#main{flex:1;display:flex;overflow:hidden}

/* TERMINAL OUTPUT */
#game{flex:1;display:flex;flex-direction:column;min-width:0}
#output{flex:1;overflow-y:auto;padding:16px 20px;font-size:13px;line-height:1.7}
#output::-webkit-scrollbar{width:6px}
#output::-webkit-scrollbar-track{background:var(--bg)}
#output::-webkit-scrollbar-thumb{background:var(--bg3);border-radius:3px}
#output .line{margin-bottom:2px;word-wrap:break-word}
#output .room-name{color:var(--pink);font-weight:600}
#output .npc-name{color:var(--amber);font-weight:500}
#output .item-name{color:var(--cyan)}
#output .cmd-echo{color:var(--t3)}
#output .damage{color:var(--red);font-weight:500}
#output .heal{color:var(--green)}
#output .xp{color:var(--cyan)}
#output .gold{color:var(--amber)}
#output .achievement{color:var(--violet);font-weight:500}
#output .quest{color:var(--blue)}
#output .system{color:var(--t3)}
#output .separator{color:var(--bg3);user-select:none}
#output .bug-name{color:var(--red);font-weight:600}
#output .direction{color:var(--blue)}
#output .banner{color:var(--t3);line-height:1.2}
#output .banner-highlight{color:var(--pink)}

/* INPUT */
#input-area{border-top:1px solid var(--bg3);padding:10px 20px;display:flex;align-items:center;gap:0;flex-shrink:0;background:var(--bg)}
#input-area .prompt{color:var(--pink);font-size:14px;font-weight:700;margin-right:8px;flex-shrink:0}
#input-area input{flex:1;background:transparent;border:none;color:var(--t1);padding:4px 0;font-family:'JetBrains Mono',monospace;font-size:13px;outline:none;caret-color:var(--pink)}
#input-area input::placeholder{color:var(--t3)}

/* SIDEBAR */
#sidebar{width:260px;border-left:1px solid var(--bg3);display:flex;flex-direction:column;overflow-y:auto;flex-shrink:0;background:var(--bg)}
#sidebar::-webkit-scrollbar{width:4px}
#sidebar::-webkit-scrollbar-thumb{background:var(--bg3);border-radius:2px}
#sidebar .sidebar-toggle{display:none}
.panel{padding:12px;border-bottom:1px solid var(--bg3)}
.panel-title{font-family:'Space Grotesk',sans-serif;font-size:11px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.panel-content{font-size:11px;color:var(--t2);line-height:1.6}

/* MINI MAP */
#minimap{font-size:9px;line-height:1.4;color:var(--t3);white-space:pre;font-family:'JetBrains Mono',monospace}
#minimap .here{color:var(--pink);font-weight:700}
#minimap .visited{color:var(--t2)}
#minimap .unvisited{color:var(--bg3)}

/* INVENTORY */
.inv-item{display:flex;align-items:center;gap:6px;margin-bottom:4px}
.inv-icon{width:8px;height:8px;border-radius:2px;flex-shrink:0}

/* QUEST LOG */
.quest-item{margin-bottom:6px}
.quest-name{color:var(--t1);font-size:11px}
.quest-desc{color:var(--t3);font-size:10px}
.quest-done{text-decoration:line-through;color:var(--t3)}

/* COMBAT OVERLAY */
#combat{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.88);display:none;align-items:center;justify-content:center;z-index:100}
#combat.active{display:flex}
#combat-box{background:var(--bg2);border:1px solid var(--bg3);border-radius:8px;padding:24px;max-width:480px;width:90%;font-size:13px;line-height:1.7}
#combat-box .bug-title{color:var(--red);font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:700;margin-bottom:4px}
#combat-box .bug-desc{color:var(--t2);margin-bottom:12px;font-size:12px}
.combat-bars{display:flex;gap:16px;margin-bottom:12px}
.combat-bar{flex:1}
.combat-bar-label{font-size:10px;color:var(--t3);margin-bottom:4px}
.combat-bar-track{height:10px;background:var(--bg3);border-radius:5px;overflow:hidden}
.combat-bar-fill{height:100%;border-radius:5px;transition:width 0.3s}
#combat-log{min-height:40px;margin-bottom:12px;color:var(--t2);font-size:12px}
.combat-actions{display:flex;gap:8px}
.combat-actions button{padding:8px 16px;border:1px solid var(--bg3);background:var(--bg);color:var(--t1);border-radius:6px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:12px;transition:all 0.15s}
.combat-actions button:hover{border-color:var(--t3);background:var(--bg2)}
.combat-actions .atk{border-color:var(--red);color:var(--red)}
.combat-actions .atk:hover{background:rgba(239,68,68,0.1)}
.combat-actions .def{border-color:var(--blue);color:var(--blue)}
.combat-actions .def:hover{background:rgba(68,136,255,0.1)}
.combat-actions .flee{border-color:var(--amber);color:var(--amber)}
.combat-actions .flee:hover{background:rgba(245,166,35,0.1)}

/* START SCREEN */
#start-screen{position:fixed;top:0;left:0;right:0;bottom:0;background:var(--bg);display:flex;align-items:center;justify-content:center;z-index:200}
#start-screen.gone{display:none}
#start-box{text-align:center;max-width:520px;padding:40px}
#start-box .ascii-banner{font-family:'JetBrains Mono',monospace;font-size:11px;line-height:1.15;color:var(--t3);margin-bottom:24px;white-space:pre}
#start-box .ascii-banner .hl{color:var(--pink)}
#start-box h1{font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:700;color:var(--t1);margin-bottom:8px}
#start-box p{color:var(--t2);font-size:13px;line-height:1.6;margin-bottom:24px}
#start-box .subtitle{color:var(--t3);font-size:11px;margin-bottom:32px}
#start-box input{width:100%;background:var(--bg2);border:1px solid var(--bg3);color:var(--t1);padding:12px 16px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:14px;outline:none;text-align:center;margin-bottom:12px}
#start-box input:focus{border-color:var(--pink)}
#start-box button{width:100%;background:var(--bg2);border:1px solid var(--pink);color:var(--t1);padding:12px;border-radius:8px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-weight:600;font-size:13px;transition:all 0.15s}
#start-box button:hover{background:rgba(255,34,85,0.1)}
#start-box .resume{border-color:var(--bg3);color:var(--t2);margin-top:8px}
#start-box .resume:hover{border-color:var(--t3);color:var(--t1);background:var(--bg2)}

/* MOBILE */
@media(max-width:768px){
  #sidebar{position:fixed;top:0;right:-280px;bottom:0;width:280px;z-index:50;transition:right 0.25s;background:var(--bg);border-left:1px solid var(--bg3)}
  #sidebar.open{right:0}
  #sidebar .sidebar-toggle{display:block;position:absolute;top:8px;right:8px;background:none;border:1px solid var(--bg3);color:var(--t2);padding:4px 8px;border-radius:4px;cursor:pointer;font-size:10px;font-family:'JetBrains Mono',monospace}
  #header .h-room{display:none}
  .mobile-toggle{display:inline-block!important}
  #start-box .ascii-banner{font-size:7px}
  #start-box{padding:20px}
}
.mobile-toggle{display:none;background:none;border:1px solid var(--bg3);color:var(--t2);padding:4px 8px;border-radius:4px;cursor:pointer;font-size:10px;font-family:'JetBrains Mono',monospace;margin-left:auto}
</style>
</head>
<body>

<div id="header" class="hidden">
  <span class="h-name" id="s-name">---</span>
  <span class="h-sep">|</span>
  <span class="h-label">HP</span>
  <span class="h-bar"><span class="h-bar-fill hp-fill" id="s-hp-bar" style="width:100%"></span></span>
  <span class="h-val" id="s-hp">100/100</span>
  <span class="h-sep">|</span>
  <span class="h-label">XP</span>
  <span class="h-bar"><span class="h-bar-fill xp-fill" id="s-xp-bar" style="width:0%"></span></span>
  <span class="h-val" id="s-xp">0</span>
  <span class="h-sep">|</span>
  <span class="h-label">LV</span>
  <span class="h-val" id="s-level">1</span>
  <span class="h-sep">|</span>
  <span class="h-label">Gold</span>
  <span class="h-val" id="s-gold">0</span>
  <span class="h-room"><span class="room-label" id="s-room">---</span></span>
  <button class="mobile-toggle" onclick="toggleSidebar()">MAP</button>
</div>

<div id="main">
  <div id="game">
    <div id="output"></div>
    <div id="input-area">
      <span class="prompt">&gt;</span>
      <input id="cmd" placeholder="type a command..." autocomplete="off" spellcheck="false" disabled>
    </div>
  </div>
  <div id="sidebar" class="hidden">
    <button class="sidebar-toggle" onclick="toggleSidebar()">CLOSE</button>
    <div class="panel">
      <div class="panel-title">Map</div>
      <div class="panel-content" id="minimap"></div>
    </div>
    <div class="panel">
      <div class="panel-title">Inventory</div>
      <div class="panel-content" id="inv-panel">Empty</div>
    </div>
    <div class="panel">
      <div class="panel-title">Active Quests</div>
      <div class="panel-content" id="quest-panel">No active quests</div>
    </div>
    <div class="panel">
      <div class="panel-title">Players Online</div>
      <div class="panel-content" id="players-panel">---</div>
    </div>
  </div>
</div>

<div id="combat">
  <div id="combat-box">
    <div class="bug-title" id="cb-name"></div>
    <div class="bug-desc" id="cb-desc"></div>
    <div class="combat-bars">
      <div class="combat-bar">
        <div class="combat-bar-label">YOUR HP</div>
        <div class="combat-bar-track"><div class="combat-bar-fill" id="cb-php" style="width:100%;background:var(--green)"></div></div>
      </div>
      <div class="combat-bar">
        <div class="combat-bar-label">BUG HP</div>
        <div class="combat-bar-track"><div class="combat-bar-fill" id="cb-bhp" style="width:100%;background:var(--red)"></div></div>
      </div>
    </div>
    <div id="combat-log"></div>
    <div class="combat-actions">
      <button class="atk" onclick="combatAttack()">ATTACK</button>
      <button class="def" onclick="combatDefend()">DEFEND</button>
      <button class="flee" onclick="combatFlee()">FLEE</button>
    </div>
  </div>
</div>

<div id="start-screen">
  <div id="start-box">
    <div class="ascii-banner"><span class="hl"> ____  _        _    ____ _  ______   ___    _    ____  </span>
<span class="hl">| __ )| |      / \\  / ___| |/ /  _ \\ / _ \\  / \\  |  _ \\ </span>
<span class="hl">|  _ \\| |     / _ \\| |   | ' /| |_) | | | |/ _ \\ | | | |</span>
<span class="hl">| |_) | |___ / ___ \\ |___| . \\|  _ &lt;| |_| / ___ \\| |_| |</span>
<span class="hl">|____/|_____/_/   \\_\\____|_|\\_\\_| \\_\\\\___/_/   \\_\\____/ </span></div>
    <h1>RoadWorld</h1>
    <p>A terminal RPG inside the BlackRoad fleet. Explore server rooms, talk to AI-powered fleet agents, hunt software bugs, complete quests, and map the network.</p>
    <div class="subtitle">Terminal-based. Keyboard-driven. No hand-holding.</div>
    <input id="name-input" placeholder="Enter your name" maxlength="20" autofocus>
    <button onclick="startGame()">JACK IN</button>
    <button class="resume" onclick="resumeGame()">RESUME SAVED GAME</button>
  </div>
</div>

<script>
const O=document.getElementById('output');
const CMD=document.getElementById('cmd');
const HEADER=document.getElementById('header');
const SIDEBAR=document.getElementById('sidebar');
const START=document.getElementById('start-screen');
const COMBAT=document.getElementById('combat');

let PID=null;
let STATE={name:'',room:'lobby',hp:100,max_hp:100,xp:0,gold:0,level:1,inventory:[],quests:[],completed_quests:[],achievements:[],bugs_killed:0,rooms_visited:['lobby'],npcs_talked:[]};
let cmdHistory=[];
let cmdIdx=-1;
let currentBug=null;
let currentBugHp=0;
let audioCtx=null;
let soundEnabled=true;
let autoSaveQuiet=false;

const ROOM_MAP={
  lobby:{name:'Fleet Lobby',x:2,y:2},
  'server-room':{name:'Server Room',x:1,y:1},
  'network-lab':{name:'AI Laboratory',x:3,y:1},
  'ai-core':{name:'Container Yard',x:3,y:3},
  'security-vault':{name:'Observation Deck',x:1,y:3},
  rooftop:{name:'Rooftop',x:2,y:0},
};
const ROOM_CONNECTIONS=[
  ['lobby','server-room'],['lobby','network-lab'],['lobby','ai-core'],['lobby','security-vault'],['lobby','rooftop'],
  ['server-room','network-lab'],['network-lab','ai-core'],['ai-core','security-vault'],['security-vault','rooftop']
];

const ITEM_COLORS={'fleet-badge':'var(--pink)','access-card':'var(--blue)','ssh-key':'var(--green)','config-file':'var(--amber)','server-log':'var(--t2)',
  'model-weights':'var(--violet)','training-log':'var(--cyan)','gpu-shard':'var(--orange)',
  'dockerfile':'var(--blue)','compose-file':'var(--green)','deploy-key':'var(--red)',
  'grafana-panel':'var(--amber)','alert-rule':'var(--red)','monitoring-key':'var(--cyan)',
  'antenna-fragment':'var(--violet)','rooftop-key':'var(--pink)'};

const ALL_ACHIEVEMENTS=[
  {id:'a1',name:'First Steps',desc:'Enter the fleet'},
  {id:'a2',name:'Explorer',desc:'Visit every room'},
  {id:'a3',name:'Social Butterfly',desc:'Talk to every NPC'},
  {id:'a4',name:'Collector',desc:'Pick up 10 items'},
  {id:'a5',name:'Bug Hunter',desc:'Defeat 5 bugs'},
  {id:'a6',name:'Exterminator',desc:'Defeat 20 bugs'},
  {id:'a7',name:'Quest Master',desc:'Complete all quests'},
  {id:'a8',name:'Level 5',desc:'Reach level 5'},
  {id:'a9',name:'Level 10',desc:'Reach level 10'},
  {id:'a10',name:'Veteran',desc:'Earn 1000 XP'},
];

const COMMANDS=['look','go','talk','take','use','inventory','inv','stats','help','map','save','quests','achievements','attack','flee','rest','players','clear','sound'];
const DIRECTIONS=['lobby','server-room','network-lab','ai-core','security-vault','rooftop'];

function toggleSidebar(){SIDEBAR.classList.toggle('open')}

// Sound
function initAudio(){if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)()}
function beep(freq,dur,vol){
  if(!soundEnabled)return;
  try{initAudio();const o=audioCtx.createOscillator();const g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);o.frequency.value=freq;o.type='sine';g.gain.value=vol||0.05;o.start();g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+dur);o.stop(audioCtx.currentTime+dur)}catch(e){}
}
function sndRoom(){beep(440,0.1);setTimeout(()=>beep(554,0.1),100);setTimeout(()=>beep(659,0.08),200)}
function sndHit(){beep(200,0.15,0.08);setTimeout(()=>beep(150,0.1,0.06),80)}
function sndXP(){beep(880,0.08);setTimeout(()=>beep(1108,0.08),80)}
function sndDeath(){beep(200,0.3,0.08);setTimeout(()=>beep(150,0.3,0.06),200);setTimeout(()=>beep(100,0.4,0.04),400)}

// OUTPUT
function out(html,cls){
  const d=document.createElement('div');
  d.className='line'+(cls?' '+cls:'');
  d.innerHTML=html;
  O.appendChild(d);
  O.scrollTop=O.scrollHeight;
}
function sep(){out('\\u2500'.repeat(60),'separator')}
function outRoom(name,desc,exits,npcs,items,bugs,players){
  sep();
  out('<span class="room-name">'+esc(name)+'</span>');
  out(esc(desc));
  out('');
  if(exits&&exits.length)out('Exits: '+exits.map(e=>'<span class="direction">'+esc(e)+'</span>').join(' | '));
  if(npcs&&npcs.length)out('NPCs: '+npcs.map(n=>'<span class="npc-name">'+esc(n)+'</span>').join(', '));
  if(items&&items.length)out('Items: '+items.map(i=>'<span class="item-name">'+esc(i)+'</span>').join(', '));
  if(bugs&&bugs.length)out('Threats: '+bugs.map(b=>'<span class="bug-name">'+esc(b)+'</span>').join(', '));
  if(players&&players.length)out('<span class="system">Players here: '+players.map(esc).join(', ')+'</span>');
  sep();
}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

// STATS
function updateStats(){
  document.getElementById('s-name').textContent=STATE.name;
  document.getElementById('s-level').textContent=STATE.level;
  document.getElementById('s-hp').textContent=STATE.hp+'/'+STATE.max_hp;
  document.getElementById('s-hp-bar').style.width=Math.max(0,STATE.hp/STATE.max_hp*100)+'%';
  const nextXP=Math.pow(STATE.level,2)*50;
  const prevXP=Math.pow(Math.max(0,STATE.level-1),2)*50;
  const pct=nextXP>prevXP?Math.min(100,(STATE.xp-prevXP)/(nextXP-prevXP)*100):0;
  document.getElementById('s-xp-bar').style.width=pct+'%';
  document.getElementById('s-xp').textContent=STATE.xp;
  document.getElementById('s-gold').textContent=STATE.gold;
  document.getElementById('s-room').textContent=ROOM_MAP[STATE.room]?ROOM_MAP[STATE.room].name:STATE.room;
}

// MINIMAP
function updateMap(){
  const grid=[];
  for(let y=0;y<5;y++){grid[y]=[];for(let x=0;x<5;x++)grid[y][x]='   '}
  for(const[id,r]of Object.entries(ROOM_MAP)){
    const visited=STATE.rooms_visited&&STATE.rooms_visited.includes(id);
    const here=STATE.room===id;
    const label=id.slice(0,3).toUpperCase();
    if(here)grid[r.y][r.x]='<span class="here">['+label+']</span>';
    else if(visited)grid[r.y][r.x]='<span class="visited"> '+label+' </span>';
    else grid[r.y][r.x]='<span class="unvisited"> ... </span>';
  }
  document.getElementById('minimap').innerHTML=grid.map(row=>row.join('')).join('\\n');
}

// INVENTORY PANEL
function updateInvPanel(){
  const el=document.getElementById('inv-panel');
  if(!STATE.inventory||!STATE.inventory.length){el.innerHTML='Empty';return}
  el.innerHTML=STATE.inventory.map(i=>'<div class="inv-item"><div class="inv-icon" style="background:'+(ITEM_COLORS[i]||'var(--t3)')+'"></div>'+esc(i)+'</div>').join('');
}

// QUEST PANEL
function updateQuestPanel(){
  const el=document.getElementById('quest-panel');
  const active=(STATE.quests||[]).filter(q=>!(STATE.completed_quests||[]).find(c=>c.id===q.id||c===q.id));
  const done=STATE.completed_quests||[];
  let html='';
  if(active.length)active.forEach(q=>{const qo=typeof q==='object'?q:{id:q,name:q};html+='<div class="quest-item"><div class="quest-name">'+esc(qo.name||qo.id)+'</div>'+(qo.desc?'<div class="quest-desc">'+esc(qo.desc)+'</div>':'')+'</div>'});
  if(done.length)done.forEach(q=>{const qo=typeof q==='object'?q:{id:q,name:q};html+='<div class="quest-item quest-done"><div class="quest-name">'+esc(qo.name||qo.id)+'</div></div>'});
  el.innerHTML=html||'No quests';
}

// PLAYERS
async function updatePlayers(){
  try{
    const r=await fetch('/api/players');
    const d=await r.json();
    const el=document.getElementById('players-panel');
    if(d.players&&d.players.length){
      el.innerHTML=d.players.filter(p=>p.online!==false).slice(0,10).map(p=>
        '<div style="margin-bottom:2px">'+esc(p.name)+' <span style="color:var(--t3)">L'+esc(p.level||1)+' '+esc(p.room)+'</span></div>'
      ).join('')||'No one online';
    }
  }catch(e){}
}

function updateAllPanels(){updateStats();updateMap();updateInvPanel();updateQuestPanel()}

// SAVE/LOAD
function saveGame(quiet){
  if(!PID)return;
  localStorage.setItem('rw_pid',PID);
  localStorage.setItem('rw_state',JSON.stringify(STATE));
  if(!quiet)out('<span class="system">Game saved.</span>');
}
function autoSave(){saveGame(true)}
function loadSavedGame(){
  const pid=localStorage.getItem('rw_pid');
  const state=localStorage.getItem('rw_state');
  if(pid&&state){return{pid,state:JSON.parse(state)}}
  return null;
}

// COMBAT
function startCombat(bug){
  currentBug=bug;
  currentBugHp=bug.hp;
  document.getElementById('cb-name').textContent=bug.name;
  document.getElementById('cb-desc').textContent=bug.desc;
  document.getElementById('cb-php').style.width=(STATE.hp/STATE.max_hp*100)+'%';
  document.getElementById('cb-bhp').style.width='100%';
  document.getElementById('combat-log').innerHTML='A <span class="bug-name">'+esc(bug.name)+'</span> appears! HP: '+bug.hp;
  COMBAT.classList.add('active');
  sndHit();
}
async function combatAttack(){
  if(!currentBug)return;
  try{
    const r=await fetch('/api/attack',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({player:PID,bug:currentBug.id,bug_hp:currentBugHp})});
    const d=await r.json();
    currentBugHp=d.bug_hp;
    STATE.hp=d.player_hp;
    document.getElementById('cb-php').style.width=(d.player_hp/STATE.max_hp*100)+'%';
    document.getElementById('cb-bhp').style.width=(d.bug_hp/currentBug.hp*100)+'%';
    let logMsg='You deal <span class="damage">'+d.bug_damage+'</span> damage. ';
    logMsg+=esc(currentBug.name)+' hits you for <span class="damage">'+d.player_damage+'</span>.';
    if(d.defeated){
      logMsg+='<br><span class="xp">'+esc(currentBug.name)+' defeated! +'+d.xp_gained+' XP +'+d.gold_gained+' Gold</span>';
      STATE.xp+=d.xp_gained;STATE.gold+=d.gold_gained;STATE.bugs_killed=(STATE.bugs_killed||0)+1;
      STATE.level=Math.max(1,Math.floor(1+Math.sqrt(STATE.xp/50)));
      sndXP();
      if(d.new_achievements)d.new_achievements.forEach(a=>{if(a){STATE.achievements.push(a.id);out('<span class="achievement">Achievement unlocked: '+esc(a.name)+' -- '+esc(a.desc)+'</span>')}});
      setTimeout(()=>{COMBAT.classList.remove('active');currentBug=null;updateAllPanels();autoSave()},1500);
    } else if(d.player_defeated){
      logMsg+='<br><span class="damage">You have been defeated! Respawning in lobby...</span>';
      STATE.room='lobby';STATE.hp=d.player_hp;
      sndDeath();
      setTimeout(()=>{COMBAT.classList.remove('active');currentBug=null;updateAllPanels();execCmd('look')},2000);
    } else {
      sndHit();
    }
    document.getElementById('combat-log').innerHTML=logMsg;
    updateStats();
    autoSave();
  }catch(e){document.getElementById('combat-log').textContent='Error: '+e.message}
}
async function combatDefend(){
  if(!currentBug)return;
  const heal=Math.min(5,STATE.max_hp-STATE.hp);
  STATE.hp=Math.min(STATE.max_hp,STATE.hp+heal);
  const reducedAtk=Math.floor(currentBug.attack*0.4+Math.random()*3);
  STATE.hp=Math.max(0,STATE.hp-reducedAtk);
  await fetch('/api/rest',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({player:PID})}).catch(()=>{});
  document.getElementById('cb-php').style.width=(STATE.hp/STATE.max_hp*100)+'%';
  document.getElementById('combat-log').innerHTML='You brace yourself. Healed <span class="heal">'+heal+'</span> HP. Took <span class="damage">'+reducedAtk+'</span> reduced damage.';
  updateStats();
  autoSave();
  if(STATE.hp<=0){
    STATE.room='lobby';STATE.hp=Math.floor(STATE.max_hp/2);
    sndDeath();
    document.getElementById('combat-log').innerHTML+='<br><span class="damage">Defeated! Respawning...</span>';
    setTimeout(()=>{COMBAT.classList.remove('active');currentBug=null;updateAllPanels();execCmd('look')},2000);
  }
}
async function combatFlee(){
  if(!currentBug)return;
  try{
    const r=await fetch('/api/flee',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({player:PID})});
    const d=await r.json();
    if(d.fled){
      document.getElementById('combat-log').innerHTML='<span class="system">You flee successfully!</span>';
      setTimeout(()=>{COMBAT.classList.remove('active');currentBug=null},800);
    }else{
      STATE.hp=d.hp;
      document.getElementById('cb-php').style.width=(d.hp/STATE.max_hp*100)+'%';
      document.getElementById('combat-log').innerHTML='<span class="damage">Failed to flee! Took '+d.damage+' damage.</span>';
      updateStats();
      sndHit();
    }
    autoSave();
  }catch(e){}
}

// COMMAND PROCESSING
const CMD_HELP=\`
<span class="room-name">RoadWorld Commands</span>

  look              Examine current room
  go [room]         Move to a connected room
  talk [npc] [msg]  Talk to an NPC (AI-powered)
  take [item]       Pick up an item
  use [item]        Use an item from inventory
  attack [bug]      Fight a software bug
  flee              Run from combat
  rest              Recover some HP

  inventory / inv   Show your items
  stats             Detailed character stats
  quests            Show quest log
  achievements      Show achievements
  map               Show ASCII map
  players           Show online players

  save              Save game to browser
  clear             Clear terminal
  sound             Toggle sound effects
  help              Show this help

<span class="system">UP/DOWN arrows = command history. TAB = auto-complete.</span>
\`;

async function execCmd(raw){
  const parts=raw.trim().split(/\\s+/);
  const cmd=parts[0].toLowerCase();
  const arg=parts.slice(1).join(' ');

  if(cmd!=='help'&&cmd!=='clear')out('<span class="cmd-echo">&gt; '+esc(raw)+'</span>');

  if(cmd==='help'){out(CMD_HELP);return}
  if(cmd==='clear'){O.innerHTML='';return}
  if(cmd==='sound'){soundEnabled=!soundEnabled;out('<span class="system">Sound '+(soundEnabled?'enabled':'disabled')+'.</span>');return}
  if(cmd==='save'){saveGame();return}

  if(cmd==='look'){
    try{
      const r=await fetch('/api/look?player='+PID);
      const d=await r.json();
      outRoom(d.name,d.description,d.exits,d.npcs,d.items,d.bugs,d.players);
      autoSave();
    }catch(e){out('<span class="damage">Connection error.</span>')}
    return;
  }

  if(cmd==='go'){
    if(!arg){out('<span class="system">Go where? Specify a direction.</span>');return}
    try{
      const r=await fetch('/api/go',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({player:PID,direction:arg})});
      const d=await r.json();
      if(d.error){out('<span class="damage">'+esc(d.error)+'</span>');return}
      STATE.room=d.room;
      if(!STATE.rooms_visited.includes(d.room))STATE.rooms_visited.push(d.room);
      sndRoom();
      outRoom(d.name,d.description,d.exits,d.npcs,d.items,d.bugs);
      if(d.new_achievements)d.new_achievements.forEach(a=>{if(a){STATE.achievements.push(a.id);out('<span class="achievement">Achievement unlocked: '+esc(a.name)+' -- '+esc(a.desc)+'</span>')}});
      if(d.encounter){
        out('');
        out('<span class="bug-name">A '+esc(d.encounter.name)+' emerges from the shadows!</span>');
        out('<span class="system">'+esc(d.encounter.desc)+'</span>');
        setTimeout(()=>startCombat(d.encounter),500);
      }
      updateAllPanels();
      autoSave();
    }catch(e){out('<span class="damage">Connection error.</span>')}
    return;
  }

  if(cmd==='talk'){
    if(!arg){out('<span class="system">Talk to whom? Specify an NPC name.</span>');return}
    const tparts=arg.split(/\\s+/);
    const npc=tparts[0];
    const msg=tparts.slice(1).join(' ')||'hello';
    out('<span class="system">'+esc(npc)+' is thinking...</span>');
    try{
      const r=await fetch('/api/talk',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({player:PID,npc,message:msg})});
      const d=await r.json();
      if(d.error){out('<span class="damage">'+esc(d.error)+'</span>');return}
      out('<span class="npc-name">'+esc(d.npc)+'</span>: '+esc(d.reply));
      out('<span class="xp">+'+d.xp_gained+' XP</span>');
      STATE.xp+=d.xp_gained;
      if(!STATE.npcs_talked.includes(npc))STATE.npcs_talked.push(npc);
      STATE.level=Math.max(1,Math.floor(1+Math.sqrt(STATE.xp/50)));
      if(d.new_achievements)d.new_achievements.forEach(a=>{if(a){STATE.achievements.push(a.id);out('<span class="achievement">Achievement unlocked: '+esc(a.name)+' -- '+esc(a.desc)+'</span>')}});
      sndXP();
      updateAllPanels();
      autoSave();
    }catch(e){out('<span class="damage">Connection error.</span>')}
    return;
  }

  if(cmd==='take'){
    if(!arg){out('<span class="system">Take what? Specify an item.</span>');return}
    try{
      const r=await fetch('/api/take',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({player:PID,item:arg})});
      const d=await r.json();
      if(d.error){out('<span class="damage">'+esc(d.error)+'</span>');return}
      out('Picked up: <span class="item-name">'+esc(d.took)+'</span> <span class="xp">+'+d.xp_gained+' XP</span>'+(d.gold_gained?' <span class="gold">+'+d.gold_gained+' Gold</span>':''));
      STATE.inventory.push(d.took);STATE.xp+=d.xp_gained;STATE.gold+=d.gold_gained||0;
      STATE.level=Math.max(1,Math.floor(1+Math.sqrt(STATE.xp/50)));
      if(d.quest_completed){
        out('<span class="quest">Quest completed: '+esc(d.quest_completed.name)+'!</span>');
        STATE.completed_quests.push(d.quest_completed);
        sndXP();sndXP();
      }
      if(d.new_achievements)d.new_achievements.forEach(a=>{if(a){STATE.achievements.push(a.id);out('<span class="achievement">Achievement unlocked: '+esc(a.name)+' -- '+esc(a.desc)+'</span>')}});
      sndXP();
      updateAllPanels();
      autoSave();
    }catch(e){out('<span class="damage">Connection error.</span>')}
    return;
  }

  if(cmd==='use'){
    if(!arg){out('<span class="system">Use what? Specify an item from your inventory.</span>');return}
    if(!STATE.inventory.includes(arg)){out('<span class="system">You do not have '+esc(arg)+'.</span>');return}
    out('You examine the <span class="item-name">'+esc(arg)+'</span> carefully, but there is no obvious way to use it here.');
    autoSave();
    return;
  }

  if(cmd==='attack'){
    if(!arg){out('<span class="system">Attack what? Specify a bug name.</span>');return}
    try{
      const r=await fetch('/api/look?player='+PID);
      const d=await r.json();
      if(!d.bugs||!d.bugs.includes(arg)){out('<span class="damage">'+esc(arg)+' is not here.</span>');return}
      const bugData={id:arg,name:arg.replace(/-/g,' ').replace(/\\b\\w/g,c=>c.toUpperCase()),hp:40,attack:12,xp:25,gold:10,desc:'A dangerous software anomaly.'};
      const r2=await fetch('/api/go',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({player:PID,direction:STATE.room})}).catch(()=>null);
      startCombat(bugData);
    }catch(e){out('<span class="damage">Error initiating combat.</span>')}
    return;
  }

  if(cmd==='rest'){
    try{
      const r=await fetch('/api/rest',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({player:PID})});
      const d=await r.json();
      STATE.hp=d.hp;
      out('<span class="heal">You rest briefly. Recovered '+d.healed+' HP. HP: '+d.hp+'/'+d.max_hp+'</span>');
      updateStats();
      autoSave();
    }catch(e){out('<span class="damage">Error.</span>')}
    return;
  }

  if(cmd==='inventory'||cmd==='inv'){
    try{
      const r=await fetch('/api/inventory?player='+PID);
      const d=await r.json();
      STATE.hp=d.hp;STATE.xp=d.xp;STATE.gold=d.gold||0;STATE.inventory=d.inventory;STATE.level=d.level||1;
      sep();
      out('HP: '+d.hp+'/'+(d.max_hp||100)+' | XP: '+d.xp+' | Gold: '+(d.gold||0)+' | Level: '+(d.level||1));
      out('Bugs killed: '+(d.bugs_killed||0));
      out('');
      if(d.inventory.length){
        out('Inventory:');
        d.inventory.forEach(i=>out('  <span class="item-name">'+esc(i)+'</span>'));
      }else out('Inventory: empty');
      sep();
      updateAllPanels();
    }catch(e){out('<span class="damage">Error.</span>')}
    return;
  }

  if(cmd==='stats'){
    try{
      const r=await fetch('/api/status?player='+PID);
      const d=await r.json();
      STATE.hp=d.hp;STATE.xp=d.xp;STATE.gold=d.gold||0;STATE.level=d.level||1;STATE.inventory=d.inventory;
      sep();
      out('<span class="room-name">'+esc(d.name)+'</span> -- Level '+d.level);
      out('HP: '+d.hp+'/'+d.max_hp+' | XP: '+d.xp+' (next: '+d.next_level_xp+') | Gold: '+d.gold);
      out('Room: '+d.room+' | Bugs killed: '+d.bugs_killed);
      out('Items: '+d.inventory.length+' | Quests: '+d.completed_quests.length+'/'+((d.quests||[]).length+d.completed_quests.length));
      out('Achievements: '+d.achievements.length+'/'+ALL_ACHIEVEMENTS.length);
      sep();
      updateAllPanels();
    }catch(e){out('<span class="damage">Error.</span>')}
    return;
  }

  if(cmd==='quests'){
    sep();
    out('<span class="room-name">Quest Log</span>');
    out('');
    const active=(STATE.quests||[]).filter(q=>!(STATE.completed_quests||[]).find(c=>(c.id||c)===(q.id||q)));
    if(active.length){out('Active:');active.forEach(q=>{const qo=typeof q==='object'?q:{id:q,name:q};out('  <span class="quest">'+esc(qo.name||qo.id)+'</span>'+(qo.desc?' -- '+esc(qo.desc):''))})}
    const done=STATE.completed_quests||[];
    if(done.length){out('');out('Completed:');done.forEach(q=>{const qo=typeof q==='object'?q:{id:q,name:q};out('  <span class="system">'+esc(qo.name||qo.id)+'</span>')})}
    if(!active.length&&!done.length)out('<span class="system">No quests yet.</span>');
    sep();
    return;
  }

  if(cmd==='achievements'){
    sep();
    out('<span class="room-name">Achievements</span>');
    out('');
    ALL_ACHIEVEMENTS.forEach(a=>{
      const has=(STATE.achievements||[]).includes(a.id)||(STATE.achievements||[]).find(x=>x&&(x.id===a.id));
      out((has?'<span class="achievement">[x]</span>':'<span class="system">[ ]</span>')+' '+esc(a.name)+' -- <span class="system">'+esc(a.desc)+'</span>');
    });
    sep();
    return;
  }

  if(cmd==='map'){
    sep();
    out('<span class="room-name">Fleet Map</span>');
    out('');
    out('          <span class="'+(STATE.room==='rooftop'?'room-name':'system')+'">[ Rooftop ]</span>');
    out('           /        \\\\');
    out('  <span class="'+(STATE.room==='server-room'?'room-name':'system')+'">[Server Room]</span>  <span class="'+(STATE.room==='security-vault'?'room-name':'system')+'">[Observation]</span>');
    out('       \\\\      |      /');
    out('        <span class="'+(STATE.room==='lobby'?'room-name':'system')+'">[  Lobby  ]</span>');
    out('       /      |      \\\\');
    out('  <span class="'+(STATE.room==='network-lab'?'room-name':'system')+'">[  AI Lab  ]</span>  <span class="'+(STATE.room==='ai-core'?'room-name':'system')+'">[Containers]</span>');
    out('');
    out('<span class="system">Current: '+esc(STATE.room)+' | You are here: </span><span class="room-name">[*]</span>');
    sep();
    return;
  }

  if(cmd==='players'){
    try{
      const r=await fetch('/api/players');
      const d=await r.json();
      sep();
      out('<span class="room-name">Leaderboard</span>');
      out('');
      (d.players||[]).forEach((p,i)=>{
        const online=p.online!==false;
        out((i+1)+'. '+esc(p.name)+' -- Level '+(p.level||1)+' -- XP: '+p.xp+' -- '+esc(p.room)+(online?' <span class="heal">[online]</span>':''));
      });
      if(!(d.players||[]).length)out('<span class="system">No players yet.</span>');
      sep();
    }catch(e){out('<span class="damage">Error.</span>')}
    return;
  }

  out('<span class="system">Unknown command: '+esc(cmd)+'. Type "help" for commands.</span>');
}

// SEND COMMAND
async function send(){
  const v=CMD.value.trim();
  if(!v)return;
  cmdHistory.push(v);
  cmdIdx=cmdHistory.length;
  CMD.value='';
  await execCmd(v);
}

// KEY HANDLERS
CMD.addEventListener('keydown',e=>{
  if(e.key==='Enter'){send();return}
  if(e.key==='ArrowUp'){
    e.preventDefault();
    if(cmdIdx>0){cmdIdx--;CMD.value=cmdHistory[cmdIdx]}
    return;
  }
  if(e.key==='ArrowDown'){
    e.preventDefault();
    if(cmdIdx<cmdHistory.length-1){cmdIdx++;CMD.value=cmdHistory[cmdIdx]}
    else{cmdIdx=cmdHistory.length;CMD.value=''}
    return;
  }
  if(e.key==='Tab'){
    e.preventDefault();
    const v=CMD.value.trim().toLowerCase();
    const parts=v.split(/\\s+/);
    if(parts.length===1){
      const matches=COMMANDS.filter(c=>c.startsWith(parts[0]));
      if(matches.length===1)CMD.value=matches[0]+' ';
      else if(matches.length>1)out('<span class="system">'+matches.join('  ')+'</span>');
    }else if(parts[0]==='go'&&parts.length===2){
      const matches=DIRECTIONS.filter(d=>d.startsWith(parts[1]));
      if(matches.length===1)CMD.value='go '+matches[0];
      else if(matches.length>1)out('<span class="system">'+matches.join('  ')+'</span>');
    }else if((parts[0]==='talk'||parts[0]==='take'||parts[0]==='attack')&&parts.length===2){
      // no auto-complete for NPC/item names without room data - just pass through
    }
  }
});

// WELCOME BANNER
function showBanner(){
  out('<span class="banner"><span class="banner-highlight"> ____  _        _    ____ _  ______   ___    _    ____  </span></span>');
  out('<span class="banner"><span class="banner-highlight">| __ )| |      / \\\\  / ___| |/ /  _ \\\\ / _ \\\\  / \\\\  |  _ \\\\ </span></span>');
  out('<span class="banner"><span class="banner-highlight">|  _ \\\\| |     / _ \\\\| |   | \\' /| |_) | | | |/ _ \\\\ | | | |</span></span>');
  out('<span class="banner"><span class="banner-highlight">| |_) | |___ / ___ \\\\ |___| . \\\\|  _ &lt;| |_| / ___ \\\\| |_| |</span></span>');
  out('<span class="banner"><span class="banner-highlight">|____/|_____/_/   \\\\_\\\\____|_|\\\\_\\\\_| \\\\_\\\\\\\\___/_/   \\\\_\\\\____/ </span></span>');
  out('');
  out('<span class="room-name">ROADWORLD v2.0</span> -- Fleet Terminal RPG');
  out('<span class="system">BlackRoad OS, Inc. -- All roads lead somewhere.</span>');
  sep();
}

// START GAME
async function startGame(){
  const name=document.getElementById('name-input').value.trim()||'Wanderer';
  try{
    const r=await fetch('/api/start',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name})});
    const d=await r.json();
    if(d.player){
      PID=d.player.id;
      STATE={...STATE,...d.player,rooms_visited:['lobby'],npcs_talked:[]};
      if(d.player.quests)STATE.quests=d.player.quests;
      if(d.player.achievements)STATE.achievements=d.player.achievements;
      START.classList.add('gone');
      HEADER.classList.remove('hidden');
      SIDEBAR.classList.remove('hidden');
      CMD.disabled=false;
      CMD.focus();
      sndRoom();
      showBanner();
      out('');
      out('Welcome, <span class="npc-name">'+esc(name)+'</span>. You jack into the BlackRoad fleet.');
      out('The terminal flickers. Systems come online one by one.');
      out('');
      outRoom(d.room_name,d.message,d.exits,d.npcs,d.items);
      out('');
      out('<span class="system">Type "help" for commands. Type "look" to examine your surroundings.</span>');
      updateAllPanels();
      autoSave();
      updatePlayers();
      setInterval(updatePlayers,30000);
    }
  }catch(e){out('<span class="damage">Failed to connect to fleet: '+e.message+'</span>')}
}

async function resumeGame(){
  const saved=loadSavedGame();
  if(!saved){out('<span class="damage">No saved game found.</span>');return}
  PID=saved.pid;
  STATE=saved.state;
  START.classList.add('gone');
  HEADER.classList.remove('hidden');
  SIDEBAR.classList.remove('hidden');
  CMD.disabled=false;
  CMD.focus();
  showBanner();
  out('');
  out('Welcome back, <span class="npc-name">'+esc(STATE.name)+'</span>. Session restored.');
  out('');
  updateAllPanels();
  await execCmd('look');
  updatePlayers();
  setInterval(updatePlayers,30000);
}

// Auto-focus name input
document.getElementById('name-input').addEventListener('keydown',e=>{if(e.key==='Enter')startGame()});
</script>
<!-- Lucidia Assistant Panel -->
<style>
#lucidia-panel{position:fixed;bottom:16px;right:16px;width:300px;height:200px;z-index:9999;background:#1a1a2e;border:1px solid #CC00AA;border-radius:12px;font-family:system-ui,sans-serif;box-shadow:0 4px 24px rgba(204,0,170,0.3);display:flex;flex-direction:column;transition:all .3s ease}
#lucidia-panel.minimized{width:auto;height:auto;padding:8px 16px;cursor:pointer}
#lucidia-panel.minimized #lucidia-body,#lucidia-panel.minimized #lucidia-input-row,#lucidia-panel.minimized #lucidia-min-btn{display:none}
#lucidia-header{display:flex;align-items:center;padding:10px 12px;border-bottom:1px solid #333;gap:8px}
#lucidia-dot{width:10px;height:10px;border-radius:50%;background:#CC00AA;flex-shrink:0;animation:lucidia-pulse 2s infinite}
@keyframes lucidia-pulse{0%,100%{box-shadow:0 0 4px #CC00AA}50%{box-shadow:0 0 12px #CC00AA}}
#lucidia-label{color:#fff;font-size:13px;font-weight:600;flex:1}
#lucidia-min-btn{background:none;border:none;color:#888;cursor:pointer;font-size:16px;padding:0 4px}
#lucidia-min-btn:hover{color:#fff}
#lucidia-body{flex:1;padding:10px 12px;overflow-y:auto}
#lucidia-body p{color:#ccc;font-size:12px;margin:0 0 6px;line-height:1.4}
#lucidia-input-row{display:flex;padding:8px;border-top:1px solid #333;gap:6px}
#lucidia-input{flex:1;background:#111;border:1px solid #444;border-radius:6px;color:#fff;padding:6px 8px;font-size:12px;outline:none}
#lucidia-input:focus{border-color:#CC00AA}
#lucidia-send{background:#CC00AA;border:none;border-radius:6px;color:#fff;padding:6px 10px;cursor:pointer;font-size:12px}
</style>
<div id="lucidia-panel">
<div id="lucidia-header">
<div id="lucidia-dot"></div>
<span id="lucidia-label">Lucidia</span>
<button id="lucidia-min-btn" title="Minimize">&#x2212;</button>
</div>
<div id="lucidia-body">
<p>Your save is safe. I'll remember where you left off.</p>
<p style="color:#888;font-size:11px">Play on. I've got your back.</p>
</div>
<div id="lucidia-input-row">
<input id="lucidia-input" placeholder="Ask Lucidia..." />
<button id="lucidia-send">Send</button>
</div>
</div>
<script>
(function(){
  var panel=document.getElementById('lucidia-panel');
  var minBtn=document.getElementById('lucidia-min-btn');
  var header=document.getElementById('lucidia-header');
  var input=document.getElementById('lucidia-input');
  var sendBtn=document.getElementById('lucidia-send');
  if(localStorage.getItem('lucidia-minimized')==='true'){panel.classList.add('minimized')}
  minBtn.addEventListener('click',function(){panel.classList.add('minimized');localStorage.setItem('lucidia-minimized','true')});
  header.addEventListener('click',function(){if(panel.classList.contains('minimized')){panel.classList.remove('minimized');localStorage.setItem('lucidia-minimized','false')}});
  function sendMsg(){
    var msg=input.value.trim();if(!msg)return;
    fetch('https://roadtrip.blackroad.io/api/rooms/general/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({author:'visitor',content:msg})}).catch(function(){});
    var body=document.getElementById('lucidia-body');
    var p=document.createElement('p');p.style.color='#CC00AA';p.textContent='You: '+msg;body.appendChild(p);body.scrollTop=body.scrollHeight;
    input.value='';
  }
  sendBtn.addEventListener('click',sendMsg);
  input.addEventListener('keydown',function(e){if(e.key==='Enter')sendMsg()});
})();
</script>
</body>
</html>`;
