# rest-api

## Description

Simple API with login, register, and CRUD features. Using JWT, mangoose as ODM, and mongodb as database

## API user

Main URL : ```http://localhost:3000```

Method |URL | Description
------------ |------------ | -------------
POST | ```/api/login``` | Login
POST | ```/api/register/``` | Register
GET | ```/api/users/``` | get all users (admin only)
GET | ```/api/users/:id``` | get one user (user* & admin)
PUT | ```/api/users/:id``` | Edit user (user* & admin)
DELETE | ```/api/users/:id``` | Delete user (user* & admin)

user just can edit and delete itself

## USAGE

```
npm start
```
