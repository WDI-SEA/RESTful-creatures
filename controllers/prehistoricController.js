let fs = require('fs')
let router = require('express').Router()

// CRYPTIDS
// lists all cryptids
router.get('/', (req, res) => {
  let cryptids = fs.readFileSync('./cryptids.json')
  let cryptidData = JSON.parse(cryptids)
  res.render('cryptids/index', {myCryptids: cryptidData})
})

router.post('/', (req, res) => {
  // read cryptids file
  let cryptids = fs.readFileSync('./cryptids.json');
  cryptids = JSON.parse(cryptids);

  // add item to cryptids array
  cryptids.push(req.body);

  // save cryptids to the data.json file
  fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));

  //redirect to the GET /cryptids route (index)
  res.redirect('/cryptids/' + (cryptids.length - 1))
})

// New cryptid form
router.get('/new', (req, res) => {
  res.render('cryptids/new')
})

// express show route for cryptids (lists one dinosaur)
router.get('/:idx', (req, res) => {
  // get cryptids
  let cryptids = fs.readFileSync('./cryptids.json')
  let cryptidData = JSON.parse(cryptids)

  // get array index from url parameter
  let cryptidIndex = parseInt(req.params.idx)

  // render page with data of the specified animal
  res.render('cryptids/show', {myCryptid: cryptidData[cryptidIndex]})
})

// express show route for cryptids (lists one dinosaur)
router.get('/edit/:idx', (req, res) => {
  // get cryptids
  let cryptids = fs.readFileSync('./cryptids.json')
  let cryptidData = JSON.parse(cryptids)

  // get array index from url parameter
  let cryptidIndex = parseInt(req.params.idx)

  // render page with data of the specified animal
  res.render('cryptids/edit', {myCryptid: cryptidData[cryptidIndex]})
})

router.put('/:oldname', (req, res) => {
  // get cryptids
  let cryptids = JSON.parse(fs.readFileSync('./cryptids.json'))

  // Get the cryptid matching the old name
  for (let i = 0; i < cryptids.length; i++) {
    if (cryptids[i].name === req.params.oldname) {
      cryptids[i].name = req.body.name
      cryptids[i].img_url = req.body.img_url
    }
  }

  // Write out the results of the change to the JSON file
  fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids))

  // Go back to index page
  res.redirect('/cryptids')
})

router.delete('/:idx', (req, res) => {
  // get cryptids
  let cryptids = JSON.parse(fs.readFileSync('./cryptids.json'))

  // Splice out the cryptid by the id given
  let index = parseInt(req.params.idx)
  cryptids.splice(index, 1)

  // Write out the results of the change to the JSON file
  fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids))

  // Go back to index page
  res.redirect('/cryptids')
})

module.exports = router