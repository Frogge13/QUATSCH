class QuatschFriends extends HTMLElement {

    constructor() {
        super();
        this._friends = [];
    }

    connectedCallback() {
        this.listFriendElement = document.createElement('ul');
        this.populateList();

        this.appendChild(this.listFriendElement);
    }

    populateList() {

        console.log(this._friends );
        while(this.listFriendElement.hasChildNodes())
            this.listFriendElement.removeChild(this.listFriendElement.lastChild);

        for (let key in this._friends) {
            let item = this._friends[key];
            let friendElement = document.createElement('li');
            friendElement.innerHTML = key;
            friendElement.addEventListener('click', () => {
                let e = new CustomEvent('friend', {
                    detail: key
                });
                this.dispatchEvent(e);
            });
            this.listFriendElement.appendChild(friendElement);
        }
    }

    set friends(friends) {
        this._friends = friends;
        this.populateList();
    }

}

window.customElements.define('quatsch-friends', QuatschFriends);
