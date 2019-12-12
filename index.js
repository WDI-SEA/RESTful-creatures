let express = require('express')
let layouts = require('express-ejs-layouts')
var fs = require('fs');

let app = express()

app.set('view engine', 'ejs')
app.use(layouts)
app.use('/', express.static('static'))


//Routes
app.get('/', (req, res) => {
    res.render('home')
})

//List dinosaurs
app.get('/dinosaurs/index', (req, res) => {
    var dinosaurs = fs.readFileSync('./dinosaurs.json');
    console.log(dinosaurs);
    var dinoData = JSON.parse(dinosaurs);
    res.render('dinosaurs/index', {myDinos: dinoData});
  });

//express show route for dinosaurs (lists one dinosaur)
app.get('/dinosaurs/:idx', (req, res) => {
    // get dinosaurs
    var dinosaurs = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinosaurs);
  
    //get array index from url parameter
    var dinoIndex = parseInt(req.params.idx);
  
    //render page with data of the specified animal
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]});
  });

app.listen(3001)