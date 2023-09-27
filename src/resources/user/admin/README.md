# Requests For Users API's For Admins 

### Registration Users
POST http://localhost:8000/api/admin/users/register-user

request:

*username: required
*fullname: required
*phoneNumber: required
*status: required
*password: required

types for status field:
- Спортсмен
- Родитель(Опекун)
- Тренер
- Клуб
- Федерация

*user = Headers.Authorization

```json
{
    "username": "username",
    "fullname": "Ivanov Ivan Ivanovich",
    "phoneNumber": "+79999999999",
    "status": "Спортсмен",
    "password": "123456789"
}
```

response: 

```json
{
    "data": "Пользователь успешно зарегистрирован!"
}
```

### Get all users
GET http://localhost:8000/api/admin/users/all

response: 

```json
[
    {
        "_id": "6513e40243824b9eac3a0bac",
        "username": "username",
        "fullname": "Ivanov Ivan Ivanovich",
        "phoneNumber": "+79999999999",
        "status": "Спортсмен",
        "roles": [
            "User",
            "SuperAdmin"
        ],
        "images": [],
        "createdAt": "2023-09-27T08:12:50.713Z",
        "updatedAt": "2023-09-27T08:30:53.836Z",
        "__v": 0,
        "belt": "красно-черный пояс",
        "city": "Санкт-Петербург",
        "dateBirth": "01.01.2000",
        "email": "user@gmail.com",
        "gip": "1 гып"
    },
    {
        "_id": "6513f529e085dcff6cd27ed1",
        "username": "username1",
        "fullname": "Ivanov Ivan Ivanovich",
        "phoneNumber": "+79999999991",
        "status": "Спортсмен",
        "roles": [
            "User"
        ],
        "images": [],
        "createdAt": "2023-09-27T09:26:01.053Z",
        "updatedAt": "2023-09-27T09:26:01.053Z",
        "__v": 0
    },
    {
        "_id": "6513f5fbaab1c9b6d54fbb83",
        "username": "username11",
        "fullname": "Ivanov Ivan Ivanovich",
        "phoneNumber": "+79999999993",
        "status": "Спортсмен",
        "roles": [
            "User"
        ],
        "images": [],
        "createdAt": "2023-09-27T09:29:31.481Z",
        "updatedAt": "2023-09-27T09:29:31.481Z",
        "__v": 0
    }
]
```

### Get user by ID
GET http://localhost:8000/api/admin/users/:user_id

request:

params:

*user_id: required

http://localhost:8000/api/admin/users/6513f5fbaab1c9b6d54fbb83

response: 

```json
{
    "_id": "6513f5fbaab1c9b6d54fbb83",
    "username": "username11",
    "fullname": "Ivanov Ivan Ivanovich",
    "phoneNumber": "+79999999993",
    "status": "Спортсмен",
    "roles": [
        "User"
    ],
    "images": [],
    "createdAt": "2023-09-27T09:29:31.481Z",
    "updatedAt": "2023-09-27T09:29:31.481Z",
    "__v": 0
}
```

### Search Users
POST http://localhost:8000/api/admin/users/searching/all

request:

```json
{
    "content": "79999999999"
}
```

*user = Headers.Authorization

response: 

```json
[
    {
        "_id": "6513e40243824b9eac3a0bac",
        "username": "username",
        "fullname": "Ivanov Ivan Ivanovich",
        "phoneNumber": "+79999999999",
        "status": "Спортсмен",
        "roles": [
            "User",
            "SuperAdmin"
        ],
        "images": [],
        "createdAt": "2023-09-27T08:12:50.713Z",
        "updatedAt": "2023-09-27T08:30:53.836Z",
        "__v": 0,
        "belt": "красно-черный пояс",
        "city": "Санкт-Петербург",
        "dateBirth": "01.01.2000",
        "email": "user@gmail.com",
        "gip": "1 гып"
    }
]
```

### Update Information For user by ID
PUT http://localhost:8000/api/admin/users/update/:user_id

request:

*username: required(optional for edit)
*fullname: required(optional for edit)
*phoneNumber: required(optional for edit)
*status: required(optional for edit)
*password: required(optional for edit)

Optional Data:

*email: string,
*dateBirth: string,
*gip: string,
*belt: string,
*city: string,

*statusChangeFile: any,

*user = Headers.Authorization

gip types for belt type:
- 10 гып === белый пояс
- 9 гып === бело-желтый пояс
- 8 гып === жеотый пояс
- 7 гып === желто-зеленый пояс
- 6 гып === зеленый пояс
- 5 гып === зелено-синий пояс
- 4 гып === синий пояс
- 3 гып === сине-красный пояс
- 2 гып === красный пояс
- 1 гып === красно-черный пояс
- 1 дан === черный пояс|1 дан
- 2 дан === черный пояс|2 дан
- 3 дан === черный пояс|3 дан
- 4 дан === черный пояс|4 дан
- 5 дан === черный пояс|5 дан
- 6 дан === черный пояс|6 дан
- 7 дан === черный пояс|7 дан
- 8 дан === черный пояс|8 дан
- 9 дан === черный пояс|9 дан

params:

*user_id: required

http://localhost:8000/api/admin/users/update/6513f5fbaab1c9b6d54fbb83

```json
{
    "username": "username888",
    "fullname": "Ivanov1 Ivan1 Ivanovich1",
    "phoneNumber": "+79999999998",
    "status": "Спортсмен",
    "password": "123456789",
    "email": "user@gmail.com",
    "dateBirth": "01.01.2000",
    "gip": "1 гып",
    "belt": "красно-черный пояс",
    "city": "Санкт-Петербург"
}
```

response: 

```json
{
    "_id": "6513f5fbaab1c9b6d54fbb83",
    "username": "username888",
    "fullname": "Ivanov1 Ivan1 Ivanovich1",
    "phoneNumber": "+79999999998",
    "status": "Спортсмен",
    "roles": [
        "User"
    ],
    "images": [],
    "createdAt": "2023-09-27T09:29:31.481Z",
    "updatedAt": "2023-09-27T09:35:47.390Z",
    "__v": 0,
    "belt": "красно-черный пояс",
    "city": "Санкт-Петербург",
    "dateBirth": "01.01.2000",
    "email": "user@gmail.com",
    "gip": "1 гып"
}
```

### Delete user by ID
DELETE http://localhost:8000/api/admin/users/:user_id

request:

*user = Headers.Authorization

params:

*user_id: required

http://localhost:8000/api/admin/users/64fbb2c5276e46234e7b9014

response: 

```json
"User with 6513f5fbaab1c9b6d54fbb83 Deleted"
``` 