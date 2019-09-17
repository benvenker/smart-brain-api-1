const jwt = require('jsonwebtoken');

const handleSignin = (db, bcrypt, req, res) => {
  console.log(`request body`, req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        Promise.reject('wrong credentials')
      }
    })
    .catch(err => Promise.reject('wrong credentials'))
}

const getAuthTokenId = () => {
  console.log('auth ok');
}

const signToken = () => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days' });
}

const createSession = (user) => {
  // create JWT and return user data
  const { email, id } = user;
  const token = signToken(email);
  console.log(token);
  return { success: 'true', userId: id, token: token }
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId() :
    handleSignin(db, bcrypt, req, res)
      .then(data => {
        console.log(data);
        return data.id && data.email ? createSession(data) : Promise.reject(data)
      })
      .then(session => res.json(session))
      .catch(err => res.status(400).json(err))
}

module.exports = {
  signinAuthentication: signinAuthentication
}