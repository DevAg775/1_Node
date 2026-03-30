const express = require("express");
const {handleGetAllUsers,handleGetUsersById,handleUpdateUsersById,handledeleteUserById,handleCreateUserById} = require("../controllers/user")
const router = express.Router();

//Routes

//REST API

//M2
//Alternate to use methods which having same paths which is called routes chainning
router
   .route("/:id")
   .get(handleGetUsersById)
   .patch(handleUpdateUsersById)
   .delete(handledeleteUserById)

router
   .route("/")
   .post(handleCreateUserById)
   .get(handleGetAllUsers)

module.exports = router;