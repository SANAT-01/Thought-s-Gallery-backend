const express = require("express");
const { checkAuth } = require("../util/auth");
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require("../util/validation");
const { replaceFav, addFav, getAllFav } = require("../data/fav");
const router = express.Router();

// router.use(checkAuth);

router.get("/", async (req, res, next) => {
  console.log("working");
  try {
    const favs = await getAllFav();
    // console.log(favs);
    res.json({ fabs: favs });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const data = req.body;
  try {
    await addFav(data);
    // console.log("post fav");
    res.status(201).json({ message: "Fabs saved.", event: data });
  } catch (error) {
    // console.log("post error fav");
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;
  let errors = {};
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the event failed due to validation errors.",
      errors,
    });
  }

  try {
    await replaceFav(req.params.id, data);
    console.log("User Updated");
    res.json({ message: "User updated.", user: data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
