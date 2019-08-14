let fs = require('fs')
let router = require('express').Router()


router.get('/', (req, res) => {
    const dinosaurs = fs.readFileSync(__dirname + "/../dinos.json")
    const dinoData = JSON.parse(dinosaurs);
    console.log(dinoData)
    res.render('dinos/index', {
        myDinos: dinoData
    })
})

router.post('/', (req, res) => {
    console.log(req.body);
    // READ THE DINOSAURS FILE
    var dinosaurs = fs.readFileSync(__dirname + "/../dinos.json")
    var dinoData = JSON.parse(dinosaurs)
    
    // ADDS TO THE DINOSAURS ARRAY
    dinoData.push(req.body);

    //SAVE THE DINOSAURS TO THE DINOSAURS.JSON FILE
    fs.writeFileSync(__dirname + "/../dinos.json", JSON.stringify(dinoData))
    
    //REDIRECTS NEW DATA TO THE MAIN PAGE
    res.redirect('/dinos')
})

router.get('/new', (req, res) => {
    res.render('dinos/new');
})

router.get('/:idx', (req, res) => {
    const dinosaurs = fs.readFileSync(__dirname + "/../dinos.json")
    const dinoData = JSON.parse(dinosaurs)

    //get the idx value from the url parameters
    var dinoIndex = parseInt(req.params.idx);
    res.render('dinos/show', {
        myDino: dinoData[dinoIndex]
    })
})




module.exports = router;