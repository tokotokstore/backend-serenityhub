# Backend for SerenityLink

> Capstone Project C523-PR086

Teknologi yang digunakan :

1. Express
2. Mongoose

## Cara pakai

1. npm install
2. settings databas in connections.js

## API

### Register

- URL : /register
- Method : POST
- Request Body:
  - name as string
  - email as string
  - password as string
- Response :

```json
{
  "status": "ok",
  "message": "register successfuly"
}
```

### Login

- URL : /login
- Method : POST
- Request Body:
  - email as string
  - password as string
- Response:

```json
{
  "status": "ok",
  "message": "logged in successfully",
  "user": {
    "name": "name",
    "email": "email@email.com",
    "role": "role",
    "customer_id": 1
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiam9obiIsImVtYWlsIjoiam9obmRvZUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImN1c3RvbWVyX2lkIjozLCJpYXQiOjE3MDA2MzQxNDR9.sgoDeu8lNRm_SfoXbb7MkpMEn4ghG0g4Le0GFyN2bn8"
}
```

### Logout

- URL : /logout
- Method : POST
- Request Header:
  - Authorization : 'Bearer {token}'
- Response:

```json
{
  "error": 0,
  "message": "Logout successfully"
}
```

- Fail Response:

```json
{
  "error": 1,
  "message": "No user found"
}
```

### Comment

- URL : /comment/:id
- Method : POST
- Request Header:
  - Authorization : 'Bearer {token}'
- Request body:
  - message as string
- Response:

```json
{
  "status": "ok",
  "message": "comment added"
}
```

- Fail Response:

```json
{
  "error": 1,
  "message": "Comment validation failed: message: pesan harus ada",
  "fields": {
    "message": {
      "name": "ValidatorError",
      "message": "pesan harus ada",
      "properties": {
        "message": "pesan harus ada",
        "type": "required",
        "path": "message"
      },
      "kind": "required",
      "path": "message"
    }
  }
}
```
