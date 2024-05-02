import NextAuth from "next-auth"
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
        
    })
  ],
})