import "@material/web/button/filled-tonal-button";
import "@material/web/textfield/filled-text-field";
import "./index.scss";
import { ChatCommunication, IClientOptions } from "./ChatCommunication";

const brokerOptions: IClientOptions = {
  username: "xyz",
  password: "xyz123",
  host: "coolpanel.ir",
  port: 9090,
  hostname: "coolpanel.ir",
  protocol: "wss"
};

const chatCommunication = new ChatCommunication(brokerOptions);

class Message extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
        <style>
          .message {
            display: flex;
            align-items: center;
            background-color: #f0f0f0;
            padding: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
          }
          .avatar {
            width: 40px;
            height: 40px;
            margin-right: 10px;
            border-radius: 50%;
            background-color: #ccc;
          }
        </style>
        <div class="message">
          <div class="avatar"></div>
          <div>
            <slot></slot>
          </div>
        </div>
      `;
  }
}

customElements.define("chat-message", Message);

class SidebarContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
        <style>
          :host {
            display: block;
            width: 200px;
            padding: 10px;
          }
        </style>
        <slot></slot>
      `;
  }
}

class SidebarItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
        <style>
          .room {
            display: flex;
            align-items: center;
            padding: 2px;
          }
          .avatar {
            width: 25px;
            height: 25px;
            margin-right: 10px;
            border-radius: 50%;
            background-color: #f0f0f0;
          }
        </style>
        <div class="room">
          <div class="avatar"></div>
          <div>
            <slot></slot>
          </div>
        </div>
      `;
  }
}

customElements.define("sidebar-container", SidebarContainer);
customElements.define("sidebar-item", SidebarItem);

document.addEventListener("mqttConnectEvent", function () {
  console.log(`Connected`);
  chatCommunication.subscribe("test");

});

const messageContainer = document.querySelector(".messageContainer");


document.addEventListener("mqttMsgEvent", function (e: CustomEventInit) {
  console.log(`Msg: ${e.detail.message}`);
  const message = e.detail.message;


  if (messageContainer) {
    const newChatMessage = document.createElement("chat-message");
    newChatMessage.textContent = message;
    messageContainer.appendChild(newChatMessage);
  }
});

const chatInput = document.getElementById("chatInput") as HTMLInputElement;
const sendButton = document.getElementById("sendButton");

function sendMessage() {
  const message = chatInput.value;
  chatCommunication.publish("test", message);
  chatInput.value = "";
  //scrollToBottom();
}

sendButton!.addEventListener("click", () => {
  sendMessage();
});

chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});


function scrollToBottom() {
  messageContainer!.scrollTop = messageContainer!.scrollHeight;
}

const observer = new MutationObserver(scrollToBottom);
observer.observe(messageContainer!, { childList: true });

scrollToBottom();
