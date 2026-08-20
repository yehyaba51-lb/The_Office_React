import React, { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import TableData from '../../components/shared/PageComponents/TableData'
import { fakeCategories, categorieColumns } from '../../fakeData'
import { categorieFields } from '../../formModalsData'
import FormModal from '../../components/modals/FormModal'
import SuccessModal from '../../components/modals/SuccessModal'
import ConfirmModal from '../../components/modals/ConfirmModal'
import { toast } from 'react-toastify'


const Categorie = () => {
  const [searchParams] = useSearchParams()
  const showModal = searchParams.get('create')=== 'true'
  const showEdit = searchParams.get('edit') === 'true'
  const showDelete = searchParams.get('delete') === 'true'
  const showSuccess = searchParams.get('success') === 'true'
  const location = useLocation()
  const navigate = useNavigate()

  const modifierCategorie = () => {
        toast.success("Catégorie modifier");
      }
      const supprimerCategorie = () => {
        toast.success("Catégorie supprimer");
      }

  const editId = searchParams.get('id')
  const selectedCategory = fakeCategories.find(categorie => categorie.id === Number(editId))

  return (
    <div className='px-5 py-3'>    
      {showModal && (
        <FormModal type={ 'Une catégorie' } fields={ categorieFields }  />
      )}
      {showSuccess && (
        <SuccessModal type={'Catégorie'} content={'Informatique'} create={true} />
      )}
      {showEdit && (
        <FormModal type={ 'une catégorie' } initialData={ selectedCategory } editFunction={ modifierCategorie } fields={  categorieFields} />
      )}
      {showDelete && (
        <ConfirmModal type={ 'category' } name={ selectedCategory.nom }  deleteFunction={ supprimerCategorie }/>
      )}
      <TableData columns={ categorieColumns } rows={ fakeCategories } />
    </div>
  )
}

export default Categorie