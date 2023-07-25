const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controller/controller');
const router = express.Router();

const app = express();

app.use(bodyParser.json());

router.post('/video', controller.addVideo);

router.post('/video/product', controller.addProduct);

router.post('/video/comment', controller.addComment);

router.get('/video', controller.getAllVideo);

router.get('/video/thumbnail', controller.getAllThumbnail);

router.get('/video/:id', controller.getVideo);

router.get('/video/thumbnail/:id', controller.getThumbnail);

router.get('/video/product/:id', controller.getProductList);

router.get('/video/comment/:id', controller.getComment);

module.exports = router;