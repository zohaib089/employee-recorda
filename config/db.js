const mongoose = require('mongoose');
const config = require('config');


const db = config.get('mongoUri');



const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('MongoDB Connected...')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }


}


module.exports = connectDB;