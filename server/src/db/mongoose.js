const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
      console.log("MongoDB is not connected");
    } else {
      // console.log("Connected to MongoDB database:", process.env.MONGODB_URL);
    }
  }
);
