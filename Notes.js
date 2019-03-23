//Notes functions are defined here

const fs = require('fs')
require('validator')
const color = require('chalk')


//getting notes from file
const getNotes = () => {
    try {
        const notesBuffer = fs.readFileSync('notes.json')
        jsonNotes = notesBuffer.toString()
        return JSON.parse(jsonNotes)
    } catch (e) {
        return []
    }
}

//adding notes to the file
const addNotes = (title, body) => {
    try {
        const notes = getNotes()

        // check whether a duplicate note exist or not
        const duplicateNote = notes.filter((note) => note.title === title)
        if (duplicateNote.length !== 0) {
            console.log(color.red('the title ' + title + ' already exists'))
        } else {
            notes.push({
                title: title,
                body: body
            })
            saveNotes(notes)
            console.log(color.green("Note successfully added!!"))

        }
    } catch (e) {
        console.log(e)
    }
}

// Remove a note from the file
const removeNotes = (title) => {
    try {
        notes = getNotes()
        const notesToKeep = notes.filter((note) => note.title !== title)
        if (notes.length > notesToKeep.length) {
            saveNotes(notesToKeep)
            console.log(color.green("Note successfully removed!!"))
        } else {
            console.log(color.red.inverse('Note not found'))
        }

    } catch (e) {
        console.log(color.red("Error removing the notes."))
    }
}


// List all the notes
const listNotes = () => {
    const notes = getNotes()
    try {
        console.log(color.green("Your Notes: "))
        notes.forEach((note) => {
            console.log(color.blue(note.title))
        });
    } catch (e) {
        console.log(color.red("An error occured: \n" + e))
    }
}

// Save notes to the file
const saveNotes = (notes) => {
    jsonNotes = JSON.stringify(notes)

    //write into the file
    fs.writeFileSync('notes.json', jsonNotes)
    return true
}

// Read notes based on the title
const readNote = (title) => {
    const notes = getNotes()

    const desiredNote = notes.find((note) => note.title === title)

    if (desiredNote) {
        console.log(color.blue.inverse(desiredNote.title) + "\n\n")
        console.log(color.white(desiredNote.body))
    } else {
        console.log(color.red("No Notes found!!"))
    }
}

module.exports = {
    addnote: addNotes,
    getnote: getNotes,
    removenote: removeNotes,
    listnote: listNotes,
    readnote: readNote
}