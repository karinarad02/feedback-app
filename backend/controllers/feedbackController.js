import { Feedback } from "../models/feedback.js";
import { Activity } from "../models/activity.js";

const getFeedbackList = async (req, res) => {
  try {
    const feedback = await Feedback.findAll();

    return res.status(200).json(feedback);
  } catch (err) {
    console.error("Error fetching activity:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const insertStudentFeedbackIntoDB = async (req, res) => {
  const { cod, reaction } = req.body;

  try {
    const activity = await Activity.findOne({
      where: { cod },
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const feedback = await Feedback.create({
      activityId: activity.id,
      reaction,
    });

    res.status(201).json(feedback);
  } catch (error) {
    console.error("Error creating feedback:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getActivityFeedback = async (req, res) => {
  const { cod } = req.query;

  try {
    const activity = await Activity.findOne({
      where: { id: cod },
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found." });
    }

    const feedback = await Feedback.findAll({
      where: {
        activityId: activity.id,
      },
    });

    return res.status(200).json(feedback);
  } catch (err) {
    console.error("Error fetching activity:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getFeedbackList, insertStudentFeedbackIntoDB, getActivityFeedback };
