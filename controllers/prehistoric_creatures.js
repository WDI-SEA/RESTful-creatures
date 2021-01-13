const express = require('express')
const router = express.Router()
const fs = require('fs')

// For /prehistoric_creatures:
router.get('/', (req, res) => {
    let creatures = fs.readFileSync('prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures) // Convert JSON to JavaScript.
    res.render('prehistoric_creatures/index.ejs', {myCreatures: creatureData})
})

router.get('/new', (req, res) => {
    res.render('prehistoric_creatures/new.ejs')
})

router.get('/edit/:idx', (req, res) => {
    let creatures = fs.readFileSync('prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    let myIndex = req.params.idx
    let creature = creatureData[myIndex]
    res.render('prehistoric_creatures/edit.ejs', {
        myCreature: creature,
        myIndex: myIndex
    })
})

// Reroute to here after we submit an edit form.
router.put('/:idx', (req, res) => {
    let creatures = fs.readFileSync('prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    let myIndex = req.params.idx

    creatureData[myIndex] = req.body

    fs.writeFileSync('prehistoric_creatures.json', JSON.stringify(creatureData))    

    res.redirect('/prehistoric_creatures')
})

router.get('/:idx', (req, res) => {
    let creatures = fs.readFileSync('prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    let creatureIndex = parseInt(req.params.idx)
    res.render('prehistoric_creatures/show.ejs', {
        myCreature: creatureData[creatureIndex],
        myIndex: creatureIndex})
})

router.post('/', (req, res) => {
    let creatures = fs.readFileSync('prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures) // Convert from JSON to JavaScript.
    creatureData.push(req.body)
    fs.writeFileSync('prehistoric_creatures.json', JSON.stringify(creatureData)) // Convert back to JSON.
    console.log(req.body)
    res.redirect('/prehistoric_creatures')
})

router.delete('/:idx', (req, res) => {
    let creatures = fs.readFileSync('prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    creatureData.splice(req.params.idx, 1)

    fs.writeFileSync('prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})

module.exports = router