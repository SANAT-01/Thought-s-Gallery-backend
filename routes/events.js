const express = require("express");
const {
  getAll,
  get,
  add,
  removeEvent,
  replaceEvents,
} = require("../data/event");
const { removeUser, getAllUsers, replaceUser } = require("../data/user");
const { checkAuth } = require("../util/auth");
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require("../util/validation");
const { replaceFav, addFav, getAllFav } = require("../data/fav");
const router = express.Router();

router.get("/", async (req, res, next) => {
  // console.log(req.token);
  try {
    const events = await getAll();
    res.json({ events: events });
  } catch (error) {
    next(error);
  }
});

router.get("/users", async (req, res, next) => {
  // console.log(req);
  try {
    const user = await getAllUsers();
    res.json({ user: user });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const event = await get(req.params.id);
    res.json({ event: event });
  } catch (error) {
    next(error);
  }
});

// router.use(checkAuth);

router.post("/", async (req, res, next) => {
  // console.log(req.token);
  const data = req.body;

  // let errors = {};

  // if (!isValidText(data.title)) {
  //   errors.title = "Invalid title.";
  // }

  // if (!isValidText(data.description)) {
  //   errors.description = "Invalid description.";
  // }

  // if (!isValidDate(data.date)) {
  //   errors.date = "Invalid date.";
  // }

  // if (!isValidImageUrl(data.image)) {
  //   errors.image = "Invalid image.";
  // }

  // if (Object.keys(errors).length > 0) {
  //   return res.status(422).json({
  //     message: "Adding the event failed due to validation errors.",
  //     errors,
  //   });
  // }

  try {
    await add(data);
    res.status(201).json({ message: "Event saved.", event: data });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;
  console.log(data);
  let errors = {};

  // if (!isValidText(data.title)) {
  //   errors.title = "Invalid title.";
  // }

  // if (!isValidText(data.description)) {
  //   errors.description = "Invalid description.";
  // }

  // if (!isValidDate(data.date)) {
  //   errors.date = "Invalid date.";
  // }

  // if (!isValidImageUrl(data.image)) {
  //   errors.image = "Invalid image.";
  // }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the event failed due to validation errors.",
      errors,
    });
  }

  try {
    await replaceEvents(req.params.id, data);
    res.json({ message: "Event updated.", event: data });
  } catch (error) {
    next(error);
  }
});

router.patch("/user/:id", async (req, res, next) => {
  const data = req.body;
  let errors = {};
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the event failed due to validation errors.",
      errors,
    });
  }

  try {
    await replaceUser(req.params.id, data);
    console.log("User Updated");
    res.json({ message: "User updated.", user: data });
  } catch (error) {
    next(error);
  }
});

router.get("/fav", async (req, res, next) => {
  console.log("working");
  // try {
  //   const favs = await getAllFav();
  //   res.json({ fabs: favs });
  // } catch (error) {
  //   next(error);
  // }
});

// router.post("/fav", async (req, res, next) => {
//   // console.log(req.token);
//   const data = req.body;
//   try {
//     await addFav(data);
//     res.status(201).json({ message: "Event saved.", event: data });
//   } catch (error) {
//     next(error);
//   }
// });

// router.patch("/fav/:id", async (req, res, next) => {
//   const data = req.body;
//   let errors = {};
//   if (Object.keys(errors).length > 0) {
//     return res.status(422).json({
//       message: "Updating the event failed due to validation errors.",
//       errors,
//     });
//   }

//   try {
//     await replaceFav(req.params.id, data);
//     console.log("User Updated");
//     res.json({ message: "User updated.", user: data });
//   } catch (error) {
//     next(error);
//   }
// });

router.delete("/:id", async (req, res, next) => {
  try {
    await removeEvent(req.params.id);
    res.json({ message: "Event deleted." });
  } catch (error) {
    next(error);
  }
});

router.delete("users/:id", async (req, res, next) => {
  try {
    await removeUser(req.params.id);
    res.json({ message: "Event deleted." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
