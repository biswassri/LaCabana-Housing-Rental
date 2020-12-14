import mongoose from 'mongoose';

const postingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    city: { 
        type: String, required: true 
    },
    street: {
        type: String,
        required: true,
    },
    category: { 
        type: String, required: true, 
        lowercase: true 
    },
    image: { 
        type: String 
    },
    bedrooms: {
        type: Number
    },
    shared: {
        type: Boolean
    },
    description: { 
        type: String, 
        required: true 
    },
    dailyRate: {
        type: Number
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    bookings: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Booking" }]

},
    {
        versionKey: false

    });
    
postingSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
postingSchema.set('toJSON', { virtuals: true });
const model = mongoose.model('Posting', postingSchema);
export default model;