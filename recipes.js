/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
/* eslint-disable no-console */
/* eslint-disable quotes */
const mongoose = require("mongoose");

const { Schema } = mongoose;
const data = require("./data.js");

const Recipe = require("./models/Recipe");

mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create({
  title: "Mango Ceviche",
  level: "Easy Peasy",
  ingredients: [
    "1 large red onion, thinly sliced",
    "2 large ripe mangoes, peeled, pitted, and cut into 3/4-inch (2 cm) dice",
    "4 limes",
    "1/4 tsp salt",
    "1 limo chile, seeded and finely chopped",
    "Leaves from 2 cilantro sprigs, finely chopped"
  ],
  cuisine: "Peruvian",
  dishType: "Dish",
  image:
    "https://www.seriouseats.com/recipes/images/2014/06/20140626-cook-the-book-ceviche-ceviche-de-mango-paul-winch-furness.jpg",
  duration: 30,
  creator: "Martin Morales"
})
  .then(recipe => {
    console.log("The recipe is saved and its name is:", recipe.title);
    return Recipe.insertMany(data);
  })
  .then(() => {
    data.forEach(recipe => {
      console.log(recipe.title);
    });
    return Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log("Recipe updated!");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Recipe deleted!");
    mongoose.connection.close();
  })
  .catch(err => {
    console.log("An error happened", err);
    mongoose.connection.close();
  });
