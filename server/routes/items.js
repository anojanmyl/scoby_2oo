const express = require("express");
const protectPrivateRoute = require("../middlewares/protectPrivateRoute");
const router = express.Router();
const Item = require("../models/Item");

// http://localhost:4000/api/items
router.get("/", (req, res, next) => {
  // Get all the items
  Item.find()
    .then((itemDocuments) => {
      res.status(200).json(itemDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/items/{some-id}
router.get("/:id", (req, res, next) => {
  //Get one specific item
  Item.findById(req.params.id)
    .then((itemDocument) => {
      res.status(200).json(itemDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/items/{some-id}
router.patch("/:id", protectPrivateRoute, (req, res, next) => {
  // Update a specific item
  //   console.log(req.params.id);
  //   console.log(req.body);

  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((itemDocument) => {
      res.status(200).json(itemDocument);
      // There's a trap !
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/items
router.post("/", protectPrivateRoute, (req, res, next) => {
  // Create a item
  Item.create(req.body)
    .then((itemDocument) => {
      res.status(201).json(itemDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/items/{some-id}
router.delete("/:id", protectPrivateRoute, (req, res, next) => {
  // Deletes a item
  Item.findByIdAndRemove(req.params.id)
    .then((itemDocument) => {
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
