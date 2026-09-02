import React, { useEffect, useState } from "react";
import SearchBar from "../../components/shared/SearchBar";
import TableData from "../../components/shared/PageComponents/TableData";
import { correctionsColumns } from "../../fakeData";
import { useSearchParams } from "react-router-dom";
import CorrectionModal from "../../components/modals/CorrectionModal";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";

const Corrections = () => {
  const [searchParams] = useSearchParams();
  const [soumissions, setSoumissions] = useState([]);
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const showCorrecting = searchParams.get("correct") === "true";
  const id = searchParams.get("id");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const getCours = async () => {
    try {
      const response = await fetch("http://localhost:8000/cours");
      const data = await response.json();

      setCours(data);
      return true;
    } catch (error) {
      setCours("");
      return false;
    }
  };

  const getSoumissions = async () => {
    try {
      const response = await fetch("http://localhost:8000/soumissions");
      const data = await response.json();

      setSoumissions(data);
      return true;
    } catch (error) {
      setSoumissions("");
      return false;
    }
  };

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([getSoumissions(), getCours()]);
      setHasError(results.includes(false));

      setLoading(false);
    };

    loadEverything();
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const selectedCours = cours
    ? cours.filter((c) =>
        currentUser
          ? c.formateur.toLowerCase() ===
            currentUser.prenom.toLowerCase() +
              " " +
              currentUser.nom.toLowerCase()
          : "",
      )
    : "";

  const selectedSoumissions = soumissions
    ? soumissions.filter((s) =>
        selectedCours
          ? selectedCours.some((c) => Number(c.id) === s.coursId)
          : "",
      )
    : "";

  const activeClass = (isActive) =>
    `${isActive ? "bg-orange-cuivre text-sm rounded px-3 py-1 flex justify-center items-center text-white font-semibold" : "flex justify-center items-center text-sm text-bleu-secondaire font-m cursor-pointer hover:underline hover:text-orange-cuivre"}`;

  const filteredSoumissions = selectedSoumissions ? selectedSoumissions.filter((s) => {
    if (filter === "all") return true;
    return (s.corrigeLe === null ? "pending" : "corrige") === filter;
  }) : ''

  const soumisFunction = async (id, data) => {
    try {
      await fetch(`http://localhost:8000/soumissions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      toast.success("Soumission corrigé");
    } catch (error) {
      toast.error("Soumission ne peut pas etre modifier");
    }

    getSoumissions()
  };
  const telechargerFunction = () => {
    toast.success("Fichier téléchargé");
  };

  const allFilteredSearch = filteredSoumissions
    ? filteredSoumissions.filter(
        (s) =>
          `${s.etudiant}`.toLowerCase().includes(search.toLowerCase()) ||
          `${s.exercice}`.toLowerCase().includes(search.toLowerCase()) ||
          `${s.cours}`.toLowerCase().includes(search.toLowerCase()),
      )
    : "";

  return (
    <div
      className={`flex flex-col justify-center items-center ${loading && "mt-25"}`}
    >
      {loading ? (
        <Spinner />
      ) : hasError ? (
        <FetchError />
      ) : (
        <>
          <div className="flex px-5 mt-5 gap-4 items-center w-full">
            {showCorrecting && (
              <CorrectionModal
                submitFunction={(data) => soumisFunction(id, data)}
                downloadFunction={telechargerFunction}
              />
            )}
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
              rows={allFilteredSearch}
              onClickRow={true}
              type={"formateur"}
              edit={false}
              deleting={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Corrections;
