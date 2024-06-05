import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  emailID: {
    type: String,
    required: true,
  },
  packageID: {
    type: String,
    required: true,
  },
  destinationName: {
    type: String,
    required: true,
  },
  packageType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  options: {
    type: Object,
    required: false,
  },
  query: {
    type: String,
    required: true,
  },
  date: {
    type: String, 
    required: false,
  },
  days: {
    type: String, 
    required: false,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  handledByName: {
    type: String,
    required: false,
  },
  assignedTo: {
    type: String,
    required: false,
  },
  remarks: {
    type: String,
    required: false,
  }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
