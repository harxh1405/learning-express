const express = require('express');
//importing controllers
const userController = require('./../controllers/userController');
//ROUTES
const router = express.Router();
//creating another sub application for user resource

//chaining routes

//defining and controlling routes
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
