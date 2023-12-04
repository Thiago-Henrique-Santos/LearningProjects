# Learning Projects 📚🖥️💻☕

This repository keeps simple projects I do for recollect, practice and buff up programming learnings.

## Summary

- [Simple Object Register](#simple-object-register);

## Simple Object Register

The objective of this project is practicing basic object-oriented programming with JavaScript. I also used it for practing node.js vanilla, developing a simple REST API with SQLite database, able to perform a simple CRUD.

> **Endpoints: route to access the functionalities**
>
> /api/person (Create route)
>
> /api/person (Read route - all registers)
>
> /api/person/:name (Read route - a register by name)
>
> /api/person (Update route - a specif register)
>
> /api/person/:uuid (Deltele route - a specif register)

<u>All the routes and how to consume the API will be described bellow.</u>

### POST (Create/register person) ✍️

**Request url:**
```
/api/person
```

**Example of request's body:**
```json
{
	"firstName": "Yuri",
	"lastName": "Rocha",
	"birthdate": "2000-10-25",
	"height": 1.85,
	"weight": 80.1
}
```

**Example of expecting response:**
```json
{
	"id": "6b589c6a-61c2-4255-bdeb-4e62edcd0279",
	"firstName": "Yuri",
	"lastName": "Rosa",
	"height": 1.85,
	"weight": 80.1,
	"birthdate": "2000-10-25"
}
```

**Example of how to use it in JavaScript:**
```js
const data = {
	"firstName": "Yuri",
	"lastName": "Rocha",
	"birthdate": "2000-10-25",
	"height": 1.85,
	"weight": 80.1
}

fetch('http://localhost:3000/api/person', {
	method: "POST",
	body: JSON.stringify(data),
	headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json()) 
.then(json => console.log(json));
```

### GET (Read all) 📖
**Request url:**
```
/api/person
```

**Example of expecting response:**
```json
{
	"everyone": [
		{
			"id": "5bd8c96a-2745-434b-891c-d9af8b872b77",
			"firstName": "Wesley",
			"lastName": "Souza",
			"height": 1.92,
			"weight": 85,
			"birthdate": "2000-10-28T00:00:00.000Z"
		},
		{
			"id": "6b589c6a-61c2-4255-bdeb-4e62edcd0279",
			"firstName": "Yuri",
			"lastName": "Rocha",
			"height": 1.85,
			"weight": 80.1,
			"birthdate": "2000-10-25T00:00:00.000Z"
		}
	]
}
```

**Example of how to use it in Javascript:**
```js
fetch('http://localhost:3000/api/person', {
	method: "GET",
	headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json()) 
.then(json => console.log(json));
```

### GET (Read people by name) 🔍

**Request url:**
```
/api/person/:name
```

**Example of expecting response:**
```json
{
	"found": [
		{
			"id": "6b589c6a-61c2-4255-bdeb-4e62edcd0279",
			"firstName": "Yuri",
			"lastName": "Rocha",
			"height": 1.8,
			"weight": 78.1,
			"birthdate": "2000-10-24T00:00:00.000Z"
		},
		{
			"id": "ad1909d8-8c94-44ce-898d-89de76198268",
			"firstName": "Yuri",
			"lastName": "Rosa",
			"height": 1.8,
			"weight": 75.4,
			"birthdate": "1998-10-25T00:00:00.000Z"
		}
	]
}
```

**Example of how to use it in Javascript:**
```js
fetch('http://localhost:3000/api/person/Yuri%20Ro', {
	method: "GET",
	headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json()) 
.then(json => console.log(json));
```

### PUT (Update a specific person) 📝

**Request's url:**
```
/api/person
```

**Example of request's body:**
```json
{
	"id" : "6b589c6a-61c2-4255-bdeb-4e62edcd0279",
	"firstName": "Yuri",
	"lastName": "Lemos",
	"birthdate": "2001-05-24",
	"height": 1.80,
	"weight": 78.1
}
```

**Expecting response:**

```json
{
	{
	"id": "6b589c6a-61c2-4255-bdeb-4e62edcd0279",
	"firstName": "Yuri",
	"lastName": "Lemos",
	"height": 1.8,
	"weight": 78.1,
	"birthdate": "2001-05-24"
    }
}
```

**Example of how to use it on JavaScript:**

```js
const data = {
	"id" : "6b589c6a-61c2-4255-bdeb-4e62edcd0279",
	"firstName": "Yuri",
	"lastName": "Lemos",
	"birthdate": "2001-05-24",
	"height": 1.80,
	"weight": 78.1
}

fetch('http://localhost:3000/api/person', {
	method: "PUT",
	body: JSON.stringify(data),
	headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json()) 
.then(json => console.log(json));
```

### DELETE (Removing a specif person) 🗑️

**Request url:**
```
/api/person/:uuid
```

**Example of expecting response:**
```json
{
	"deleteMessage": "Pessoa deletada com sucesso!"
}
```

**Example of how to use it in Javascript:**
```js
fetch('http://localhost:3000/api/person/6b589c6a-61c2-4255-bdeb-4e62edcd0279', {
	method: "DELETE",
	headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json()) 
.then(json => console.log(json));
```