const Bicycle = require('mongoose').model('Bicycle');

module.exports = {
    create(req, res){
        console.log(req.body)
        Bicycle.create(req.body)
        .then(bicycle => {res.json(bicycle)})
        .catch(console.log);
    },
    update(req, res){
        console.log(req.body)
        Bicycle.findByIdAndUpdate(req.body._id, {
            $set: {
                owner: req.body.owner,
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                location: req.body.location,
                image: req.body.image
            }
        })
        .then(bicycle => res.json(bicycle))
        .catch(console.log)
    },
    delete(req, res){
        console.log('hit server method')
        Bicycle.findByIdAndRemove(req.params.id)
        .then(console.log)
        .catch(console.log)
    },
    show(req, res){
        Bicycle.find({owner: req.params.id})
        .then(bicycle => res.json(bicycle))
        .catch(console.log)
        
    },
    showAll(req, res){
        Bicycle.find({}).populate('owner')
        .then(bicycles => res.json(bicycles))
        .catch(console.log)
    },

    random(req, res){
        Bicycle.aggregate({ $sample: {size: 1}})
        .then(bicycle => res.json(bicycle))
        .catch(console.log)
    }
}