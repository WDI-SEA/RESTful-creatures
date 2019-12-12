// Declare an express router
let router = require('express').Router()

router.get('/cryptids', (req, res) => {
    res.render('/cryptids', {title: 'Cryptids', name: ['Loch Ness Monster', 'Big Foot', 'Batsquatch', 'Sharlie (Slimy Slim)'] img_url: ['https://www.history.com/.image/t_share/MTU3ODc5MDg3MjQzNjAxMjI1/loch-ness-monster.jpg', 'https://res.cloudinary.com/simpleview/image/upload/crm/eurekaca/patterson.gimlin0-b5b6c02e5056a36_b5b6c19f-5056-a36a-096e6e95925c7427.jpg', 'https://vignette.wikia.nocookie.net/cryptidz/images/c/c7/Batsquatch.jpg/revision/latest?cb=20100912164353', 'https://vignette.wikia.nocookie.net/cryptidz/images/6/6c/Swimsharlie.jpg']})
})

router.post('/cryptids', (req, res) => {
    console.log(req.body)
    res.send('Hello from post route')
})

// Make sure this file is includable in other files
module.exports = router