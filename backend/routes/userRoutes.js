const express = require('express');

const { getUsers, createUser,
   getUser, deleteUser } = require("../controllers/userController");

const { signup, login } = require("../controllers/authController");

const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);


router.use(protect);
router.use(restrictTo('admin'));

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);



module.exports = router;