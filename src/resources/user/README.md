# Requests For Users API's

### Registration Users
POST http://213.189.201.213:8000/api/users/register

request:

*name: required
*lastname: required
*surname: required
*dateBirth: required
*speciality: required
*phoneNumber: required
*city: required
*documents: Form-Data Request
*password: required

*user = Headers.Authorization

```json
{
    "name": "Иван",
    "lastname": "Иванов",
    "surname": "Иванович",
    "dateBirth": "01.01.2000",
    "speciality": "Матрос",
    "phoneNumber": "+79999999999",
    "city": "Находка",
    "documents": "Form-Data Request",
    "password": "required",
}
```

response: 

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmYmIyYzUyNzZlNDYyMzRlN2I5MDE0Iiwicm9sZXMiOlsiVXNlciJdfSwiaWF0IjoxNjk0MjE4MTA4LCJleHAiOjE2OTQzMDQ1MDh9.Pvzn_aPyCKcj2e4xFc0naVPSZSK-f99t_QpXyLmGDp0"
}
```

### Login Users
POST http://213.189.201.213:8000/api/users/login

request:

*phoneNumber: required
*password: required

*user = Headers.Authorization

```json
{
    "phoneNumber": "+799999999999",
    "password": "123456789",
}
```

response: 

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmYmIyYzUyNzZlNDYyMzRlN2I5MDE0Iiwicm9sZXMiOlsiVXNlciJdfSwiaWF0IjoxNjk0MjE4MTA4LCJleHAiOjE2OTQzMDQ1MDh9.Pvzn_aPyCKcj2e4xFc0naVPSZSK-f99t_QpXyLmGDp0"
}
```

### Update My Profile (For Authorized User)
PUT http://213.189.201.213:8000/api/users/update-my-profile

request:

*name: required
*lastname: required
*surname: required
*dateBirth: required
*speciality: required
*phoneNumber: required
*city: required
*documentAttachments: Form-Data Request

*user = Headers.Authorization

```json
{
    "name": "Иван",
    "lastname": "Иванов",
    "surname": "Иванович",
    "dateBirth": "01.01.2000",
    "speciality": "Матрос",
    "phoneNumber": "+79999999999",
    "city": "Находка",
    "documents": "Form-Data request",
}
```

response: 

```json
{
    "_id": "64fbb2c5276e46234e7b9014",
    "name": "Иван1",
    "lastname": "Иванов1",
    "surname": "Иванович1",
    "dateBirth": "01.01.2001",
    "speciality": "Матрос1",
    "phoneNumber": "+79999999991",
    "city": "Находка1",
    "balance": 0,
    "roles": [
        "User"
    ],
    "documents": [
        "http://213.189.201.213:8000/files/documents/attachments/406e99e4-d7f1-4647-b11d-3cda66ed58f0.jpeg"
    ],
    "createdAt": "2023-09-08T23:48:21.688Z",
    "updatedAt": "2023-09-09T00:12:03.972Z",
    "__v": 0
}
```

### Get User Data (For Authorized User)
GET http://213.189.201.213:8000/api/users

request:

*user = Headers.Authorization

response: 

```json
{
    "data": {
        "_id": "64fbb2c5276e46234e7b9014",
        "name": "Иван",
        "lastname": "Иванов",
        "surname": "Иванович",
        "dateBirth": "01.01.2000",
        "speciality": "Матрос",
        "phoneNumber": "+79999999999",
        "city": "Находка",
        "balance": 0,
        "roles": [
            "User"
        ],
        "documents": [
            "http://213.189.201.213:8000/files/documents/attachments/31687623-0327-44f9-8c5a-110b484106fd.jpeg",
            "http://213.189.201.213:8000/files/documents/attachments/cbfe46b5-7c40-4ebd-bee5-a9a244de9725.jpeg",
            "http://213.189.201.213:8000/files/documents/attachments/28bb27ef-fb26-47a1-9f80-42782ef4e5fc.jpeg",
            "http://213.189.201.213:8000/files/documents/attachments/b5349ba2-226c-4002-864a-803b03a5a197.jpg",
            "http://213.189.201.213:8000/files/documents/attachments/3aba5d44-3dec-4721-a032-090d12cc298f.jpeg",
            "http://213.189.201.213:8000/files/documents/attachments/d08b3d55-1386-4a9b-a5b9-7dc3c98e77b0.jpg",
            "http://213.189.201.213:8000/files/documents/attachments/40b608ae-e8af-4f29-8e26-3cabe319356a.jpg",
            "http://213.189.201.213:8000/files/documents/attachments/c4303e7f-a32f-4c4d-a1de-72ce095fa057.jpg"
        ],
        "createdAt": "2023-09-08T23:48:21.688Z",
        "updatedAt": "2023-09-08T23:48:21.688Z",
        "__v": 0
    }
}
```
