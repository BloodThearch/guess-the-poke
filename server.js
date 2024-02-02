const cluster = require("cluster")
const os = require('node:os')
const process = require('node:process');

const {createApp} = require("./index")

const numCPUs = os.availableParallelism()

if (cluster.isPrimary) {
    console.log(`Available CPUs: ${numCPUs}`)
    console.log(`Primary ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    createApp()
  
    console.log(`Worker ${process.pid} started`);
  }