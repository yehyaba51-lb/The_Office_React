
const ProgressBar = ({ current, total }) => {
  const percentage = total === 0 ? 0 : (current * 100) / total
  return (
    <div className='z-0 w-full rounded-2xl bg-gris-clair h-2.5'>
      <div className='h-2.5 bg-orange-cuivre rounded-2xl z-10' style={{width: `${percentage}%`}}></div>
    </div>
  )
}

export default ProgressBar