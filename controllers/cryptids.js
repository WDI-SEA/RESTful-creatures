let express = require('express')
let  fs = require('fs');
var methodOverride = require('method-override');
var router = express.Router()


//middleware
router.use(methodOverride('_method'));
router.use('/', express.static('static'))
router.use(express.urlencoded({extended: false}));


//routes - cryptids

router.delete('/:idx', function(req, res){
	var cryptids = fs.readFileSync('./cryptids.json');
	cryptids = JSON.parse(cryptids);
  
	// remove the deleted cryptid from the cryptids array
	cryptids.splice(req.params.idx, 1)
  
	// save the new cryptids to the data.json file
	fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));
  
	//redirect to the GET /cryptids route (index)
	res.redirect('/cryptids');
  });

router.get('/', function(req, res) {
	var cryptids = fs.readFileSync('./cryptids.json');
	var cryptidData = JSON.parse(cryptids);
  
	var nameFilter = req.query.nameFilter;
  
	if (nameFilter) {
	  cryptidData = cryptidData.filter(function(cryptid) {
		  console.log(cryptid.name.toLowerCase(), nameFilter.toLowerCase())
		return cryptid.name.toLowerCase() === nameFilter.toLowerCase();
	  });
	}
  
	res.render('cryptids/index', {myCryptids: cryptidData});
  });


router.get('/new', function(req, res){
	res.render('cryptids/new');
});

router.get('/edit/:idx', function(req, res){
	var cryptids = fs.readFileSync('./cryptids.json');
	var cryptidData = JSON.parse(cryptids);
	res.render('cryptids/edit', {cryptid: cryptidData[req.params.idx], cryptidId: req.params.idx});
});

router.put('/:idx', function(req, res){
	var cryptids = fs.readFileSync('./cryptids.json');
	cryptids = JSON.parse(cryptids);
  
	//re-assign the name and type fields of the dinosaur to be editted
	cryptids[req.params.idx].name = req.body.name;
	cryptids[req.params.idx].type = req.body.type;
  
	 // save the editted cryptids to the data.json file
	fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));
	res.redirect('/cryptids');
  });

router.post('/', function(req, res) {
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


router.get('/:idx', function(req, res) {
	var cryptids = fs.readFileSync('./cryptids.json');
	var cryptidData = JSON.parse(cryptids);
	var cryptidIndex = parseInt(req.params.idx);
  
	if (cryptidIndex>(cryptidData.length-1) && typeof(cryptidIndex) === 'number') {
		res.render('error')
	}
	else {
		res.render('cryptids/show', {myCryptid: cryptidData[cryptidIndex]})
	}
});







module.exports = router