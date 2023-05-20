const todo = require("../models/TodoModel");
const cloud = require("../utils/config");

const router = require("express").Router();

router.post("/add", async (req, res) => {
  const photo = req.body.data;
  try {
    if (photo) {
      const fetchedcloud = await cloud.uploader.upload(photo, {
        upload_preset: "react_cloudinary",
      });
      console.log(fetchedcloud);
      res.status(200).send({ msg: "successfully uploaded" });
    }
  } catch (error) {
    res.status(500).send("can not uplload image");
  }
});
router.get("/get", async (req, res) => {
  try {
    const data = await todo.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await todo.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).send(updated);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const available = await todo.findById({ _id: id });
    if (!available) {
      res.status(400).json("already deleted");
    } else {
      await todo.findByIdAndDelete(
        { _id: id },
        {
          new: true,
        }
      );
      res.status(200).json("deleted suucessfully");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
