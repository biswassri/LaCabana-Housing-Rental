const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomBookingSchema = new Schema({
  startAt: { 
    type: Date, 
    required: "Starting date is required" 
  },
  endAt: { 
    type: Date, 
    required: "Ending date is required" 
  },
  totalPrice: {
    type : Number
  },
  days: {
    type : Number
  },
  guests: {
    type : Number
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User" 
  },
  rental: { 
    type: Schema.Types.ObjectId, 
    ref: "Rental" 
  },
  payment: { 
    type: Schema.Types.ObjectId, 
    ref: "Payment" 
  },
  status: { 
    type: String, 
    default: "pending" 
  }
},
  {
      versionKey: false

  });
postingSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
postingSchema.set('toJSON', { virtuals: true });
const model = mongoose.model('RoomBooking', roomBookingSchema);
export default model;