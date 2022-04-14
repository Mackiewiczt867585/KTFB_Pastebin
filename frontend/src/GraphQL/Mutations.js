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
    $firstName: String!
    $username: String!
    $organisation: String!
    $password1: String!
    $password2: String!
  ) {
    register(
      email: $email
      firstName: $firstName
      organisation: $organisation
      password1: $password1
      password2: $password2
      username: $username
    )
      {
        token
      }
  }
`;

const LOGIN_USER = gql`
  mutation loginUser(
    $username: String
    $password: String!
  ) {
    tokenAuth(
      username: $username
      password: $password
    )
    {
      token,
      user{
        id
        email
        username
        creationDate
      }
    }
  }`


const PASSWORD_RESET = gql`
mutation passwordReset(
  $token: String!
  $newPassword1: String!
  $newPassword2: String!
){
  passwordReset(
    token: $token
    newPassword1: $newPassword1
    newPassword2: $newPassword2
  )
}`

export { CREATE_PASTE_MUTATION, CREATE_USER_MUTATION, LOGIN_USER};
