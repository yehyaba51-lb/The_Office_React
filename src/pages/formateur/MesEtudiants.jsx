import React, { useEffect, useState } from "react";
import SearchBar from "../../components/shared/SearchBar";
import TableData from "../../components/shared/PageComponents/TableData";
import { mesEtudiantsColumns } from "../../fakeData";
import FetchError from "../../components/shared/FetchError";
import Spinner from "../../components/shared/Spinner";

const MesEtudiants = () => {
  const [cours, setCours] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [filter, setFilter] = useState("tous");
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

  const getInscriptions = async () => {
    try {
      const response = await fetch("http://localhost:8000/inscriptions");
      const data = await response.json();

      setInscriptions(data);
      return true;
    } catch (error) {
      setInscriptions("");
      return false;
    }
  };

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([getCours(), getInscriptions()]);
      setHasError(results.includes(false));

      setLoading(false);
    };

    loadEverything();
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const coursSelected = cours
    ? cours.filter((c) =>
        currentUser
          ? c.formateur.toLowerCase() ===
            currentUser.prenom.toLowerCase() +
              " " +
              currentUser.nom.toLowerCase()
          : "",
      )
    : "";
  const studentsList = inscriptions
    ? inscriptions.filter((i) =>
        coursSelected
          ? coursSelected.some(
              (c) => c.titre.toLowerCase() === i.cours.toLowerCase(),
            )
          : "",
      )
    : "";

  const studentsCours = studentsList ? studentsList.map((c) => c.cours) : ''
  const filteredArray = [...new Set(studentsCours)];

  const filteredEtudiants = studentsList ? studentsList.filter((s) => {
    if (filter === "tous") return true;
    return s.cours === filter;
  }) : ''

  const finalizedFilteredEtudiants = filteredEtudiants ? filteredEtudiants.filter(
    (e) =>
      `${e.etudiant}`.toLowerCase().includes(search.toLowerCase()) ||
      `${e.cours}`.toLowerCase().includes(search.toLowerCase()),
  ) : ''

  
  return (
    <div
      className={`flex flex-col gap-4 justify-center items-center ${loading && "mt-25"}`}
    >
      {loading ? (
        <Spinner />
      ) : hasError ? (
        <FetchError />
      ) : (
        <>
          <div className="flex px-5 mt-5 gap-4 items-center w-full">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="w-75 p-2 border-2 border-gris-clair outline-none focus:border-orange-cuivre/55 focus:ring-2 focus:ring-orange-cuivre/30 rounded-xl flex text-bleu-secondaire text-md justify-center gap-5"
            >
              <option className="" value="tous">
                Tous les cours
              </option>
              {filteredArray.map((c) => (
                <option key={c} className="" value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex px-5 mt-2 gap-4 items-center w-full">
            <TableData
              columns={mesEtudiantsColumns}
              rows={finalizedFilteredEtudiants}
              admin={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MesEtudiants;
