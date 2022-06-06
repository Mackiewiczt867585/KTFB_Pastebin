import { gql } from "@apollo/client";


const ME = gql`
  query{
    me{
      id
      email
      username
      firstName
      lastName
      organisation
      creationDate
    }
  }`




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
      creator{
        email
      }
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
      creator{
        email
      }
      likes{
        id
        email
      }
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
      image
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
      creator{
        email
      }
      creationDate
      type
      content
    }
  }`


const LIKES = gql`
query likes($copyId: ID){
  likes(copyId: $copyId){
    int
  }
}`

const LOAD_POPULAR_PASTES = gql`
  query{
    popularCopies{
      id
      title
      author
      creationDate
      type
      content
      type
      creator{
        email
      }
      likes
    }
  }`


export { LOAD_PASTES, PASTE_BY_ID, USER_BY_EMAIL, ALL_USER_PASTES, LOAD_PUBLIC_PASTES, ME, LIKES, LOAD_POPULAR_PASTES };
