# Requests For Users API's For Admins 

### Registration Users For Agent
POST http://213.189.201.213:8000/api/admin/users/register-agent

request:

*name: required
*lastname: required
*surname: required
*dateBirth: required
*speciality: required
*phoneNumber: required
*city: required
*password: required
*comment: required

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
    "password": "required",
    "comment": "required"
}
```

response: 

```json
{
    "data": "Агент успешно зарегистрирован!"
}
```

### Get all users
GET http://213.189.201.213:8000/api/admin/users/all

response: 

```json
[
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
            "http://213.189.201.213:8000/files/documents/attachments/3bf96986-b748-4f1c-86c2-3105762d774b.jpeg"
        ],
        "createdAt": "2023-09-08T23:48:21.688Z",
        "updatedAt": "2023-09-09T00:25:23.483Z",
        "__v": 0
    },
    {
        "_id": "64fc7b1c91d5088ee1346200",
        "name": "qwerty",
        "lastname": "qwerty2",
        "surname": "qwerty3",
        "dateBirth": "22.22.2222",
        "speciality": "Матрос вахтенный",
        "phoneNumber": "+71112223344",
        "city": "qwerty",
        "balance": 0,
        "roles": [
            "User"
        ],
        "documents": [
            "http://213.189.201.213:8000/files/documents/attachments/86379407-9e22-4355-a164-d56632dfacfb.jpg",
            "http://213.189.201.213:8000/files/documents/attachments/2e416d18-1dd5-4007-ba2d-523a6657d92e.jpg"
        ],
        "createdAt": "2023-09-09T14:03:08.301Z",
        "updatedAt": "2023-09-09T14:03:08.301Z",
        "__v": 0
    },
    {
        "_id": "64fc7bdb91d5088ee1346204",
        "name": "qwerty",
        "lastname": "qwerty2",
        "surname": "qwerty3",
        "dateBirth": "22.22.2222",
        "speciality": "Матрос вахтенный",
        "phoneNumber": "+79992221133",
        "city": "qerty",
        "balance": 0,
        "roles": [
            "User"
        ],
        "documents": [
            "http://213.189.201.213:8000/files/documents/attachments/7d601fcc-81fe-40ea-bdc7-439ecad0bca4.jpg",
            "http://213.189.201.213:8000/files/documents/attachments/7d26e163-f319-40a7-9bec-57e75fdacb23.jpg"
        ],
        "createdAt": "2023-09-09T14:06:19.833Z",
        "updatedAt": "2023-09-09T14:06:19.833Z",
        "__v": 0
    },
    "..."
]
```

### Get user by ID
GET http://213.189.201.213:8000/api/admin/users/:user_id

request:

params:

*user_id: required

http://213.189.201.213:8000/api/admin/users/64fbb2c5276e46234e7b9014

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
        "http://213.189.201.213:8000/files/documents/attachments/3bf96986-b748-4f1c-86c2-3105762d774b.jpeg"
    ],
    "createdAt": "2023-09-08T23:48:21.688Z",
    "updatedAt": "2023-09-09T00:25:23.483Z",
    "__v": 0
}
```

### Search Users
POST http://213.189.201.213:8000/api/admin/users/searching/all

request:

```json
{
    "content": "79999999991"
}
```

*user = Headers.Authorization

response: 

```json
[
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
            "http://213.189.201.213:8000/files/documents/attachments/3bf96986-b748-4f1c-86c2-3105762d774b.jpeg"
        ],
        "createdAt": "2023-09-08T23:48:21.688Z",
        "updatedAt": "2023-09-09T00:25:23.483Z",
        "__v": 0
    }
]
```

### Update Information For user by ID
PUT http://213.189.201.213:8000/api/admin/users/update/:user_id

request:

*name: required
*lastname: required
*surname: required
*dateBirth: required
*speciality: required
*phoneNumber: required
*city: required

*user = Headers.Authorization

params:

*user_id: required

http://213.189.201.213:8000/api/admin/users/update/64fbb2c5276e46234e7b9014

```json
{
    "name": "Иван",
    "lastname": "Иванов",
    "surname": "Иванович",
    "dateBirth": "01.01.2000",
    "speciality": "Матрос",
    "phoneNumber": "+79999999991",
    "city": "Находка",
    "comment": "Пароль: 123456781",
}
```

response: 

```json
{
    "_id": "64fbb2c5276e46234e7b9014",
    "name": "Иван",
    "lastname": "Иванов",
    "surname": "Иванович",
    "dateBirth": "01.01.2000",
    "speciality": "Матрос",
    "phoneNumber": "+79999999991",
    "city": "Находка",
    "balance": 0,
    "roles": [
        "User"
    ],
    "documents": [
        "http://213.189.201.213:8000/files/documents/attachments/3bf96986-b748-4f1c-86c2-3105762d774b.jpeg"
    ],
    "createdAt": "2023-09-08T23:48:21.688Z",
    "updatedAt": "2023-09-14T11:16:51.750Z",
    "__v": 0,
    "comment": "Пароль: 123456789"
}
```

### Delete user by ID
DELETE http://213.189.201.213:8000/api/admin/users/:user_id

request:

*user = Headers.Authorization

params:

*user_id: required

http://213.189.201.213:8000/api/admin/users/64fbb2c5276e46234e7b9014

response: 

```json
"User with 64fbb2c5276e46234e7b9014 Deleted"
``` 