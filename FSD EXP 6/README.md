# FSD Experiment 6: Student Task Manager

A React and Spring Boot task manager demonstrating scalable read APIs, pagination and sorting, Spring caching, a `JOIN FETCH` query to avoid N+1 reads, and a native SQL query.

## Requirements

- Java 25
- Maven 3.6.3 or later
- Node.js 20.19+ or 22.12+

## Run the application

Start the backend in one terminal:

```shell
cd backend
mvn spring-boot:run
```

The API is available at `http://localhost:8080`.

Start the frontend in a second terminal:

```shell
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`). The frontend uses `http://localhost:8080/api/tasks` by default. To use another backend URL, copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_URL`.

## API examples

- `GET /api/tasks?page=0&size=5&sort=id,desc` — paginated tasks
- `GET /api/tasks/with-comments` — cached tasks with comments
- `GET /api/tasks/top` — five newest tasks via native SQL
- `POST /api/tasks` — create a task with a JSON body such as `{"title":"Review pagination","completed":false}`
- `PUT /api/tasks/{id}/toggle` — toggle completion
- `DELETE /api/tasks/{id}` — delete a task

The H2 database is in memory and resets when the backend stops. The H2 console is at `http://localhost:8080/h2-console` (JDBC URL `jdbc:h2:mem:testdb`, username `sa`, blank password).

## Project files

- `backend/` — Spring Boot REST API, JPA entities, repository, service, and H2 configuration
- `frontend/` — React + Vite user interface
- `INSTRUCTIONS.md` — experiment setup and topics covered
- `explanation.md` — detailed explanation of the implementation
- `INSTRUCTIONS.pdf`, `explanation.pdf` — provided experiment documents

## Frontend checks

```shell
cd frontend
npm run lint
npm run build
```
