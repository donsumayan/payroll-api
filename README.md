### API QUICK GUIDE

##### Common API Endpoints 
(Most endpoint have these methods except a select few)

Method | Endpoint | Description
-------|----------|------------
`GET` | `<entity>/list` |  Get a record of entities
`GET` |  `<entity>/:id` | Get one record based on id param
`POST`| `<entity>/` | Create one record <br>
`PUT` | `<entity>/:id`| Updates one record base on id param
`DELETE` | `<entity>/:id` | Deletes one record bas`e on id param
`POST` | `<entity>/import` | Import a list of entities

##### Entites endpoints:
`ex: http://localhost:3001/api/cost-center/list`
- cost-center 
- employee
- department
- pay-group
- bank
- auth
  
- file
- role
- user


#### Required headers
Name | value
 -----| ---
'User-Id' | `userId` current user id
'Authorization' | `Bearer ${token}` jwt token 