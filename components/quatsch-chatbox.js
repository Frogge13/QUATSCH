class QuatschChatbox extends HTMLElement {
    constructor() {
        super();

    }

    connectedCallback() {
      let inputElement = document.createElement('input');
      let chatElement = document.createElement('div');
      let sendButtonElement = document.createElement('button');

      inputElement.classList.add('inputElement');
      chatElement.classList.add('chatElement');
      sendButtonElement.classList.add('sendButtonElement');

      inputElement.setAttribute('placeholder','text...');
      sendButtonElement.innerHTML = 'Senden';

      sendButtonElement.addEventListener('click', () => {
        this.send();
      });

      inputElement.addEventListener('keypress', (e) => {
        if (e.key == 'Enter') {
          this.send();
        }
      });

      this.appendChild(chatElement);
      this.appendChild(inputElement);
      this.appendChild(sendButtonElement);

      this.chatElement = chatElement;
      this.inputElement = inputElement;
    }

    appendMessage(name, msg) {
      name = name || this.nickname;
      let message = name + ': ' + msg;
      let chatLineElement = document.createElement('p');
      chatLineElement.classList.add('chatLineElement');
      chatLineElement.innerHTML = message;
      this.chatElement.appendChild(chatLineElement);
      this.chatElement.scrollTop = this.chatElement.scrollHeight;
    }

    static get observedAttributes() {
        return ['nickname'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue,this);
        if (name == 'nickname') {
          this.nickname = newValue;
        }
    }

    send(){
      let val = this.inputElement.value;
      if (val != '') {
        this.appendMessage(null, val);
        this.inputElement.value = null;
        this.inputElement.focus();

        let e = new CustomEvent('message', {
          message: val
        });
        this.dispatchEvent(e);
      }

    }

}

window.customElements.define('quatsch-chatbox', QuatschChatbox);
