function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(500).send(err);
    res.setHeader('Content-Type', 'application/json', 'text/start');
}

module.exports = { errorHandler }