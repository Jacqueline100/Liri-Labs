//I create post.js in backend folder and
//I want to create my post model using mongoose.
const mongoose = require('mongoose');

//I first create a blueprint for how the data should look like
//so I create a constant name is postSchema
//Then I import mongoose package and use schema method
/*
In Schema method, we pass a java script object, this object will hold
our custom configuration

We define the fields and the types of data we want to store in these fields,
our posts should have

define the schema
Therefore we will actually get an error if we try to create this without having
a titleproperty set.

Content is another filed
*/

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

/*
Now with the schema defined, mongoose needs a so-called model to work with it.
The schema is really just the blueprint, not the thing we work with in our code
We need to turn defintion into a real model
*/
module.exports = mongoose.model('Post', postSchema);
