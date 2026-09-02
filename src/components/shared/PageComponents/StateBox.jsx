import { GraduationCap } from 'lucide-react'


const StateBox = ({ icon: Icon, titre, label, footer }) => {
  return (
        <div className='m-5 w-4/5 border-2 border-gris-clair rounded-2xl px-5 py-2 flex flex-col gap-2 items-center justify-between'>
            <div className='flex gap-3 self-start'>
                {Icon && (
                    <div className="bg-orange-cuivre/50 rounded w-13 h-13 flex justify-center items-center">
                        <Icon className="text-white font-bold" size={30} />
                    </div>
                )}
                    {!Icon && (
                    <div className="flex flex-col gap-1">
                        <p className='text-gris-fonce text-sm'>{titre}</p>
                        <h3 className='font-titres text-bleu-principal text-xl font-semibold'>{label}</h3>
                    </div>
                    )}
                    {Icon && (
                    <div className="flex flex-col gap-1">
                        <h3 className='font-titres text-bleu-secondaire text-xl font-semibold'>{titre}</h3>
                        <p className='text-gris-fonce text-sm'>{label}</p>
                    </div>
                        
                    )}
            </div>
            {footer ? (
                <div className="rounded-2xl px-8 py-0.5 border-2 border-gris-clair flex justify-center items-center">
                    <p className='text-bleu-secondaire text-xs'>{footer}</p>
                </div>
            ) : ''}
        </div>
    )
}

export default StateBox