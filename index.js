let express = require('express')
let layouts = require('express-ejs-layouts')
let  fs = require('fs');
let app = express()

//middleware
app.set('view engine', 'ejs')
app.use(layouts)
app.use('/', express.static('static'))
app.use(express.urlencoded({extended: false}));

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