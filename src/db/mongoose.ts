const mongoose = require('mongoose');

const dbUrl: string = process.env.MONGODB_URL || 'noDb';

mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (error: any) => {
    if (error) {
      console.log(error);
      console.log('MongoDB is not connected');
    } else {
      console.log('Connected to MongoDB database');
    }
  }
);
