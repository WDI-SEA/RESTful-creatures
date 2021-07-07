let express = require('express')
let app = express()
let fs = require('fs')

app.set('view engine', 'ejs')
//body-parser middleware
app.use(express.urlencoded({extended: false}))

app.use('/', require('./controllers/dinosaurs'))
app.use('/', require('./controllers/cryptids'))

app.listen(3000)