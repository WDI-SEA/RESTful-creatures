let express = require('express')
let app = express()
let layouts = require('express-ejs-layouts')
let methodOverride = require('method-override')

//so we can access dinosaur data
let fs = require('fs')

//configurations
app.set('view engine',  'ejs')
app.use(layouts)
//body-parser middleware
app.use(express.urlencoded({extended: false}))

app.use(methodOverride('_method'))

//home route
app.get('/', (req,res) => {
    res.render('home')
})

/*------------- DINOSAURS --------------*/
app.use('/dinosaurs', require('./controllers/dinos'))


/*------------- CRYPTIDS --------------*/
app.use('/cryptids', require('./controllers/cryptids'))


app.listen(8000, () => {
    console.log('👂🏻👂🏻👂🏻👂🏻')
})