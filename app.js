const chalk = require("chalk");
const { argv } = require("yargs");
const yargs = require("yargs");
const notes =require('./notes.js');


// Customize version
yargs.version ('1.1.1');

yargs.command ({
  command: "add",
  describe: "Add a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: String,
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: String,
    }
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  }
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Remove Note by title",
      demandOption: true,
      type: String,
    }
  },
  handler: function(argv) {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Read Note by title",
      demandOption: true,
      type: String,
    }
  },
  handler: function (argv) {
    notes.readNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "List a note",
  handler: function () {
    notes.listNotes();
  },
});


yargs.parse();
// console.log(yargs.argv);
