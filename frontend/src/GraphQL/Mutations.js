import {gql} from '@apollo/client'


const CREATE_PASTE_MUTATION = gql`
    mutation createCopy($author: String!, $content: String!, $title: String!, $type: String!) {
        createCopy( author: $author, title: $title, content: $content, type: $type){
            copycasket{
                author
                title
                content
                type
            }
        }
    }
`;

export { CREATE_PASTE_MUTATION }