const LogMdw = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    res.setHeader('Content-Type', 'application/json', 'text/start');
    next();
};

module.exports = LogMdw;