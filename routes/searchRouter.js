const express = require('express');
let router = express.Router();
let artistController = require('../controllers/artistController')

router.get('/', artistController.search);
router.post('/add', artistController.add);
router.post('/delete', artistController.delete);
router.post('/sortedSearch', artistController.sortedSearch);


module.exports = router;
