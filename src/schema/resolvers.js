const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  Query: {
    allLinks: async (root, data, {mongo: {Links}}) => {
      return await Links.find({}).toArray();
    },
    allUsers: async (root, data, {mongo: {Users}}) => {
      return await Users.find({}).toArray();
    }
  },

  Mutation: {
    createLink: async (root, data, {mongo: {Links}}) => {
      const response = await Links.insert(data);
      return Object.assign({id: response.insertedIds[0]}, data);
    },
    createUser: async (root, data, {mongo: {Users}}) => {
      const newUser = {
        name: data.name,
        email: data.authProvider.email.email,
        password: data.authProvider.email.password
      };

      const response = await Users.insert(newUser);
      return Object.assign({id: response.insertedIds[0]}, data);
    },
    signinUser: async (root, data, {mongo: {Users}}) => {
      const user = await Users.findOne({email: data.email.email});
      const userData = {email: user.email,id: user.id};
      if (data.email.password === user.password) {
        const token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          userData
        }, process.env.TOKEN_HASH_SECRETE);
        
        return {token, user};
      }
    }
  },

  Link: {
    id: root => root._id || root.id
  },
  User: {
    id: root => root._id || root.id
  },
};
