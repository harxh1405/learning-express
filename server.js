const app = require('./app');

//entry point of our application
//Start server
const port = 3001;

app.listen(port, () => {
  console.log(`App running on port ${port} `); //logged to console when the the server starts listening at the port
});

//routing determines how server responds to certain client request
