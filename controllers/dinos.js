app.get('/dinosaurs', function(req, res) {
    var dinosaurs = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinosaurs);

    var nameFilter = req.query.nameFilter;

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

app.get('/dinosaurs/:idx', function(req, res) {
    // get dinosaurs
    var dinosaurs = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinosaurs);
    //get array index from url parameter
    var dinoIndex = parseInt(req.params.idx);
    //render page with data of the specified animal
    res.render('show', {myDino: dinoData[dinoIndex]});
});