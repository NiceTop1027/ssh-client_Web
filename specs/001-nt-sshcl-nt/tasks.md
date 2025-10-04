# Tasks: NT-SSHCL Site Structure

**Input**: Design documents from `/specs/001-nt-sshcl-nt/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Web app**: `backend/` and `frontend/` directories at the project root.

## Phase 3.1: Setup
- [ ] T001 Create project structure: `mkdir -p frontend backend`
- [ ] T002 [P] Initialize Next.js project in `frontend`: `npx create-next-app@latest frontend`
- [ ] T003 [P] Initialize Node.js project in `backend`: `cd backend && npm init -y`
- [ ] T004 [P] Install frontend dependencies in `frontend`: `npm install shadcn-ui socket.io-client`
- [ ] T005 [P] Install backend dependencies in `backend`: `npm install express socket.io node-ssh`
- [ ] T006 [P] Configure linting and formatting for `frontend` (ESLint, Prettier).
- [ ] T007 [P] Configure linting and formatting for `backend` (ESLint, Prettier).

## Phase 3.2: Backend (API and SSH)
- [ ] T008 Create an Express server in `backend/server.js`.
- [ ] T009 Set up a Socket.io connection in `backend/server.js` to handle SSH events.
- [ ] T010 Implement SSH connection logic in `backend/lib/ssh.js` using `node-ssh`.
- [ ] T011 Create API endpoints for authentication in `backend/routes/auth.js`.
- [ ] T012 [P] Write unit tests for the SSH connection logic in `backend/lib/ssh.test.js`.
- [ ] T013 [P] Write unit tests for the authentication logic in `backend/routes/auth.test.js`.

## Phase 3.3: Frontend (UI and Components)
- [ ] T014 [P] Create the Header component in `frontend/components/ui/header.tsx`.
- [ ] T015 [P] Create the Footer component in `frontend/components/ui/footer.tsx`.
- [ ] T016 Create the main layout in `frontend/app/layout.tsx`.
- [ ] T017 Create the Home page in `frontend/app/page.tsx`.
- [ ] T018 Create the SSH Connection page in `frontend/app/connect/page.tsx`.
- [ ] T019 Create the Details page in `frontend/app/details/page.tsx`.
- [ ] T020 Create a reusable Terminal component in `frontend/components/ui/terminal.tsx`.

## Phase 3.4: Integration and Testing
- [ ] T021 Connect the frontend to the backend using `socket.io-client` in `frontend/lib/socket.ts`.
- [ ] T022 Integrate the Terminal component into the SSH Connection page `frontend/app/connect/page.tsx`.
- [ ] T023 Implement the authentication flow between frontend and backend.
- [ ] T024 [P] Write an end-to-end test for the SSH connection flow.
- [ ] T025 [P] Write an end-to-end test for the authentication flow.

## Phase 3.5: Polish
- [ ] T026 Review and refine the UI/UX of all pages.
- [ ] T027 Add comprehensive documentation to `README.md`.
- [ ] T028 Perform a security audit of the backend, especially the SSH handling logic.

## Dependencies
- T002, T003 block T004, T005.
- T010 blocks T012.
- T011 blocks T013.
- T014, T015 block T016.
- T020 blocks T022.
- Backend (Phase 3.2) and Frontend (Phase 3.3) can be developed in parallel.
- Integration (Phase 3.4) depends on both Backend and Frontend completion.

## Parallel Example
```
# Launch T002, T003, T006, T007 together:
Task: "Initialize Next.js project in frontend: npx create-next-app@latest frontend"
Task: "Initialize Node.js project in backend: cd backend && npm init -y"
Task: "Configure linting and formatting for frontend (ESLint, Prettier)."
Task: "Configure linting and formatting for backend (ESLint, Prettier)."

# Launch T012, T013, T014, T015 together:
Task: "Write unit tests for the SSH connection logic in backend/lib/ssh.test.js."
Task: "Write unit tests for the authentication logic in backend/routes/auth.test.js."
Task: "Create the Header component in frontend/components/ui/header.tsx."
Task: "Create the Footer component in frontend/components/ui/footer.tsx."
```