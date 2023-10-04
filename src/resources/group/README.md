# Requests For Groups API's For Admins 

### Create a New Group
POST http://213.189.201.213:9000/api/admin/groups/create-group

request:

// Required Data
*branch: required
*name: required
*coach: required
*timetable: required
*potential: required

// Additional Data
*comment: optional

*user = Headers.Authorization


```json
{
    // Required Data
    "branch": "651c23f39bbd6447c4322fc8",
    "name": "Новая группа",
    "coach": "6513e40243824b9eac3a0bac",
    "timetable": "Понедельник, среда, четверг",
    "potential": "Хороший",

    // Additional Data
    "comment": "Создана новая группа"
}
```

response: 

```json
{
    "data": {
        "branch": "651c23f39bbd6447c4322fc8",
        "name": "Новая группа",
        "coach": "6513e40243824b9eac3a0bac",
        "timetable": [
            "Понедельник, среда, четверг"
        ],
        "potential": "Хороший",
        "students": [],
        "visitedStudents": [],
        "comment": "Создана новая группа",
        "_id": "651c26b39bbd6447c4322ff1",
        "createdAt": "2023-10-03T14:35:31.109Z",
        "updatedAt": "2023-10-03T14:35:31.109Z",
        "__v": 0
    }
}
```

### Get all groups
GET http://213.189.201.213:9000/api/admin/groups/all

response: 

```json
[
    {
        "_id": "651c26b39bbd6447c4322ff1",
        "branch": "651c23f39bbd6447c4322fc8",
        "name": "Новая группа",
        "coach": "6513e40243824b9eac3a0bac",
        "timetable": [
            "Понедельник, среда, четверг"
        ],
        "potential": "Хороший",
        "students": [],
        "visitedStudents": [],
        "comment": "Создана новая группа",
        "createdAt": "2023-10-03T14:35:31.109Z",
        "updatedAt": "2023-10-03T14:35:31.109Z",
        "__v": 0
    }
]
```

### Get group by ID
GET http://213.189.201.213:9000/api/admin/groups/:group_id

request:

params:

*group_id: required

http://213.189.201.213:9000/api/admin/groups/651c26b39bbd6447c4322ff1

response: 

```json
{
    "_id": "651c26b39bbd6447c4322ff1",
    "branch": "651c23f39bbd6447c4322fc8",
    "name": "Новая группа",
    "coach": "6513e40243824b9eac3a0bac",
    "timetable": [
        "Понедельник, среда, четверг"
    ],
    "potential": "Хороший",
    "students": [],
    "visitedStudents": [],
    "comment": "Создана новая группа",
    "createdAt": "2023-10-03T14:35:31.109Z",
    "updatedAt": "2023-10-03T14:35:31.109Z",
    "__v": 0
}
```

### Create visit for students(clients)
POST http://213.189.201.213:9000/api/admin/groups/visit/:group_id

request:

// Required Data
*clientId: required
*dateName: required
*visited: required

params:

*group_id: required

http://213.189.201.213:9000/api/admin/groups/visit/651c26b39bbd6447c4322ff1

*user = Headers.Authorization


```json
{
    // Required Data
    "clientId": "6513fb498dc79cff0a812bf7",
    "dateName": "20.01.2024",
    "visited": true,
}
```

response: 

```json
{
    "dateName": "20.01.2024",
    "group": "651c26b39bbd6447c4322ff1",
    "student": "651c28a51c4aefa49afcf203",
    "visited": true,
    "_id": "651c28b41c4aefa49afcf20a",
    "__v": 0
}
```

### Search Groups
POST http://213.189.201.213:9000/api/admin/groups/searching/all

request:

```json
{
    "content": "Новая группа"
}
```

*user = Headers.Authorization

response: 

```json
[
    {
        "_id": "651c26b39bbd6447c4322ff1",
        "branch": "651c23f39bbd6447c4322fc8",
        "name": "Новая группа",
        "coach": "6513e40243824b9eac3a0bac",
        "timetable": [
            "Понедельник, среда, четверг"
        ],
        "potential": "Хороший",
        "students": [
            "651c28a51c4aefa49afcf203"
        ],
        "visitedStudents": [
            "651c28b41c4aefa49afcf20a"
        ],
        "comment": "Создана новая группа",
        "createdAt": "2023-10-03T14:35:31.109Z",
        "updatedAt": "2023-10-03T14:44:04.209Z",
        "__v": 0
    }
]
```

### Update Information For group by ID
PUT http://213.189.201.213:9000/api/admin/groups/update/:group_id

request:

// Required Data
*branch: required
*name: required
*coach: required
*timetable: required
*potential: required

// Additional Data
*comment: optional

*user = Headers.Authorization

params:

*group_id: required

http://213.189.201.213:9000/api/admin/groups/update/651c26b39bbd6447c4322ff1

```json
{
    // Required Data
    "branch": "651c23f39bbd6447c4322fc8",
    "name": "Новая группа111 111 111",
    "coach": "6513e40243824b9eac3a0bac",
    "timetable": "Понедельник, среда, четверг, пятница",
    "potential": "Хороший 111 111 111",

    // Additional Data
    "comment": "Создана новая группа 1111"
}
```

response: 

```json
{
    "_id": "651c26b39bbd6447c4322ff1",
    "branch": "651c23f39bbd6447c4322fc8",
    "name": "Новая группа111 111 111",
    "coach": "6513e40243824b9eac3a0bac",
    "timetable": [
        "Понедельник, среда, четверг, пятница"
    ],
    "potential": "Хороший 111 111 111",
    "students": [
        "651c28a51c4aefa49afcf203"
    ],
    "visitedStudents": [
        "651c28b41c4aefa49afcf20a"
    ],
    "comment": "Создана новая группа 1111",
    "createdAt": "2023-10-03T14:35:31.109Z",
    "updatedAt": "2023-10-03T14:47:48.389Z",
    "__v": 0
}
```

### Delete group by ID
DELETE http://213.189.201.213:9000/api/admin/groups/:group_id

request:

*user = Headers.Authorization

params:

*group_id: required

http://213.189.201.213:9000/api/admin/groups/651c26b39bbd6447c4322ff1

response: 

```json
"group with 651c26b39bbd6447c4322ff1 Deleted"
``` 