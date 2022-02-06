# authentication-api
This project is an test API for authentification, role-based permission and CRUD action to be implemented in other project.
The objective of this project is to build a strong and secure API to support my next projects.
## Test the API
You can test the API at https://api.test.nayzbysodium.com/api/v1 to discover bugs or vulnerability if you discorver bug or vulnerability you can contact me on discord NayZ.Sodium#5268 or do a pull request
## Documentation
### Register
```POST https://api.test.nayzbysodium.com/api/v1/auth/register```

Request
```json
{
  "username": "Skeleton",
  "email": "skeleton@example.com",
  "password": "secret",
  "passwordConfirm": "secret"
}
```

Response
```json
{
    "message": "Utilisateur créé.",
    "user": {
        "username": "Skeleton",
        "email": "skeleton@example.com",
        "role": "User"
    }
}
```
### Login
```POST https://api.test.nayzbysodium.com/api/v1/auth/login```

Request
```json
{
  "email": "skeleton@example.com",
  "password": "secret"
}
```

Response
```json
{
    "message": "Connexion au compte de skeleton@example.com réussite."
}
```
### Logout
```POST https://api.test.nayzbysodium.com/api/v1/auth/logout```

Response
```json
{
    "message": "Déconnexion du compte effectuée avec succès."
}
```
### Get All Users
```GET https://api.test.nayzbysodium.com/api/v1/users```

Response
```json
{
    "users": [
        {
            "_id": "62000c9189ccd12064329925",
            "username": "Pierres",
            "email": "pierres.boulanger@gmail.com",
            "role": "User",
            "__v": 0
        },
        {
            "_id": "62000cab89ccd12064329929",
            "username": "Jacques",
            "email": "jacques.durand@gmail.com",
            "role": "User",
            "__v": 0
        },
        {
            "_id": "62001acbbe96f5c280dbb122",
            "username": "Skeleton",
            "email": "skeleton@example.com",
            "role": "User",
            "__v": 0
        }
    ]
}
```
### Get User
```GET https://api.test.nayzbysodium.com/api/v1/users/62001acbbe96f5c280dbb122```

Response
```json
{
    "message": "Utilisateur skeleton@example.com obtenue.",
    "user": {
        "_id": "62001acbbe96f5c280dbb122",
        "username": "Skeleton",
        "email": "skeleton@example.com",
        "role": "User",
        "__v": 0
    }
}
```
### Update User
```PUT https://api.test.nayzbysodium.com/api/v1/users/62001acbbe96f5c280dbb122```

Request
```json
{
    "user": {
        "username": "SpookySkeleton"
    }
}
```

Response
```json
{
    "message": "Utilisateur skeleton@example.com édité.",
    "user": {
        "_id": "62001acbbe96f5c280dbb122",
        "username": "SpookySkeleton",
        "email": "skeleton@example.com",
        "role": "User",
        "__v": 0
    }
}
```
### Delete User
```DELETE https://api.test.nayzbysodium.com/api/v1/users/62001acbbe96f5c280dbb122```

Response
```json
{
    "message": "Utilisateur skeleton@example.com supprimé.",
    "user": {
        "_id": "62001acbbe96f5c280dbb122",
        "username": "SpookySkeleton",
        "email": "skeleton@example.com",
        "role": "User",
        "__v": 0
    }
}
```
