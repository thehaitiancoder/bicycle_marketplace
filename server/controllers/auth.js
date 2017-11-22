const User = require('mongoose').model('User');

module.exports = {
    login(req, res){
        console.log(req.body)
        User.findOne({ email: req.body.email })
        .then(user => {
            
            if(!user) { 
                throw new Error();
            }   
            return User.validatePassword(req.body.password, user.password)
            .then(() => {
                //handle login
                completeLogin(req, res, user);
            })
            .catch(console.log)
        })
        .catch(error => {
            res.status(401).json('email/password comb does not exist');
        })
    },
    register(req, res){
        User.create(req.body)
        .then(user => {
            //handle login
            completeLogin(req, res, user);
        })
        .catch(error => {
            res.status(422).json(
                Object.keys(error.errors).map(key => error.errors[key].message)
            )
        })
    },
    logout(req, res){
        console.log('logging out');
        req.session.destroy();
        res.clearCookie('userId');
        res.clearCookie('expiration');
        res.json(true);

    },
}

function completeLogin(req, res, user){
    console.log('Completing login');

    req.session.user = user.toObject();

    delete req.session.user.password;

    res.cookie('userId', user._id.toString());
    res.cookie('expiration', Date.now() + 86400 * 10000);

    res.json(user);
}