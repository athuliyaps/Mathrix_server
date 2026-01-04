const mongoose = require('mongoose')
const AddQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,ref:'users',
        required:true
    }

})
const questions = mongoose.model('questions',AddQuestionSchema)
module.exports = questions