import * as React from "react";
import {Link} from "react-router-dom"

export default function Component() {
  document.body.style.background = "#0E0F2E";
  return (
    <section className="w-full py-12">
      <br></br><br></br><br></br><br></br>
      <div className="container px-4 md:px-6 ml-20">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-20 xl:grid-cols-[1fr_600px]">
          <img
            alt="Hero"
            className="rounded-xl sm:w-full lg:order-last lg:aspect-auto"
            src="../featureImage.png"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="bg-gray-900 bg-opacity-10 p-4 rounded-lg">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-slate-50">
                Ditch the Guilt, Not the Group Chat
                </h1>
                <br></br>
                <p className="max-w-[600px] text-gray-500 md:text-lg dark:text-slate-100">
                  A study and work application that supports all of your Pomodoro needs. Get work done in focused bursts and reward yourself with micro-hangouts with friends.
                </p>
              </div>
            </div>
            <div className="ml-9 flex flex-col gap-20 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm sm:text-xs xl:text-base font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-indigo-400 dark:text-stone-50 dark:hover:bg-indigo-500/90 dark:focus-visible:ring-indigo-300"
                href="#"
              >
                Get Started
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm sm:text-xs xl:text-base font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-indigo-400 dark:text-stone-50 dark:hover:bg-indigo-500/90 dark:focus-visible:ring-indigo-300"
                href="#"
              >
                Join Study
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
