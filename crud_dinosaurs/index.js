const express = require('express')
const app = express()
const layouts = require('express-ejs-layouts')

//so we can access dinosaur data
let fs = require('fs')

//configurations
app.set('view engine',  'ejs')
app.use(layouts)
//body-parser middleware
app.use(express.urlencoded({extended: false}))

//home route
app.get('/', (req,res) => {
    res.render('home')
})

//form route - has to come before show in order for show route to work properly
app.get('/dinosaurs/new', (req, res) => {
    res.render('dinosaurs/new')
})

//show route for dinosaurs, lists one dinosaur
app.get('/dinosaurs/:idx', (req, res) => {
    //get dinosaurs
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    //get array index from url paramater
    let dinoIndex = parseInt(req.params.idx)

    //render page with data of the specified animal
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
})


//index route - lists all dinosaurs
app.get('/dinosaurs', function(req, res) {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    //for search filter:
    let nameFilter = req.query.nameFilter

    if (nameFilter) {
        dinoData = dinoData.filter(dino => {
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('dinosaurs/index', {myDinos: dinoData})
  })


//POST ROUTE
app.post('/dinosaurs', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    dinosaurs = JSON.parse(dinosaurs)

    //add item to dinosaurs array
    dinosaurs.push(req.body)

    //save dinosaurs to the data json file
    fs. writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs))

    //redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs')
})



app.listen(8000)