let router = require('express').Router()
let fs = require('fs')

//displays all cryptids
router.get('/cryptids', function(req, res) {
    var cryptids = fs.readFileSync('./cryptids.json')
    var cryptData = JSON.parse(cryptids)
    res.render('cryptids/index', {myCryptids: cryptData})
})

router.post('/cryptids', function(req, res) {
    // read cryptids file
    var cryptids = fs.readFileSync('./cryptids.json')
    cryptids = JSON.parse(cryptids)
  
    // add item to cryptids array
    cryptids.push(req.body)
  
    // save cryptids to the data.json file
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids))
  
    //redirect to the GET /cryptids route (index)
    res.redirect('/cryptids')
})

router.get('/cryptids/new', function(req, res){
    res.render('cryptids/new')
})

//Being redirected to post for creating new one for time being
router.get('/cryptids/edit/:id', function(req, res) {
    // get cryptids
    var cryptids = fs.readFileSync('./cryptids.json')
    var cryptData = JSON.parse(cryptids)
    
    //get array index from url parameter
    var cryptIndex = parseInt(req.params.id)
    
    //render page with data of the specified animal
    res.render('cryptids/edit', {myCryptid: cryptData[cryptIndex]})
})

//displays the type and photo of a particular cryptid (:id would be replaced by an actual number 1)
router.get('/cryptids/:id', function(req, res) {
    // get cryptids
    var cryptids = fs.readFileSync('./cryptids.json')
    var cryptData = JSON.parse(cryptids)
  
    //get array index from url parameter
    var cryptIndex = parseInt(req.params.id)
  
    //render page with data of the specified animal
    res.render('cryptids/show', {myCryptid: cryptData[cryptIndex]})
})


module.exports = router