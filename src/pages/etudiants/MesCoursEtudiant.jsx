import React from 'react'
import SearchBar from '../../components/shared/SearchBar'
import CourseCardFormateur from '../../components/formateur/CourseCardFormateur'
import { fakeEtudiantsInscrits, fakeCours } from '../../fakeData'

const MesCoursEtudiant = () => {
  const selectedStudent = fakeEtudiantsInscrits.find(e => e.id === 3)
  const selectedCours = fakeCours.filter(c => c.id === selectedStudent.coursId)
  
  return (
    <div className="flex flex-col px-5 mt-8 gap-4 items-center">
      <SearchBar />
      <CourseCardFormateur cours={ selectedCours } enrolled={ '4' }  etudiant={ true } />
    </div>
  )
}

export default MesCoursEtudiant