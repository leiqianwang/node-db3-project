const express = require('express');

const SchemeRouter = require('./schemes/scheme-router.js');

const server = express();

server.use(express.json());
server.use('/api/schemes', SchemeRouter);


// const port = 9000;
// server.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });


module.exports = server;