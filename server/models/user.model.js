import mongoose from 'mongoose';

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
    address: {
        type: String,
        required: "Address is a required property."
    },
    phoneNumber: {
        type: Number,
        required: "Phone number is a required property."
    },
    emailId: {
        type: String,
        required: "Email is a required property."
    },
    gender: {
        type: String
    },
    maritalStatus: {
        type: String,
        default: "N/A"
    },
    incomeRange: {
        type: Number
    },
    pet: {
        type: Boolean
    },
    houseRented: {
        type: Object
    },
    postings: {
        type: Object
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now
    },
    status:{
        type : String,
        default: "Pending approval"
    },
},
    {
        versionKey: false

    });
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON', { virtuals: true });
const model = mongoose.model('user', userSchema);
export default model;