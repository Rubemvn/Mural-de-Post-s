const bodyParser = require("body-parser");
const posts = require("../model/posts");
const express = require("express");
const router = express.Router();
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:7000"
}

router.use(cors(corsOptions));

router.get("/all", (req, res) => {
    res.json(JSON.stringify(posts.getAll()));
});

router.post("/new", bodyParser.json(), (req, res) => {

    let title = req.body.title;
    let description = req.body.description;

    posts.newPost(title, description);
    res.send(`"${title}" adicionado com sucesso...`);
});

router.delete("/delete", bodyParser.json(), (req, res) => {
    let id = req.body.id;

    posts.deletePost(id);
    res.send(`Post deletado com sucesso...`);

});

module.exports = router;