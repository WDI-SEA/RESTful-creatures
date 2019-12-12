let router = require('express').Router()
let fs = require('fs')

router.get('/', (req, res) => {
    let cryptids = fs.readFileSync('./cryptids.json')
    let cryptidData = JSON.parse(cryptids)
    res.render('cryptids/index', {myCryptids: cryptidData})
})

router.get('/new', (req, res) => {
    res.render('cryptids/new')
})

router.post('/', (req, res) => {
    let cryptids = fs.readFileSync('./cryptids.json')
    cryptids = JSON.parse(cryptids)
    
//if on cryptids/new, do this
    cryptids.push(req.body)

    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids))

    res.redirect('/cryptids')

//if on cryptids/edit, do this
    //cryptids[crypIndex] = req.body
    //fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids))
    //res.redirect('/cryptids')
})

router.get('/:id', (req, res) => {
    let cryptids = fs.readFileSync('./cryptids.json')
    let cryptidData = JSON.parse(cryptids)

    let crypIndex = parseInt(req.params.id)

    res.render('cryptids/show', {myCryp: cryptidData[crypIndex]})
})


router.get('/edit/:id', (req, res) => {
    let cryptids = fs.readFileSync('./cryptids.json')
    let cryptidData = JSON.parse(cryptids)

    let crypIndex = parseInt(req.params.id)

    res.render('cryptids/edit', {myCryp: cryptidData[crypIndex]})
})

router.put('/:oldname', (req, res) => {

    let cryptids = JSON.parse(fs.readFileSync('./cryptids.json'))

    //get cryptid matching old name
    for (let i = 0; i < cryptids.length; i++) {
        if (cryptids[i].name === req.params.oldname) {
            cryptids[i].name = req.body.name
            cryptids[i].img_url = req.body.img_url
        }
    }

//write out results of the change to the json file
fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids))
res.redirect('/cryptids')

})

router.delete('/:id', (req, res) => {
    let cryptids = JSON.parse(fs.readFileSync('./cryptids.json'))

    //splice out cryptid by id given
    let index = parseInt(req.params.id)
    cryptids.splice(index, 1)
    
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids))
    res.redirect('/cryptids')
})


module.exports = router