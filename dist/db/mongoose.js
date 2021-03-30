"use strict";
const mongoose = require('mongoose');
const dbUrl = process.env.MONGODB_URL || 'noDb';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}, (error) => {
    if (error) {
        console.log(error);
        console.log('MongoDB is not connected');
    }
    else {
        console.log('Connected to MongoDB database');
    }
});
//# sourceMappingURL=mongoose.js.map