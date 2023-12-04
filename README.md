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

#### User Register

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

#### Officer or Admin register

- URL : /officer/register
- Method : POST
- Request Body:
  - name as string
  - email as string
  - password as string
- Response: same User login

### Login

#### User Login

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

#### Change Password

- URL : /changepassword
- Method : PUT
- Request Header:
  - Authorization : 'Bearer {token}'
- Request body"
  - oldPassword as string
  - newPassword as string

### Report

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
- parameter:
  - q = search
  - l =limit
  - skip = skip
  - example : /report?q=banjir&limit=20
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
    "_id": "65635bc140dbaa8363504d01",
    "title": "Pohon rubuh",
    "description": "ada pohon rubuh dipinggir jalan",
    "address": "jl. kemerdekaan 12",
    "latitude": "2131232131",
    "longitude": "12312312321",
    "status": "accepted",
    "imageReport": ["foto1.png", "adasda.jpeg"],
    "category": "Pohon",
    "reporter": {
      "_id": "6561f6e523a7d6759c1fc30a",
      "name": "john"
    },
    "comment": [],
    "createdAt": "2023-11-26T14:52:49.011Z",
    "updatedAt": "2023-11-26T14:52:49.011Z"
  }
}
```

#### Send Report to Unit Works

- URL : /report/idreport
- Method : PUT
- Request Header:
  - Authorization : 'Bearer {token}'
- Request body:
  - unitWorks as string
- Request Level user : officer
- Response:

```json
{
  "status": "oke",
  "message": "unit work has a job"
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
- Response:

```json
{
  "status": "ok",
  "message": "image deleted successfully"
}
```

### Get Image

- URL : /public/image/:name
- Method : GET
- Respone : Showing images

### Download File

- URL : /public/download/:name
- Method : GET
- Respone : Download start

### Category

#### Get Category

- URL : /category
- Method : GET
- Response:

```json
{
  "status": "ok",
  "data": [
    {
      "name": "pendidikan",
      "image": "\"pendidikan.png\"",
      "createdAt": "2023-11-26T15:11:18.199Z",
      "updatedAt": "2023-11-26T15:11:18.199Z",
      "category_id": 1
    },
    {
      "name": "pendidikan",
      "image": "\"pendidikan.png\"",
      "createdAt": "2023-11-26T15:12:09.686Z",
      "updatedAt": "2023-11-26T15:12:09.686Z",
      "category_id": 2
    }
  ]
}
```

#### Add Category

- URL : /officer/category
- Method : POST
- Request Header:
  - Authorization : 'Bearer {token}'
- Request Body:
  - name as string
  - image as string
- Authorization : Use account with role : admin, or superadmin
- Response:

```json
{
  "status": "ok",
  "message": "add category sucessuflly",
  "categoryId": "656366ec276d0b5b2f898648"
}
```

#### Delete Category

- URL : /officer/category/:id
- Method : DELETE
- Request Header:
  - Authorization : 'Bearer {token}'
- Authorization : Use account with role : officer, admin, or superadmin
- Response:

```json
{
  "status": "ok",
  "message": "delete category successfully"
}
```

### Unit Work

#### Add Unit work

- URL : /officer/uniworkk
- Method : POST
- Request Header:
  - Authorization : 'Bearer {token}'
  - level : officer
- Request Body:
  - name as string
  - detail as string
  - image as string
  -
- Response:

```json
{
  "status": "ok",
  "message": "report sent successfully",
  "idReport": "65661ce311d235cd41b166f1"
}
```

- Response Fail:

```json
{
  "error": 1,
  "message": "report not found"
}
```

- URL : /officer/unitwork/:idReport
- Method : POST
- Request Header:
  - Authorization : 'Bearer {token}'
  - level : officer
- Request Body:
  - message as string
  - imageReport as array , example : imageReport : ['laporan1.png', 'laporan2.jpeg']
- Response:

```json
{
  "status": "ok",
  "message": "add category sucessuflly",
  "categoryId": "6566c7dad0b5a5beb0a1f71e"
}
```

### Get all Unit Work

- URL : /officer/unitwork
- Method : GET
- Request Header:
  - Authorization : 'Bearer {token}'
  - level : officer
- Response:

```json
{
  "status": "ok",
  "data": [
    {
      "_id": "6566c7bad0b5a5beb0a1f71a",
      "name": "Dinas Lingkungan Hidup",
      "detail": "",
      "image": "dlh.png",
      "people": null,
      "createdAt": "2023-11-29T05:10:18.821Z",
      "updatedAt": "2023-11-29T05:10:18.821Z",
      "__v": 0
    },
    {
      "_id": "6566c7dad0b5a5beb0a1f71e",
      "name": "Dinas Lingkungan Hidup",
      "detail": "",
      "image": "dlh.png",
      "people": null,
      "createdAt": "2023-11-29T05:10:50.758Z",
      "updatedAt": "2023-11-29T05:10:50.758Z",
      "__v": 0
    }
  ]
}
```

#### Delete Unit work

- URL : /officer/unitwork/:id
- Method : DELETE
- Request Header:
  - Authorization : 'Bearer {token}'
- Response:

```json
{
  "status": "ok",
  "message": "delete unit work successfully"
}
```
