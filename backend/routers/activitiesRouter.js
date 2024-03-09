import express from 'express'
import * as activitiesController from '../controllers/activitiesController.js'

const router = express.Router()

router.get('/activityList', activitiesController.getActivitiesFromDB);
router.post('/newActivity', activitiesController.insertActivityIntoDB);
router.get('/userActivityList', activitiesController.getUserActivitiesFromDB);
router.post('/newUserActivity', activitiesController.insertUserActivityIntoDB);
router.get('/activityCod', activitiesController.getActivityByCod)


export {router as activitiesRouter}