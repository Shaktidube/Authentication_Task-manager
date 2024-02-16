const { signup,login, logout } = require("../controllers/user-controller");
const { getUser } = require("../controllers/user2-controller");
const { refreshToken } = require("../middlwares/refreshToken");

const verifyToken = require("../middlwares/verifyToken");
const Task = require("../models/TaskModel");

const {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask,
  } = require("../controllers/user2-controller");

const router = require("express").Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/user",verifyToken,getUser)
router.get("/refresh", refreshToken, verifyToken, getUser);
// router.post("/logout", verifyToken, logout);

// router.route("/").get(getTasks).post(createTask);
// router.route("/:id").get(getTask).delete(deleteTask).put(updateTask);

module.exports=router;

