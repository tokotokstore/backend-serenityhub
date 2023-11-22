# Backend for SerenityLink

> Capstone Project C523-PR086

Teknologi yang digunakan :
1. Express
2. Mongoose

## Cara pakai

### Register 
* URL : /register
* Method : POST
* Request Body:
  * name as string
  * email as string
  * password as string
* Response :
  {
    "status": "ok",
    "message": "register successfuly"
  }

### Login
* URL : /login
* Method : POST
* Request Body:
  * email as string
  * password as string
* Response: <p>{
    "status": "ok",
    "message": "logged in successfully",
    "user": {
        "name": "name",
        "email": "email@email.com",
        "role": "role",
        "customer_id": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiam9obiIsImVtYWlsIjoiam9obmRvZUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImN1c3RvbWVyX2lkIjozLCJpYXQiOjE3MDA2MzQxNDR9.sgoDeu8lNRm_SfoXbb7MkpMEn4ghG0g4Le0GFyN2bn8"
  }</p>
  
