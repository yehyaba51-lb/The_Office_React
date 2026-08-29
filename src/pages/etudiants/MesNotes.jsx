import React from 'react'
import TableData from '../../components/shared/PageComponents/TableData'
import { mesNotesColumns } from '../../fakeData'

const MesNotes = () => {
  const mesNotesRows = [
  { id: 1, exercice: "Structurer une page HTML", cours: "Fondations du développement web", soumisLe: "2026-07-19", note: 18 },
  { id: 2, exercice: "Introduction aux bases de données", cours: "Bases de données", soumisLe: "2026-08-05", note: 15 },
  { id: 3, exercice: "Modéliser un schéma", cours: "Bases de données", soumisLe: "2026-08-10", note: 8 },
];
  return (
    <div className="px-5 my-5">
      <TableData columns={ mesNotesColumns } rows={ mesNotesRows } onClickRow={ true } admin={ false } />
    </div>
  )
}

export default MesNotes