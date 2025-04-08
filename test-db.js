require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Test connection successful');
  mongoose.disconnect();
}).catch(err => {
  console.error('❌ Test connection failed:', err);
});
