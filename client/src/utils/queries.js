import { gql } from '@apollo/client';

export const QUERY_ENTRY = gql`
	query entry($id: ID!) {
		entry(_id: $id) {
			_id
			entryText
			createdAt
			username
		}
	}
`;

export const QUERY_ENTRIES = gql`
	query entries($username: String) {
		entries(username: $username) {
			_id
			entryText
			createdAt
			username
		}
	}
`;

export const QUERY_USERS = gql`
	query Query {
		users {
			username
			email
			_id
		}
	}
`;

export const QUERY_ME = gql`
	query Query {
		me {
			username
			email
			_id
		}
	}
`;