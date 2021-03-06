const express = require("express");
const router = express.Router();
const { Notification, User } = require("../database");
const {
  createNotification,
  getUsersNotifications,
  updateNotifications
} = require("../controllers/notifications");

//just a test route to debug notifications, keep here until we tie sockets in
router.get("/all", async (req, res) => {
  const notifications = await Notification.find({});
  res.status(200).send(notifications);
});

router.get("/:id", async (req, res) => {
  try {
    const notificationData = await getUsersNotifications(req.params.id);
    res.status(200).send(notificationData);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
});

router.put("/update-read", async (req, res) => {
  try {
    await updateNotifications(req.body.notifications);
    res.status(200).send({ message: "Successfully updated notifications" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const notification = await createNotification(req.body);
    console.log(notification);
    res.status(200).send(notification);
  } catch (error) {
    res.status(500).send({ error: err });
  }
});

module.exports = router;
