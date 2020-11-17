//require any needed modules
let express = require('express');
let layouts = require('express-ejs-layouts');
var fs = require('fs');

let app = express();


app.set('view engine', 'ejs');
// app.use(layouts)

//Body parser
app.use(express.urlencoded({ extended: false }))

// // lists all dinosaurs
app.get('/dinosaurs', function(req, res) {
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

app.get('/dinosaurs/:idx', function(req, res) {
    // get dinosaurs
    var dinosaurs = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinosaurs);
    //get array index from url parameter
    var dinoIndex = parseInt(req.params.idx);
    //render page with data of the specified animal
    res.render('show', {myDino: dinoData[dinoIndex]});
});

/* ----------- Cryptids GET! --------------- */
app.get('/cryptids', function(req, res) {
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


/* --------- Dinosaurs POST! ---------- */

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

//Listen on a port
app.listen(3000, () => {console.log('🦊Hot n Spicy🐻')})