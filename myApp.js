require('dotenv').config();
/*let express = require('express');
let app = express();
*/

const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema=mongoose.Schema;

const personSchema = new Schema({
  name:{type: String, required:true}, 
  age: Number,
  favoriteFoods:[String]
});

const Person = mongoose.model("Person", personSchema);
// create and save a record, create a person and save shit(convention to throw err)
const createAndSavePerson = (done) => {
  let person = new Person(
    {
      name: "Alan Carrillo",
      age: 24, 
      favoriteFoods: ["burgers", "pizza", "ice cream"]
    }
  );
  console.log(person);
  person.save(function(err, data){
    if (err) return console.error(err);
    done(null, data);
  });
};

let arrayOfPeople=[
  {name:"Alan Carrillo", age: 24, favoriteFoods:["pizza, hamburger"]},
  {name:"Omar Carrillo", age: 14, favoriteFoods:["pizza, hamburger"]},
  {name:"Another Carrillo", age: 34, favoriteFoods:["pizza, hamburger"]},
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people){
    if(err) return console.error(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, function(err, people){
    if(err) console.error(err);
    done(null, people);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, function(err, data){
    if(err) console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data){
    if(err) console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, found){
    if(err) console.error(err);

    found.favoriteFoods.push(foodToAdd);

    found.save(function(err, data){
      if(err)return console.error(err);
      done(null,data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet}, {new:true}, function(err,data){
    if(err)return console.error(err);
    done(null, data);
  });

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,function(err,data){
    if(err)return console.error(err);
    done(null,data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},(err,data)=>{
    if(err)return console.error(err);
    done(null,data);
  });

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  let final = Person.find({favoriteFoods:foodToSearch});
  final.sort({name:1}).limit(2).select({age:0}).exec((err,data)=>{
    if (err) return console.error(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
