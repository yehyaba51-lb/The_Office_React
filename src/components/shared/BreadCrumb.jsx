
const BreadCrumb = ({ cours, exo }) => {
  return (
    <p className='text-sm text-bleu-secondaire'>
        {`${cours} › ${exo}`}
    </p>
  )
}

export default BreadCrumb