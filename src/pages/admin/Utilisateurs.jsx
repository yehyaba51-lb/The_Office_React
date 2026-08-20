import React, { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import TableData from '../../components/shared/PageComponents/TableData'
import { fakeUsers, userColumns } from '../../fakeData'
import FormModal from '../../components/modals/FormModal'
import SuccessModal from '../../components/modals/SuccessModal'
import ConfirmModal from '../../components/modals/ConfirmModal'
import SearchBar from '../../components/shared/SearchBar'
import { userFields } from '../../formModalsData'
import { toast } from 'react-toastify'

const Utilisateurs = () => {
  const [filter, setFilter] = useState('all')  
  const activeClass = ( isActive ) => `${ isActive ? 'bg-orange-cuivre text-sm rounded px-3 py-1 flex justify-center items-center text-white font-semibold' : 'flex justify-center items-center text-sm text-bleu-secondaire font-m cursor-pointer hover:underline hover:text-orange-cuivre'}`
  const [searchParams] = useSearchParams()
  const showModal = searchParams.get('create')=== 'true'
  const showSuccess = searchParams.get('success')=== 'true'
  const showEdit = searchParams.get('edit') === 'true'
  const showReset = searchParams.get('reset') === 'true'
  const showDelete = searchParams.get('delete') === 'true'
  const location = useLocation()
  const navigate = useNavigate()

  const filteredUsers = fakeUsers.filter(user => {
    if(filter === 'all') return true
    return user.role.toLowerCase() === filter
  })

  const editId = searchParams.get('id')
  const selectedUser = filteredUsers.find(user => user.id === Number(editId))

  const modifierCompte = () => {
    toast.success("Compte modifier");
  }
  const supprimerCompte = () => {
    toast.success("Compte supprimer");
  }
  
  
  return (
    <div>
      {showModal && (
        <FormModal type={ 'un compte' } fields={ userFields } />
      )}
      {showSuccess && (
        <SuccessModal type={'Compte'} content={ 'Nadia Bouchama' } create={true} />
      )}
      {showEdit && (
        <FormModal type={ 'un compte' } fields={ userFields } initialData={ selectedUser } editFunction = {modifierCompte}  />
      )}
      {showReset && (
        <SuccessModal type={'Compte'} content={ 'Nadia Bouchama' } />
      )}
      {showDelete && (
        <ConfirmModal type={'Compte'} name={ selectedUser.nom + ' ' + selectedUser.prenom } deleteFunction={supprimerCompte} />
      )}
      <div className="flex px-5 mt-5 gap-4 items-center">
        <SearchBar />
        <div className="w-75 p-1 border-2 border-gris-clair rounded-xl flex text-md justify-center gap-5">
          <button className={activeClass(filter === 'all')} onClick={() => setFilter('all')}>Tous les rôles</button>
          <button className={activeClass(filter === 'formateur')} onClick={() => setFilter('formateur')}>Formateur</button>
          <button className={activeClass(filter === 'etudiant')} onClick={() => setFilter('etudiant')}>Etudiant</button>
        </div>
      </div>
      <div className='px-5 py-3'> 
        <TableData columns={ userColumns } rows={ filteredUsers } />
      </div>
    </div>
  )
}

export default Utilisateurs