const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://SA:SA@cluster0.ntwvq.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority&appName=Cluster0`, {
            // Removed deprecated options
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
