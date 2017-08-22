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
    }
  },

  Link: {
    id: root => root._id || root.id
  },
  User: {
    id: root => root._id || root.id
  },
};
