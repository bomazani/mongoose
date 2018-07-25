const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('We are connected!');
});

const kittySchema = new mongoose.Schema({
    name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);

const silence = new Kitten({ name:'Silence' });
console.log(silence.name);

kittySchema.methods.speak = function () {
    let greeting = this.name
        ? "Meyow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
}

const kitten = mongoose.model('Kitten', kittySchema);

const fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak();

fluffy.save(function (err, fluffy) {
    if (err) return console.log(err);
    fluffy.speak();
});

Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
})

Kitten.find({ name: /fluff/ }, callback);
