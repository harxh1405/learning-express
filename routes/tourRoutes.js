const express = require('express');
//importing controllers
const tourController = require('./../controllers/tourController');
//ROUTES
const router = express.Router(); //creating sub application for tour resource
router.param('id', tourController.checkID); //to fetch or access query strings or parameters in url, val will store the id passed in URL
//chaining routes

//chaining middlewares
//create a checkbody middlware
//check if body contains the name and price property
//if not, send back 400 (bad request)
//add it to the post handler stack
const checkBody = function (req, res, next) {
  if (!(req.body.name ?? req.body.price))
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  next();
};

//defining and controlling routes
router
  .route('/')
  .get(tourController.getAllTours)
  .post(checkBody, tourController.createTour);
//chaining middleware

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
