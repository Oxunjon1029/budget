const express = require("express");
const passport = require("passport");
const Category = require("../models/Category");
const router = express.Router();
const auth = passport.authenticate('jwt', { session: false });
router.post('/add', auth, async (req, res) => {
  // try {
  //   const category = await Category.find({ title: title });
  //   if (category) {
  //     return res.status(409).json({ message: "Sorry, there is a category with this title.Please, create a category with unique title" })
  //   } else {

  //   }
  // } catch (err) {
  //   return res.status(401).json(err.message)
  // }

  const { title, Type } = req.body
  const category = await new Category({ title: title, Type: Type });
  await category.save();
  return res.status(200).send(category)

})


router.get('/', auth, async (req, res) => {


  try {
    const categories = await Category.find({});
    categories.forEach((category) => {
      categories[category._id] = category
    });
    if (categories) {
      return res.status(200).send(categories)
    }
  } catch {
    return res.status(401).json({ message: "Unathorized" })
  }
})

router.get('/:id', auth, async (req, res) => {
  const category = await Category.find({ _id: req.params.id });
  if (category) {
    return res.status(200).send(category)
  }
  return res.status(401).json({ message: "Unathorized" })
})
router.post('/edit/:id', auth, async (req, res) => {

  const { title } = req.body;
  try {
    const category = await Category.find({ title: title });
    if (category) {
      return res.status(409).json({ message: "Sorry, there is a category with this title.Please change the title" });
    } else {
      const category = await Category.findByIdAndUpdate(req.params.id, { title: title }, { new: true });
      return res.status(200).json({ message: "Updated successfully" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Unathorized" })
  }


})

router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    await category.remove();
    return res.status(200).json({ message: "Category has been deleted successfully" })
  } catch {
    return res.status(401).json({ message: "Unathorized" })
  }
})

module.exports = router;