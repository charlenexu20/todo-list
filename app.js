//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connection
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

// Schema
const itemSchema = new mongoose.Schema({ name: String });

// Model
const Item = mongoose.model("Item", itemSchema);

// Document
const item1 = new Item({ name: "Welcome to your todolist!" });
const item2 = new Item({ name: "Hit the + button to add a new item." });
const item3 = new Item({ name: "<-- Hit this to delete an item." });

const defaultItems = [item1, item2, item3];

// Render database items
app.get("/", async (req, res) => {
  try {
    const items = await Item.find({});
    if (items.length === 0) {
      try {
        const insertedItems = await Item.insertMany(defaultItems);
        console.log(insertedItems)
      } catch (err) {
        console.error("Error inserting items:", err);
      } finally {
        console.log("Successfully inserted items.");
      }
      res.redirect("/");
    } else {
      // Render the "list" view only if there are items
      res.render("list", {listTitle: "Today", newListItems: items});
    }
  } catch (err) {
    console.error(err);
    // Handle the error or redirect to an error page
    res.render("error", { errorMessage: "An error occurred." });
  }
});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
