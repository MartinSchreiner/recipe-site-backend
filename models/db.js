const mongoose = require('mongoose');
require('./user.model');
require('./recipe.model')
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true}, (err) => {
    if(!err) {console.log('MongoDB Connection Successful!');}
    else {console.log('MongoDB connection error: ' + JSON.stringify(err, undefined, 2));}
});
