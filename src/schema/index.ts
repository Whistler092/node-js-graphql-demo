import { GREETING } from './Queries/Greeting';
import { GraphQLObjectType, GraphQLSchema } from "graphql";

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        greeting: GREETING
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
});
