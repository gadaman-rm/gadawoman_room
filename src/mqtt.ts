import mqtt from "mqtt";

const brokerOptions = {
    username: "xyz",
    password: "xyz123",
    host: "coolpanel.ir",
    port: 9090
};

const client = mqtt.connect(brokerOptions);

client.on("connect", function () {
    console.log("Connected to MQTT broker");

    client.subscribe("testTopic", function (err) {
        if (!err) {
            console.log("Subscribed to testTopic");
        }
    });
    client.publish("testTopic", "Hello from MQTT client!");
});

client.on("message", function (topic, message) {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
});

client.on("close", function () {
    console.log("Disconnected from MQTT broker");
});

client.on("error", function (err) {
    console.error("Error:", err);
});

process.on("SIGINT", function () {
    client.end();
    process.exit();
});
