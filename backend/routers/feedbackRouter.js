import express from 'express'
import * as feedbackController from '../controllers/feedbackController.js'

const router = express.Router();

router.get('/feedbackList', feedbackController.getFeedbackList);
router.post('/newStudentFeedback', feedbackController.insertStudentFeedbackIntoDB);
router.get('/activityFeedback', feedbackController.getActivityFeedback);


export {router as feedbackRouter}
