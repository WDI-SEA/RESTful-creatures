const router = require('express').Router();
const fs = require('fs');

let dinosaurs = JSON.parse(fs.readFileSync(__dirname + '/../dinosaurs.json'));

router.get('/', (req, res) => {
  res.render('dinosaurs/index',{
    myDinos: dinosaurs
  });
})

router.get('/new', (req, res) => {
  res.render('dinosaurs/new');
})

router.post('/', (req, res) => {
  console.log(req.body);

  // Add to dinosaurs array
  dinosaurs.push(req.body);
  fs.writeFileSync(__dirname + '/../dinosaurs.json', JSON.stringify(dinosaurs));

  res.send(dinosaurs);
})

router.get('/:idx', (req, res) => {
  let dinoIndex = +req.params.idx;
  res.render('dinosaurs/show', {
    myDino: dinosaurs[dinoIndex]
  });
})

module.exports = router;