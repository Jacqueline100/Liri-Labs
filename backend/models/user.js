const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email : { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

/*
Now with the schema defined, mongoose needs a so-called model to work with it.
The schema is really just the blueprint, not the thing we work with in our code
We need to turn defintion into a real model
*/
module.exports = mongoose.model('User', userSchema);
