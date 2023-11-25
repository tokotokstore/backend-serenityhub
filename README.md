# Backend for SerenityLink

> Capstone Project C523-PR086

Teknologi yang digunakan :

1. Express
2. Mongoose

## Cara install

1. masukkan file .env di root folder
2. npm install
3. npm run dev
   > server berjalan di port 5500, pastikan port tidak terpakai. Port bisa diganti di index.js

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

- Response Fail:

```json
{
  "error": 1,
  "message": "No user found"
}
```

### Report

> fitur masih sederhana,

#### Add Report

- URL : /report
- Method : POST
- Request Header:
  - Authorization : 'Bearer {token}'
- Request Body :
  - title as string
  - description as string
  - address as string
  - longitude as string
  - latitude as string
  - > nama file image didapatkan setelah upload POST /upload/image
  - imageReport as array, ex: imageReport: ['image1.png', 'image2.png']
- Response:

```json
{
  "status": "ok",
  "message": "report sent successfully",
  "idReport": "656257fbf7b002c7f1d94882"
}
```

#### Get All Report

- URL : /report
- Method : GET
- Response:

```json
{
  "status": "ok",
  "count": 2,
  "data": [
    {
      "_id": "6562532edbb6d68ff78cfac1",
      "title": "asdas",
      "description": "sdasdas",
      "status": "accepted",
      "imageReport": ["aaaa.png, adasda.jpeg"]
    },
    {
      "_id": "6562536e8e7fe4b62348f2ca",
      "title": "asdas",
      "description": "sdasdas",
      "status": "accepted",
      "imageReport": ["aaaa.png, adasda.jpeg"]
    }
  ]
}
```

#### Detail Report

- URL : /report/idreport
- Method : GET
  Request Header:
  - Authorization : 'Bearer {token}'
- Response:

```json
{
  "status": "ok",
  "data": {
    "_id": "6562540261b8dd6a5b1a33c6",
    "title": "asdas",
    "description": "sdasdas",
    "address": "asdhiadiahsdas",
    "latitude": "2131232131",
    "longitude": "12312312321",
    "status": "accepted",
    "imageReport": ["aaaa.png", "adasda.jpeg"],
    "reporter": {
      "_id": "6561f6e523a7d6759c1fc30a",
      "name": "john"
    },
    "comment": []
  }
}
```

### Comment

#### Add Comment

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
  "message": "comment added",
  "idComment": "656260b7b519a070bd0f7589"
}
```

- Response Fail:

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

#### Delete Comment

- URL : /comment/:id
- Method : DELETE
- Request Header:
  - Authorization : 'Bearer {token}'
- Response :

```json
{
  "status": "ok",
  "message": "comment successfully deleted"
}
```

### Upload Image

- URL : /upload/image
- Method : POST
- Request Header:
  - Authorization : 'Bearer {token}'
- Request file:
  - image as object
  - In postman menu: body->form-data and key : image type file
- Response:

```json
{
  "status": "ok",
  "message": "upload image success",
  "image": "de8cf697c6262189568b42e28d264889.png"
}
```

### Delete image

- URL : /delete/image/:namefile
- Method : DELETE
- Request Header:
  - Authorization : 'Bearer {token}'
- Request file:
  - image as object
  - In postman menu: body->form-data and key : image type file
- Response:

```json
{
  "status": "ok",
  "message": "image deleted successfully"
}
```

### Get Image

- URL : /public/:name
- Method : GET
- Respone : Showing images

### Download File

- URL : /public/download/:name
- Method : GET
- Respone : Download start
