import { gql } from "@apollo/client";

const CREATE_PASTE_MUTATION = gql`
  mutation createCopy(
    $author: String!
    $content: String!
    $creator: String!
    $title: String!
    $type: String!
    $private: Boolean!
  ) {
    createCopy(author: $author, title: $title, creator:$creator,private:$private, content: $content, type: $type) {
      copycasket {
        author
        title
        content
        type
        private
        creator{
          id
        }
      }
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation register(
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
  mutation tokenAuth(
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


const PASSWORD_CHANGE = gql`
mutation passwordChange(
  $oldPassword: String!
  $newPassword1: String!
  $newPassword2: String!
){
  passwordReset(
    oldPassword: $oldPassword
    newPassword1: $newPassword1
    newPassword2: $newPassword2
  )
  {
    token
  }
}`

const UPDATE_USER = gql`
mutation updateUser(
  $id: ID!
  $email: String
  $firstName: String
  $organisation: String
  $username: String
){
  updateUser(
    id:$id
    email:$email
    firstName:$firstName
    organisation:$organisation
    username:$username
  )
  {
    user{
      username
      firstName
      email
      organisation
    }
  }
}`



export { CREATE_PASTE_MUTATION, CREATE_USER_MUTATION, LOGIN_USER, PASSWORD_CHANGE, UPDATE_USER};
