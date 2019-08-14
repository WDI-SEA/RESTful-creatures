let express = require('express')
let layout = require('express-ejs-layouts')

let app = express()

// middleware and configs
app.set('view engine', 'ejs')

// middleware that puts the form data into a req.body
app.use(express.urlencoded({ extended: false}))

// routes for pages
app.use('/dinos', require('./controllers/dinos'))
app.use('/cryptids', require('./controllers/cryptids'))

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/cryptids', (req, res) => {
    res.render('home')
})

app.get('/*', (req, res) => {
    res.render('404')
})



// listen on port
app.listen(4000, () => {
    console.log("port is live on 4000")
})


