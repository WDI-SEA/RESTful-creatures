let express = require('express')
let layouts = require('express-ejs-layouts')
let  fs = require('fs');


let app = express()

// Set up and middleware
app.set('view engine', 'ejs')
app.use(layouts)
app.use('/', express.static('static'))

app.get('/dinosaurs', function(req, res) {
	var dinosaurs = fs.readFileSync('./dinosaurs.json');
	var dinoData = JSON.parse(dinosaurs);
	res.render('dinosaurs/index', {myDinos: dinoData});
  });

app.get('/dinosaurs/:idx', function(req, res) {
var dinosaurs = fs.readFileSync('./dinosaurs.json');
var dinoData = JSON.parse(dinosaurs);
var dinoIndex = parseInt(req.params.idx);
	if (dinoIndex<dinoData.length) {
		res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
	}
	else {
		res.render('error')
	}
res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]});
});


app.listen(3000, () => {
	console.log('Hello - listening to the smooth sounds of port 3000.')
  })