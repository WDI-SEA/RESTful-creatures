let express = require('express')
var fs = require('fs')
var ejsLayouts = require('express-ejs-layouts')

// Declare our app variable
let app = express()

// Settings and middleware
app.set('view engine', 'ejs')

// lists all dinosaurs
app.get('/dinosaurs', function(req, res) {
  var dinosaurs = fs.readFileSync('./dinosaurs.json');
  var dinoData = JSON.parse(dinosaurs);
  res.render('dinosaurs/index', {myDinos: dinoData});
  console.log(dinoData);
});

app.get('/dinosaurs/new', function(req, res){
  res.render('dinosaurs/new');
});

app.set('view engine', 'ejs');
app.use(ejsLayouts);
//body-parser middleware
app.use(express.urlencoded({extended: false}));

app.post('/dinosaurs', function(req, res) {
  console.log(req.body);
});

app.post('/dinosaurs', function(req, res) {
  // read dinosaurs file
  var dinosaurs = fs.readFileSync('./dinosaurs.json');
  dinosaurs = JSON.parse(dinosaurs);

  // add item to dinosaurs array
  dinosaurs.push(req.body);

  // save dinosaurs to the data.json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));

  //redirect to the GET /dinosaurs route (index)
  res.redirect('/dinosaurs');
});

//express show route for dinosaurs (lists one dinosaur)
app.get('/dinosaurs/:idx', function(req, res) {
  // get dinosaurs
  var dinosaurs = fs.readFileSync('./dinosaurs.json');
  var dinoData = JSON.parse(dinosaurs);

  var nameFilter = req.query.nameFilter;

if (nameFilter) {
  dinoData = dinoData.filter(function(dino) {
    return dino.name.toLowerCase() === nameFilter.toLowerCase();
  });
}

  //get array index from url parameter
  var dinoIndex = parseInt(req.params.idx);

//render page with data of the specified animal
  res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]});
});

// res.render('dinosaurs/index', {myDinos: dinoData});

// lists all dinosaurs
app.get('/cryptids', function(req, res) {
  var cryptids = fs.readFileSync('./cryptids.json');
  var cryptData = JSON.parse(cryptids);
  res.render('cryptids/index', {myCryptids: cryptData});
  console.log(cryptData);
});

app.get('/cryptids/new', function(req, res){
  res.render('cryptids/new');
});

app.set('view engine', 'ejs');
app.use(ejsLayouts);
//body-parser middleware
app.use(express.urlencoded({extended: false}));

app.post('/cryptids', function(req, res) {
  console.log(req.body);
});

app.post('/cryptids', function(req, res) {
  // read dinosaurs file
  var cryptids = fs.readFileSync('./cryptids.json');
  cryptids= JSON.parse(cryptids);

  // add item to dinosaurs array
  cryptids.push(req.body);

  // save dinosaurs to the data.json file
  fs.writeFileSync('./cryptids.json', JSON.cryptids(dinosaurs));

  //redirect to the GET /dinosaurs route (index)
  res.redirect('/cryptids');
});

//express show route for cryptids (lists one cryptid)
app.get('/cryptids/:idx', function(req, res) {
  // get crypitds
  var cryptids = fs.readFileSync('./cryptids.json');
  var cryptData = JSON.parse(crytpids);

  var nameFilter = req.query.nameFilter;

if (nameFilter) {
  cryptData = cryptData.filter(function(crypt) {
    return crypt.name.toLowerCase() === nameFilter.toLowerCase();
  });
}

  //get array index from url parameter
  var cryptIndex = parseInt(req.params.idx);

//render page with data of the specified animal
  res.render('cryptids/show', {myCryptids: cryptData[cryptIndex]});
});


// res.render('cryptids/index', {myCryptids: cryptData});


// Listen on a port
app.listen(3000, () => {
  console.log("Running on 3000")
})