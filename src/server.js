const express = require("express")
const server = express()

const db = require("./database/db")

server.use(express.static("public"))
server.use(express.urlencoded({ extended: true }))

// Utilizando a template engine (Nunjucks) 
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Rotas
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {

    return res.render("create-point.html" )
})

server.post("/savepoint", (req, res) => {

    // Inserir dados na tabela
    const query = `
        INSERT INT places (
            image, 
            name,
            address, 
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name, 
        req.body.address, 
        req.body.address2, 
        req.body.state, 
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err){
            console.log(err)
            return res.render("partials/registration-error.html", { error: true })
        }

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        //Pesquisa vázia
        return res.render("search-results.html", { total: 0})
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) return console.log(err)

        const total = rows.length

        return res.render("search-results.html", { places: rows, total })
    })

})


server.listen(3000, () => {
    console.log("Server is running!")
})