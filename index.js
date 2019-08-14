const express = require('express');
const layouts = require('express-ejs-layouts');

const app = express();

// Express middleware and configs
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(layouts);
app.use(express.static('static'));


// Controller routes
app.use('/dinosaurs', require('./controllers/dinosaurs'));
app.use('/cryptids', require('./controllers/cryptids'));

app.get('/', (req, res) => {
  res.render('home');
})


/////////////////////////////////////////////
app.get('*', (req, res) => {
  res.render('404');
})

app.listen(3000, (err) => {
  if (err) {
    console.log('Error!');
  }
});