import mongoose from 'mongoose';

const postingSchema = new mongoose.Schema({

    ownerContactDetails: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        phone: {
            type: Number
        },
        email: {
            type: String
        }
    },
    description: {
        type: String
    },
    userId: {
        type: String
    },
    streetAddress: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    zipCode: {
        type: Number
    },
    propertyType: {
        type: String
    },
    price: {
        type: Number
    },
    bedroom: {
        type: Number
    },
    bathrooms: {
        type: Number
    },
    amenities: {
        type: Array
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now
    },
    available:{
        type: Boolean,
        default : true
    }
},
    {
        versionKey: false

    });
postingSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
postingSchema.set('toJSON', { virtuals: true });
const model = mongoose.model('posting', postingSchema);
export default model;