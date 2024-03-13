import '@material/web/button/filled-tonal-button'
import '@material/web/textfield/filled-text-field'
import './index.scss'

class Message extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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

customElements.define('chat-message', Message);


class SidebarContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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
        this.attachShadow({ mode: 'open' });
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

customElements.define('sidebar-container', SidebarContainer);
customElements.define('sidebar-item', SidebarItem);

