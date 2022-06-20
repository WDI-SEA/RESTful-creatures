let fs = require('fs')
let router = require('express').Router()

// DINOSAURS
// lists all dinosaurs
router.get('/', (req, res) => {
  let dinosaurs = fs.readFileSync('./dinosaurs.json')
  let dinoData = JSON.parse(dinosaurs)
  res.render('dinosaurs/index', {myDinos: dinoData})
})

router.post('/', (req, res) => {
  // read dinosaurs file
  let dinosaurs = fs.readFileSync('./dinosaurs.json');
  dinosaurs = JSON.parse(dinosaurs);

  // add item to dinosaurs array
  dinosaurs.push(req.body);

  // save dinosaurs to the data.json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));

  //redirect to the GET /dinosaurs route (index)
  res.redirect('/dinosaurs/' + (dinosaurs.length - 1))
})

// New dino form
router.get('/new', (req, res) => {
  res.render('dinosaurs/new')
})

// express show route for dinosaurs (lists one dinosaur)
router.get('/:idx', (req, res) => {
  // get dinosaurs
  let dinosaurs = fs.readFileSync('./dinosaurs.json')
  let dinoData = JSON.parse(dinosaurs)

  // get array index from url parameter
  let dinoIndex = parseInt(req.params.idx)

  // render page with data of the specified animal
  res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
})

module.exports = router