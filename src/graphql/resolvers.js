const createUser = require('../auth/createUser');
const loginUser = require('../auth/loginUser');

const resolvers = {
  // Query: {
  //   me: (parent, args, context) => {
  //     // Implement authentication logic to fetch the currently logged-in user
  //     // context should contain user information after authentication
  //     return context.user;
  //   },
  // },
  Mutation: {
    signup: async (parent, args) => {
      const user = await createUser(args.username, args.password);
      return user;
    },
    login: async (parent, args) => {
      const user = await loginUser(args.username, args.password);
      return user;
    },
  },
};

module.exports = resolvers;
