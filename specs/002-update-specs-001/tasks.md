# Tasks: SSH Connection Page Improvement and Termius Style Integration

**Input**: Design documents from `/specs/002-update-specs-001/`

## Phase 3.1: Database
- [ ] T001: **[DB]** Add `ssh_keys` table to the database with columns for `id`, `name`, `public_key`, `private_key` (encrypted), and `user_id`.
- [ ] T002: **[DB]** Add `server_groups` table to the database with columns for `id`, `name`, and `user_id`.
- [ ] T003: **[DB]** Create a join table `server_group_connections` to link `server_groups` and `ssh_connections`.

## Phase 3.2: Backend
- [ ] T004: **[API]** Create API endpoints for SSH key management (`/api/keys`): `GET`, `POST`, `DELETE`.
- [ ] T005: **[API]** Implement encryption/decryption logic for SSH keys.
- [ ] T006: **[API]** Create API endpoints for server group management (`/api/groups`): `GET`, `POST`, `PUT`, `DELETE`.
- [ ] T007: **[API]** Update the `SSHConnection` class to use SSH keys from the database.

## Phase 3.3: Frontend
- [ ] T008: **[UI]** Implement the new Termius-style dark theme across the application.
- [ ] T009: **[UI]** Create a new component for managing SSH keys (add, delete, copy).
- [ ] T010: **[UI]** Create a new component for managing server groups (create, delete, update).
- [ ] T011: **[UI]** Implement a tabbed interface for switching between server connections using `react-tabs`.
- [ ] T012: **[UI]** Create a component to display recent connections with timestamps and server info.
- [ ] T013: **[UI]** Implement UI elements to display the connection status (connecting, success, failure).
- [ ] T014: **[UI]** Update the details page with information about the new features.
- [ ] T015: **[UI]** Implement responsive design for all new components.

## Phase 3.4: Integration
- [ ] T016: **[Integration]** Connect the SSH key management UI to the backend API.
- [ ] T017: **[Integration]** Connect the server group management UI to the backend API.
- [ ] T018: **[Integration]** Integrate the new connection flow with SSH key selection.

## Phase 3.5: Testing
- [ ] T019: **[Test]** Write unit tests for the new backend API endpoints.
- [ ] T020: **[Test]** Write unit tests for the new frontend components.
- [ ] T021: **[Test]** Write end-to-end tests for the new features.
