'use client'
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signIn, useSession, signOut } from "next-auth/react"
export default function Home() {
  const [email, setEmail] = useState<null | string>(null);

  async function SignInWithEmail() {
    const signInResult = await signIn('email', {
      email: email,
      callbackUrl: `${window.location.origin}`,
      redirect: false
    })

    if (!signInResult?.ok) {
      return "error"
    }

    setEmail("")

    return "success"
  }

  const { data:session } = useSession()

  const Logout = async () => {
    signOut()
  }

  return (
    <>
      <form action={SignInWithEmail} className="p-20">
        <Input onChange={(e) => setEmail(e.target.value)}className="rounded-lg border-2" placeholder="tylerdurden@gmail.com" name="email" type="email"/>
        <button type='submit' className="mt-3 p-3 bg-black rounded-lg text-white">Sign Up With Magic Link</button>
        {session?.user?.email}
      </form>
      <button onClick={Logout}>Logout</button>
    </>
  );
}
