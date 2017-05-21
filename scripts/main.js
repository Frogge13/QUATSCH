class Main {
  constructor(friendListElement, chatboxElement) {
    this.peer = new Peer(prompt('Wie ist dein Name?'), {key: 'lwjd5qra8257b9'});
    this.curConn = null;

    this.friendListElement = friendListElement;
    this.chatboxElement = chatboxElement;

    //this.peer.on('open', me => this.synConn());
    this.peer.on('connection', (conn) => {
      this.handleConnection(conn)
    });

    this.friendListElement.addEventListener('friend', (e) => {
      this.setCurConn(this.peer.connections[e.detail][0]);
    });

    this.chatboxElement.addEventListener('message', (e) => {
      this.curConn.send(e.detail);
      this.curConn.messages.push({
        from: 'me',
        val: e.detail
      });
    })
  }

  setCurConn(conn) {
      this.curConn = conn;
      this.chatboxElement.setMessages(conn.messages);
  }

  synConn() {
    this.friendListElement.friends = this.peer.connections;
  }

  connectFriend(name) {
    console.log('try to connect to ', name)
    let conn = this.peer.connect(name)
    this.handleConnection(conn);
  }

  handleConnection(conn) {
    conn.messages = [];
    this.synConn();
    conn.on('open', () => this.synConn());
    conn.on('data', (data) => {
      conn.messages.push({
        from: conn.peer,
        val: data
      });
      this.chatboxElement.setMessages( this.curConn.messages);
    });
    conn.on('error', err => console.log(err, conn));
  }
}


document.addEventListener("DOMContentLoaded", function(event) {
    let friendListElement = document.getElementById('friend-list');
    let chatboxElement = document.getElementById('chatbox');
    let btnAddFriendElement = document.getElementById('btn-add-friend');

    let app = new Main(friendListElement, chatboxElement);

    btnAddFriendElement.addEventListener('click', e => {
        app.connectFriend(prompt('Wie heißt denn dein Freund?'))
    })
});