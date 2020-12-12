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
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  posting: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Posting" 
  },
  payment: { 
    type: mongoose.Schema.Types.ObjectId, 
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
  roomBookingSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
roomBookingSchema.set('toJSON', { virtuals: true });
const model = mongoose.model('RoomBooking', roomBookingSchema);
export default model;