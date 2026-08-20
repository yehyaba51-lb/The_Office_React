import React from 'react'

const SearchBar = () => {
  return (
    <div className='flex-1 w-full'>
        <input placeholder='Rechercher' type="text" name="search" id="/" className='text-sm text-bleu-secondaire w-full py-2 px-3 border border-2 rounded-xl outline-none focus:border-orange-cuivre/55 focus:ring-2 focus:ring-orange-cuivre/30 border-2 border-gris-clair'/>
    </div>
  )
}

export default SearchBar