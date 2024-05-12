import NextAuth, { CredentialsSignin } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import email from "next-auth/providers/email"
import User from "./models/userModel"
import {compare} from 'bcryptjs'
import { connect } from "http2"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
        name: "Credentials",
        credentials: {
            email: {
                label: "Email",
                type: "text",
            },
            password:{
                label: "Password",
                type: "password"
            }
        },
        authorize: async(credentials)=>{
        
            const email = credentials.email as string;
            const password = credentials.password as string;

            if(!email || !password)
                throw new CredentialsSignin({
                    cause: "Please provide both email an password",
            });
            //Connection with database here

            await connectToDatabase();
            const user = await User.findOne({email}).select("+password");
            if(!user) throw new CredentialsSignin({
                cause: "User not found",
            });
            if(!user.password) throw new CredentialsSignin({
                cause: "Password not set",
            }); 
            const isMatch = await compare(password, user.password);

            if(!isMatch)
                throw new CredentialsSignin({
                    cause: "Password is not valid",
            });
            return {name: user.name, email: user.email, id: user._id};
            
            
        }
    })
  ],
})