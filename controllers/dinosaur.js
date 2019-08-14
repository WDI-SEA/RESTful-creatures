const router = require("express").Router();
const fs = require("fs");

router.get("/", (req, res) => {
	const dinosaurs = fs.readFileSync(__dirname + "/../dinosaurs.json");
	const dinoData = JSON.parse(dinosaurs);
	console.log(dinoData);
	res.render("dinosaurs/index", {
		dinosaurs: dinoData
	});
})

router.post("/", (req, res) => {
	console.log("body:", req.body);
	var dinosaurs = fs.readFileSync(__dirname + "/../dinosaurs.json");
	var dinoData = JSON.parse(dinosaurs);
	dinoData.push(req.body);
	fs.writeFileSync(__dirname + "/../dinosaurs.json", JSON.stringify(dinoData));
	res.redirect("/dinosaurs");

})

router.get("/new", (req, res) => {
	res.render("dinosaurs/new")
})

router.get("/:idx", (req, res) => {
	const dinosaurs = fs.readFileSync(__dirname + "/../dinosaurs.json");
	const dinoData = JSON.parse(dinosaurs);

	var dinoIndex = parseInt(req.params.idx);

	res.render("dinosaurs/show", {
		myDino: dinoData[dinoIndex]
	})
})


module.exports = router;