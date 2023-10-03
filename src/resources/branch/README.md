# Requests For Brachs API's For Admins 

### Create a New Branch
POST http://localhost:8000/api/admin/branchs/create-branch

request:

// Required Data
*name: required
*typeRent: required
*priceRent: required

// Additional Data
*comment: optional

*user = Headers.Authorization


```json
{
    // Required Data
    "name": "Новый филиал",
    "typeRent": "помесячная",
    "priceRent": "10000",

    // Additional Data
    "comment": "Следующий платеж 20.01.2024"
}
```

response: 

```json
{
    "data": "Филиал успешно создан!"
}
```

### Get all branches
GET http://localhost:8000/api/admin/branchs/all

response: 

```json
[
    {
        "_id": "651c23f39bbd6447c4322fc8",
        "name": "Новый филиал",
        "typeRent": "помесячная",
        "priceRent": "10000",
        "groups": [],
        "comment": "Следующий платеж 20.01.2024",
        "createdAt": "2023-10-03T14:23:47.514Z",
        "updatedAt": "2023-10-03T14:23:47.514Z",
        "__v": 0
    },
    {
        "_id": "651c24249bbd6447c4322fcd",
        "name": "Новый филиал",
        "typeRent": "помесячная",
        "priceRent": "10000",
        "groups": [],
        "comment": "Следующий платеж 20.01.2024",
        "createdAt": "2023-10-03T14:24:36.102Z",
        "updatedAt": "2023-10-03T14:24:36.102Z",
        "__v": 0
    },
    {
        "_id": "651c24279bbd6447c4322fd2",
        "name": "Новый филиал1",
        "typeRent": "помесячная",
        "priceRent": "10000",
        "groups": [],
        "comment": "Следующий платеж 20.01.2024",
        "createdAt": "2023-10-03T14:24:39.962Z",
        "updatedAt": "2023-10-03T14:24:39.962Z",
        "__v": 0
    }
]
```

### Get branch by ID
GET http://localhost:8000/api/admin/branchs/:branch_id

request:

params:

*branch_id: required

http://localhost:8000/api/admin/branchs/651c23f39bbd6447c4322fc8

response: 

```json
{
    "_id": "651c23f39bbd6447c4322fc8",
    "name": "Новый филиал",
    "typeRent": "помесячная",
    "priceRent": "10000",
    "groups": [],
    "comment": "Следующий платеж 20.01.2024",
    "createdAt": "2023-10-03T14:23:47.514Z",
    "updatedAt": "2023-10-03T14:23:47.514Z",
    "__v": 0
}
```

### Search Branches
POST http://localhost:8000/api/admin/branchs/searching/all

request:

```json
{
    "content": "Новый филиал1"
}
```

*user = Headers.Authorization

response: 

```json
[
    {
        "_id": "651c24279bbd6447c4322fd2",
        "name": "Новый филиал1",
        "typeRent": "помесячная",
        "priceRent": "10000",
        "groups": [],
        "comment": "Следующий платеж 20.01.2024",
        "createdAt": "2023-10-03T14:24:39.962Z",
        "updatedAt": "2023-10-03T14:24:39.962Z",
        "__v": 0
    }
]
```

### Update Information For branch by ID
PUT http://localhost:8000/api/admin/branchs/update/:branch_id

request:

// Required Data
*name: required
*typeRent: required
*priceRent: required

// Additional Data
*comment: optional

*user = Headers.Authorization

params:

*branch_id: required

http://localhost:8000/api/admin/branchs/update/651c24279bbd6447c4322fd2

```json
{
    // Required Data
    "name": "Новый филиал111",
    "typeRent": "помесячная1111",
    "priceRent": "100001111",

    // Additional Data
    "comment": "Следующий платеж 20.01.202411111"
}
```

response: 

```json
{
    "_id": "651c24279bbd6447c4322fd2",
    "name": "Новый филиал111",
    "typeRent": "помесячная1111",
    "priceRent": "100001111",
    "groups": [],
    "comment": "Следующий платеж 20.01.202411111",
    "createdAt": "2023-10-03T14:24:39.962Z",
    "updatedAt": "2023-10-03T14:30:11.510Z",
    "__v": 0
}
```

### Delete branch by ID
DELETE http://localhost:8000/api/admin/branchs/:branch_id

request:

*user = Headers.Authorization

params:

*branch_id: required

http://localhost:8000/api/admin/branchs/651c24279bbd6447c4322fd2

response: 

```json
"Branch with 651c24279bbd6447c4322fd2 Deleted"
``` 