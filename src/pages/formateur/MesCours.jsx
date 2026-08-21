import React from 'react'
import SearchBar from '../../components/shared/SearchBar'
import CourseCardFormateur from '../../components/formateur/CourseCardFormateur'
import { fakeCours, fakeUsers, fakeEtudiantsInscrits } from '../../fakeData'

const MesCours = () => {
  const formateur = fakeUsers.find(user => user.id === 3);
  const coursSelected = fakeCours.filter(c => c.formateur === `${formateur.prenom} ${formateur.nom}`);

  const enrolledStudents = fakeEtudiantsInscrits.filter(s => 
    coursSelected.some(c => c.titre === s.cours)
  ).length
  
  return (
    <div className="flex flex-col px-5 mt-8 gap-4 items-center">
      <SearchBar />
      <CourseCardFormateur cours={ coursSelected } enrolled={ '4' } />
    </div>
  )
}

export default MesCours