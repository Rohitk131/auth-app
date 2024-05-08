import NextAuth, { CredentialsSignin } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import email from "next-auth/providers/email"
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
        authorize: async({email, password})=>{
        
            console.log(email,password);
            if(typeof email !== 'string')
                throw new CredentialsSignin({
                    cause: "Email is not valid",
            });

            const user = {email: 'sdsd', id: 'dfd'};

            if(password !== 'passcode')
                throw new CredentialsSignin({
                    cause: "Password is not valid",
            });
            else return user;
        }
    })
  ],
})