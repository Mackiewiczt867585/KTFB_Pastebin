import {gql} from '@apollo/client'

const LOAD_PASTES = gql`
    query{
        allCopies{
            author
            title
            type
            content
            creationDate
        }
    }
`;


export { LOAD_PASTES }