const users = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.registerController = async (req, res) => {
 console.log("registerController");
 const { username, email, password } = req.body;
 console.log(req.body);
 try{
    const existingUser = await users.findOne({ email });    
    if(existingUser){
        return res.status(401).json("User already exists");
    }else{
        const newUser = await users({
            username,email,password ,hasPassed:false
        })
        await newUser.save();
        res.status(200).json({
            message:"User registered successfully",
            username:newUser.username,
            email:newUser.email
        });
    }
 }catch(err){
    console.log(err);
    
 }
 
}

exports.loginController = async (req, res) => {
    console.log("loginController");
    const { email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ error: "User not found" });
        }
        if (existingUser.password !== password) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        const token = jwt.sign({ userId: existingUser._id,hasPassed:existingUser.hasPassed }, process.env.JWTPASSWORD);
        res.status(200).json({ user: existingUser, token,hasPassed:existingUser.hasPassed });
        console.log("Login response hasPassed:",existingUser.hasPassed);
        console.log("Generated token:",token);
        
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.quizResultController = async (req, res) => {
  try {
    const { score } = req.body;
    const userId = req.user.userId; // Get from JWT middleware
    
    const hasPassed = score >= 6;
    console.log(`Score: ${score}, hasPassed: ${hasPassed}`);
    const updatedUser = await users.findByIdAndUpdate(
      userId,
      { score, hasPassed },
      { new: true }
    );
    console.log("updateduser---",updatedUser);
    

    res.status(200).json({
      success: true,
      score: updatedUser.score,
      hasPassed: updatedUser.hasPassed
    });
  } catch (err) {
    console.error("Quiz submission error:", err);
    res.status(500).json({ error: "Quiz submission failed" });
  }
};

exports.quizStatusController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await users.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      score: user.score,
      hasPassed: user.hasPassed
    });
  } catch (err) {
    console.error("Quiz status error:", err);
    res.status(500).json({ error: "Failed to get quiz status" });
  }
};

// In your userController.js
// exports.submitQuizResult = async (req, res) => {
//   try {
//     const {  score } = req.body;
//      const userId = req.user.userId;
//     const hasPassed = score >= 6; // Passing threshold

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { score, hasPassed },
//       { new: true }
//     );
// console.log("updatedUser",updatedUser);

//     res.status(200).json({
//       success: true,
//       message: `Quiz ${hasPassed ? 'passed' : 'failed'}`,
//       score: updatedUser.score,
//       hasPassed: updatedUser.hasPassed
//     });
//   } catch (error) {
//     console.error("Quiz submission error:", error);
//     res.status(500).json({ error: "Quiz submission failed" });
//   }
// };


exports.submitQuizResult = async (req, res) => {
  try {
    const {  score,userId } = req.body;
    // const userId = req.user.userId
    const hasPassed = score >= 5; // Passing threshold

    const updatedUser = await users.findByIdAndUpdate(
      userId,
      { score, hasPassed },
      { new: true }
    );
console.log("updatedUser",updatedUser);

    res.status(200).json({
      success: true,
      message: `Quiz ${hasPassed ? 'passed' : 'failed'}`,
      score: updatedUser.score,
      hasPassed: updatedUser.hasPassed
    });
  } catch (error) {
    console.error("Quiz submission error:", error);
    res.status(500).json({ error: "Quiz submission failed" });
  }
};