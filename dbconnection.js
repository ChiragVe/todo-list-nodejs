const mongoose = require('mongoose');

//Connection of db 
mongoose.connect(process.env.DB_CONNECT,{dbName: 'ToDo'}).then(()=>{
    console.log('database connected');
}).catch(err => console.log(err.message));
