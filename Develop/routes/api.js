const router = require ("express").Router()
const db = require ("../db/notes.js")

router.get("/notes", function (req,res){
    db.getNotes ().then (notes => res.json (notes)).catch(err=> res.json (err))
})

router.post("/notes", function (req,res){
    db.addNotes (req.body).then (notes => res.json (notes)).catch(err=> res.json (err))
})

router.delete("/notes/:id", function (req,res){
    db.deleteNotes (req.params.id).then (() => res.json ({ok:true})).catch(err=> res.json (err))
})

module.exports = router 