const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  box: { type: mongoose.Schema.Types.ObjectId, ref: 'Box', required: true },
  startDate: {
    type: Date,
    default: Date.now,
  },
  nextPaymentDate: {
    type: Date,
    default: () => {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    },
  },

  
});

// Create a model for the boxes collection
const Subscription = mongoose.model('Subscription', subSchema);


module.exports = Subscription;