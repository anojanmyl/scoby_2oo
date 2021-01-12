const express = require("express");
const protectPrivateRoute = require("../middlewares/protectPrivateRoute");
const router = express.Router();
const User = require("../models/User");

router.get("/me", function (req, res, next) {
  res.send("respond with a resource");
});

router.patch("/me", protectPrivateRoute, (req, res, next) => {
  // Update a specific user
  //   console.log(req.params.id);
  //   console.log(req.body);

  User.findByIdAndUpdate(req.session.currentUser, req.body, { new: true })
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/me", protectPrivateRoute, (req, res, next) => {
  // Deletes a user
  User.findByIdAndRemove(req.session.currentUser)
    .then((userDocument) => {
      // res.sendStatus(204)
      res.status(204).json({
        message: "Successfuly deleted !",
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
