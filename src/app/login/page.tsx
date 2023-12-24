// pages/index.tsx

'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ComponentProps {}

const Component: React.FC<ComponentProps> = ({}) => {
  return (
    <main className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-coopgreen shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <Link href="#">
                <Image
                  src="/assets/coop.png"
                  width={190}
                  height={190}
                  alt="Coop"
                />
                <span className="sr-only">Company Logo</span>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-black">Welcome back!</h1>
                <p className="text-gray-500">Sign in to your account</p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <Card className="mt-8 space-y-6">
                <form action="#" className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-gray-600 block" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                      id="email"
                      name="email"
                      required
                      type="email"
                    />
                  </div>
                  <div>
                    <label
                      className="flex justify-between text-sm font-bold text-gray-600 block"
                      htmlFor="password"
                    >
                      Password
                      <Link href="#" className="text-sm text-coopgreen hover:underline">
                        Forgot Password?
                      </Link>
                    </label>
                    <input
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                      id="password"
                      name="password"
                      required
                      type="password"
                    />
                  </div>
                  <Button className="w-full py-2 px-4 bg-coopgreen hover:bg-coophover rounded text-white text-sm">
                    <Link href="/dashboard">Sign in</Link>
                  </Button>
                </form>
              </Card>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="w-full border-b dark:border-gray-600 md:w-32" />
              <Link href="#" className="text-xs text-gray-500 uppercase hover:text-coopgreen">
                or sign up
              </Link>
              <span className="w-full border-b dark:border-gray-400 md:w-32" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};


export default Component;
