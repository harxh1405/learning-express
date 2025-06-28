const express = require('express');
const app = express();
const morgan = require('morgan');

//importing routers
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //using 3rd party middlewares
}

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

//serving static files from folder and not from the route
app.use(express.static(`${__dirname}/public`)); //dont use public in URL while searching since it will be set as root when no route is found and overview.html will be rendered
app.use((req, res, next) => {
  console.log(`Hello from the middleware`);
  next(); //mandatory(never forget this)
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//refactoring routes:

// app.get('/api/v1/tours',getAllTours);

// app.post('/api/v1/tours', createTour);

// app.get('/api/v1/tours/:id', getTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

//chaining is another best solution to refactor routes

//mounting routes is just mounting a new router(tourRouter) on a route '/api/v1/tours'
//it is used for sepeartion of concerns
app.use('/api/v1/tours', tourRouter); //route and middleware function
//this middleware function is our sub application
app.use('/api/v1/users', userRouter);

//This middleware function will not even execute since route handlers terminate the request response cycle
// app.use((req, rs, next) => {
//   console.log(`Hello from the middleware`);
//   next(); //mandatory(never forget this)
// });
module.exports = app;
