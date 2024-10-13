const express = require('express');
const router = express.Router();
const errorHandler = require('../controllers/errorHandler');

//! Don't know what is wrong in here.
const LogMdw = async (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    const header = await res.setHeader('Content-Type', 'application/json', 'text/start');
    console.log(header);
    next();
};
router.use(LogMdw);
router.use(errorHandler);
/** this doesn't work at all */

router.get('/', (req, res) => {
    const name = req.query.name;
    res.send({ name });
});

router.get('/:id', LogMdw, (req, res) => {
    const userId = req.params.userId;
    res.send({ userId });
});

router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    res.send({ name, email, password });
});    

router.put('/:id', (req, res) => {
    const userId = req.params.userId;
    const { name, email, password } = req.body;
    res.send({ id: userId, name, email, password: '**********' });
});
router.delete('/delete/:id', (req, res) => {
    const userId = req.params.userId;
    res.send({ id: userId });
});

module.exports = router;