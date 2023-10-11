# Requests For Payment API's

### Send Form
http://213.189.201.213:9000/api/payments/send-form

request:

*fullname: required
*type: required
*email: required
*phoneNumber: required
*coach: required
*orderNumber: required
*amount: required
*description: required

// additional fieldss
*userId: optional;
*userStatus: optional;
*paymentPlace: optional;

if not user profile
```json
{
    "fullname": "Колотушин Михаил Геннадьевич",
    "type": "Тренировки",
    "email": "kolotushintechnologies@gmail.com",
    "phoneNumber": "+79215716057",
    "coach": "Смышляев Сергей Николаевич",
    "orderNumber": "1111309",
    "amount": "10",
    "description": "Услуги по проведению физкультурно-оздоровительных занятий. Колотушин Михаил Геннадьевич, Октябрь."
}
```

if user profile
```json
{
    "fullname": "Колотушин Михаил Геннадьевич",
    "type": "Тренировки",
    "email": "kolotushintechnologies@gmail.com",
    "phoneNumber": "+79215716057",
    "coach": "Смышляев Сергей Николаевич",
    "orderNumber": "1111309",
    "amount": "10",
    "description": "Услуги по проведению физкультурно-оздоровительных занятий. Колотушин Михаил Геннадьевич, Октябрь.",

    "userId": "6513e40243824b9eac3a0bac",
    "userStatus": "Спортсмен",
    "paymentPlace": "Личный кабинет спортсмена"
}
```

response: 

```json
{
    "orderId": "d9daa1e0-8bf0-77a1-b16e-58d50014c4e0",
    "formUrl": "https://securecardpayment.ru/payment/merchants/sbersafe_sberid/payment_ru.html?mdOrder=d9daa1e0-8bf0-77a1-b16e-58d50014c4e0"
}
```

### Get User Transactions
http://213.189.201.213:9000/api/payments/user-transactions

request:

*user = Headers.Authorization

response: 

```json
[
    {
        "_id": "6525e1cc8000e40bb37c5a36",
        "fullname": "Колотушин Михаил Геннадьевич",
        "type": "Тренировки",
        "email": "kolotushintechnologies@gmail.com",
        "phoneNumber": "+79215716057",
        "coach": "Смышляев Сергей Николаевич",
        "transactionId": "d7e290b7-4c4f-75ef-a621-f9750014c4e0",
        "amount": "10",
        "description": "Услуги по проведению физкультурно-оздоровительных занятий. Колотушин Михаил Геннадьевич, Октябрь.",
        "status": "Успешно",
        "createdAt": "2023-10-10T23:44:12.209Z",
        "updatedAt": "2023-10-10T23:47:59.852Z",
        "__v": 0,
        "paymentPlace": "Личный кабинет спортсмена",
        "userId": "6513e40243824b9eac3a0bac",
        "userStatus": "Спортсмен"
    }
]
```

### Get Transaction ID
http://213.189.201.213:9000/api/payments/transaction/:transaction_id

request:

params:

*transaction_id: required

http://213.189.201.213:9000/api/payments/transaction/d9daa1e0-8bf0-77a1-b16e-58d50014c4e0

response: 

```json
{
    "errorCode": "0",
    "errorMessage": "Успешно",
    "orderNumber": "1112",
    "orderStatus": 2,
    "actionCode": 0,
    "actionCodeDescription": "",
    "amount": 1000,
    "currency": "643",
    "date": 1696807433078,
    "orderDescription": "Оплата тренировки Колотушин М.Г.",
    "ip": "188.170.79.187",
    "merchantOrderParams": [
        {
            "name": "binProductCategory",
            "value": "DEBIT"
        },
        {
            "name": "binProductCode",
            "value": "F"
        }
    ],
    "transactionAttributes": [],
    "attributes": [
        {
            "name": "mdOrder",
            "value": "d9daa1e0-8bf0-77a1-b16e-58d50014c4e0"
        }
    ],
    "cardAuthInfo": {
        "maskedPan": "427650XXXXXX2890",
        "expiration": "202311",
        "cardholderName": "CARDHOLDER NAME",
        "approvalCode": "206396",
        "pan": "427650XXXXXX2890"
    },
    "authDateTime": 1696807498068,
    "terminalId": "11469656",
    "authRefNum": "328123103033",
    "paymentAmountInfo": {
        "paymentState": "DEPOSITED",
        "approvedAmount": 1000,
        "depositedAmount": 1000,
        "refundedAmount": 0
    },
    "bankInfo": {
        "bankName": "Sberbank",
        "bankCountryCode": "RU",
        "bankCountryName": "Россия"
    }
}
```

### Get All Transactions
http://213.189.201.213:9000/api/payments/transactions

request:

