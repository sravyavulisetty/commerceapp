import clientPromise from "@/app/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI; 
const databaseName = 'test'; 
const collectionName = 'users'; 
async function updateUsers(user, profile) {
    const client = new MongoClient(uri);
try {
  await client.connect();
  const database = client.db(databaseName);
  const collection = database.collection(collectionName);  
  const uniqueId = user.id;
  const existingUser = await collection.findOne({uniqueId});
  if(existingUser){
  await collection.updateOne({email: profile.email}, { $set: {firstName: profile.given_name, lastName: profile.family_name} });
  }
  else{
    await collection.insertOne({
        uniqueId,
        firstName: profile.given_name,
        lastName: profile.family_name,
      });
  }
}
catch (error) {
  console.error('Error:', error);
} finally {
  client.close();
}
}
const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    callbacks: {
        async signIn({user, profile}) {
            await updateUsers(user, profile);
            return true;
    }
},
    adapter: MongoDBAdapter(clientPromise)
    
})
export {handler as GET, handler as POST};