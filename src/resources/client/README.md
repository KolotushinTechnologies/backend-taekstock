# Requests For Users API's For Admins 

### Create a New Client
POST http://213.189.201.213:9000/api/admin/clients/create-client

request:

// Required Data
*fullname: required
*branch: required
*group: required
*dateBirth: required
*clientStatus: required

// Optional Data
*firstName: optional
*firstPhoneNumber: optional
*secondName: optional
*secondPhoneNumber: optional
*gender: optional
*weight: optional
*gip: optional
*rank: optional
*certificateFrom: optional
*insuranceUpTo: optional
*athletePassport: optional
*userId: optional

// Additional Data
*comment: optional

*user = Headers.Authorization

clientStatus types:
- Заявка
- Пробник
- Действующий
- Карантин
- Ушедщий
- Отказ

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
    // Required Data
    "fullname": "Иванов Иван Иванович",
    // "branch": "981748917289481290874", // ID Филиала
    // "group": "981748913139481290874", // ID Группы
    "dateBirth": "01.01.2000",
    "clientStatus": "required",

    // Optional Data
    "firstName": "Родитель", // Контакты
    "firstPhoneNumber": "+79999999999", // Контакты
    "secondName": "Родитель Два", // Контакты
    "secondPhoneNumber": "+78888888888", // Контакты
    "gender": "Мужчина",
    "weight": "65",
    "gip": "1 гып",
    "rank": "КМС",
    "certificateFrom": "01.01.2000",
    "insuranceUpTo": "01.12.2000",
    "athletePassport": "12121212321383",
    "userId": "6513e40243824b9eac3a0bac", // ID Пользователя => необязательное поле, необходимо для идентификации клиента

    // Additional Data
    "comment": "Создать для него аккаунт"
}
```

response: 

```json
{
    "data": "Клиент успешно зарегистрирован!"
}
```

### Get all clients
GET http://213.189.201.213:9000/api/admin/clients/all

response: 

```json
[
    {
        "_id": "6513fb498dc79cff0a812bf7",
        "fullname": "Иванов Иван Иванович",
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
        "createdAt": "2023-09-27T09:52:09.284Z",
        "updatedAt": "2023-09-27T09:52:09.284Z",
        "__v": 0
    }
]
```

### Get client by ID
GET http://213.189.201.213:9000/api/admin/clients/:client_id

request:

params:

*user_id: required

http://213.189.201.213:9000/api/admin/clients/6513fb498dc79cff0a812bf7

response: 

```json
{
    "_id": "6513fb498dc79cff0a812bf7",
    "fullname": "Иванов Иван Иванович",
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
    "createdAt": "2023-09-27T09:52:09.284Z",
    "updatedAt": "2023-09-27T09:52:09.284Z",
    "__v": 0
}
```

### Search Clients
POST http://213.189.201.213:9000/api/admin/clients/searching/all

request:

```json
{
    "content": "Иванов Иван Иванович"
}
```

*user = Headers.Authorization

response: 

```json
[
    {
        "_id": "6513fb498dc79cff0a812bf7",
        "fullname": "Иванов Иван Иванович",
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
        "createdAt": "2023-09-27T09:52:09.284Z",
        "updatedAt": "2023-09-27T09:52:09.284Z",
        "__v": 0
    }
]
```

### Update Information For client by ID
PUT http://213.189.201.213:9000/api/admin/clients/update/:client_id

request:

// Required Data
*fullname: required(optional for edit)
*branch: required(optional for edit)
*group: required(optional for edit)
*dateBirth: required(optional for edit)
*clientStatus: required(optional for edit)

// Optional Data
*firstName: optional
*firstPhoneNumber: optional
*secondName: optional
*secondPhoneNumber: optional
*gender: optional
*weight: optional
*gip: optional
*rank: optional
*certificateFrom: optional
*insuranceUpTo: optional
*athletePassport: optional
*userId: optional

// Additional Data
*comment: optional

*user = Headers.Authorization

clientStatus types:
- Заявка
- Пробник
- Действующий
- Карантин
- Ушедщий
- Отказ

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

http://213.189.201.213:9000/api/admin/clients/update/6513fb498dc79cff0a812bf7

```json
{
    // Required Data
    "fullname": "Иванов Иван Иванович1",
    // "branch": "981748917289481290874", // ID Филиала
    // "group": "981748913139481290874", // ID Группы
    "dateBirth": "01.01.2001",
    "clientStatus": "Действующий",

    // Optional Data
    "firstName": "Родитель1", // Контакты
    "firstPhoneNumber": "+79999999991", // Контакты
    "secondName": "Родитель Два1", // Контакты
    "secondPhoneNumber": "+78888888881", // Контакты
    "gender": "Мужчина1",
    "weight": "651",
    "gip": "1 гып1",
    "rank": "КМС1",
    "certificateFrom": "01.01.2001",
    "insuranceUpTo": "01.12.2001",
    "athletePassport": "12121212321381",
    "userId": "6513e40243824b9eac3a0bac", // ID Пользователя => необязательное поле, необходимо для идентификации клиента

    // Additional Data
    "comment": "Создать для него аккаунт1"
}
```

response: 

```json
{
    "_id": "6513fb498dc79cff0a812bf7",
    "fullname": "Иванов Иван Иванович1",
    "dateBirth": "01.01.2001",
    "clientStatus": "Действующий",
    "firstName": "Родитель1",
    "firstPhoneNumber": "+79999999991",
    "secondName": "Родитель Два1",
    "secondPhoneNumber": "+78888888881",
    "gender": "Мужчина1",
    "weight": "651",
    "gip": "1 гып1",
    "rank": "КМС1",
    "certificateFrom": "2000-12-31T21:00:00.000Z",
    "insuranceUpTo": "2001-01-11T21:00:00.000Z",
    "athletePassport": "12121212321381",
    "userId": "6513e40243824b9eac3a0bac",
    "comment": "Создать для него аккаунт1",
    "createdAt": "2023-09-27T09:52:09.284Z",
    "updatedAt": "2023-09-27T10:01:54.419Z",
    "__v": 0
}
```

### Delete user by ID
DELETE http://213.189.201.213:9000/api/admin/clients/:user_id

request:

*user = Headers.Authorization

params:

*user_id: required

http://213.189.201.213:9000/api/admin/clients/6513fb498dc79cff0a812bf7

response: 

```json
"Client with 6513fb498dc79cff0a812bf7 Deleted"
``` 