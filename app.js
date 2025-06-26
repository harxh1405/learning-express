const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');

//middlewares
app.use(morgan('dev')); //using 3rd party middlewares

app.use(express.json());
//expess.json() is a middleware
//it is a function used to modify incoming request data
//stands between request and response
//it adds data to the body of request

//understanding middleware

// This will be pushed to middleware stack
//since there is no route this will apply to all the requests
//position of middlware stack matter a lot in express
//global middleware
app.use((req, res, next) => {
  console.log(`Hello from the middleware`);
  next(); //mandatory(never forget this)
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

//Route Handlers

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    //stick to this json data format
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const createTour = (req, res) => {
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
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //parameters are strings
  //we need to convert it into number since id values are numbers
  const tour = tours.find((el) => el.id === id); //id is variable in our route

  //check for valid id
  // if (id > tours.length - 1) //feel free to use this or the following one
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      messagee: 'Invalid ID',
    });
  }

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

const updateTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      messagee: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here>...',
    },
  });
};

//handling delete requests
const deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
}; //we send 204 in response when deleting a resource
//204 means no content so we will set data: null
//data: null signifies that data that we deleted no longer exists

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
}; //500 is internal server error

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
//refactoring routes:

// app.get('/api/v1/tours',getAllTours);

// app.post('/api/v1/tours', createTour);

// app.get('/api/v1/tours/:id', getTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

//chaining is another best solution to refactor routes

//ROUTES

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

//This middleware function will not even execute since route handlers terminate the request response cycle
// app.use((req, rs, next) => {
//   console.log(`Hello from the middleware`);
//   next(); //mandatory(never forget this)
// });

//Start server
const port = 3001;

app.listen(port, () => {
  console.log(`App running on port ${port} `); //logged to console when the the server starts listening at the port
});

//routing determines how server responds to certain client request
