import { useState, type ReactElement } from 'react'
import bg from "./assets/bg.png";
import treis from"./assets/treis.svg"
import about from "./assets/descriptions";


function About() {
  return (
    <>

      <section class="bg-gray-900 g-gray-900 animate-fly-in-up p-8 ml-20 mt-40 shadow-xl shadow-cyan-300/30 border-3 border-cyan-300 rounded-lg">
        <article class="text-lg">
          <h1 class="text-xl font-bold text-cyan-300 mb-2">
            About Me
          </h1>
          <p class="text-white">
            {about}
          </p>
        </article>
        <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
          class="w-1/3">
        </img>
      </section>

    </>
  )
}


function App() {

  const [card, setCard] = useState(<About/>);

  function changeCard(newCard: ReactElement) {
    setCard(newCard)
  }

  return (
    <>

      <body>
        <header class="flex justify-center pt-5 md:justify-end">
            <nav class="space-x-12 border-gray-800 text-white 
            font-extrabold font-mono mb-2 w-1/3 text-xl">
              <a class="hover:underline  decoration-red-800 decoration-2" href="www.">HOME</a>
              <button
                className="hover:underline decoration-green-600 decoration-2"
                onClick={() => changeCard(<About />)}>
                ABOUT
              </button>
              <a class="hover:underline decoration-green-600 decoration-2" href="www.">RESUME</a>
              <a class="hover:underline decoration-green-600 decoration-2" href="www.">CONTACT</a>
            </nav>
        </header>

        <div class="h-1 w-full justify-end bg-gradient-to-r from-sky-500/0 via-blue-300/70 to-sky-500/0"></div>

        <main class="flex flex-col md:flex-row">
          <section> 
            <article class="pt-70 m-10">
              <p class="text-cyan-300 flex justify-start text-8xl mb-10 font-bold">Thiago</p>
              <h1 class="text-white text-4xl animate-typing overflow-hidden mb-3 inline ">
                Actively Learns On The Job To Deliver <span class="bg-gradient-to-r from-blue-500 to-sky-500 to-blue-500 bg-clip-text text-transparent font-extrabold"> Real </span>Results 
              </h1> 
              <p class="inline text-sky-500 text-6xl blink_me font-bold">|</p>
            </article>
          </section>
            <article class="shadow-2xl w-1/2">
              {card}
            </article>
        </main>
      </body>

    </>
  )
}


export default App;