import mongoose from 'mongoose';

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;
        connection.on('connected', ()=>{
            console.log('Database successfully connected')
        })
        connection.on('error', ()=>{
            console.log('Database connection failed')
            process.exit();

        })


    }
    catch(err){
        console.log('Something went wrong with the database connection: '+ err)

    }

}