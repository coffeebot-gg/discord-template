const { startServer } = require("./src/server/index.js");


// add process logging for unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    // Application specific logging, throwing an error, or other logic here
});

// add process logging for uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception thrown");
    console.error(err);
});


startServer();