# Requests For Competitions API's For Admins 

### Create a New Competitions
POST http://213.189.201.213:9000/api/admin/competitions/create-competitions

request:

// Required Data
*name: required
*dateFrom: required
*dateTo: required

// Additional Data
*comment: optional

*user = Headers.Authorization


```json
{
    // Required Data
    "name": "Новые Соревнования",
    "dateFrom": "2023-11-04T14:55:09.835+00:00",
    "dateTo": "2023-11-05T14:55:09.835+00:00",

    // Additional Data
    "comment": "Комментарий для Новых Соревнований"
}
```

response: 

```json
{
    "data": {
        "name": "Новые Соревнования",
        "dateFrom": "2023-11-04T14:55:09.835Z",
        "dateTo": "2023-11-05T14:55:09.835Z",
        "students": [],
        "comment": "Комментарий для Новых Соревнований",
        "_id": "651e18e3c921d060d9d76884",
        "createdAt": "2023-10-05T02:01:07.076Z",
        "updatedAt": "2023-10-05T02:01:07.076Z",
        "__v": 0
    }
}
```

### Get all competitions
GET http://213.189.201.213:9000/api/admin/competitions/all

response: 

```json
[
    {
        "_id": "651e18e3c921d060d9d76884",
        "name": "Новые Соревнования",
        "dateFrom": "2023-11-04T14:55:09.835Z",
        "dateTo": "2023-11-05T14:55:09.835Z",
        "students": [],
        "comment": "Комментарий для Новых Соревнований",
        "createdAt": "2023-10-05T02:01:07.076Z",
        "updatedAt": "2023-10-05T02:01:07.076Z",
        "__v": 0
    }
]
```

### Get competitions by ID
GET http://213.189.201.213:9000/api/admin/competitions/:competitions_id

request:

params:

*competitions_id: required

http://213.189.201.213:9000/api/admin/competitions/651e18e3c921d060d9d76884

response: 

```json
{
    "_id": "651e18e3c921d060d9d76884",
    "name": "Новые Соревнования",
    "dateFrom": "2023-11-04T14:55:09.835Z",
    "dateTo": "2023-11-05T14:55:09.835Z",
    "students": [],
    "comment": "Комментарий для Новых Соревнований",
    "createdAt": "2023-10-05T02:01:07.076Z",
    "updatedAt": "2023-10-05T02:01:07.076Z",
    "__v": 0
}
```

### Get Competitions Students by ID
GET http://213.189.201.213:9000/api/admin/competitions/students/:competitions_id

request:

params:

*competitions_id: required

http://213.189.201.213:9000/api/admin/competitions/students/651e18e3c921d060d9d76884

response: 

```json
[
    {
        "_id": "651e1b75a8e2d0a034744fcc",
        "competitions": "651e18e3c921d060d9d76884",
        "client": {
            "_id": "651c28a51c4aefa49afcf203",
            "fullname": "Иванов Иван Иванович",
            "branch": "651c23f39bbd6447c4322fc8",
            "group": "651c26b39bbd6447c4322ff1",
            "dateBirth": "01.01.2000",
            "clientStatus": "required",
            "firstName": "Родитель",
            "firstPhoneNumber": "+79999999999",
            "secondName": "Родитель Два",
            "secondPhoneNumber": "+78888888888",
            "gender": "Мужчина",
            "weight": "65",
            "gip": "1 гып",
            "rank": "КМС",
            "certificateFrom": "1999-12-31T21:00:00.000Z",
            "insuranceUpTo": "2000-01-11T21:00:00.000Z",
            "athletePassport": "12121212321383",
            "userId": "6513f529e085dcff6cd27ed1",
            "comment": "Создать для него аккаунт",
            "createdAt": "2023-10-03T14:43:49.084Z",
            "updatedAt": "2023-10-03T14:43:49.084Z",
            "__v": 0
        },
        "disciplines": "Массоги, туль",
        "comment": "New Competitions Student",
        "createdAt": "2023-10-05T02:12:05.535Z",
        "updatedAt": "2023-10-05T02:12:05.535Z",
        "__v": 0
    }
]
```

### Add students to competitions by ID
POST http://213.189.201.213:9000/api/admin/competitions/add-students/:competitions_id

request:

// Required Data
*client: required
*gipFrom: required
*gipTo: required

// Additional Data
comment: optional

params:

*competitions_id: required

http://213.189.201.213:9000/api/admin/competitions/add-students/651e18e3c921d060d9d76884

*user = Headers.Authorization


```json
{
    // Required Data
    "client": "651c28a51c4aefa49afcf203",
    "disciplines": "Массоги, туль",

    // Additional Data
    "comment": "New Competitions Student"
}
```

response: 

```json
{
    "competitions": "651e18e3c921d060d9d76884",
    "client": {
        "_id": "651c28a51c4aefa49afcf203",
        "fullname": "Иванов Иван Иванович",
        "branch": "651c23f39bbd6447c4322fc8",
        "group": "651c26b39bbd6447c4322ff1",
        "dateBirth": "01.01.2000",
        "clientStatus": "required",
        "firstName": "Родитель",
        "firstPhoneNumber": "+79999999999",
        "secondName": "Родитель Два",
        "secondPhoneNumber": "+78888888888",
        "gender": "Мужчина",
        "weight": "65",
        "gip": "1 гып",
        "rank": "КМС",
        "certificateFrom": "1999-12-31T21:00:00.000Z",
        "insuranceUpTo": "2000-01-11T21:00:00.000Z",
        "athletePassport": "12121212321383",
        "userId": "6513f529e085dcff6cd27ed1",
        "comment": "Создать для него аккаунт",
        "createdAt": "2023-10-03T14:43:49.084Z",
        "updatedAt": "2023-10-03T14:43:49.084Z",
        "__v": 0
    },
    "disciplines": "Массоги, туль",
    "comment": "New Competitions Student",
    "_id": "651e1b75a8e2d0a034744fcc",
    "createdAt": "2023-10-05T02:12:05.535Z",
    "updatedAt": "2023-10-05T02:12:05.535Z",
    "__v": 0
}
```

