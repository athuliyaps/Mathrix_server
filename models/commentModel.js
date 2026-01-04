const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'questions',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})
const comments = mongoose.model('comments',commentSchema)
module.exports=comments