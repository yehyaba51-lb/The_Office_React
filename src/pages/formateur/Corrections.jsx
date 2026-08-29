import React, { useState } from "react";
import SearchBar from "../../components/shared/SearchBar";
import TableData from "../../components/shared/PageComponents/TableData";
import { correctionsColumns, fakeSoumissions } from "../../fakeData";
import { useSearchParams } from "react-router-dom";
import CorrectionModal from "../../components/modals/CorrectionModal";
import { toast } from "react-toastify";

const Corrections = () => {
  const [searchParams] = useSearchParams();

  const showCorrecting = searchParams.get("correct") === "true";

  const [filter, setFilter] = useState("all");
  const activeClass = (isActive) =>
    `${isActive ? "bg-orange-cuivre text-sm rounded px-3 py-1 flex justify-center items-center text-white font-semibold" : "flex justify-center items-center text-sm text-bleu-secondaire font-m cursor-pointer hover:underline hover:text-orange-cuivre"}`;

  const filteredSoumissions = fakeSoumissions.filter((s) => {
    if (filter === "all") return true;
    return (s.corrigeLe === null ? "pending" : "corrige") === filter;
  });

  const soumisFunction = () => {
    toast.success("Soumission corrigé");
  };
  const telechargerFunction = () => {
    toast.success("Fichier téléchargé");
  };

  return (
    <>
      <div className="flex px-5 mt-5 gap-4 items-center">
        {showCorrecting && <CorrectionModal submitFunction={ soumisFunction } downloadFunction={ telechargerFunction } />}
        <SearchBar />
        <div className="w-92 p-1 border-2 border-gris-clair rounded-xl flex text-md justify-center gap-5">
          <button
            className={activeClass(filter === "all")}
            onClick={() => setFilter("all")}
          >
            Toutes les corrections
          </button>
          <button
            className={activeClass(filter === "pending")}
            onClick={() => setFilter("pending")}
          >
            À corriger
          </button>
          <button
            className={activeClass(filter === "corrige")}
            onClick={() => setFilter("corrige")}
          >
            Corrigées
          </button>
        </div>
      </div>
      <div className="flex px-5 my-5 gap-4 items-center">
        <TableData
          columns={correctionsColumns}
          rows={filteredSoumissions}
          onClickRow={true}
          type={"formateur"}
        />
      </div>
    </>
  );
};

export default Corrections;
