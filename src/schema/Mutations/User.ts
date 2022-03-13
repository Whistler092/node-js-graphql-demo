import { UserType } from './../../typeDefs/User';
import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLInputObjectType,
    GraphQLString
} from "graphql";

import { Users } from "../../Entities/Users";
import bcrypt from 'bcryptjs';
import { MessageType } from '../../typeDefs/Message';

export const CREATE_USER = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(_: any, args: any) {
        const { name, username, password } = args;

        const encryptdPassword = await bcrypt.hash(password, 10);

        const result = await Users.insert({
            name,
            username,
            password: encryptdPassword
        });

        console.log(result);

        return {
            ...args,
            id: result.identifiers[0].id,
            password: encryptdPassword
        }
    }
}

export const DELETE_USER = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLID }
    },
    async resolve(_: any, { id }: any) {
        const result = await Users.delete(id);
        return result.affected;
    }
}


export const UPDATE_USER = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
        input: {
            type: new GraphQLInputObjectType({
                name: 'UserInput',
                fields: {
                    name: { type: GraphQLString },
                    username: { type: GraphQLString },
                    oldPassword: { type: GraphQLString },
                    newPassword: { type: GraphQLString }
                }
            })
        }
    },
    async resolve(_: any, args: any) {
        console.log(args)
        const { id, input } = args;

        const userFound = await Users.findOne(id);

        if (!userFound) return {
            success: false,
            message: 'User not found'
        };

        const isMatch = await bcrypt.compare(input.oldPassword, userFound.password)

        if (!isMatch) return {
            success: false,
            message: 'Old password is incorrect'
        };

        const newPasswordHash = await bcrypt.hash(input.newPassword, 10);

        const result = await Users.update({ id }, {
            username: input.username,
            name: input.name,
            password: newPasswordHash
        });

        return {
            success: result.affected,
            message: result.affected ? 'User updated successfully' : 'User not updated'
        };
    }

}