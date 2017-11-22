const authController = require('../controllers/auth');
const bicycleController = require('../controllers/bicycle');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/assets/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})

module.exports = function(app){
    app.post('/auth/login', authController.login);
    app.post('/auth/register', authController.register);
    app.delete('/auth/logout', authController.logout);

    app.post('/api/bicycle/', bicycleController.create);
    app.put('/api/bicycle/', bicycleController.update);
    app.delete('/api/bicycle/:id', bicycleController.delete);
    app.get('/api/bicycle/', bicycleController.showAll);
    app.get('/api/bicycle/:id', bicycleController.show);
    app.get('/api/bicycle/random/:id', bicycleController.random);

    app.post("/upload", multer({storage: storage}).array("uploads", 1), function(req, res) {
        res.send(req.files);
    });

    app.all('*', function(req, res){
        res.sendFile(path.resolve('dist', 'index.html'));
    });
}