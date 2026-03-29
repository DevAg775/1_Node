const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require('fs')

const app = express();
const PORT = 7000;


//Middleware -plugin
app.use(express.urlencoded({extended: false})) //this one is built in middleware
 
//Middleware -1
// app.use((req,res,next)=>{
//     console.log("Hello from Middleware 1")
//     req.myUsername = "devansh";
//     // return res.json({msg: "Hello from Middleware 1"});
//     next();
// })


//Middleware -1
app.use((req,res,next)=>{
    fs.appendFile("log.txt",`\n${req.ip} ${Date.now()},${req.method}: ${req.path}`,
    (err,data)=>{
        next();
    }
    );
    req.myUsername = "devansh";
    // return res.json({msg: "Hello from Middleware 1"});
    // next();
})

//Middleware -2
app.use((req,res,next)=>{
    console.log("Hello from Middleware 2", req.myUsername)
    // return res.json({msg: "Hello from Middleware 2"});  //this will not proceed to routes it just return from here by printing the message "Hello from Middleware 2"
    // return res.end("hey")  //this will not proceed to routes it just return from here by printing the message Hey
    next();
})

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
    res.setHeader("X-MyName", "Devansh Agarwal"); //custom header
    // Always use X when using custom
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
    if(!body || !body.first_name || !body.last_name ||!body.email ||!body.gender ||!body.job_title){
        res.status(400).json({msg: 'All fileds are required'})
    }
    users.push({...body, id: users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) =>{
    return res.status(201).json({status: "success", id: users.length});
    });
    })
// app.patch("/api/users/:id", (req,res) => {
//     //ToDo: Edit the user with id (this is not logic this is just statement)
//     return res.jsonp({status: "pending"});
// });

// app.delete("/api/users/:id", (req,res) => {
//     //ToDo: delete the user with id (this is not logic this is just statement)
//     return res.jsonp({status: "pending"});
// });

//M2
//Alternate to use methods which having same paths
app
   .route("/api/users/:id")
   .get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user){
        res.status(404).json({error:'User not found'})
    }
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