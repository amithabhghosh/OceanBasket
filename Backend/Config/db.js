const mongoose=require("mongoose")
require("dotenv").config()
const connectDb=async()=>{
    try {
        const conn = await mongoose.connect(`mongodb+srv://amithabhghosh:Amithabh97%40@cluster0.3znzb.mongodb.net/Oceanbasket?retryWrites=true&w=majority&appName=Cluster0`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected Succesfully`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
    }
   
}
module.exports=connectDb;
