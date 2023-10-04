# Requests For Groups API's For Admins 

### Create a New Certification
POST http://localhost:8000/api/admin/certifications/create-certification

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
    "name": "Новая Аттестация",
    "dateFrom": "2023-11-04T14:55:09.835+00:00",
    "dateTo": "2023-11-05T14:55:09.835+00:00",

    // Additional Data
    "comment": "Комментарий для Новой Аттестации"
}
```

response: 

```json
{
    "data": {
        "name": "Новая Аттестация",
        "dateFrom": "2023-11-04T14:55:09.835Z",
        "dateTo": "2023-11-05T14:55:09.835Z",
        "comment": "Комментарий для Новой Аттестации",
        "_id": "651dd4140e357aa686ed13be",
        "createdAt": "2023-10-04T21:07:32.882Z",
        "updatedAt": "2023-10-04T21:07:32.882Z",
        "__v": 0
    }
}
```

### Get all certifications
GET http://localhost:8000/api/admin/certifications/all

response: 

```json
[
    {
        "students": [],
        "_id": "651dd4140e357aa686ed13be",
        "name": "Новая Аттестация",
        "dateFrom": "2023-11-04T14:55:09.835Z",
        "dateTo": "2023-11-05T14:55:09.835Z",
        "comment": "Комментарий для Новой Аттестации",
        "createdAt": "2023-10-04T21:07:32.882Z",
        "updatedAt": "2023-10-04T21:07:32.882Z",
        "__v": 0
    },
    {
        "_id": "651dd5c439bacd5e2241f59a",
        "name": "Новая Аттестация 1",
        "dateFrom": "2023-11-04T14:55:09.835Z",
        "dateTo": "2023-11-05T14:55:09.835Z",
        "students": [
            {
                "_id": "651de61536e973ce89361858",
                "certification": "651dd5c439bacd5e2241f59a",
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
                "gipFrom": "1 gip",
                "gipTo": "1 dan",
                "comment": "New Certification Student",
                "createdAt": "2023-10-04T22:24:21.233Z",
                "updatedAt": "2023-10-04T22:24:21.233Z",
                "__v": 0
            }
        ],
        "comment": "Комментарий для Новой Аттестации",
        "createdAt": "2023-10-04T21:14:44.567Z",
        "updatedAt": "2023-10-04T22:24:21.321Z",
        "__v": 0
    }
]
```

### Get certification by ID
GET http://localhost:8000/api/admin/certifications/:certification_id

request:

params:

*certification_id: required

http://localhost:8000/api/admin/certifications/651dd5c439bacd5e2241f59a

response: 

```json
{
    "_id": "651dd5c439bacd5e2241f59a",
    "name": "Новая Аттестация 1",
    "dateFrom": "2023-11-04T14:55:09.835Z",
    "dateTo": "2023-11-05T14:55:09.835Z",
    "students": [
        {
            "_id": "651de61536e973ce89361858",
            "certification": "651dd5c439bacd5e2241f59a",
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
            "gipFrom": "1 gip",
            "gipTo": "1 dan",
            "comment": "New Certification Student",
            "createdAt": "2023-10-04T22:24:21.233Z",
            "updatedAt": "2023-10-04T22:24:21.233Z",
            "__v": 0
        }
    ],
    "comment": "Комментарий для Новой Аттестации",
    "createdAt": "2023-10-04T21:14:44.567Z",
    "updatedAt": "2023-10-04T22:24:21.321Z",
    "__v": 0
}
```

### Add students to certification by ID
POST http://localhost:8000/api/admin/certifications/add-students/:certification_id

request:

// Required Data
*client: required
*gipFrom: required
*gipTo: required

// Additional Data
comment: optional

params:

*certification_id: required

http://localhost:8000/api/admin/certifications/add-students/651dd5c439bacd5e2241f59a

*user = Headers.Authorization


```json
{
    // Required Data
    "client": "651c28a51c4aefa49afcf203",
    "gipFrom": "1 gip",
    "gipTo": "1 dan",

    // Additional Data
    "comment": "New Certification Student"
}
```

response: 

```json
{
    "certification": "651dd5c439bacd5e2241f59a",
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
    "gipFrom": "1 gip",
    "gipTo": "1 dan",
    "comment": "New Certification Student",
    "_id": "651de8947b4f7d5f2632a717",
    "createdAt": "2023-10-04T22:35:00.165Z",
    "updatedAt": "2023-10-04T22:35:00.165Z",
    "__v": 0
}
```

### Search Certifications
POST http://localhost:8000/api/admin/certifications/searching/all

request:

```json
{
    "content": "Новая Аттестация 1"
}
```

*user = Headers.Authorization

response: 

```json
[
    {
        "_id": "651dd5c439bacd5e2241f59a",
        "name": "Новая Аттестация 1",
        "dateFrom": "2023-11-04T14:55:09.835Z",
        "dateTo": "2023-11-05T14:55:09.835Z",
        "students": [
            {
                "_id": "651de61536e973ce89361858",
                "certification": "651dd5c439bacd5e2241f59a",
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
                "gipFrom": "1 gip",
                "gipTo": "1 dan",
                "comment": "New Certification Student",
                "createdAt": "2023-10-04T22:24:21.233Z",
                "updatedAt": "2023-10-04T22:24:21.233Z",
                "__v": 0
            },
            {
                "_id": "651de8821852b9b622aa7358",
                "certification": "651dd5c439bacd5e2241f59a",
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
                "gipFrom": "1 gip",
                "gipTo": "1 dan",
                "comment": "New Certification Student",
                "createdAt": "2023-10-04T22:34:42.306Z",
                "updatedAt": "2023-10-04T22:34:42.306Z",
                "__v": 0
            },
            {
                "_id": "651de8947b4f7d5f2632a717",
                "certification": "651dd5c439bacd5e2241f59a",
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
                "gipFrom": "1 gip",
                "gipTo": "1 dan",
                "comment": "New Certification Student",
                "createdAt": "2023-10-04T22:35:00.165Z",
                "updatedAt": "2023-10-04T22:35:00.165Z",
                "__v": 0
            }
        ],
        "comment": "Комментарий для Новой Аттестации",
        "createdAt": "2023-10-04T21:14:44.567Z",
        "updatedAt": "2023-10-04T22:35:00.220Z",
        "__v": 0
    }
]
```

### Update Information For certification by ID
PUT http://localhost:8000/api/admin/certifications/update/:certification_id

request:

// Required Data
*name: required
*dateFrom: required
*dateTo: required

// Additional Data
*comment: optional

*user = Headers.Authorization

params:

*certification_id: required

http://localhost:8000/api/admin/certifications/update/651dd5c439bacd5e2241f59a

```json
{
    // Required Data
    "name": "Новая Аттестация 111111",
    "dateFrom": "2023-11-05T14:55:09.835+00:00",
    "dateTo": "2023-11-06T14:55:09.835+00:00",

    // Additional Data
    "comment": "Комментарий для Новой Аттестации 111"
}
```

response: 

```json
{
    "_id": "651dd5c439bacd5e2241f59a",
    "name": "Новая Аттестация 111111",
    "dateFrom": "2023-11-05T14:55:09.835Z",
    "dateTo": "2023-11-06T14:55:09.835Z",
    "students": [
        {
            "_id": "651de61536e973ce89361858",
            "certification": "651dd5c439bacd5e2241f59a",
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
            "gipFrom": "1 gip",
            "gipTo": "1 dan",
            "comment": "New Certification Student",
            "createdAt": "2023-10-04T22:24:21.233Z",
            "updatedAt": "2023-10-04T22:24:21.233Z",
            "__v": 0
        },
        {
            "_id": "651de8821852b9b622aa7358",
            "certification": "651dd5c439bacd5e2241f59a",
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
            "gipFrom": "1 gip",
            "gipTo": "1 dan",
            "comment": "New Certification Student",
            "createdAt": "2023-10-04T22:34:42.306Z",
            "updatedAt": "2023-10-04T22:34:42.306Z",
            "__v": 0
        },
        {
            "_id": "651de8947b4f7d5f2632a717",
            "certification": "651dd5c439bacd5e2241f59a",
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
            "gipFrom": "1 gip",
            "gipTo": "1 dan",
            "comment": "New Certification Student",
            "createdAt": "2023-10-04T22:35:00.165Z",
            "updatedAt": "2023-10-04T22:35:00.165Z",
            "__v": 0
        }
    ],
    "comment": "Комментарий для Новой Аттестации 111",
    "createdAt": "2023-10-04T21:14:44.567Z",
    "updatedAt": "2023-10-04T22:41:13.647Z",
    "__v": 0
}
```

### Delete certification by ID
DELETE http://localhost:8000/api/admin/certifications/:certification_id

request:

*user = Headers.Authorization

params:

*certification_id: required

http://localhost:8000/api/admin/certifications/651dd5c439bacd5e2241f59a

response: 

```json
"Certification with 651dd5c439bacd5e2241f59a Deleted"
``` 