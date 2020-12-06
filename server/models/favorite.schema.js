import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({

   userId:{
       type:String
   },
   postingId:{
       type:String
   }
},
    {
        versionKey: false

    });
    favoriteSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
favoriteSchema.set('toJSON', { virtuals: true });
const model = mongoose.model('favorite', favoriteSchema);
export default model;