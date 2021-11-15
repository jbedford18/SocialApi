const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    userName: {
      type: String,
      unique: true,
      required:true,
      trim: true,

    },
    emailBy: {
        type: String,
        validate: {
          validator: async function(email) {
            const user = await this.constructor.findOne({ email });
            if(user) {
              if(this.id === user.id) {
                return true;
              }
              return false;
            }
            return true;
          },
          message: props => 'The specified email address is already in use.'
        },
        required: [true, 'User email required']       
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

  );

  // create the user model using the  user Schema
const User = model('User', UserSchema);

// export the user model
module.exports = User;