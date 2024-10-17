const express = require('express');
const mongoose = require('mongoose')


const url = 'mongodb://localhost:27017/wsb_117_student';  // yhi par hum connection string and data base ka name likh skte hai 

mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB...')

    })
    .catch((error) => {
        console.log('Error while connecting to MongoDB...', error)
    })

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    status: {
        type: String,
        default: 'Active'
    }

});

// jab hum kisi schema ko kisi collation ke sath connect kar dete hai to hme ek Constructor return hota hai use hum model kahte hai  or sath hi model ek ese chiz hai jiska name hme caption me likha chahiye first word ko 

const User = mongoose.model('users', userSchema)

const app = express();
app.use(express.json());

app.post('/create_user', (req, res) => {
    console.log(req.body)

    // const data = new User(
    //     {
    //         name: req.body.name,
    //         email: req.body.email,
    //         age: req.body.age,
    //         status: req.body.status

    //     }
    // );  iski jagah hum req.body bhi likh skte hai na because yw khud bhi  to ek object hai

    const data = new User(req.body)  // or ye yab hi likh skte hai jab aapke schema ki key same ho agar koi bhi change aa gya to work nahi karega error aa jaegi  warna isko hme desturchur karna padega

    data.save()
    .then((response) => {
        res.status(200).json({ message: 'success',response })
    })
    .catch((error) => {
        res.status(404).json({ message: 'error', error })
        })
   
});


///read data

app.get('/read_user', (req, res)=>{
    User.find()
    .then((response) => {
        res.status(200).json({ message: 'success',response })
    })
    .catch((error) => {
        res.status(404).json({ message: 'error', error })
        })
});

// delete data

app.delete('/delete_user/:_id', (req, res) => {
    console.log(req.params)
    // User.deleteOne({_id: req.params._id})  ese likhna hai but 
    User.deleteOne(req.params)
    .then((response) => {
        res.status(200).json({ message: 'success',response })
    })
    .catch((error) => {
        res.status(404).json({ message: 'error', error })
        })

})

// update data
app.put('/update_user/:_id', (req, res)=>{
    User.updateOne(
        req.params,
        {
            $set:req.body
        }
    )

    .then((response) => {
        res.status(200).json({ message: 'success',response })
    })
    .catch((error) => {
        res.status(404).json({ message: 'error', error })
        })
})


app.listen(3200, () => {
    console.log('Server is running on port 3200')
})