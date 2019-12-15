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


app.listen(3000, () => {
	console.log('Hello - listening to the smooth sounds of port 3000.')
  })