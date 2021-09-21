const router = require('express').Router();
const { Product } = require('../models/Product');

router.get('/all', (req, res) => {

    Product.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })

});

router.post('/add', (req, res) => {
    const productCard = req.body;

    Product.create(productCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(prod => res.json(prod))
        .catch(err => res.status(400).json(err));
});

router.post('/update/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(prod => {
            prod.price = req.body.price;

            prod.save()
                .then(() => res.json(prod))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;