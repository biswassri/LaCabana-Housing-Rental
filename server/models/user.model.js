import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: "Firstname is a required property."
    },
    lastname: {
        type: String,
        required: "Lastname is a required property."
    },
    username: {
        type: String,
        required: "Username is a required property."
    },
    password: {
        type: String,
        required: "Password is a required property."
    },
    location: {
        type: String,
        required: "Address is a required property."
    },
    phone: {
        type: Number,
        required: "Phone number is a required property."
    },
    emailId: {
        type: String,
        unique: true,
        lowercase: true,
        required: "Email is a required property."
    },
    gender: {
        type: String
    },
    balance: { 
        type: Number, 
        default: 0 
    },
    postings: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Posting" 
    }],
    bookings: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Booking" 
    }]
  
},
    {
        versionKey: false

    });
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON', { virtuals: true });

userSchema.methods.hasSamePassword = function(requestedPassword) {
    return bcrypt.compareSync(requestedPassword, this.password);
  };
  
  userSchema.pre("save", function(next) {
    const user = this;
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
      });
    });
  });

  
const model = mongoose.model('User', userSchema);
export default model;