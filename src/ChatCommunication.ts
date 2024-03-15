import mqtt, { IClientOptions } from "mqtt";
export type { IClientOptions };
//add some event

export class ChatCommunication {
  private client: mqtt.MqttClient;
  constructor(brokerOptions: mqtt.IClientOptions) {
    this.client = mqtt.connect(brokerOptions);
    this.client.on("connect", function () {
      console.log("Connected to MQTT broker");
      const mqttConnectEvent = new CustomEvent("mqttConnectEvent");
      document.dispatchEvent(mqttConnectEvent);
    });

    this.client.on("message", function (topic, message) {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
      const mqttMsgEvent = new CustomEvent("mqttMsgEvent", {
        detail: { message },
      });
      document.dispatchEvent(mqttMsgEvent);
    });

    this.client.on("close", function () {
      console.log("Disconnected from MQTT broker");
    });

    this.client.on("error", function (err) {
      console.error("Error:", err);
    });
  }

  subscribe(topic: string): void {
    this.client.subscribe(topic, function (err) {
      if (!err) {
        console.log("Subscribed to testTopic");
      }
    });
  }

  publish(topic: string, message: string): void {
    this.client.publish(topic, message);
  }
}
