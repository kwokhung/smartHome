import { Injectable } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';

@Injectable()
export class MqttProvider {

  client: Paho.MQTT.Client;

  constructor() {
    this.client = new Paho.MQTT.Client("mbltest01.mqtt.iot.gz.baidubce.com", Number("8884"), "/mqtt", "DeviceId-s42mw9zs48");

    this.client.onConnectionLost = (response: object) => {
      console.log("onConnectionLost: " + (response as any).errorCode);
      console.log("onConnectionLost: " + (response as any).errorMessage);
    };

    this.client.onMessageDelivered = () => {
      console.log("onMessageDelivered");
    };

    this.client.connect({
      useSSL: true,
      userName: "mbltest01/letv1s01",
      password: "hzrU8ekRn7MR7X4ycTO6OzbKbRDaaK5tmaLVY+Ue/58=",
      invocationContext: {
        userName: "mbltest01/letv1s01"
      },
      onSuccess: (context) => {
        console.log("connect.onSuccess");
        console.log(context);
        console.log(this);

        this.client.subscribe("letv1s01", {
          invocationContext: {
            topic: "letv1s01"
          },
          onSuccess: (response) => {
            console.log("subscribe.onSuccess: " + response.grantedQos);
            console.log(response.invocationContext);
          },
          onFailure: (response) => {
            console.log("subscribe.onFailure: " + response.errorCode);
            console.log(response.invocationContext);
          }
        });
      },
      onFailure: (response) => {
        console.log("connect.onFailure: " + response.errorCode);
        console.log("connect.onFailure: " + response.errorMessage);
        console.log(response.invocationContext);
      }
    });
  }

  send(text: string, destination: string) {
    let message: any = new Paho.MQTT.Message(text);
    message.destinationName = destination;

    this.client.send(message);
  }

}
