import React, { Children, useState } from 'react'
import logo from "../../assets/logo.png";
import { Outlet, useMatches, Link } from 'react-router-dom';
const AuthLayout = () => {
  const [lang, setLang] = useState('fr')
  const activeClass = ( isActive ) => `${ isActive ? 'w-8 bg-orange-cuivre text-sm rounded p-0.5 flex justify-center items-center text-white font-semibold' : 'w-10 flex justify-center items-center text-sm text-gris-clair font-m cursor-pointer hover:underline hover:text-orange-cuivre'}`

  return (
    <div className='w-full h-screen flex flex-col'>
      <header>
        <nav className='bg-bleu-principal flex justify-between items-center p-2'>
          <Link className='w-full' to='/'>
            <img src={logo} alt="logo" className='w-1/9' />        
          </Link>
          <div className="border-2 border-gris-clair h-full p-1 flex items-center px-1 rounded-lg">
              <button className={activeClass(lang === 'en')} onClick={() => setLang('en')} >EN</button>
              <button className={activeClass(lang === 'fr')} onClick={() => setLang('fr')} >FR</button>
            </div>
        </nav>
      </header>
      <main className='flex-1 p-12'>
        <div className='border-2 border-gris-clair rounded-xl flex flex-col w-2/5 mx-auto px-10 py-4 m-10 shadow-md'>
          <Outlet />
        </div>
      </main>
      <footer className='bg-bleu-principal flex justify-center items-center p-5'>
        <p className='font-semibold text-gris-clair'>© 2026 The Office. Tous droits réservés.</p>
      </footer>
    </div>
  )
}

export default AuthLayout