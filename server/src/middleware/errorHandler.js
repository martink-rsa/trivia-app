module.exports = (error, req, res, next) => {
  try {
    console.log(error);
    // Mongoose duplication error
    if (error.code && error.code === 11000) {
      const field = Object.keys(error.keyValue);
      console.log('ERROR HANDLER:', '11000');
      return res
        .status(409)
        .send({ message: 'A duplicate field exists', field });
    }
    // Generic message
    res.status(400).send(error);
  } catch (error) {
    // Server error fallback
    res.status(500).send('An unknown error occurred.');
  }
};
