let fs = require('fs')
let router = require('express').Router()


router.get('/', (req, res) => {
    const cryptids = fs.readFileSync(__dirname + "/../cryptids.json")
    const cryptidsData = JSON.parse(cryptids);
    console.log(cryptidsData)
    res.render('cryptids/index', {
        myCryptids: cryptidsData
    })
})

router.post('/', (req, res) => {
    console.log(req.body);
    // READ THE cryptids FILE
    var cryptids = fs.readFileSync(__dirname + "/../cryptids.json")
    var cryptidsData = JSON.parse(cryptids)
    
    // ADDS TO THE cryptids ARRAY
    cryptidsData.push(req.body);

    //SAVE THE cryptids TO THE cryptids.JSON FILE
    fs.writeFileSync(__dirname + "/../cryptids.json", JSON.stringify(cryptidsData))
    
    //REDIRECTS NEW DATA TO THE MAIN PAGE
    res.redirect('/cryptids')
})

router.get('/new', (req, res) => {
    res.render('cryptids/new');
})

router.get('/:idx', (req, res) => {
    const cryptids = fs.readFileSync(__dirname + "/../cryptids.json")
    const cryptidsData = JSON.parse(cryptids)

    //get the idx value from the url parameters
    var cryptidsIndex = parseInt(req.params.idx);
    res.render('cryptids/show', {
        myCryptids: cryptidsData[cryptidsIndex]
    })
})




module.exports = router;