const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    userName: {
      type: String,
      unique: true,
      required:true,
      trim: true,

    },
    email: {
      type: String,
      required: 'you must enter a username',
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    
  },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
    },
    {
      toJSON: {
          virtuals: true
      },
      id: false
  });
  
  UserSchema.virtual('friendCount').get(function(){
      return this.friends.length;
  });
  

  // create the user model using the  user Schema
const User = model('User', UserSchema);

// export the user model
module.exports = User;