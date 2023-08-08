//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Create a function that returns the default items
function getDefaultItems() {
  const item1 = new Item({ name: "Welcome to your todolist!" });
  const item2 = new Item({ name: "Hit the + button to add a new item." });
  const item3 = new Item({ name: "<-- Hit this to delete an item." });

  const defaultItems = [item1, item2, item3];
  return defaultItems;
}

// Initialize Database
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

    const existingItems = await Item.find({});

    if (existingItems.length === 0) {
      const defaultItems = getDefaultItems();

      await Item.insertMany(defaultItems);
      console.log("Database initialization successful.");
    } else {
      console.log("Database already initialized with items.");
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

main();

// Schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// Model
const Item = mongoose.model("Item", itemSchema);

// Custom list schema
const listSchema = ({
  name: String,
  items: [itemSchema]
});

const List = mongoose.model("List", listSchema);

// Default route for the home page | Render database items
app.get("/", async (req, res) => {
  try {
    const items = await Item.find({});
    // Render the "list" view only if there are items
    res.render("list", {listTitle: "Today", newListItems: items});
  } catch (err) {
    console.error(err);
    // Handle the error or redirect to an error page
    // res.render("list", { errorMessage: "An error occurred." });
  }
});

app.get("/:customListName", async (req, res) => {
  try {
    const customListName = req.params.customListName;
    const foundList = await List.findOne({ name: customListName });
    if (foundList) {
      res.render("list", {
        listTitle: foundList.name,
        newListItems: foundList.items
      })
    } else {
      const list = await List.create({
        name: customListName,
        items: getDefaultItems()
      });
      res.redirect(`/${customListName}`);
    }
  } catch (err) {
    console.error(err);
  }
});

app.post("/", async (req, res) => {
  try {
    const itemName = req.body.newItem;
    const newItem = await Item.create({ name: itemName });
    console.log("Successfully created a new item:", newItem);
    res.redirect("/");
  } catch (err) {
    console.error("Error creating a new item:", err);
    // Handle the error by rendering an error page or sending an error response
    // res.status(500).render("list", { errorMessage: "An error occurred." });
  }
});

app.post("/delete", async (req, res) => {
  try {
    const checkedItemId = req.body.checkbox;
    const deletedItem = await Item.findByIdAndRemove(checkedItemId);
    console.log("Successfully deleted an item:", deletedItem);
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
