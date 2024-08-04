# Birthday Tracking Application Backend

## Table of Contents

1. [Project Setup](#project-setup)
2. [Environment Variables](#environment-variables)
3. [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Birthdays](#birthdays)
4. [Example Requests](#example-requests)

---

## Project Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/egeoztass/birthday-tracker-backend.git
    cd birthday-tracker-backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up the database**:
    - Ensure you have PostgreSQL installed and running.
    - Create a database named `birthday_tracker`.

4. **Configure environment variables**:
    - Create a `.env` file in the root directory with the following content:
      ```plaintext
      DATABASE_HOST=localhost
      DATABASE_PORT=5432
      DATABASE_USER=your-db-username
      DATABASE_PASS=your-db-password
      DATABASE_NAME=birthday_tracker
      JWT_SECRET=your-secret-key
      ```

5. **Run database migrations**:
    ```bash
    npm run typeorm migration:run
    ```

6. **Start the application**:
    ```bash
    npm run start:dev
    ```

## Environment Variables

- `DATABASE_HOST`: Host of your PostgreSQL database.
- `DATABASE_PORT`: Port of your PostgreSQL database (default is 5432).
- `DATABASE_USER`: Username for your PostgreSQL database.
- `DATABASE_PASS`: Password for your PostgreSQL database.
- `DATABASE_NAME`: Name of your PostgreSQL database.
- `JWT_SECRET`: Secret key for signing JWT tokens.

## API Endpoints

### Authentication

- **Register**: `POST /auth/register`
    - Request Body:
      ```json
      {
        "email": "user@example.com",
        "password": "password",
        "roles": ["user"],
        "permissions": ["read", "write"]
      }
      ```
    - Response: `201 Created`
      ```json
      {
        "id": 1,
        "email": "user@example.com",
        "roles": ["user"],
        "permissions": ["read", "write"]
      }
      ```

- **Login**: `POST /auth/login`
    - Request Body:
      ```json
      {
        "email": "user@example.com",
        "password": "password"
      }
      ```
    - Response: `200 OK`
      ```json
      {
        "access_token": "your.jwt.token"
      }
      ```

### Birthdays

- **Get All Birthdays**: `GET /birthdays`
    - Headers: `Authorization: Bearer your.jwt.token`
    - Response: `200 OK`
      ```json
      [
        {
          "id": 1,
          "name": "John Doe",
          "date": "2023-12-15",
          "userId": 1
        }
      ]
      ```

- **Create Birthday**: `POST /birthdays`
    - Headers: `Authorization: Bearer your.jwt.token`
    - Request Body:
      ```json
      {
        "name": "John Doe",
        "date": "2023-12-15"
      }
      ```
    - Response: `201 Created`
      ```json
      {
        "id": 1,
        "name": "John Doe",
        "date": "2023-12-15",
        "userId": 1
      }
      ```

- **Update Birthday**: `PUT /birthdays/:id`
    - Headers: `Authorization: Bearer your.jwt.token`
    - Request Body:
      ```json
      {
        "name": "Jane Doe",
        "date": "2023-11-25"
      }
      ```
    - Response: `200 OK`
      ```json
      {
        "id": 1,
        "name": "Jane Doe",
        "date": "2023-11-25",
        "userId": 1
      }
      ```

- **Delete Birthday**: `DELETE /birthdays/:id`
    - Headers: `Authorization: Bearer your.jwt.token`
    - Response: `204 No Content`

## Example Requests

### Register a New User

```bash
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "email": "user@example.com",
  "password": "password",
  "roles": ["user"],
  "permissions": ["read", "write"]
}'
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "user@example.com",
  "password": "password"
}'
```

### Get All Birthdays

```bash
curl -X GET http://localhost:3000/birthdays \
-H "Authorization: Bearer your.jwt.token"
```

### Create a Birthday

```bash
curl -X POST http://localhost:3000/birthdays \
-H "Authorization: Bearer your.jwt.token" \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "date": "2023-12-15"
}'
```
### Update a Birthday

```bash
curl -X PUT http://localhost:3000/birthdays/1 \
-H "Authorization: Bearer your.jwt.token" \
-H "Content-Type: application/json" \
-d '{
  "name": "Jane Doe",
  "date": "2023-11-25"
}'
```

### Delete a Birthday

```bash
curl -X DELETE http://localhost:3000/birthdays/1 \
-H "Authorization: Bearer your.jwt.token"
```
