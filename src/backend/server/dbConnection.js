// Import the mongoose module
const mongoose = require('mongoose');

class DatabaseConnection {
  static instance = null;

  static async initConnection(database) {
    if (this.instance) {
      console.log('MongoDB connection already established.');
      return this.instance;
    }

    try {
      const mongoDB = `mongodb://127.0.0.1:27017/${database}`;
      await mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB connected.');

      this.instance = mongoose.connection;
      return this.instance;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  static getInstance() {
    return this.instance;
  }
}

module.exports = DatabaseConnection;
