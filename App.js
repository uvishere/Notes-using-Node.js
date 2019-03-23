const yargs = require('yargs')
const notes = require('./Notes')

// Create an add command
yargs.command({
    command: 'add',
    describe: "Add a note..",
    builder: {
        title: {
            describe: "Describe the notes title",
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: "Body of the title",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => notes.addnote(argv.title, argv.body)
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: "Remove a note...",
    builder: {
        title: {
            describe: "Title of the note to be removed",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.removenote(argv.title)
})


// Create list command
yargs.command({
    command: 'list',
    describe: "List all notes...",
    handler: () => notes.listnote()
})

// Create list command
yargs.command({
    command: 'read',
    describe: "read a note",
    builder: {
        title: {
            describe: "title of the note to read",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.readnote(argv.title)
})

//parse the yargs commands
yargs.parse()