import {gql} from '@apollo/client'

const LOAD_PASTES = gql`
    query{
        allCopies{
            author
            title
            content
            creationDate
            type
        }
    }
`;


export { LOAD_PASTES }