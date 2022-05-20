# Intro-API-REST-Backend
Esta API é um exemplo para documentação de uma API REST
## Endpoints

### GET /game
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados

#### Parâmetros
Nenhum

#### Respostas
##### OK! 200
Caso seja essa resposta, você recebe a listagem dos games

Exemplo de resposta:
```
{
    "games": [
        {
            "id": 23,
            "title": "Bomberman",
            "year": "1997",
            "price": 60
        },
        {
            "id": 65,
            "title": "Duke Nuken",
            "year": "1996",
            "price": 80
        },
        {
            "id": 1,
            "title": "Quake",
            "year": "1995",
            "price": 100
        }
    ],
    "users": [
        {
            "id": 1,
            "name": "julio",
            "email": "julio@com",
            "password": "123"
        },
        {
            "id": 2,
            "name": "lu",
            "email": "lu@com",
            "password": "456"
        }
    ]
}
```
##### Falha na autenticação! 401
Aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido ou expirado
```
{
    "err": "Token inválido"
}
```

## Endpoints

### POST /auth
Esse endpoint é responsável por fazer o processo de login

#### Parâmetros
email: email do usuário cadastrado no sistema
password: email do usuário cadastrado no sistema

Exemplo: 
```
{
    "email" : "julio@com",
    "password": "123"
}
```
#### Respostas
##### OK! 200
Caso seja essa resposta, você recebe o token de autenticação

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqdWxpb0Bjb20iLCJpYXQiOjE2NTMwNTI4NjAsImV4cCI6MTY1MzIyNTY2MH0.a95h2m4wwgSIW-Z2SEqfiS7old1l6mYmCx685LPZzjM"
}
```
##### Falha na autenticação! 401
Aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Emails ou senhas incorretos
```
{
    "err": "Credenciais inválidas!"
}
```

