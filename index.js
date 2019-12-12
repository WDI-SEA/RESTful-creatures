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


res.render('dinosaurs/index', {myDinos: dinoData});


// Listen on a port
app.listen(3000, () => {
  console.log("Running on 3000")
})