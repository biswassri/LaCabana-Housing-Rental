import mongoose from 'mongoose';

//Model schema for the Todo table
const User = new mongoose.Schema({
        username: {
            type : String,
            required: "Title is required"
        },
        password: {
            type : String
        },
        status:{
            type : String,
            default: "Pending approval"
        },
        lastModifiedDate: {
            type: Date,
            default: Date.now
        },
        createdDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    }
);

//Used for the Object Item id which acts as a primary key
User.virtual('id').get(function() {
    return this._id.toHexString();
});

//For conversion to JSON
User.set('toJSON', {virtuals: true});

//Model name
const user = mongoose.model('users', User);

export default user;