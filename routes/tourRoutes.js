const express = require('express');
//importing controllers
const tourController = require('./../controllers/tourController');
//ROUTES
const router = express.Router(); //creating sub application for tour resource

//chaining routes

//defining and controlling routes
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
