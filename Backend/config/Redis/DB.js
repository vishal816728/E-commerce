const { createClient } = require("redis");

const client = createClient({
  host: "redis-server",
  port: 6379,
});

client.on("error", (err) => console.log("Redis Client Error", err));

client.connect();

if (!client) {
  console.log("Redis is connected");
}

module.exports = client;
