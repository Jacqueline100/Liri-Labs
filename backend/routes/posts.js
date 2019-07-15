const express = require("express");

const Post = require("../models/post");
const router = express.Router();


/*
The post model created with mongoose will actually be the bridge from our nodejs express app and tis code to the mongodb
databse without us wirting any mongo code
*/
router.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  //this save method is provided by the mongoose package for every model created with it
  //What mongoose will do behind the scenes is that it automatically creates the right queery for our database to insert a
  //new entry with that data and that automatically generated ID into the databae.
  post.save().then(createdPost => {
  //mongoose will automatically save the data in document
    res.status(201).json({
      message: 'Post added sucessfully',
      postId: createdPost._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  //this is still _id on the server because in mongodb, our items have their ID stored in an _id field
  Post.updateOne({_id: req.params.id }, post).then(result =>{
    console.log(result);
    res.status(200).json({ message: "Update succesful!"});
  });
});

router.get("", (req, res, next) => {
  //find just as in the shell wil simply return all entries.
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post){
      res.status(200).json(post);
    }else{
      //if the post not exist, then I want to return a response with a status code of 404 and a json document
      //where we have a message like post not found because we failed to find a post for that ID
      res.status(404).json({message: 'Post not found!'});
    }
  });
});


//add a dynamic path segment by adding a colon and then any name of your choice, like id
router.delete("/:id", (req, res, next) => {
  //go to mongoose api query deleteone
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted!"});
  });
});


module.exports = router;
