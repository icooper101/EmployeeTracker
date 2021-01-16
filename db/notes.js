const util = require ("util")
const fs = require ("fs")
const uuid = require ("uuid/v1")
const readFileAsync = util.promisify (fs.readFile)
const writeFileAsync = util.promisify (fs.writeFile)

class Notes {
    readNotes (){
        return readFileAsync ("db/db.json","utf8")
    }

    writeNotes (note) {
        return  writeFileAsync ("db/db.json" , JSON.stringify (note))
    }

    getNotes () {
        return this.readNotes ().then(notes=> {
            let addedNotes ;
            try {
                addedNotes = [].concat (JSON.parse(notes))   
            }
            catch (error){
                addedNotes= []
            }
            return addedNotes 
        })
    }

    addNotes (note) {
        const {title,text} = note

        if (!title || !text) {
            throw new Error ("note must have title and text")
        }
        const finalNote = {title,text,id:uuid()}
        
        return this.getNotes ().then (notes => [...notes,finalNote]).then (pushNote => this.writeNotes(pushNote)) .then(()=> finalNote)
    }

    deleteNotes (id) {
        return this.getNotes ().then (notes => notes.filter (note => note.id !==id)).then (filterNote => this.writeNotes (filterNote))
    }
}

module.exports = new Notes ()