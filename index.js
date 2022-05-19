const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const env = require("./.env") // deve-se criar esse arquivo com variável contendo a chave usada pelo jwt

const app = new express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

function auth(req, res, next) {
    const userToken = req.headers['authorization']

    if (userToken) {
        const bearerToken = userToken.split(" ")
        jwt.verify(bearerToken[1], env.authSecret, (error, data) => {
            if (error) {
                res.status(401)
                res.json({ err: "Token inválido" })
            } else {
                req.user = {
                    id: data.id,
                    email: data.email,
                    token: bearerToken[1]
                }
                next()
            }
        })
    } else {
        res.status(401)
        res.json({ err: "Token inválido" })
    }
}

const DB = {
    games: [
        {
            id: 23,
            title: "Bomberman",
            year: "1997",
            price: 60
        },
        {
            id: 65,
            title: "Duke Nuken",
            year: "1996",
            price: 80
        },
        {
            id: 1,
            title: "Quake",
            year: "1995",
            price: 100
        }
    ],
    users: [
        {
            id: 1,
            name: "julio",
            email: "julio@com",
            password: "123"
        },
        {
            id: 2,
            name: "lu",
            email: "lu@com",
            password: "456"
        }
    ]
}

app.get("/game", auth, (req, res) => {
    res.statusCode = 200
    //res.json(req.user) // essa variável foi criada no middleware
    res.json(DB)
})


app.get("/game/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        const game = DB.games.find(g => g.id == parseInt(req.params.id))

        if (game) {
            res.statusCode = 200
            res.json(game)
        } else {
            res.sendStatus(404)
        }
    }
})

app.post("/game", auth, (req, res) => {
    if (req.body) {
        const { title, year, price } = req.body

        DB.games.push({ id: 50, title, year, price })

        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
})

app.delete("/game/:id", auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        const index = DB.games.findIndex(g => g.id == parseInt(req.params.id))

        if (index >= 0) {
            DB.games.splice(index, 1)
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    }
})

app.put("/game/:id", auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        const game = DB.games.find(g => g.id == parseInt(req.params.id))

        if (game) {
            const { title, year, price } = req.body

            game.title = title
            game.year = year
            game.price = price

            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    }
})

app.post("/auth", (req, res) => {
    const { email, password } = req.body

    if (email) {
        const user = DB.users.find(user => user.email == email)

        if (user) {
            if (user.password == password) {
                jwt.sign({ id: user.id, email: user.email }, env.authSecret, { expiresIn: '48h' }, (err, token) => {
                    if (err) {
                        res.status(400)
                        res.json({ err: "Falha interna" })
                    } else {
                        res.status(200)
                        res.json({ token })
                    }
                })
            } else {
                res.status(401)
                res.json({ err: "Credenciais inválidas!" })
            }
        } else {
            res.status(404)
            res.json({ err: "Usuário não encontrado!" })
        }
    } else {
        res.status(400)
        res.json({ err: "E-mail inválido" })
    }
})

app.listen(3000, () => {
    console.log("Server is on")
})
