const mongooose = require('mongoose');
const  Schema=mongooose.Schema;
const orderSchema =new Schema({
    
    symbol:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    filled_quantity:{
     
        type:Number,
        required:true, 
        default:0
    },
    order_status:{
        type:String,
        required:true
    },
    
    
},{collection: "Order"});



module.exports = mongooose.model("Order", orderSchema);