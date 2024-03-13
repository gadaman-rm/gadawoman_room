// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

import mqtt from "mqtt";

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `



const brokerOptions = {
  username: "xyz",
  password: "xyz123",
  hostname: "coolpanel.ir",
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
