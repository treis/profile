import { useState } from 'react'
import bg from "./assets/bg.png";
import treis from"./assets/treis.svg"

function App() {
  const [count, setCount] = useState(0)

  return (

    <>
    <body>

      <header class="flex justify-end pt-5">

          <nav class="space-x-4 border-gray-800 text-white font-extrabold font-mono mb-4 w-1/3">

            <a class="hover:underline  decoration-red-800 decoration-2" href="www.">link 1</a>
            <a class="hover:underline decoration-blue-700 decoration-2" href="www.">link 2</a>
            <a class="hover:underline decoration-green-600 decoration-2" href="www.">link 3</a>

          </nav>

      </header>

      <div class="h-0.5 w-full bg-gradient-to-r from-sky-500/0 via-sky-500/70 to-sky-500/0"></div>

      <main>

        <section> 

          <article class="w-2/3 p-15">
          <p class=" flex justify-start text-6xl mb-4 font-bold">Thiago</p>
          <h1 class="text-4xl animate-typing overflow-hidden ">Actively Learns On The Job To Deliver Real Results.</h1>

          </article>

          

        </section>

      </main>

    </body>
    </>
  )
}

export default App