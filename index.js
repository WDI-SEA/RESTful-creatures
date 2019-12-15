let express = require('express')
let layouts = require('express-ejs-layouts')
let  fs = require('fs');
let app = express()
var methodOverride = require('method-override');

//middleware
app.use(methodOverride('_method'));
app.set('view engine', 'ejs')
app.use(layouts)
app.use('/', express.static('static'))
app.use(express.urlencoded({extended: false}));


app.delete('/dinosaurs/:idx', function(req, res){
	var dinosaurs = fs.readFileSync('./dinosaurs.json');
	dinosaurs = JSON.parse(dinosaurs);
  
	// remove the deleted dinosaur from the dinosaurs array
	dinosaurs.splice(req.params.idx, 1)
  
	// save the new dinosaurs to the data.json file
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));
  
	//redirect to the GET /dinosaurs route (index)
	res.redirect('/dinosaurs');
  });

//routes
// app.get('/dinosaurs', function(req, res) {
// 	var dinosaurs = fs.readFileSync('./dinosaurs.json');
// 	var dinoData = JSON.parse(dinosaurs);
// 	res.render('dinosaurs/index', {myDinos: dinoData});
//   });

app.get('/dinosaurs', function(req, res) {
	var dinosaurs = fs.readFileSync('./dinosaurs.json');
	var dinoData = JSON.parse(dinosaurs);
	console.log(dinoData)
	var nameFilter = req.query.nameFilter;
	console.log(nameFilter)

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

app.get('/dinosaurs/edit/:idx', function(req, res){
	var dinosaurs = fs.readFileSync('./dinosaurs.json');
	var dinoData = JSON.parse(dinosaurs);
	res.render('dinosaurs/edit', {dino: dinoData[req.params.idx], dinoId: req.params.idx});
});

app.put('/dinosaurs/:idx', function(req, res){
	var dinosaurs = fs.readFileSync('./dinosaurs.json');
	dinosaurs = JSON.parse(dinosaurs);
  
	//re-assign the name and type fields of the dinosaur to be editted
	dinosaurs[req.params.idx].name = req.body.name;
	dinosaurs[req.params.idx].type = req.body.type;
  
	 // save the editted dinosaurs to the data.json file
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));
	res.redirect('/dinosaurs');
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


app.get('/dinosaurs/:idx', function(req, res) {
	var dinosaurs = fs.readFileSync('./dinosaurs.json');
	var dinoData = JSON.parse(dinosaurs);
	var dinoIndex = parseInt(req.params.idx);
  
	res.render('dinosaurs/index', {myDinos: dinoData});
	if (dinoIndex>(dinoData.length-1) && typeof(dinoIndex) === 'number') {
		res.render('error')
	}
	else {
		res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
	}
});


app.listen(3000, () => {
	console.log('Hello - listening to the smooth sounds of port 3000.')
  })