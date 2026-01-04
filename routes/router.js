const express = require('express');
const router = new express.Router();
const userController = require('../controllers/userController');
const addController = require('../controllers/questionController');
const commentController = require('../controllers/commentController')
const courseController = require('../controllers/courseController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware');

router.post('/register',userController.registerController)
router.post('/login',userController.loginController)

// quiz status
// router.post('/quiz-result',userController.quizResultController)

//  router.get('/quizStatus/:userId',jwtMiddleware,userController.quizStatusController)
router.get('/quiz-status/:userId', jwtMiddleware, userController.quizStatusController)
//router.post('/submit-quiz', jwtMiddleware, userController.quizResultController)
router.post('/submit-quiz', jwtMiddleware, userController.submitQuizResult);

// question
router.post('/add',jwtMiddleware,addController.addQuestionController)
router.get('/questions',jwtMiddleware,addController.getAllQuestions)
// router.put('/questions/:id/edit',jwtMiddleware,addController.editQuestion)
router.delete('/questions/:id/delete',jwtMiddleware,addController.deleteQuestion)

// Add comment, get Comment
router.post('/addComment',jwtMiddleware,commentController.addCommentController)
router.get('/getComment',jwtMiddleware,commentController.getAllComments)
router.put('/comment/:id/edit',jwtMiddleware,commentController.editComment)
router.delete('/comment/:id/delete',jwtMiddleware,commentController.deleteComment)




// add course
router.post('/courses',courseController.addCourses)



module.exports = router;