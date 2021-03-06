# API

## General

### Parameters

Most of the parameters are specified as a segment in the path.

For those which aren't, they can be encoded in JSON in the body of the request.

#### Authentication

The access token should be passed using cookie mechanism. 

	Cookie: Cookie:token={token}

A 401 "Unauthorized" response is sended back if the access token is not provided or does not correspond to an authenticated user.

### Error Codes

Server sends back 2xx responses if request has been handled successfully.
Otherwise, it sends back 4xx in case of failure - 403 "Forbidden" most of the time.

### Responses

Responses are sended back encoded in JSON.

### Structures

#### User

	struct User {
		* login **string**
		* passwd **string**
		* email **string**
		* imgUrl **string**
		* documents **{owner **[]{id **string**, title **string**}**, collaborator **[]{id, title}**}**
	}

## User

### Sign in

Sign in a user.

	POST /users/signin

#### Input
 
 * login **string**
 * passwd **string**

#### Response

200 "OK" if user and pass match and store the access token in a cookie.



### Sign out

Invalidate the token.

	POST /user/signout

#### Response

204 "No Content" if the access token is valid.

### Sign up

Sign up a new user. Perform the login in the same time in providing the access token in the response.

	POST /users/signup

#### Input

 * **{}User** : the new user

#### Response

201 "Created" if user doesn't exist and store the access token in a cookie.

### Get a single user

	GET /users/{login}

#### Response

200 "OK" if a valid login is provided.

 * **{}User** : user data

### Get the authenticated user

	GET /user

#### Response

200 "OK" if the user is authenticated.

 * **{}User** : user data

### Update the authenticated user

	PUT /user

#### Response

200 "OK" if the user is authenticated.

### Delete your account

Delete the authenticated user's account.

	DELETE /user

#### Response

204 "No Content".

### Get the login associated to a token

Should help you to check if a given token is valid.

	GET /token

#### Response

200 "OK" if the token is valid.
 * **string** : login

404 "Not Found" otherwise.

### Filter users by name

Get the users for which the login begins with the specified prefix.

#### Input
 * prefix **string**

#### Response

200 "OK" if there is at least one match.
204 "No Content" otherwise.

 * **[]{login **string**, imgUrl **string**}**

## Document

### Create a single document

Create a new document of which the owner is the authenticated user.

	POST /documents

#### Input

 * **{}Document** : the new document

#### Response

201 "Created"

 * **string** : uuid - the uuid of the new document

### Update a document

Update the document of which the id is given.

	PUT /documents/{id}

#### Input

 * **{}Document** : the updated document

#### Response

200 OK.

### Patch a document

Update a section of the document.

	PATCH /documents/{id}

#### Input
	# replace the content of section 0 by string "Hoho"
	{"replace":"/content/0/content", "value":"Hoho"}

#### Response

204 No content.

### Delete a document

	DELETE /documents/{id}

#### Response

204 "No Content".

### List your documents

List documents for the authenticated users.

	GET /documents

#### Response

200 "OK"

 * **{owner **[]{id **string**, title **string**}**, collaborator **[]{id, title}**}**

### List user documents

List documents for the specified user.

	GET /users/{user}/documents 

#### Response

200 "OK"

 * **{owner **[]{id **string**, title **string**}**, collaborator **[]{id, title}**}**

### Get a single document

Get a single document. If no version is provided, fetch the last version of the document.
Suffixing the URL with ".pdf" or ".odt" allows you to get a PDF or ODT document. Otherwise, JSON is provided.

	GET /documents/{id}[/versions/{version}][.pdf|.odt]

### Response

200 "OK".

 * **{}Document** : document
or
 * binary

### Get the last version of a document

	GET /documents/{id}/versions

### Response

200 "OK".

 * **{lastVersion **integer**}** 
