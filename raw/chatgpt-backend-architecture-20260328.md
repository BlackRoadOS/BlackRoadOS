# ChatGPT — Real Backend Architecture
**Date:** 2026-03-28
**Source:** ChatGPT (OpenAI)
**Context:** Full system architecture, database schema, event model, MVP plan, build order

---

## Core Principle

Lucidia is NOT the app. Lucidia is the ORCHESTRATION LAYER across the app.

## The Stack in One Sentence

**Frontend for presence. Backend for continuity. Event bus for coordination. Memory for persistence.**

---

## System Layers

### A. Frontend — browser OS shell, draggable windows, Lucidia panel
### B. API/Gateway — auth, routing, project CRUD, model/tool requests
### C. Orchestration — intent parsing, task decomposition, agent selection, retries
### D. Memory — user/project/session/tool state, resumable workflows
### E. Event Bus — window/project/agent/task/asset/memory events (NATS)
### F. Execution — local tools, agent runtimes, model backends, generators

---

## Backend Flow

1. User intent arrives → "Build me a game landing page and matching music"
2. Lucidia interprets → project type, required tools, required agents, memory lookup
3. Orchestration creates a run → run_id, tasks, dependencies, agents, outputs
4. Event bus distributes → `project.context.loaded`, `window.canvas.open`, `agent.design.start`
5. Tools return outputs → normalized assets stored
6. Memory commits continuity → what happened, what changed, what remains

---

## v1 Core Services (7)

1. **Auth** — sign in, workspaces, sessions, permissions
2. **Project** — CRUD, metadata, types, recent
3. **Memory** — project memory, preferences, summaries, checkpoints
4. **Orchestrator** — intent→task graph, agent selection, retries, dependencies
5. **Event bus** — cross-service comms, live UI, async execution
6. **Tool execution** — code, media gen, docs, assets, connectors
7. **Lucidia** — system responses, state awareness, continuity framing

---

## Database Schema

### Core Tables
- **users** (id, email, name, preferences)
- **workspaces** (id, owner_id, name)
- **projects** (id, workspace_id, title, type, status, summary, last_opened_at)
- **project_context** (id, project_id, current_state, active_tools, active_assets, open_windows)
- **memory_entries** (id, scope, scope_id, content, importance, tags, created_at)
- **runs** (id, project_id, user_id, intent, status, started_at, completed_at)
- **tasks** (id, run_id, parent_task_id, assigned_agent, tool, input, output, status)
- **events** (id, run_id, type, payload, timestamp)
- **assets** (id, project_id, type, path, metadata)

"That is how 'Still here. Want to keep going?' becomes real instead of just copy."

---

## Event Model

- `intent.received`, `memory.loaded`, `project.created`
- `window.opened`, `agent.assigned`, `task.started`
- `task.completed`, `asset.generated`, `project.checkpoint.saved`

---

## Lucidia's Real Job

Pipeline: **User intent → Orchestrator → Tools/Agents → Memory → Lucidia summarizes and guides**

NOT: User → chatbot → mystery blob

---

## MVP (4 Surfaces)

1. **Lucidia panel** — always visible, commands + continuity
2. **Project desktop** — windows (editor, canvas, files, preview)
3. **Activity rail** — active agents, running tasks, outputs
4. **Memory/continue screen** — recent projects, last state, "nothing was lost"

---

## What to Fake First

3-5 real agent roles, clear task routing, visible activity, resumable state, beautiful narration. NOT 1,000 real agents.

---

## Build Order

- **Phase 1**: landing page, auth, project model, Lucidia panel, simple memory
- **Phase 2**: orchestrator, websocket events, activity rail, basic agent/task engine
- **Phase 3**: draggable windows, 3 real tools, asset gen, resumable runs
- **Phase 4**: packs, connectors, roadbridge sync, local/edge execution

---

## The Moat

Not "we have AI." The moat is: continuity architecture + orchestration layer + cross-tool state + event-driven system memory + browser OS as one environment.

## Shortest Tech Pitch

**"BlackRoad OS is an event-driven browser operating system where Lucidia orchestrates tools, agents, and memory so work can continue instead of restarting."**

---

*Raw ChatGPT output preserved verbatim. Filed 2026-03-28.*
