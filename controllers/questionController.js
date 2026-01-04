const questions = require('../models/questionModels');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


// add questions
exports.addQuestionController = async (req,res)=>{
    console.log("addQuestionController");
    const userId = req.userId
    console.log(userId);
    console.log(req.body);
    const {question} = req.body
    if(question){
        try{
         const newQuestion = new questions({
            question:question,
            userId:userId
         })
       const saveQuestion =   await newQuestion.save()
         res.status(200).json(saveQuestion)
        }catch(err){
            console.log(err);
            res.status(401).json("failed to add question")
        }
    }else{
        res.status(404).json("Question is required")
    }
    
}

// get Questions
exports.getAllQuestions = async (req,res)=>{
    try{
        const question = await questions.find().populate("userId","username")
        return res.status(200).json(question)
    }catch(err){
        console.log(err);
        res.status(404).json(err)
        
    }
}

//mine
exports.deleteQuestion = async (req, res) => {
   try {
       const { id } = req.params;
       console.log("Inside deleteQuestion, QuestionId:", id); // Debugging log
       //ensure id is a string
       if (typeof id !== 'string') {
            return res.status(400).json({ message: "Invalid question ID" }); 
       }
       //ensure id is a valid ObjectId
         if (!mongoose.Types.ObjectId.isValid(id)) {
              return res.status(400).json({ message: "Invalid question ID" });
         }       
       const question = await questions.findById(id);
        console.log("Question found:", question); // Debugging log
       if (!question) {
           return res.status(404).json({ message: "question not found" });
        }
        await questions.findByIdAndDelete(id);
        res.status(200).json({ message: "question deleted successfully" });
    } catch (error) {
       console.error("Error deleting question:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// exports.deleteQuestion = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log("Inside deleteQuestion, Received ID:", id);

//         // Ensure id is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: "Invalid question ID" });
//         }

//         const question = await questions.findById(id);

//         if (!question) {
//             return res.status(404).json({ message: "Question not found" });
//         }

//         // Ensure only the owner can delete the question
//         if (question.userId.toString() !== req.userId) {
//             return res.status(403).json({ message: "You are not authorized to delete this question" });
//         }

//         await questions.findByIdAndDelete(id);
//         res.status(200).json({ message: "Question deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting question:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };



// edit
// exports.editQuestion = async (req, res) => {
//     console.log("inside editQuestion");
    
//     try {
//         const { id } = req.params; // Get question ID from request parameters
//         const { question } = req.body;
//         console.log(req.body);
        
//         if(!question){
//             return res.status(400).json({error:"Question field is required"})
//         }

//         const userId = req.userId; // Assuming userId is extracted from token middleware

//         // Find the existing question by ID
//         const existingQuestion = await questions.findById(id);
//         if (!existingQuestion) {
//             return res.status(404).json({ error: "Question not found" });
//         }

//         // Check if the logged-in user is the owner of the question
//         if (existingQuestion.userId.toString() !== userId) {
//             return res.status(403).json({ message: "You are not authorized to edit this question" });
//         }

//         // Update the question and save it
//         existingQuestion.question = question;
//         const updatedQuestion = await existingQuestion.save();

//         res.status(200).json(updatedQuestion);
//     } catch (err) {
//         console.error("Error updating question:", err);
//         res.status(500).json({ error: "Failed to update the question" });
//     }
// };





