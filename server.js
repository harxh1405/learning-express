const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(app.get('env')); //env variable is a global variable that defines the environment in which express  app is running

// node uses a lot of environment variables
//to view them use
// console.log(process.env);

//////////////////////////////////////////////////
//entry point of our application
//Start server
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App running on port ${port} `); //logged to console when the the server starts listening at the port
});

//routing determines how server responds to certain client request
//////////////////////////////////////////////////
//some environment variables are not set by express
//one of this is NODE_ENV which should be set manually
//ways to set NODE_ENV:
//NODE_ENV = DEVELOPMENT
//many npm packages depend on this variable
//change its value to production during deployment
//env variables help us to configure our app on the basis of environment our app is running(e.g. we might use different databases for development and testing environment. We can set different variables for different environments
//sometimes it would get hectic to type all of them in command line so we can craete configuration file
//reading of these variable only needs to happen once and then we can use them anywhere in any file
