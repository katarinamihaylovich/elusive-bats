const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		entries: async (parent, {username}) => {
			const params = username ? {username} : {};
			return Entry.find(params).sort({ createdAt: -1 });
		},
		entry: async (parent, { _id }) => {
			return Entry.findOne({ _id });
		},
		users: async () => {
			return await User.find({}).select('-password');
		},
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id })
					.select('-__v -password')
					.populate('entries');

				return userData;
			}

			throw new AuthenticationError('Not logged in');
		}
	},

	Mutation: {
		addUser: async (_, args) => {
			const user = await User.create(args);
			const token = signToken(user);
			
			return { token, user };
		},
		addEntry: async (parent, args, context) => {
			if (context.user) {
				const entry = await Entry.create({ ...args, username: context.user.username });

				await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ $push: { entries: entry._id }},
					{ new: true }
				);

				return entry;
			}

			throw new AuthenticationError('You need to be logged in.')
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user){
				throw new AuthenticationError('The username or password is incorrect.');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect password!');
			}

			const token = signToken(user);
			return { token, user };
		}
	},
};

module.exports = resolvers;
