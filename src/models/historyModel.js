import {Schema,model} from 'mongoose';

const historySchema=new Schema({
    arrivalTime:{
        type:Date,
        required:true
    },
    fees:{
        type:Number,
        required:true
    },
    visitor:{
        type:Schema.Types.ObjectId,
        ref:'visitor'
    }
},{timestamps:true})

const historyModel=model('history',historySchema);

export default historyModel;