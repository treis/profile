import { useState, type ReactElement } from 'react'
import { about, contact, sikorskyCapstone, sikimg, sportsAnalytics, shimg, archiveimg, sikorskyArchives, wakemans, wakemanimg} from "./assets/descriptions";

type ExperienceBlockProps = {
  date: string;
  label: string;
  img: string;
};

function About() {
  return (
    <>

      <section className="bg-gray-900 animate-fly-in-up p-8 ml-20 mt-40 shadow-xl shadow-cyan-300/20 border-3 border-cyan-300 rounded-lg">
        <article className="text-lg">
          <h1 className="text-xl font-bold text-cyan-300 mb-2">
            About Me
          </h1>
          <p className="text-white leading-loose">
            {about}
          </p>
        </article>
      </section>

    </>
  )
}

function Contact() {
  return (
    <section className="bg-gray-900 animate-fly-in-up p-8 ml-20 mt-40 shadow-xl shadow-cyan-300/20 border-3 border-cyan-300 rounded-lg">

      <article>

        <h1 className="text-xl font-bold text-cyan-300 mb-2">Contact</h1>

        <div className="grid grid-cols-2 gap-1">

          <div className="text-lg text-white leading-loose font-bold"> 
            <p>E-mail:</p>
            <p>Phone Number:</p>
            <p>Location:</p>
          </div> 

          <div className="text-lg">
            <p className="text-white leading-loose">{contact.email}</p>
            <p className="text-white leading-loose">{contact.phone}</p>
            <p className="text-white leading-loose">{contact.location}</p>
            <a className="text-cyan-300 underline" href={contact.linkedin}>LinkedIn</a>
          </div>

        </div>

      </article>

    </section>
  );
}

function ExperienceBlock(props: ExperienceBlockProps) {
  return (
            <div className="items-center text-lg leading-loose grid grid-cols-2 bg-gray-950 ml-8 mr-8 mt-20 mb-20 pl-10 pr-10 rounded-lg text-white border-3 border-cyan-300">

              <div className="m-4">
                <h1 className="pt-4 font-bold text-cyan-300">{props.date}</h1>
                <p className="p-4">{props.label}</p>
              </div>

              <div className="flex items-center justify-center">
                <img className="max-h-70 m-10" src={props.img} />
              </div>

            </div>
          )
}

function App() {

  const [card, setCard]= useState(<About/>);

  function changeCard(newCard: ReactElement) {
    setCard(newCard)
  }

  return (
    <>
      <header className="bg-gray-900/80 flex justify-center pt-5 md:justify-end shadow-cyan-300/40 border-cyan-300 shadow-2xl border-b-3">
          <nav className="space-x-12 text-white 
          font-extrabold font-mono mb-2 w-1/3 text-xl">

            <button
              className="hover:shadow-cyan-400/30 hover:shadow-2xl"
              onClick={() => changeCard(<About />)}>
              ABOUT
            </button>

            <button 
              className="hover:shadow-cyan-400 hover:shadow-2xl"
              onClick={() => changeCard(<Contact />)}>
                CONTACT
            </button >

          </nav>
      </header>

      <main className="flex flex-col md:flex-row">
        <section> 
          <article className="pt-70 ml-10 mb-45">
            <p className="text-cyan-300 flex justify-start text-8xl mb-15 font-bold">Thiago</p>
            <h1 className="text-white text-4xl overflow-hidden mb-3 inline">
              Actively Learns On The Job To Deliver <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent font-extrabold"> Real </span>Results 
            </h1> 
            <p className="inline text-sky-500 blink_me font-bold text-7xl">|</p>
          </article>

        </section>
          <article className="w-1/2">
            {card}
          </article>
        </main>
        
        <div className="flex flex-col items-center w-screen h-full bg-gray-900 mt-20 border-t-3 border-cyan-500 inset-shadow-black inset-shadow-xs grow">  
        
          <p className="text-cyan-300 flex justify-start text-4xl mt-10 font-bold">Experience</p>
                          
          <ExperienceBlock label={sikorskyCapstone} img={sikimg} date="November 2025 – April 2026" />

          <ExperienceBlock label={sportsAnalytics} img={shimg} date="June 2025 – August 2025" />

          <ExperienceBlock label={sikorskyArchives} img={archiveimg} date="March 2024 – December 2024" />

          <ExperienceBlock label={wakemans} img={wakemanimg} date="June 2023 – August 2023" />

        </div>
    </>
  )
}


export default App;
