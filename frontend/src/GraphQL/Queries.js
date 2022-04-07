import {gql} from '@apollo/client'

const LOAD_PASTES = gql`
    query{
        allCopies{
            id
            author
            title
            content
            creationDate
            type
        }
    }
`;

const PASTE_BY_ID = gql`
query copy ($copyId: ID!){
    copy(copyId: $copyId){
        id
        author
        title
        creationDate
        type
        content
    }
}
`


export { LOAD_PASTES, PASTE_BY_ID }
