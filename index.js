const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require('fs')

const app = express();
const PORT = 7000;


//Middleware -plugin
app.use(express.urlencoded({extended: false}))


//Routes
app.get('/users', (req,res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
})

//REST API
app.get('/api/users', (req,res) => {
    return res.json(users);
})


// //M1 
// app.get("/api/users/:id", (req,res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })

app.post("/api/users", (req,res) => {
    //ToDo: Create new user
    const body = req.body;
    users.push({...body, id: users.length +1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) =>{
    return res.jsonp({status: "success", id: users.length});
    });
    })
    

// app.patch("/api/users/:id", (req,res) => {
//     //ToDo: Edit the user with id
//     return res.jsonp({status: "pending"});
// });

// app.delete("/api/users/:id", (req,res) => {
//     //ToDo: delete the user with id
//     return res.jsonp({status: "pending"});
// });

//M2
//Alternate to use methods which having same paths
app
   .route("/api/users/:id")
   .get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
   })
   .patch((req,res) => {
    //ToDo: Edit the user with id
    const id = Number(req.params.id);
    const body = req.body;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return res.status(404).json({ status: "User not found" });

    users[userIndex] = { ...users[userIndex], ...body };

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
      return res.json({ status: "success", user: users[userIndex] });
    });
   })
   .post((req,res) => {
    //ToDo: Create new user
    return res.jsonp({status: "pending"});
   })
   .delete((req,res) => {
    //ToDo: delete the user with id
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return res.status(404).json({ status: "User not found" });

    users.splice(userIndex, 1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
      return res.json({ status: "success", message: `User ${id} deleted` });
    });
   })

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`))