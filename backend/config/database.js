const mongoose = require("mongoose");

const connectDatabase = async()=>{
    try{
        await mongoose.connect(`${process.env.DB}`,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        },)
        console.log(`mongo db is connected to server ${mongoose.connection.host}`)
    }catch(error){
        console.error(error);
        console.log('database is not connected')
    }
};

module.exports = connectDatabase;