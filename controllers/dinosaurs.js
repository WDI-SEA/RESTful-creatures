// Declare an express router
let router = require('express').Router()

router.get('/dinosaurs', (req, res) => {
    res.render('/dinosaurs', {title: 'dinosaurs', name: ['Littlefoot', 'Cera', 'Ducky', 'Petrie', 'Spike'], type: ['Apatosaurus', 'Triceratops', 'Saurolophus', 'Pteranodon', 'Stegosaurus']})
})

router.post('/dinosuars', (req, res) => {
    console.log(req.body)
    res.send('Hello from post route')
})

// Make sure this file is includable in other files
module.exports = router