let express = require('express')
let app = express()
// let ejsLayouts = require('express-ejs-layouts')
var fs = require('fs');


app.set('view engine', 'ejs');
// app.use(ejsLayouts);
//body-parser middleware
app.use(express.urlencoded({extended: false}));
// app.use('/dinosaurs', require('./controllers/dinosaurs'))
// app.use('/cryptids', require('./controllers/cryptids'))

//Include controllers (AKA routers)
app.use('/dinos', require('./controllers/dinos'))
app.use('/cryptids', require('./controllers/cryptids'))


// DINOSAURS ---------------------------------------
app.get('/dinosaurs', (req, res) => {
    var dinosaurs = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinosaurs);


    var nameFilter = req.query.nameFilter;
  
    if (nameFilter) {
      dinoData = dinoData.filter(function(dino) {
        return dino.name.toLowerCase() === nameFilter.toLowerCase();
      });
    }

    res.render('dinosaurs/index', {myDinos: dinoData});
});

app.get('/dinosaurs/new', function(req, res){
    res.render('dinosaurs/new');
});

//Express show route for dinosaurs (lists one dinosaur)
app.get('/dinosaurs/:idx', function(req, res) {
    // get dinosaurs
    var dinosaurs = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinosaurs);
  
    //get array index from url parameter
    var dinoIndex = parseInt(req.params.idx);
  
    //render page with data of the specified animal
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]});
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

//CRYPTIDS -----------------------------------------

app.get('/cryptids', (req, res) => {
    var cryptids = fs.readFileSync('./cryptids.json');
    var crypData = JSON.parse(cryptids);


    // var nameFilter = req.query.nameFilter;
  
    // if (nameFilter) {
    //   dinoData = dinoData.filter(function(dino) {
    //     return dino.name.toLowerCase() === nameFilter.toLowerCase();
    //   });
    // }

    res.render('cryptids/index', {myCryps: crypData});
});

app.get('/cryptids/new', function(req, res){
    res.render('cryptids/new');
});

app.get('/cryptids/:idx', function(req, res) {
    // get cryptids
    var cryptids = fs.readFileSync('./cryptids.json');
    var crypData = JSON.parse(cryptids);
  
    //get array index from url parameter
    var crypIndex = parseInt(req.params.idx);
  
    //render page with data of the specified animal
    res.render('cryptids/show', {myCryp: crypData[crypIndex]});
});



app.post('/cryptids', function(req, res) {
    // read cryptids file
    var cryptids = fs.readFileSync('./cryptids.json');
    cryptids = JSON.parse(cryptids);
  
    // add item to cryptids array
    cryptids.push(req.body);
  
    // save cryptids to the data.json file
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));
  
    //redirect to the GET /cryptids route (index)
    res.redirect('/cryptids');
});




//Listen at this port
app.listen(8000)