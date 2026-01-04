const courses = require('../models/courseModel')

exports.addCourses = async (req,res)=>{
    console.log("inside addCourses");
   const {title,description,duration,level,url,image} = req.body
    console.log(req.body);
        
    
        try{
         const newCourse = new courses({
            title,description,duration,level,url,image
         })
         await newCourse.save()
         res.status(200).json(newCourse)
        }catch(err){
           
            res.status(401).json("failed to add course")
        }
    }
    

