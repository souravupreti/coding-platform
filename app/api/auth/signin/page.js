"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Image
              src="/github.svg"
              alt="github logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Sign in with Github
          </button>
        </div>
      </div>
    </div>
  )
} 