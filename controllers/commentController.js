const comments = require('../models/commentModel')
const mongoose = require('mongoose')

exports.addCommentController = async (req,res)=>{
    console.log("addCommentController");
    const userId = req.userId
    console.log(userId);
    const {comment,questionId} = req.body
    console.log(req.body);
    if(comment && questionId){
        try{
         const newComment = new comments({
            comment:comment,
            questionId:questionId,
            userId:userId
         })
       const saveComment =   await newComment.save()
         res.status(200).json(saveComment)
        }catch(err){
            console.log(err);
            res.status(401).json("failed to  comment for the question")
        }
    }else{
        res.status(404).json("you can add comments")
    }
    
}

// get Comments
exports.getAllComments = async (req,res)=>{
    const {questionId} = req.query    //recive question as query params
    try{
       
        // const filter = questionId ? {questionId} : {}  //filter by questionId if provided
        const commentLists = await comments.find({questionId:questionId}).populate("userId","username")
        return res.status(200).json(commentLists)
    }catch(err){
        console.log(err);
        res.status(404).json(err)
        
    }
}

// edit
// exports.editComment = async (req, res) => {
//     console.log("inside editComment");
    
//     try {
//         const { id } = req.params; // Get question ID from request parameters
//         const { comment } = req.body;
//         const userId = req.userId
//         console.log(req.body);
//         //validate id and request data
//         if(!id || !mongoose.Types.ObjectId.isValid(id)){
//             return res.status(400).json({ error: "Invalid comment ID" });
//         }
//         // Check if the comment is provided
//         if (!comment) {
//             return res.status(400).json({ error: "Comment is required" });
//         }
//         // Find the existing comment by ID  use findById or findByIdAndUpdate (then we dont need to save it or update it)
//         const existingComment = await comments.findById(id); 
//         console.log(existingComment);
        
//         if(!existingComment){
//          return res.status(404).json({ error: "Comment not found" });
//         }
//         // Check if the user is the owner of the comment  (no need to from these step if we use findByIdAndUpdate)
//         if (existingComment.userId.toString() !== userId.toString()) {
//             return res.status(401).json({ error: "You are not authorized to edit this comment" });
//         }
//         // Update the comment        
//         existingComment.comment = comment;
//         console.log("comment is updated",existingComment);
//         console.log(comment);  
//         await existingComment.save();
//         res.status(200).json(existingComment);

//     } catch (err) {
//         console.error("Error updating comment:", err);
//         res.status(404).json({ error: "Failed to update the comment" });
//     }
// };

//remove
// exports.deleteComment = async (req, res) => {
//     console.log("inside deleteComment");
//     const { id } = req.params;   // Get question ID from request parameters
//     console.log(id);
//     try {
//         //validate id and request data
//         if(!id || !mongoose.Types.ObjectId.isValid(id)){
//             console.log("Invalid Comment ID"); 
//             return res.status(400).json({ error: "Invalid comment ID" });
//         }
//         //check comment exist or not
//         const existingComment = await comments.findById(id);
//         console.log(existingComment);
//        if(!existingComment){
//             console.log("Comment not found");
//             return res.status(404).json({ error: "Comment not found" });
//         }
//         //if comment exists,delete it
//         await comments.findByIdAndDelete(id);
//         console.log("comment deleted successfully");
//         res.status(200).json({ message: "Comment deleted successfully" });
        
//     } catch (err) {
//         console.error("Error deleting comment:", err);
//         res.status(500).json({ error: "Failed to delete the comment" });
//     }
// }

exports.editComment = async (req, res) => {
    try {
        const {id} = req.params;
        const { comment } = req.body;
        console.log("Inside editComment, commentId:", id); // Debugging log
        console.log("Inside editComment, comment:", comment); // Debugging log
        const updatedComment = await comments.findByIdAndUpdate(
            id,
            { comment },
            { new: true }
        );
        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json(updatedComment);
        
    } catch (error) {
        console.error("Error editing comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Inside deleteComment, commentId:", id); // Debugging log
        const comment = await comments.findById(id);
        console.log("Comment found:", comment); // Debugging log
        
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        await comments.findByIdAndDelete(id);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




