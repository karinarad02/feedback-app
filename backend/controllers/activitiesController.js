import { Activity } from "../models/activity.js";
import { User } from "../models/user.js";

const getActivitiesFromDB = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    return res.status(200).json(activities);
  } catch (err) {
    res.status(500).json(err);
  }
};

const insertActivityIntoDB = async (req, res) => {
  try {
    const newActivity = await Activity.create(req.body);
    return res.status(200).json(newActivity);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserActivitiesFromDB = async (req, res) => {
  const { username } = req.query;

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const activities = await Activity.findAll({
      where: { professorId: user.dataValues.id },
    });

    return res.status(200).json(activities);
  } catch (err) {
    console.error("Error fetching user activities:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const insertUserActivityIntoDB = async (req, res) => {
  const { username, cod, name, description } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newActivity = await Activity.create({
      cod: cod,
      name: name,
      description: description,
      professorId: user.dataValues.id,
    });

    return res.status(200).json(newActivity);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getActivityByCod = async (req, res) => {
  const { cod } = req.query;

  try {
    const activity = await Activity.findOne({
      where: { cod },
    });

    if (!activity) {
      return res
        .status(200)
        .json({ message: "Activity not found. Can create a new one." });
    }

    return res.status(200).json(activity);
  } catch (err) {
    console.error("Error fetching activity:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getActivitiesFromDB,
  insertActivityIntoDB,
  getUserActivitiesFromDB,
  insertUserActivityIntoDB,
  getActivityByCod,
};
