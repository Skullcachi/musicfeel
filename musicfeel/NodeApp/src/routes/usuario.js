const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.list);
router.post('/add', userController.save);
router.post('/login', userController.login);
router.post('/delete', userController.delete);
router.get('/getRecommendations/:id', userController.getRecommendations);
router.post('/insertRecommendation', userController.insertRecommendation);
//router.get('/update', userController.update);


module.exports = router;