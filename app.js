const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const errorController = require("./controllers/error");
// const User = require('./models/user');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("65b4fb342b951d1225cb9e68")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb://sree:sree12@ac-8htdxkk-shard-00-00.eq1ggf8.mongodb.net:27017,ac-8htdxkk-shard-00-01.eq1ggf8.mongodb.net:27017,ac-8htdxkk-shard-00-02.eq1ggf8.mongodb.net:27017/shop?replicaSet=atlas-2m2vnb-shard-0&ssl=true&authSource=admin"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: " sree",
          email: "sree@gmail.com",
          cart: { items: [] },
        });
        user.save();
      }
    });

    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
