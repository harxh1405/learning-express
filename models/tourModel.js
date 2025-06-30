const mongoose = require('mongoose');

///creating a schema
//schema is a blueprint of the data that we want to store in our database
//it defines the structure of the data
//it is used to validate the data before storing it in the database
//it is used to create a model which is used to interact with the database
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  //schema type options object
  //2nd element in required array is a custom error message

  rating: {
    type: Number,
    default: 4.5,
  },
  price: { type: Number, required: [true, 'A tour must have a price'] }, //required is a validator
});

const Tour = mongoose.model('Tour', tourSchema);
//model name is always singular and capitalized

//  //creating a model from the schema
//Tour is a model that we can use to interact with the tours collection in the database
//it is used to create, read, update and delete data from the database

//////////////////////////////////////////////////////////////
//creating documnets and testing the model
// const testTour = new Tour({
//   name: 'The Park Camper',
//   price: 997,
// }); //test tour becomes the instance of the Tour model

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc); //logged to console when the document is saved to the database
//   })
//   .catch((err) => {
//     console.log('Error creating tour:', err); //logged to console when there is an error while saving the document to the database
//   }); //savig document to the database
///////////////////////////////////////////////////////////////

module.exports = Tour; //exporting the model so that we can use it in other files
