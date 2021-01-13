const express = require('express')
const app = express()
const layouts = require('express-ejs-layouts') // Because we're using express-ejs-layouts, we need to create a view/layouts.ejs.
const fs = require('fs') // Built-in node module so we don't have to npm i it.

// Middleware
app.set('view engine', 'ejs') // Because we're using ejs, we need a views folder. 
app.use(layouts)
// Body-parser middleware. Form data passed across an HTTPS request is called a payload. Access this payload via req.body, and the below line allows us to access the data as a JavaScript object via req.body. Below line tells express what type of data to expect.
app.use(express.urlencoded({extended: false}))

// Home route
app.get('/', (req, res) => {
    // app.send("Welcome to the home page!")
    res.render('home')
})

// Index route
app.get('/dinosaurs', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs) // Built-in javascript function. EJS can only read JavaScript, not JSON. (So we convert JSON to JS)
    // console.log(dinoData)
    res.render('dinosaurs/index.ejs', {myDinos: dinoData})
})

app.get('/dinosaurs/new', (req, res) => {
    res.render('dinosaurs/new.ejs')
})

// 'Show' route
app.get('/dinosaurs/:idx', (req, res) => {
    // get dinosaur data from json file.
    // console.log(req.params)
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // Get array index from URL parameter. 
    // 'params' key is always available on our request whenever we have a parameter such as :parameter in our URL.
    // URL values are always strings.
    let dinoIndex = parseInt(req.params.idx)

    // Render page with data of the specified animal.
    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

app.post('/dinosaurs', (req, res) => {
    // console.log('We\'ve hit the post route')
    // console.log(req.body) // Convert payload object into JavaScript object.
    // console.log(req.body.name) // name = "name"
    // console.log(req.body.type) // name = "type"

    // Read the dinosaurs json file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // Add new dino to the array.
    dinoData.push(req.body)

    // Save new dinosaurs array to the json file (Convert back to JSON).
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // A redirect is a get request, so this redirects to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs')
})



app.get('/prehistoric_creatures', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures) // Convert JSON to JavaScript.
    res.render('./prehistoric_creatures/index.ejs', {myCreatures: creatureData})
})

app.get('/prehistoric_creatures/new', (req, res) => {
    res.render('./prehistoric_creatures/new.ejs')
})

app.get('/prehistoric_creatures/:idx', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    let creatureIndex = parseInt(req.params.idx)
    res.render('./prehistoric_creatures/show.ejs', {myCreature: creatureData[creatureIndex]})
})

app.post('/prehistoric_creatures', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures) // Convert from JSON to JavaScript.
    creatureData.push(req.body)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData)) // Convert back to JSON.
    console.log(req.body)
    res.redirect('/prehistoric_creatures')
})

app.listen(3000, () => {
    console.log("On Wednesdays, we hang out in Port 3000")
})

// 'params' comes from URL bar, 'body' comes from forms submitted over HTTPS