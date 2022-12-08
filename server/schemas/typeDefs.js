const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		entries: [Entry]
	}

	type Entry {
		_id: ID
		entryText: String
		createdAt: String
		username: String
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		users: [User]
		me: User
		entries(username: String): [Entry]
		entry(_id: ID!): Entry
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		addEntry(entryText: String!): Entry
	}
`;

module.exports = typeDefs;
