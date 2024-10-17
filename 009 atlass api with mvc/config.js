const mongoose = require('mongoose');

const url = 'mongodb+srv://deepmali590:malideep9828@deelip.9r9dc.mongodb.net/wsb-117-115-student?retryWrites=true&w=majority&appName=deelip'

mongoose.connect(url)
.then(()=>{
    console.log('connected to database')
})
.catch((err)=>{
    console.log(err)
})