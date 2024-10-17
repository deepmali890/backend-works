const {MongoClient} = require ('mongodb')

const dbName='wsb_117';
const url = 'mongodb://localhost:27017';

const client = new MongoClient(url)

const connect = async()=>{
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);  
    
    return db;
};

// insert single  data 

// const insertData = async()=>{
//     const db = await connect();
//     const collection = db.collection('first_batch')

//    const responce = await collection.insertOne({
//         "name": "John",
//         "age": 30,
//     })
//     console.log(responce)
// }
// insertData()




// insert many data 

// const insertManyData = async()=>{
//     const db = await connect();
//     const collection = db.collection('first_batch')

//    const responce = await collection.insertMany([
//     {
//         "name": "John",
//         "age": 30,
//     },
//     {
//         "name": "dilip",
//         "age": 22,
//     },
//    ])
//     console.log(responce)
// }
// insertManyData()


// read data single and multiple

const readDAta = async()=>{
    const db = await connect();
    const collection = db.collection('first_batch')

   const responce = await collection.find().toArray()
    console.log(responce)
}
readDAta()


const updateData = async()=>{
        const db = await connect();
        const collection = db.collection('first_batch')
    
       const responce = await collection.updateOne(
        {
            "name": "dilip"
        }
        ,
        {
            $set:{
                "age": 25,
                contact:'deepmali89@mail.com'
            }
        }
    )
        console.log(responce)
    }
    // updateData()
    const deleteOne = async()=>{
        const db = await connect();
        const collection = db.collection('first_batch')
    
       const responce = await collection.deleteOne({ contact: 'deepmali89@mail.com'})
        console.log(responce)
    }
    deleteOne()