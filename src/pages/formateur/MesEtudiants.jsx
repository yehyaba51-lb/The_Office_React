import React from "react";
import SearchBar from "../../components/shared/SearchBar";
import TableData from "../../components/shared/PageComponents/TableData";
import { etudiantsInscritsColumns, fakeEtudiantsInscrits } from "../../fakeData";

const MesEtudiants = () => {
  return (
    <div className="flex flex-col px-5 mt-5 gap-4 items-center">
      <SearchBar />
      <div className=" py-3 w-full">
        <TableData
          columns={etudiantsInscritsColumns}
          rows={fakeEtudiantsInscrits}
          admin={false}
        />
      </div>
    </div>
  );
};

export default MesEtudiants;
