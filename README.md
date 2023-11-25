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
#### Buat Laporan
- URL : /report
- Method : POST
- Request Header:
  - Authorization : 'Bearer {token}'
- Request Body  :
  - title as string
  - description as string
  - address as string
  - longitude as string
  - latitude as string
- Response:

```json
{
    "status": "ok",
    "message": "Report berhasil dibuat",
    "data": "655e0f1cd6070a1f3e8d90c3"
}
```
#### Mengambil Semua Laporan
- URL : /report
- Method : GET
- Response:

```json
{
  "status": "ok",
  "data": [
    {
      "status": "accepted",
      "imageReport": [],
      "_id": "655de8a5739a37314d7781f0",
      "judul": "pohon rubuh",
      "description": "terjadi pohon rubuh"
    },
    {
      "_id": "655df6b6e876881d293b0bea",
      "title": "Banyak sampah",
      "description": "Sampah menumpuk di perumahan ABC",
      "status": "accepted",
      "imageReport": [],
      "user": "655dd130af1f0cfe7cdb02d1",
      "__v": 0
    },
    {
      "_id": "655df76ec5dedaff680e80b5",
      "title": "Banyak sampah",
      "description": "Sampah menumpuk di perumahan ABC",
      "status": "accepted",
      "imageReport": [],
      "user": "655dd130af1f0cfe7cdb02d1",
      "__v": 0
    }
  ]
}
```
#### Detail Laporan
- URL : /report/idreport
- Method : GET
Request Header:
  - Authorization : 'Bearer {token}'
- Response:

```json
{
  "status": "ok",
  "data": [
    {
      "status": "accepted",
      "imageReport": [],
      "_id": "655de8a5739a37314d7781f0",
      "judul": "pohon rubuh",
      "description": "terjadi pohon rubuh"
    },
    {
      "_id": "655df6b6e876881d293b0bea",
      "title": "Banyak sampah",
      "description": "Sampah menumpuk di perumahan ABC",
      "status": "accepted",
      "imageReport": [],
      "user": "655dd130af1f0cfe7cdb02d1",
      "__v": 0
    },
    {
      "_id": "655df76ec5dedaff680e80b5",
      "title": "Banyak sampah",
      "description": "Sampah menumpuk di perumahan ABC",
      "status": "accepted",
      "imageReport": [],
      "user": "655dd130af1f0cfe7cdb02d1",
      "__v": 0
    }
  ]
}
```

### Comment

#### Tambah Komentar
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
