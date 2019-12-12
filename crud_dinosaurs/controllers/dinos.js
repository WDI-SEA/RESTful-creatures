let router = require('express').Router()
let fs = require('fs')

//index route - lists all dinosaurs
router.get('/', function(req, res) {
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

//form route - has to come before show in order for show route to work properly
router.get('/new', (req, res) => {
    res.render('dinosaurs/new')
})

//show route for dinosaurs, lists one dinosaur
router.get('/:idx', (req, res) => {
    //get dinosaurs
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    //get array index from url paramater
    let dinoIndex = parseInt(req.params.idx)

    //render page with data of the specified animal
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
})

//POST ROUTE
router.post('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    dinosaurs = JSON.parse(dinosaurs)

    //add item to dinosaurs array
    dinosaurs.push(req.body)

    //save dinosaurs to the data json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs))

    //redirect to the GET /dinosaurs route (index)
    // res.redirect('/dinosaurs')

    //redirect to dinosaur just created
    res.redirect('/dinosaurs/' + (dinosaurs.length-1))
})


module.exports = router