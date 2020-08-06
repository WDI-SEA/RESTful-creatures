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

//home route

app.get('/', function(req, res) {
	res.render('home')
})


// bring in controllers
app.use('/dinosaurs', require('./controllers/dinos'))
app.use('/cryptids', require('./controllers/cryptids'))


app.listen(3000, () => {
	console.log('Hello - listening to the smooth sounds of port 3000.')
  })