# Requests For Users API's

### Registration Users
POST http://213.189.201.213:9000/api/users/register

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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxM2UyZWViODhkN2RhYzBkMWNkZWIxIiwicm9sZXMiOltdfSwiaWF0IjoxNjk1ODAyMDk0LCJleHAiOjE2OTU4ODg0OTR9.X2RLgiJkZRpyC_mMhWXSQwkxqqfOi5YHC7jz-cV1Czk"
}
```

### Login Users
POST http://213.189.201.213:9000/api/users/login

request:

*username: required
*password: required

*user = Headers.Authorization

```json
{
    "username": "username",
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
PUT http://213.189.201.213:9000/api/users/update-my-profile

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

```json
{
    "username": "username",
    "fullname": "Ivanov Ivan Ivanovich",
    "phoneNumber": "+79999999999",
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
    "_id": "6513e40243824b9eac3a0bac",
    "username": "username",
    "fullname": "Ivanov Ivan Ivanovich",
    "phoneNumber": "+79999999999",
    "status": "Спортсмен",
    "roles": [
        "User"
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
```

### Get User Data (For Authorized User)
GET http://213.189.201.213:9000/api/users

request:

*user = Headers.Authorization

response: 

```json
{
    "data": {
        "_id": "6513e40243824b9eac3a0bac",
        "username": "username",
        "fullname": "Ivanov Ivan Ivanovich",
        "phoneNumber": "+79999999999",
        "status": "Спортсмен",
        "roles": [
            "User"
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
}
```
