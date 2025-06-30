const fs = require('fs');
const Tour = require('./../models/tourModel'); //importing the Tour model

// reading data from file
// we will use this data to test our API
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

//param middleware for id check

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};
//Route Handlers

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    //stick to this jsend data format
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.createTour = (req, res) => {
  //data send in request body
  //middleware introduction
  // console.log(req.body);

  const newId = tours.at(-1).id + 1;

  const newTour = Object.assign({ id: newId }, req.body); //merges two object and returns a new object
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      }); //201 => created, 200 => ok
    }
  );
  //res.send('DONE)
  //two responses are not allowed
};

//responding to URL Parameters 127.0.0.1:3001/api/vi/tours/5

// app.get('/api/v1/tours/:id/:x/:y?', (req, res) => {
//   console.log(req.params);
//all the parameters are stored as req.params
//:id acts as a variable
//we can have multiple variables in url :id/:x/:y
//for optional parameters use ?(e.g. :id/:x/:y?)
//   res.status(200).json({
//     status: 'success',
//   });
// });

//practical demonstration
exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //parameters are strings
  //we need to convert it into number since id values are numbers
  const tour = tours.find((el) => el.id === id); //id is variable in our route

  //check for valid id
  // if (id > tours.length - 1) //feel free to use this or the following one
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     messagee: 'Invalid ID',
  //   });
  // } second method to check id

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
//put and patch are used to update data
//put makes sure that application receives the entire updated object
//patch returns only the updated part of the object

//handling patch request(put also works in the same way)

exports.updateTour = (req, res) => {
  // const id = req.params.id * 1;

  // if (id > tours.length - 1) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     messagee: 'Invalid ID',
  //   });
  // }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here>...',
    },
  });
};

//handling delete requests
exports.deleteTour = (req, res) => {
  // const id = req.params.id * 1;

  // if (id > tours.length - 1) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });

  res.status(204).json({
    status: 'success',
    data: null,
  });
}; //we send 204 in response when deleting a resource
//204 means no content so we will set data: null
//data: null signifies that data that we deleted no longer exists
