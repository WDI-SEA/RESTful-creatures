//require any needed modules
let express = require('express');
let layouts = require('express-ejs-layouts');

let app = express();







//Home route!!
app.get('/', (req, res) => {
    res.render('home')
  });
//Listen on a port
app.listen(3000, () => {console.log('🦊Sweet n Sour🐻')})