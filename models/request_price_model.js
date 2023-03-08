const mongoose = require('mongoose')

const OserSchema = mongoose.Schema({
    assignmentid: {
        type:String,
        required : true,
    },
    name: {
        type:String,
        required : true,
    },
    ownerid: {
        type:String,
        required:true,
        max :100
   },
    userid: {
    type:String,
    required:true,
    max :100
    },
    
    category:{
       type:String,
       required:true
    },
    price:{
    type:Number,
    },
    StartPrice:{
    type:Number,
    },
    status:{
        type:Number,
        default : 0
    },
    duration:{
        type:Number,
        required:true
    },
    Image: {
    type:String,
    max :100
    }
})

module.exports = mongoose.model('tr_request_prices',OserSchema)