import React, { useState } from "react";
import SearchBar from "../../components/shared/SearchBar";
import TableData from "../../components/shared/PageComponents/TableData";
import { mesEtudiantsColumns, fakeEtudiantsInscrits } from "../../fakeData";

const MesEtudiants = () => {
  const cours = fakeEtudiantsInscrits.map(c => c.cours)
  const filteredArray = [... new Set(cours)]

  const [filter, setFilter] = useState('tous')

  const filteredEtudiants = fakeEtudiantsInscrits.filter(e => {
    if(filter === 'tous') return true
    return e.cours === filter
  })
  console.log(filteredArray);
  
  return (
    <div >
      <div className="flex px-5 mt-5 gap-4 items-center">
        <SearchBar />
        <select onChange={(e) => setFilter(e.target.value)} className="w-75 p-2 border-2 border-gris-clair outline-none focus:border-orange-cuivre/55 focus:ring-2 focus:ring-orange-cuivre/30 rounded-xl flex text-bleu-secondaire text-md justify-center gap-5">
          <option className='' value='tous'>Tous les cours</option>
          {filteredArray.map((c) => (
              <option key={c} className='' value={c}>{c}</option>   
            ))}
        </select>
      </div>
      <div className="flex px-5 mt-5 gap-4 items-center w-full">
        <TableData
          columns={mesEtudiantsColumns}
          rows={filteredEtudiants}
          admin={false}
        />
      </div>
    </div>
  );
};

export default MesEtudiants;
