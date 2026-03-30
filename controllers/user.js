//we'll attach our routes to particular functions what are they working
const User = require("../modals/user")

async function handleGetAllUsers(req,res) {
    const alldbUsers = await User.find({});
    return res.json(alldbUsers);
}

async function handleGetUsersById(req,res) {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404).json({error:'User not found'})
    }
    return res.json(user);
}

async function handleUpdateUsersById(req,res) {
    const id = Number(req.params.id);
    const body = req.body;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return res.status(404).json({ status: "User not found" });

    users[userIndex] = { ...users[userIndex], ...body };

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
      return res.json({ status: "success", user: users[userIndex] });
    });
}

async function handledeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({status:"Success"})
}

async function handleCreateUserById(req,res){
    const body = req.body;
    console.log(body)
    if(!body || !body.first_name || !body.last_name ||!body.email ||!body.gender ||!body.job_title){
        res.status(400).json({msg: 'All fileds are required'})
    }
    const result = await User.create({
        first_name:body.first_name,
        last_name:body.last_name,
        email:body.email,
        gender:body.gender,
        job_title:body.job_title,
        
    }
    )
    console.log('result',result);

    return res.status(201).json({msg: "success",id:result._id})
}

module.exports = {
    handleGetAllUsers,handleGetUsersById,handleUpdateUsersById,handledeleteUserById,handleCreateUserById
}