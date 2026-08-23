import React, { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import TableData from '../../components/shared/PageComponents/TableData'
import { fakeCours, coursColumns } from '../../fakeData'
import { coursFields } from '../../formModalsData'
import FormModal from '../../components/modals/FormModal'
import SuccessModal from '../../components/modals/SuccessModal'
import ConfirmModal from '../../components/modals/ConfirmModal'
import SearchBar from '../../components/shared/SearchBar'
import { toast } from 'react-toastify'

const Cours = () => {
  const [filter, setFilter] = useState('tous')
  const [searchParams] = useSearchParams()
  const showModal = searchParams.get('create')=== 'true'
  const showEdit = searchParams.get('edit') === 'true'
  const showDelete = searchParams.get('delete') === 'true'
  const showSuccess = searchParams.get('success') === 'true'
  const location = useLocation()
  const navigate = useNavigate()

  const filteredcours = fakeCours.filter(cours => {
    if(filter === 'tous') return true
    return cours.categorie.toLowerCase() === filter
  })

  const editId = searchParams.get('id')
  const selectedCours = filteredcours.find(cours => cours.id === Number(editId))
  console.log(selectedCours);
  

  
    const modifierCours = () => {
      toast.success("Cours modifier");
    }
    const supprimerCours = () => {
      toast.success("Cours supprimer");
    }

  
  return (
    <div>
      {showModal && (
        <FormModal type={'un cours'} fields={coursFields} />
      )}
      {showSuccess && (
        <SuccessModal type={'Cours'} content={'Yasmine Haddad'} create={true} />
      )}
      {showDelete && (
        <ConfirmModal type={'Cours'} name={ selectedCours.titre } deleteFunction={supprimerCours} />
      )}
      {showEdit && (
        <FormModal type={'un cours'} fields={coursFields} initialData={selectedCours} editFunction = {modifierCours} />
      )}
      <div className="flex px-5 mt-5 gap-4 items-center">
        <SearchBar />
        <select onChange={(e) => setFilter(e.target.value)} className="w-75 p-2 border-2 border-gris-clair outline-none focus:border-orange-cuivre/55 focus:ring-2 focus:ring-orange-cuivre/30 rounded-xl flex text-bleu-secondaire text-md justify-center gap-5">
          <option className='' value='tous'>Tous les catégories</option>
          <option className='' value='informatique'>Informatique</option>
          <option className='' value='soft skills'>Soft skills</option>
          <option className='' value='architecture'>Architecture</option>
          <option className='' value='management'>Management</option>
        </select>
      </div>
      <div className='px-5 py-3'>
        <TableData columns={ coursColumns } rows={ filteredcours } onClickRow = { true } />
      </div>
    </div>
  )
}

export default Cours