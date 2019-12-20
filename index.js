const express = require('express')
const server = express()
const db = require('./data/userInterface')
const jwt = require('jsonwebtoken')
server.use(express.json())

function auth(req, res, next){
  if(req.path.split('/').includes('auth')){
    db.findById(jwt.verify(req.headers.token, 'honeyPotdumpl1ngs').subject).then(user=>{
      if(user){
        next()
      }else{
        res.status(401).josn()
      }

    })
  }
  next();
}
server.use(auth)

//Register
server.post('/register', (req, res) => {
  db.add(req.body).then(user => {
    // req.session.user = user;
    let token = createToken(user);
    res.status(201).send({ user, token });
  }).catch(err => {
    console.log('e', err)
    res.status(500).send(err);
  });
});

//Login
server.post('/login', (req, res) => {
  db.findBy({ username: req.body.username }).then(user => {
    if (!user) res.status(404).send('User not found.');
    if (!bcrypt.compareSync(req.body.password, user.password))
      res.status(200).send('wrong password');
    // req.session.user = user;
    let token = createToken(user);
    res.status(200).send({user, token});
  }).catch(err => {
    res.status(500).send(err);
  });
});

//Logout
server.get('/logout', (req, res) => {
  /* if(!req.session.user){
    res.status(200).json({ message: 'already logged out' })
  }else{
    //Invalidate token prematurely
    req.session.destroy(err => {
      if(err){
        res.status(500).json({ message: "couldn't be logged out", error: err })
      }else{
        res.status(200).json({ message: 'successfully logged out' });
      }
    });
  } */
  res.status(200).send({message: 'working on it'})
});

//Users
server.get('/auth/users', (req, res) => {
  db.find().then(users => {
    res.status(200).send(users);
  });
});


server.get('/', (req, res) => {
  console.log(jwt.verify(req.headers.token, 'honeyPotdumpl1ngs'))
  res.status(200).json({message: 'Hello'})
})

server.listen(8000, () => {
  console.log('Running on port 8000')
})

function createToken(user){
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, 'honeyPotdumpl1ngs', options)
}