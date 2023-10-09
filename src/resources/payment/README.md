# Requests For Payment API's

### Send Form
http://213.189.201.213:9000/api/payments/send-form

request:

*orderNumber: required
*amount: required
*description: required

```json
{
    "orderNumber": "1112",
    "amount": "10",
    "description": "Оплата тренировки Колотушин М.Г."
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
