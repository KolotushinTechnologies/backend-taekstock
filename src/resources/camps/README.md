# Requests For Camps API's For Admins 

### Create a New Camp
POST http://localhost:8000/api/admin/camps/create-camp

request:

// Required Data
*name: required

// Additional Data
*comment: optional

*user = Headers.Authorization


```json
{
    // Required Data
    "name": "Новый лагерь",

    // Additional Data
    "comment": "Комментарий для Новый Лагерь"
}
```

response: 

```json
{
    "data": {
        "name": "Новый лагерь",
        "students": [],
        "comment": "Комментарий для Новый Лагерь",
        "_id": "6525bc1d3ec99f7aa6b9bc6a",
        "createdAt": "2023-10-10T21:03:25.372Z",
        "updatedAt": "2023-10-10T21:03:25.372Z",
        "__v": 0
    }
}
```

### Get all camps
GET http://localhost:8000/api/admin/camps/all

response: 

```json
[
    {
        "_id": "6525bc1d3ec99f7aa6b9bc6a",
        "name": "Новый лагерь",
        "students": [],
        "comment": "Комментарий для Новый Лагерь",
        "createdAt": "2023-10-10T21:03:25.372Z",
        "updatedAt": "2023-10-10T21:03:25.372Z",
        "__v": 0
    }
]
```

### Get camp by ID
GET http://localhost:8000/api/admin/camps/:camp_id

request:

params:

*camp_id: required

http://localhost:8000/api/admin/camps/6525bc1d3ec99f7aa6b9bc6a

response: 

```json
{
    "_id": "6525bc1d3ec99f7aa6b9bc6a",
    "name": "Новый лагерь",
    "students": [],
    "comment": "Комментарий для Новый Лагерь",
    "createdAt": "2023-10-10T21:03:25.372Z",
    "updatedAt": "2023-10-10T21:03:25.372Z",
    "__v": 0
}
```

### Get Camp Students by ID
GET http://localhost:8000/api/admin/camps/students/:camp_id

request:

params:

*camp_id: required

http://localhost:8000/api/admin/camps/students/6525bc1d3ec99f7aa6b9bc6a

response: 

```json
[]
```

### Add students to camp by ID
POST http://localhost:8000/api/admin/camps/add-students/:camp_id

request:

// Required Data
*client: required;
*externalClient: string;
*dateBirth: string;
*phoneNumber: string;

// Additional Data
*comment: optional

params:

*camp_id: required

http://localhost:8000/api/admin/camps/add-students/651dd5c439bacd5e2241f59a

*user = Headers.Authorization


```json
{
    // Required Data
    "client": "651c28a51c4aefa49afcf203",
    "externalClient": "Родитель",
    "dateBirth": "01.01.2000",
    "phoneNumber": "+79999999999",

    // Additional Data
    "comment": "Оплата лагеря 30 000 Рублей"
}
```

response: 

```json
{
    "camp": "6525bc1d3ec99f7aa6b9bc6a",
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
    "externalClient": "Родитель",
    "dateBirth": "01.01.2000",
    "phoneNumber": "+79999999999",
    "comment": "Оплата лагеря 30 000 Рублей",
    "_id": "6525bd723ec99f7aa6b9bc79",
    "createdAt": "2023-10-10T21:09:06.573Z",
    "updatedAt": "2023-10-10T21:09:06.573Z",
    "__v": 0
}
```

### Search Camp
POST http://localhost:8000/api/admin/camps/searching/all

request:

```json
{
    "content": "Новый Лагерь"
}
```

*user = Headers.Authorization

response: 

```json
[
    {
        "_id": "6525bc1d3ec99f7aa6b9bc6a",
        "name": "Новый лагерь",
        "students": [
            {
                "_id": "6525bd723ec99f7aa6b9bc79",
                "camp": "6525bc1d3ec99f7aa6b9bc6a",
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
                "externalClient": "Родитель",
                "dateBirth": "01.01.2000",
                "phoneNumber": "+79999999999",
                "comment": "Оплата лагеря 30 000 Рублей",
                "createdAt": "2023-10-10T21:09:06.573Z",
                "updatedAt": "2023-10-10T21:09:06.573Z",
                "__v": 0
            }
        ],
        "comment": "Комментарий для Новый Лагерь",
        "createdAt": "2023-10-10T21:03:25.372Z",
        "updatedAt": "2023-10-10T21:09:06.665Z",
        "__v": 0
    }
]
```

### Update Information For camp by ID
PUT http://localhost:8000/api/admin/camps/update/:camp_id

request:

// Required Data
*name: required

// Additional Data
*comment: optional

*user = Headers.Authorization

params:

*camp_id: required

http://localhost:8000/api/admin/camps/update/6525bc1d3ec99f7aa6b9bc6a

```json
{
    // Required Data
    "name": "Новый лагерь 111",

    // Additional Data
    "comment": "Комментарий для Новый Лагерь 111"
}
```

response: 

```json
{
    "_id": "6525bc1d3ec99f7aa6b9bc6a",
    "name": "Новый лагерь 111",
    "students": [
        {
            "_id": "6525bd723ec99f7aa6b9bc79",
            "camp": "6525bc1d3ec99f7aa6b9bc6a",
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
            "externalClient": "Родитель",
            "dateBirth": "01.01.2000",
            "phoneNumber": "+79999999999",
            "comment": "Оплата лагеря 30 000 Рублей",
            "createdAt": "2023-10-10T21:09:06.573Z",
            "updatedAt": "2023-10-10T21:09:06.573Z",
            "__v": 0
        }
    ],
    "comment": "Комментарий для Новый Лагерь 111",
    "createdAt": "2023-10-10T21:03:25.372Z",
    "updatedAt": "2023-10-10T21:12:51.866Z",
    "__v": 0
}
```

### Delete camp by ID
DELETE http://localhost:8000/api/admin/camps/:camp_id

request:

*user = Headers.Authorization

params:

*camp_id: required

http://localhost:8000/api/admin/camps/6525bc1d3ec99f7aa6b9bc6a

response: 

```json
"Camp with 6525bc1d3ec99f7aa6b9bc6a Deleted"
``` 