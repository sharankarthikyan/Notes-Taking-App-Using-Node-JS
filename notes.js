const fs = require('fs');
const chalk = require("chalk");


const getNotes = () => {
  return "Your Notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNotes = notes.filter((note) => {
    return note.title === title;
  })

  if(duplicateNotes.length == 0) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log('Note added...');
  }
  else {
    console.log('Note title taken!');
  }

  
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json",dataJSON);
  //console.log(notes);
}

const loadNotes = () => {

  try {
      const dataBuffer = fs.readFileSync('notes.json');
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON);
    }catch(e) {
      return [];
    }
 
}

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.red.inverse("Your list:"));
  notes.forEach(note => {
    console.log(note.title);
  });

}


const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => {
    return note.title === title;
  })

  if(note) {
    console.log(note.title);
    console.log(note.body);
  }
  else {
    console.log(chalk.red.inverse("Note not found.."));
  }

}

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => {
    return note.title !== title;
  })
  saveNotes(notesToKeep);
  if(notes.length > notesToKeep.length) {
    console.log(chalk.green("Note Removed..."));
  }
  else {
    console.log(chalk.red("No note found..."));
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}