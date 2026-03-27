const express = require("express");
const users = require("./MOCK_DATA.json")

const app = express();
const PORT = 7000;

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

// app.post("/api/users/:id", (req,res) => {
//     //ToDo: Create new user
//     return res.jsonp({status: "pending"});
// });

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
    return res.jsonp({status: "pending"});
   })
   .post((req,res) => {
    //ToDo: Create new user
    return res.jsonp({status: "pending"});
   })
   .delete((req,res) => {
    //ToDo: delete the user with id
    return res.jsonp({status: "pending"});
   })

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`))