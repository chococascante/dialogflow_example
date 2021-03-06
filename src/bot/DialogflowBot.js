import { WebhookClient, Text } from "dialogflow-fulfillment";

const HOUR_INTENT = "HourIntent";
const ORDER_FOOD = "OrderFood";

export default class DialogflowBot {
  constructor() {
    this.actionMap = new Map();
    this.actionMap.set(HOUR_INTENT, this.getCurrentTime.bind(this));
    this.actionMap.set(ORDER_FOOD, this.orderFood.bind(this));
  }

  async handle(req, res) {
    // Se crea el WebhookClient que manejará las solicitudes basándose en el map
    const agent = new WebhookClient({ request: req, response: res });
    await agent.handleRequest(this.actionMap);
  }

  getCurrentTime(agent) {
    console.log(agent);
    const today = new Date();
    const currentTime =
      today.getHours() +
      ":" +
      (today.getMinutes().toString().length == 2
        ? today.getMinutes()
        : today.getMinutes() * 10);
    const text = new Text(currentTime);
    agent.add(text);
  }

  orderFood(agent) {
    agent.add(
      "Su comida " +
        agent.parameters["FoodCategory"] +
        " llegará en 45 minutos."
    );
  }
}

{
  id_persona: {
  }
}
