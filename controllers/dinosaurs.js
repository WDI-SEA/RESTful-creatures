const express = require('express')
const router = express.Router()
const fs = require('fs')

// Index route
router.get('/', (req, res) => {
    let dinosaurs = fs.readFileSync('dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs) // Built-in javascript function. EJS can only read JavaScript, not JSON. (So we convert JSON to JS)
    // console.log(dinoData)
    res.render('dinosaurs/index.ejs', {myDinos: dinoData})
})

router.get('/new', (req, res) => {
    res.render('dinosaurs/new.ejs')
})


// Edit each dino. 
router.get('/edit/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = req.params.idx
    let myDino = dinoData[dinoIndex]
    res.render('dinosaurs/edit.ejs', {
        myDino: myDino,
        myIndex: dinoIndex})
})


// 'Show' route
router.get('/:idx', (req, res) => {
    // get dinosaur data from json file.
    // console.log(req.params)
    let dinosaurs = fs.readFileSync('dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // Get array index from URL parameter. 
    // 'params' key is always available on our request whenever we have a parameter such as :parameter in our URL.
    // URL values are always strings.
    let dinoIndex = parseInt(req.params.idx)

    // Render page with data of the specified animal.
    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

router.post('/', (req, res) => {
    // console.log('We\'ve hit the post route')
    // console.log(req.body) // Convert payload object into JavaScript object.
    // console.log(req.body.name) // name = "name"
    // console.log(req.body.type) // name = "type"

    // Read the dinosaurs json file
    let dinosaurs = fs.readFileSync('dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // Add new dino to the array.
    dinoData.push(req.body)

    // Save new dinosaurs array to the json file (Convert back to JSON).
    fs.writeFileSync('dinosaurs.json', JSON.stringify(dinoData))

    // A redirect is a get request, so this redirects to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs')
})

router.delete('/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData.splice(req.params.idx, 1) // Remove 1 element starting at the idx index. Destructive method.
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

router.put('/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    console.log(req.body)
    dinoData[req.params.idx] = req.body
    // dinoData[req.params.idx].name = req.body.name
    // dinoData[req.params.idx].type = req.body.type
    
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

module.exports = router