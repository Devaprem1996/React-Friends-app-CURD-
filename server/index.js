const express = require('express');
const mongoose = require("mongoose");
const Friends = require("./models/friends");
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// database connection:
mongoose.connect("mongodb+srv://devaprem:Dev%40sep10@cluster0.c9eepgg.mongodb.net/mernDB");

app.get("/read", async (req, res) => {
    Friends.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
   
   
});

app.post("/addfriend", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    
    const newFriends = new Friends({
        name: name,
        age: age
    });
     newFriends.save();
    console.log("successfully inserted");
});

app.put("/update", async (req, res) => {
    const newAge = req.body.newAge;
    const id = req.body.id;
   
    try {
        await Friends.findById(id, (err, foundbyid) => {
            foundbyid.age = Number(newAge) 
            foundbyid.save();
        });
    } catch (err) {
        console.log(err);
    }
    
    res.send("updated");

});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await Friends.findByIdAndRemove(id).exec()
    res.send("deleted");
})
 


app.listen(3001, () => {
    console.log("server is running");
});