*user = Headers.Authorization

GET http://213.189.201.213:9000/api/payments/transactions

response: 

```json
[
    {
        "_id": "65243926785219e83096d34a",
        "fullname": "Колотушин Михаил Геннадьевич",
        "type": "Тренировки",
        "email": "kolotushintechnologies@gmail.com",
        "phoneNumber": "+79215716057",
        "coach": "Смышляев Сергей Николаевич",
        "transactionId": "a44b571a-3f72-7182-86a0-10f60014c4e0",
        "amount": "10",
        "description": "Услуги по проведению физкультурно-оздоровительных занятий. Колотушин Михаил Геннадьевич, Октябрь.",
        "status": "Успешно",
        "createdAt": "2023-10-09T17:32:22.844Z",
        "updatedAt": "2023-10-09T17:33:57.811Z",
        "__v": 0
    },
    {
        "_id": "652596b2785219e83096d419",
        "fullname": "Александр",
        "type": "Тренировки",
        "email": "armag@gmail.com",
        "phoneNumber": "+79003213223",
        "coach": "Пушкин",
        "transactionId": "4b43bf74-b696-7ca1-8de6-17eb0014c4e0",
        "amount": "123",
        "description": "оплата тренировки",
        "status": "В обработке",
        "createdAt": "2023-10-10T18:23:46.111Z",
        "updatedAt": "2023-10-10T18:23:46.111Z",
        "__v": 0
    },
    {
        "_id": "6525e1a934b66ce1f2e77afb",
        "fullname": "Колотушин Михаил Геннадьевич",
        "type": "Тренировки",
        "email": "kolotushintechnologies@gmail.com",
        "phoneNumber": "+79215716057",
        "coach": "Смышляев Сергей Николаевич",
        "transactionId": "4a696b9e-868d-7347-ae64-13600014c4e0",
        "amount": "10",
        "description": "Услуги по проведению физкультурно-оздоровительных занятий. Колотушин Михаил Геннадьевич, Октябрь.",
        "status": "В обработке",
        "createdAt": "2023-10-10T23:43:37.701Z",
        "updatedAt": "2023-10-10T23:43:37.701Z",
        "__v": 0
    },
    {
        "_id": "6525e1cc8000e40bb37c5a36",
        "fullname": "Колотушин Михаил Геннадьевич",
        "type": "Тренировки",
        "email": "kolotushintechnologies@gmail.com",
        "phoneNumber": "+79215716057",
        "coach": "Смышляев Сергей Николаевич",
        "transactionId": "d7e290b7-4c4f-75ef-a621-f9750014c4e0",
        "amount": "10",
        "description": "Услуги по проведению физкультурно-оздоровительных занятий. Колотушин Михаил Геннадьевич, Октябрь.",
        "status": "Успешно",
        "createdAt": "2023-10-10T23:44:12.209Z",
        "updatedAt": "2023-10-10T23:47:59.852Z",
        "__v": 0,
        "paymentPlace": "Личный кабинет спортсмена",
        "userId": "6513e40243824b9eac3a0bac",
        "userStatus": "Спортсмен"
    },
    {
        "_id": "6525e2f98000e40bb37c5a39",
        "fullname": "Колотушин Михаил Геннадьевич",
        "type": "Тренировки",
        "email": "kolotushintechnologies@gmail.com",
        "phoneNumber": "+79215716057",
        "coach": "Смышляев Сергей Николаевич",
        "transactionId": "34a5a846-7008-7fdf-8570-6df90014c4e0",
        "amount": "10",
        "description": "Услуги по проведению физкультурно-оздоровительных занятий. Колотушин Михаил Геннадьевич, Октябрь.",
        "status": "Успешно",
        "createdAt": "2023-10-10T23:49:13.560Z",
        "updatedAt": "2023-10-10T23:50:49.906Z",
        "__v": 0
    },
    {
        "_id": "6525e5258000e40bb37c5a41",
        "fullname": "Денисов Денис Денисович",
        "type": "Тренировки",
        "email": "denis12345armag@gmail.com",
        "phoneNumber": "+79215711111",
        "coach": "Смышляев Сергей Николаевич",
        "transactionId": "8d6f1a1c-77ab-7964-a03d-f7f70014c4e0",
        "amount": "10",
        "description": "Услуги по проведению физкультурно-оздоровительных занятий. Денисов Денис Денисович, Октябрь.",
        "status": "Успешно",
        "createdAt": "2023-10-10T23:58:29.179Z",
        "updatedAt": "2023-10-11T00:01:36.766Z",
        "__v": 0,
        "paymentPlace": "Личный кабинет спортсмена",
        "userId": "6525e48434b66ce1f2e77b04",
        "userStatus": "Спортсмен"
    }
]
```
