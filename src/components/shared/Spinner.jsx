import React from 'react'
import { ClipLoader } from 'react-spinners'

const Spinner = ({ login=false }) => {
  return (
    <ClipLoader className={login ? 'text-white font-bold' : 'text-orange-cuivre'} color='text-orange-cuivre' size={login ? 23 : 125} />
  )
}

export default Spinner