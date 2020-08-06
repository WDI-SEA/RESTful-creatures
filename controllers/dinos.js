let express = require('express')
let  fs = require('fs');
var methodOverride = require('method-override');
var router = express.Router()



//middleware
router.use(methodOverride('_method'));
router.use('/', express.static('static'))
router.use(express.urlencoded({extended: false}));

//routes - dinosaurs

router.delete('/:idx', function(req, res){
	var dinosaurs = fs.readFileSync('./dinosaurs.json');
	dinosaurs = JSON.parse(dinosaurs);
  
	// remove the deleted dinosaur from the dinosaurs array
	dinosaurs.splice(req.params.idx, 1)
  
	// save the new dinosaurs to the data.json file
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));
  
	//redirect to the GET /dinosaurs route (index)
	res.redirect('/dinosaurs');
  });

router.get('/', function(req, res) {
	var dinosaurs = fs.readFileSync('./dinosaurs.json');
	var dinoData = JSON.parse(dinosaurs);
  
	var nameFilter = req.query.nameFilter;
  
	if (nameFilter) {
	  dinoData = dinoData.filter(function(dino) {
		  console.log(dino.name.toLowerCase(), nameFilter.toLowerCase())
		return dino.name.toLowerCase() === nameFilter.toLowerCase();
	  });
	}
  
	res.render('dinosaurs/index', {myDinos: dinoData});
  });


router.get('/new', function(req, res){
	res.render('dinosaurs/new');
});

router.get('/edit/:idx', function(req, res){
	var dinosaurs = fs.readFileSync('./dinosaurs.json');
	var dinoData = JSON.parse(dinosaurs);
	res.render('dinosaurs/edit', {dino: dinoData[req.params.idx], dinoId: req.params.idx});
});

router.put('/:idx', function(req, res){
	var dinosaurs = fs.readFileSync('./dinosaurs.json');
	dinosaurs = JSON.parse(dinosaurs);
  
	//re-assign the name and type fields of the dinosaur to be editted
	dinosaurs[req.params.idx].name = req.body.name;
	dinosaurs[req.params.idx].type = req.body.type;
  
	 // save the editted dinosaurs to the data.json file
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));
	res.redirect('/dinosaurs');
  });

router.post('/', function(req, res) {
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


router.get('/:idx', function(req, res) {
	var dinosaurs = fs.readFileSync('./dinosaurs.json');
	var dinoData = JSON.parse(dinosaurs);
	var dinoIndex = parseInt(req.params.idx);
  
	if (dinoIndex>(dinoData.length-1) && typeof(dinoIndex) === 'number') {
		res.render('error')
	}
	else {
		res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
	}
});

module.exports = router