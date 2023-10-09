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

response: 

```json
{
    "orderId": "d9daa1e0-8bf0-77a1-b16e-58d50014c4e0",
    "formUrl": "https://securecardpayment.ru/payment/merchants/sbersafe_sberid/payment_ru.html?mdOrder=d9daa1e0-8bf0-77a1-b16e-58d50014c4e0"
}
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
http://localhost:8000/api/payments/transactions

request:

GET http://localhost:8000/api/payments/transactions

response: 

```json
[
    {
        "_id": "65233e53cfd854e409172eca",
        "transactionId": "bf6ab9bc-4c28-7826-a812-bee40014c4e0",
        "amount": "10",
        "description": "Оплата тренировки Колотушин М.Г. за январь",
        "createdAt": "2023-10-08T23:42:11.401Z",
        "updatedAt": "2023-10-08T23:43:54.738Z",
        "__v": 0,
        "status": "Успешно"
    },
    {
        "_id": "65233edacfd854e409172ecd",
        "transactionId": "41bc864c-11da-761f-9a88-b4e20014c4e0",
        "amount": "10",
        "description": "Оплата тренировки Колотушин М.Г. за февраль",
        "createdAt": "2023-10-08T23:44:26.205Z",
        "updatedAt": "2023-10-08T23:45:37.422Z",
        "__v": 0,
        "status": "Успешно"
    },
    {
        "_id": "65233f3ecfd854e409172ed0",
        "transactionId": "39d26452-e9f2-73d1-8b76-57630014c4e0",
        "amount": "10",
        "description": "Оплата тренировки Колотушин М.Г. за март",
        "createdAt": "2023-10-08T23:46:06.034Z",
        "updatedAt": "2023-10-08T23:47:43.706Z",
        "__v": 0,
        "status": "Успешно"
    }
]
```
