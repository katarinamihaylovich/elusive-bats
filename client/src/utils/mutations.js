import { gql } from "@apollo/client";

export const ADD_ENTRY = gql`
 mutation addEntry($entryText: String!) {
    addEntry(entryText: $entryText) {
        _id
        entryText
        createdAt
        username
    }
 }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const UPDATE_ENTRY = gql`
    mutation updateEntry($entryText: String!, $id: ID) {
        updateEntry(entryText: $entryText, _id: $id) {
        entryText
        _id
    }
}
`;

export const DELETE_ENTRY = gql`
    mutation deleteEntry($id: ID) {
        deleteEntry(_id: $id) {
            _id
        }
    }
`;
