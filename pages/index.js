import React, { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { getCustomRoute } from 'next/dist/server/server-route-utils'
import { useSession } from 'next-auth/react'

export default function Home({ posts }) {
  console.info(`>>>: getServerSideProps -> posts`, posts)
  // const [session, setSession] = useState(true)
  const { data: session } = useSession()

  return (
    <div>
      <Head>
        <title>Lisa App - Tailwind Next - Home</title>
      </Head>

      {session ? User({ session }) : Guest()}
    </div>
  )
}

// Guest
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h1 className="text-4xl font-bold">Guest Home</h1>
      <h2 className="text-3xl font-bold">Hello Next & TailwindCss!</h2>

      <div className="flex justify-center">
        <Link href={'/login'}>
          <a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">Sing In</a>
        </Link>
      </div>
    </main>
  )
}

// Authorize User
function User({ session }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">User Home</h3>
      <h4 className="text-3xl font-bold">Hello Next & TailwindCss!</h4>

      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className="flex justify-center">
        <Link href={'/profile'}>
          <a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">Profile</a>
        </Link>
      </div>
    </main>
  )
}

// export const getServerSideProps = async () => {
//   // server side rendering
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
//   const posts = await res.json()
//   return {
//     props: {posts}
//   }
// }

export const getStaticProps = async () => {
  // static rendering
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
    const posts = await res.data

    return {
      props: { posts },
      revalidate: 20 // After 20 seconds regenerate data option
    }
  } catch (err) {
    return { err }
  }
}
