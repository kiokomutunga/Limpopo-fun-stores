const express = require("express");
const router = express.Router();
const Furniture = require("../models/Furniture");
const upload = require("..middleware/upload");

router.post("/", upload.single("image"), async(requestAnimationFrame,res) => {
    try{
        const {name , description ,price} =  req.body;
        const newItem = new Furniture({

        });

        const saved = await newItem.save();
        res.status(201).json(saved);
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

//try to read data
router.get("/:id", async(req,res)=>{
    try{
        const item = await Furniture.findById(req.params.id);
        if(!item) return res.status(404).json({message: "not Found"});
        res.json(item);
    }catch (err) {
        res.status(500).json({error:err.message});
    }

});

router.get("/:id", async (req, res) => {
  try {
    const item = await Furniture.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const updateData = {
      name,
      description,
      price,
    };
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await Furniture.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Furniture.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
