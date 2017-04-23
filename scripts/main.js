var peer = new Peer(prompt('Wie ist dein Name?'), {key: 'lwjd5qra8257b9'});

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});

peer.on('connection', function(conn) {
  console.log(conn)
  conn.on('data', function(data){
    // Will print 'hi!'
    console.log(data);
  });
  conn.send('sdafsddfsdfsdfs');
});
