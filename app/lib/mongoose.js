import mongoose from "mongoose";
export async function mongooseConnect(){
    try{
        if(mongoose.connection.readyState === 0){
            await mongoose.connect(process.env.MONGODB_URI,{
                useNewUrlParser: true,
            
            });
            console.log("db connected")
        }
    }
    catch(error){
        console.log(error);
    }
}
