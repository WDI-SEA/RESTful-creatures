let router = require('express').Router()
let fs = require('fs')

router.get('/dinosaurs', function(req, res) {
    var dinosaurs = fs.readFileSync('./dinosaurs.json')
    var dinoData = JSON.parse(dinosaurs)
  
    var nameFilter = req.query.nameFilter
  
    if (nameFilter) {
      dinoData = dinoData.filter(function(dino) {
        return dino.name.toLowerCase() === nameFilter.toLowerCase()
      })
    }
  
    res.render('dinosaurs/index', {myDinos: dinoData})
})

// lists all dinosaurs
router.get('/dinosaurs', function(req, res) {
    var dinosaurs = fs.readFileSync('./dinosaurs.json')
    var dinoData = JSON.parse(dinosaurs)
    res.render('dinosaurs/index', {myDinos: dinoData})
})

router.get('/dinosaurs/new', function(req, res){
    res.render('dinosaurs/new')
})

router.post('/dinosaurs', function(req, res) {
    // read dinosaurs file
    var dinosaurs = fs.readFileSync('./dinosaurs.json')
    dinosaurs = JSON.parse(dinosaurs)
  
    // add item to dinosaurs array
    dinosaurs.push(req.body)
  
    // save dinosaurs to the data.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs))
  
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs')
})

//express show route for dinosaurs (lists one dinosaur)
router.get('/dinosaurs/:idx', function(req, res) {
    // get dinosaurs
    var dinosaurs = fs.readFileSync('./dinosaurs.json')
    var dinoData = JSON.parse(dinosaurs)
  
    //get array index from url parameter
    var dinoIndex = parseInt(req.params.idx)
  
    //render page with data of the specified animal
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
})

module.exports = router