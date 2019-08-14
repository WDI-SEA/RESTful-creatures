const router = require("express").Router();
const fs = require("fs");

router.get("/", (req, res) => {
	const cryptids = fs.readFileSync(__dirname + "/../cryptids.json");
	const cryptidData = JSON.parse(cryptids);
	console.log(cryptidData);
	res.render("cryptids/index", {
		cryptids: cryptidData
	});
})

router.post("/", (req, res) => {
	console.log("body:", req.body);
	var cryptids = fs.readFileSync(__dirname + "/../cryptids.json");
	var cryptidData = JSON.parse(cryptids);
	cryptidData.push(req.body);
	fs.writeFileSync(__dirname + "/../cryptids.json", JSON.stringify(cryptidData));
	res.redirect("/cryptids");

})

router.get("/new", (req, res) => {
	res.render("cryptids/new")
})

router.get("/:idx", (req, res) => {
	const cryptids = fs.readFileSync(__dirname + "/../cryptids.json");
	const cryptidData = JSON.parse(cryptids);

	var cryptidIndex = parseInt(req.params.idx);

	res.render("cryptids/show", {
		myCryptid: cryptidData[cryptidIndex]
	})
})


module.exports = router;