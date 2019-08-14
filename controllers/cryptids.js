const router = require('express').Router();
const fs = require('fs');

let cryptids = JSON.parse(fs.readFileSync(__dirname + '/../cryptids.json'));

router.get('/', (req, res) => {
  res.render('cryptids/index',{
    myCryptids: cryptids
  });
})

router.get('/new', (req, res) => {
  res.render('cryptids/new');
})

router.post('/', (req, res) => {
  console.log(req.body);

  // Add to cryptids array
  cryptids.push(req.body);
  fs.writeFileSync(__dirname + '/../cryptids.json', JSON.stringify(cryptids));

  res.send(cryptids);
})

router.get('/:idx', (req, res) => {
  let cryptidIndex = +req.params.idx;
  res.render('cryptids/show', {
    myCryptid: cryptids[cryptidIndex]
  });
})

module.exports = router;