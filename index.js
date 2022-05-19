const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = new express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
    ]
}

app.get("/game", (req, res) => {
    res.statusCode = 200
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

app.post("/game", (req, res) => {
    if (req.body) {
        const { title, year, price } = req.body

        DB.games.push({ id: 50, title, year, price })

        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
})

app.delete("/game/:id", (req, res) => {
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

app.put("/game/:id", (req, res) => {
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

app.listen(3000, () => {
    console.log("Server is on")
})
