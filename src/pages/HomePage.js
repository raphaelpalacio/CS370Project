import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function HomePage() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleButtonClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  };

  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <img
            alt="Hero"
            className="mx-auto overflow-hidden rounded-xl object-contain sm:w-full lg:order-last"
            src="../featureImage.png"
            style={{ height: "550px", width: "550px" }}
          />
          <div className="flex flex-col justify-center space-y-4 px-8 md:px-12">
            <div className="space-y-2 text-black">
              {" "}
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Ditch the Guilt, Not the Group Chat
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                A study and work application that supports all of your Pomodoro
                needs. Get work done in focused bursts and reward yourself with
                micro-hangouts with friends.
              </p>
            </div>
            <div className="text-center md:text-left md:pl-12 lg:pl-24">
              {isAuthenticated ? (
                <Link
                  to="/pomodoro"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Start a Pomodoro Session
                </Link>
              ) : (
                <button
                  onClick={handleButtonClick}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Sign in to Start a Pomodoro Session
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