### Search Competitions
POST http://213.189.201.213:9000/api/admin/competitions/searching/all

request:

```json
{
    "content": "Новые Соревнования"
}
```

*user = Headers.Authorization

response: 

```json
[
    {
        "_id": "651e18e3c921d060d9d76884",
        "name": "Новые Соревнования",
        "dateFrom": "2023-11-04T14:55:09.835Z",
        "dateTo": "2023-11-05T14:55:09.835Z",
        "students": [
            {
                "_id": "651e1b75a8e2d0a034744fcc",
                "competitions": "651e18e3c921d060d9d76884",
                "client": {
                    "_id": "651c28a51c4aefa49afcf203",
                    "fullname": "Иванов Иван Иванович",
                    "branch": "651c23f39bbd6447c4322fc8",
                    "group": "651c26b39bbd6447c4322ff1",
                    "dateBirth": "01.01.2000",
                    "clientStatus": "required",
                    "firstName": "Родитель",
                    "firstPhoneNumber": "+79999999999",
                    "secondName": "Родитель Два",
                    "secondPhoneNumber": "+78888888888",
                    "gender": "Мужчина",
                    "weight": "65",
                    "gip": "1 гып",
                    "rank": "КМС",
                    "certificateFrom": "1999-12-31T21:00:00.000Z",
                    "insuranceUpTo": "2000-01-11T21:00:00.000Z",
                    "athletePassport": "12121212321383",
                    "userId": "6513f529e085dcff6cd27ed1",
                    "comment": "Создать для него аккаунт",
                    "createdAt": "2023-10-03T14:43:49.084Z",
                    "updatedAt": "2023-10-03T14:43:49.084Z",
                    "__v": 0
                },
                "disciplines": "Массоги, туль",
                "comment": "New Competitions Student",
                "createdAt": "2023-10-05T02:12:05.535Z",
                "updatedAt": "2023-10-05T02:12:05.535Z",
                "__v": 0
            }
        ],
        "comment": "Комментарий для Новых Соревнований",
        "createdAt": "2023-10-05T02:01:07.076Z",
        "updatedAt": "2023-10-05T02:12:05.630Z",
        "__v": 0
    }
]
```

### Update Information For competitions by ID
PUT http://213.189.201.213:9000/api/admin/competitions/update/:competitions_id

request:

// Required Data
*name: required
*dateFrom: required
*dateTo: required

// Additional Data
*comment: optional

*user = Headers.Authorization

params:

*competitions_id: required

http://213.189.201.213:9000/api/admin/competitions/update/651e18e3c921d060d9d76884

```json
{
    // Required Data
    "name": "Новые Соревнования 111 111 111",
    "dateFrom": "2023-11-09T14:55:09.835+00:00",
    "dateTo": "2023-11-11T14:55:09.835+00:00",

    // Additional Data
    "comment": "Комментарий для Новых Соревнований 111 111 111"
}
```

response: 

```json
{
    "_id": "651e18e3c921d060d9d76884",
    "name": "Новые Соревнования 111 111 111",
    "dateFrom": "2023-11-09T14:55:09.835Z",
    "dateTo": "2023-11-11T14:55:09.835Z",
    "students": [
        {
            "_id": "651e1b75a8e2d0a034744fcc",
            "competitions": "651e18e3c921d060d9d76884",
            "client": {
                "_id": "651c28a51c4aefa49afcf203",
                "fullname": "Иванов Иван Иванович",
                "branch": "651c23f39bbd6447c4322fc8",
                "group": "651c26b39bbd6447c4322ff1",
                "dateBirth": "01.01.2000",
                "clientStatus": "required",
                "firstName": "Родитель",
                "firstPhoneNumber": "+79999999999",
                "secondName": "Родитель Два",
                "secondPhoneNumber": "+78888888888",
                "gender": "Мужчина",
                "weight": "65",
                "gip": "1 гып",
                "rank": "КМС",
                "certificateFrom": "1999-12-31T21:00:00.000Z",
                "insuranceUpTo": "2000-01-11T21:00:00.000Z",
                "athletePassport": "12121212321383",
                "userId": "6513f529e085dcff6cd27ed1",
                "comment": "Создать для него аккаунт",
                "createdAt": "2023-10-03T14:43:49.084Z",
                "updatedAt": "2023-10-03T14:43:49.084Z",
                "__v": 0
            },
            "disciplines": "Массоги, туль",
            "comment": "New Competitions Student",
            "createdAt": "2023-10-05T02:12:05.535Z",
            "updatedAt": "2023-10-05T02:12:05.535Z",
            "__v": 0
        }
    ],
    "comment": "Комментарий для Новых Соревнований 111 111 111",
    "createdAt": "2023-10-05T02:01:07.076Z",
    "updatedAt": "2023-10-05T02:16:17.221Z",
    "__v": 0
}
```

### Delete competitions by ID
DELETE http://213.189.201.213:9000/api/admin/competitions/:competitions_id

request:

*user = Headers.Authorization

params:

*competitions_id: required

http://213.189.201.213:9000/api/admin/competitions/651e18e3c921d060d9d76884

response: 

```json
"Competitions with 651e18e3c921d060d9d76884 Deleted"
``` 