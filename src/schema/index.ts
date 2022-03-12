import { GREETING } from './Queries/Greeting';
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { CREATE_USER, DELETE_USER } from './Mutations/User';
import { GET_ALL_USERS, GET_USER } from './Queries/User';

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        greeting: GREETING,
        getAllUsers: GET_ALL_USERS,
        getUser: GET_USER
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: CREATE_USER,
        deleteUser: DELETE_USER
    },
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
