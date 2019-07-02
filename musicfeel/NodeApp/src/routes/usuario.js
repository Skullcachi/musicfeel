const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.list);
router.post('/add', userController.save);
router.post('/login', userController.login);
//router.delete('/delete', userController.delete);


module.exports = router;