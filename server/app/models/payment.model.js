const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  fromUser: { 
    type: Schema.Types.ObjectId, 
    ref: "User" 
  },
  toUser: { 
    type: Schema.Types.ObjectId, 
    ref: "User" 
  },
  booking: { 
    type: Schema.Types.ObjectId, 
    ref: "RoomBooking" 
  },
  amount: {
    type: Number
  },
  tokenId: {
    type : String
  },
  charge: {
    type : String
  },
  status: { 
    type: String, 
    default: "pending" 
  }
}  ,
  {
      versionKey: false

  });
  paymentSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
paymentSchema.set('toJSON', { virtuals: true });

const model = mongoose.model('Payment', paymentSchema);
export default model;