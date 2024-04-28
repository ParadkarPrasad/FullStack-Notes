const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
// console.log(`password is ${password}`);
const url = `mongodb+srv://Archie:${password}@cluster0.jnfmr0t.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'Mongoose make things easy',
  important: true,
});

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

// Fetching objects from the database
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
