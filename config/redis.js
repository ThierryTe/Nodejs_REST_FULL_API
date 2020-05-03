const util = require("util");
const redis = require("redis");

const config = require("../config/index");

let client;

module.exports = {

    getClient: () => {
        if(!client){
            redisConfig = {
                host: config.redisHOST,
                port: config.redisPORT
            };
            if(process.env.NOD_ENV === "production"){
                redisConfig.password = config.redisPassword;
            }
            client = redis.createClient(redisConfig);
            client.hget = util.promisify(client.hget);
        }
        return client;
    }
};