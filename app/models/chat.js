//File Name: ./app/models/chat.js

var mongoose = require('mongoose');

var chatSchema = mongoose.Schema({

    user    : String,
    content : String

});

var chatModel = mongoose.model('chat',chatSchema);

exports.saveMessage = function(user,content){

  var saveMessage = new chatModel({
    user    : user,
    content : content
  });

  saveMessage.save(function(err){
    if(err){
      console.log(err);
    }
  });

};
