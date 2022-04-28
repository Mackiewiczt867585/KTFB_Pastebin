import { gql } from "@apollo/client";

const LOAD_PASTES = gql`
  query {
    allCopies {
      id
      author
      title
      content
      creationDate
      type
      private
    }
  }
`;
const LOAD_PUBLIC_PASTES = gql`
  query{
    allPublicCopies{
      id
      title
      author
      creationDate
      type
      content
      type
    }
  }`

const PASTE_BY_ID = gql`
  query copy($copyId: ID!) {
    copy(copyId: $copyId) {
      id
      author
      title
      creationDate
      type
      content
      creator{
        id
        email
      }
    }
  }
`;


const USER_BY_EMAIL = gql`
  query userEmail($email: String!) {
    userEmail(email: $email){
      id
      email
      username
      creationDate
      firstName
      organisation
  }
}
`;

const ALL_USER_PASTES = gql`
  query allUsersCopies($creator: ID!) {
    allUsersCopies(creator: $creator){
      id
      title
      author
      creationDate
      type
      content
    }
  }`



export { LOAD_PASTES, PASTE_BY_ID, USER_BY_EMAIL, ALL_USER_PASTES, LOAD_PUBLIC_PASTES };
