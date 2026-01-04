const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const courses = mongoose.model('courses',courseSchema)
module.exports= courses