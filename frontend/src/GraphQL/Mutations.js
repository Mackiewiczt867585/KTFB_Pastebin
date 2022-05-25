import { gql } from "@apollo/client";

const CREATE_PASTE_MUTATION = gql`
  mutation createCopy(
    $author: String!
    $content: String!
    $title: String!
    $type: String!
    $expirationTime: DateTime
  ) {
    createCopy(author: $author, title: $title, content: $content, type: $type, expirationTime: $expirationTime) {
      copycasket {
        author
        title
        content
        type
      }
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $email: String!
    $firstName: String
    $organisation: String
    $password: String!
    $username: String!
  ) {
    createUser(
      email: $email
      firstName: $firstName
      organisation: $organisation
      password: $password
      username: $username
    ) {
      user {
        email
        firstName
        creationDate
        username
      }
    }
  }
`;

export { CREATE_PASTE_MUTATION, CREATE_USER_MUTATION };
