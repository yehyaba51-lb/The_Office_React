import React from 'react'
import { Link } from 'react-router-dom'

const RecentActivities = ({ role='admin', badge, text, note, date, to }) => {
    const noteCouleurClass = ( note ) => note >= 10 ? 'text-vert-reussite bg-vert-reussite/40 px-5 rounded-xl' : 'text-rouge-echec bg-rouge-echec/40  px-5 rounded-xl'
    const badgeColorClass = ( badge ) => badge === 'corrige' ? 'bg-bleu-principal rounded-full' : badge === 'cours' ? 'bg-gris-fonce rounded-full' : 'bg-orange-cuivre rounded-full'
    return (
    <>
        <div className='flex flex-col px-3 py-1'>
            {role === 'student' ? (
                <Link to={to} className="flex justify-between items-center mt-1">
                    <div className='flex gap-3 items-center'>
                        <div className={`w-3 h-3 ${badgeColorClass(badge)}`}></div>
                        <p className="text-md text-bleu-secondaire font-semibold">{text}</p>
                    </div>
                    <p className={noteCouleurClass(note)}>{note}</p>
                    <p className='text-gris-fonce text-xs'>{date}</p>
                </Link>
            ) : (
                <div className='flex flex-col gap-1'>
                    <Link to={to} className="flex gap-2 items-center justify-start">
                        <div className={`w-3 h-3 ${badgeColorClass(badge)}`}></div>
                        <p className="text-md text-bleu-secondaire font-semibold">{text}</p>
                    </Link>
                    <p className='text-gris-fonce text-xs'>{date}</p>
                </div>
            )}
        </div>
    </>
  )
}

export default RecentActivities