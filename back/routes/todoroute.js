const todo = require("../models/TodoModel");
const cloud = require("../utils/config");

const router = require("express").Router();

router.post("/add", async (req, res) => {
  const { title } = req.body;
  console.log(title);
  try {
    const created = new todo({ title });
    await created.save();
    res.status(200).json("added successfully");
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
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
router.get("/get", async (req, res) => {
  try {
    const finds = await todo.find();
    res.status(200).send(finds);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

module.exports = router;
