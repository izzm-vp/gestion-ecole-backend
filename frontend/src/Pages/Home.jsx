import { Link } from "react-router-dom";

export default function Home(){
    return <div>

<section className="overflow-hidden">
    <div className="flex flex-col bg-gradient-to-b h-100 from-violet-900/[.20] lg:flex-row lg:items-stretch lg:min-h-[800px]">
      <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
        <div className="absolute bottom-0 right-0 hidden lg:block">
          <img
            className="object-contain w-auto h-48"
            src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/curved-lines.png"
            alt=""
          />
        </div>

        <div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
          <h1 className="text-4xl font-bold sm:text-6xl xl:text-8xl">
            La grande Ecole<br />
            Des sciences.
          </h1>
          <p className="mt-8 text-xl">Facilitons votre vie universitaire. Construisez une expérience d étude sans distractions, pour un apprentissage fluide et efficace.</p>

          <div className="max-w-xl mx-auto mt-8 bg-white lg:mx-0 sm:bg-transparent lg:mt-12 rounded-xl">
            <div className="p-4 sm:p-2 sm:bg-white sm:border-2 sm:border-transparent sm:rounded-full sm:focus-within:border-indigo-900 sm:focus-within:ring-1 sm:focus-within:ring-orange-500">
              <div className="flex flex-col items-start sm:flex-row">
                <div className="flex-1 w-full min-w-0">
                </div>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center w-full px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-slate-900 border border-transparent rounded-full sm:w-auto sm:ml-4 sm:mt-0 hover:bg-indigo-500 focus:bg-indigo-900 md:z-50"
                >
                  Inscrivez Vous 
                </Link>
              </div>
            </div>
          </div>
          <p className="mt-5 text-base text-black"></p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden lg:order-1 h-96 lg:h-auto lg:w-5/12">
        <div className="absolute inset-0">
          <img className="object-cover w-full h-full scale-150" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/man-working-on-laptop.jpg" alt="" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <div className="absolute bottom-0 left-0">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center">
              <svg className="w-10 h-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <h2 className="font-bold text-white text-7xl ml-2.5">300</h2>
            </div>
            <p className="max-w-xs mt-1.5 text-xl text-white">Etudiants National et international</p>
          </div>
        </div>
      </div>
    </div>
  </section>
    </div>
}