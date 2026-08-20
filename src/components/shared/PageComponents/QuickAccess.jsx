import React from 'react'
import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react'

const QuickAccess = ({ link, portail, direction }) => {
  return (
        <div className="flex flex-col gap-5">
            <Link to={`/${portail}/${direction}`} className='text-bleu-secondaire text-md flex p-2 justify-between items-center border-2 border-gris-clair rounded-xl'>
                {link}
                <MoveRight className='text-bleu-secondaire/75' size={25} /> 
            </Link>

        </div>
  )
}

export default QuickAccess