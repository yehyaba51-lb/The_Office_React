import { useEffect, useState } from "react";
import SearchBar from "../../components/shared/SearchBar";
import { Check, LockKeyhole, Inbox } from "lucide-react";
import { useLocation, Link, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";
import { translations } from "../../translations";

const MesExercices = () => {
  const capitalize = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  const [listOfExercices, setListOfExercices] = useState({
    cours: [],
    lecons: [],
    exercices: [],
  });
  const { currentUser, lang } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const location = useLocation();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const getListOfExercices = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/exercices.php?id=${currentUser.utilisateur_id}&exosEtudiant=true`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();

      if (response.status === 403) {
        setAccessDenied(true);
        return;
      } else if (!response.ok) {
        toast.error(data.error);
        return false;
      }

      setListOfExercices(data);
      return true;
    } catch (error) {
      setListOfExercices({ cours: [], lecons: [], exercices: [] });
      return false;
    }
  };

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([getListOfExercices()]);
      setHasErrors(results.includes(false));

      setLoading(false);
    };

    loadEverything();
  }, []);

  const filteredExercices = listOfExercices.exercices
    ? listOfExercices.exercices.filter((e) => {
        if (filter === "all") return true;
        return e.statut === filter;
      })
    : [];

  const activeClass = (isActive) =>
    `${isActive ? "bg-orange-cuivre text-sm rounded px-3 py-1 flex justify-center items-center text-white font-semibold" : "flex justify-center items-center text-sm text-bleu-secondaire font-medium cursor-pointer hover:underline hover:text-orange-cuivre"}`;

  const searchExercices = filteredExercices
    ? filteredExercices.filter((c) =>
        `${c.exercice_titre}`.toLowerCase().includes(search.toLowerCase()),
      )
    : "";
  return (
    <div>
      <div className={`px-0 md:px-5 mx-5 py-3 flex flex-col sm:flex-row gap-4`}>
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          lang={lang}
        />
        <div className="w-fit mx-auto sm:mx-0 py-1 px-2 border-2 border-gris-clair rounded-xl flex text-md justify-center gap-5">
          <button
            className={activeClass(filter === "all")}
            onClick={() => setFilter("all")}
          >
            {translations[lang]['tousLesExercices']}
          </button>
          <button
            className={activeClass(filter === "a_faire")}
            onClick={() => setFilter("a_faire")}
          >
            {translations[lang]['aFaire']}
          </button>
          <button
            className={activeClass(filter === "termine")}
            onClick={() => setFilter("termine")}
          >
            {translations[lang]['corrigees']}
          </button>
        </div>
      </div>
      <div
      className={`px-0 md:px-5 mx-4 py-3 flex flex-col items-center justify-center ${loading && "mt-25"}`}
    >
      {loading ? (
        <Spinner />
      ) : accessDenied ? (
        <FetchError accessDenied={true} language={lang} />
      ) : hasErrors ? (
        <FetchError language={lang} />
      ) : listOfExercices.exercices.length === 0 ? (
        <>
          <div className="rounded-full bg-gris-clair w-16 h-16 flex items-center justify-center mt-15">
            <Inbox size={28} className="text-bleu-secondaire" />
          </div>
          <p className="text-bleu-principal font-semibold text-center">
            {translations[lang]['aucunExerciceDisponible1']} <br />
            {translations[lang]['aucunExerciceDisponible2']}
          </p>
        </>
      ) : (
        <>
          {listOfExercices.cours.map((cours) => (
            <div
              key={cours.cours_id}
              className="mt-0 mb-5 w-full border-2 border-gris-clair rounded-2xl py-3 flex flex-col gap-2 justify-between"
            >
              <h3 className="px-5 font-titres text-bleu-principal text-xl">
                {capitalize(cours.cours_titre)}
              </h3>

              {listOfExercices.lecons
                .filter((lecon) => lecon.cours_id === cours.cours_id)
                .map((lecon) =>
                  searchExercices
                    .filter(
                      (exercice) =>
                        exercice.lecon_id === lecon.id &&
                        exercice.cours_id === cours.cours_id,
                    )
                    .map((exercice) => (
                      <div key={exercice.exercice_id}>
                        {lecon.id !== "1" && (
                          <hr className="border-2 border-gris-clair w-full mb-2" />
                        )}
                        <Link
                          to={
                            exercice.statut === "a_faire"
                              ? `${location.pathname}/${exercice.exercice_id}`
                              : ""
                          }
                          className={`${exercice.statut === null ? "cursor-not-allowed" : exercice.statut === "a_faire" ? "cursor-pointer" : "cursor-default"} flex items-center justify-between gap-2 mx-2 md:mx-5`}
                        >
                          <div className="flex gap-4 items-center min-w-0">
                            <div className="w-10 h-10 flex items-center justify-center">
                              {exercice.statut === "termine" ? (
                                <Check
                                  className="text-vert-reussite"
                                  size={30}
                                />
                              ) : exercice.statut === null ? (
                                <LockKeyhole
                                  className="text-gris-fonce/30"
                                  size={30}
                                />
                              ) : (
                                <p className="bg-orange-cuivre/20 p-2 rounded-lg font-semibold text-orange-cuivre">
                                  {lecon.lecon_ordre < 10 ? String(lecon.lecon_ordre).padStart(2, "0") : lecon.lecon_ordre}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col items-start gap-1 w-full min-w-0">
                              <p
                                className={`${exercice.statut === null && "text-gris-fonce/40"} text-bleu-secondaire text-lg font-semibold truncate w-full`}
                              >
                                {translations[lang]['lecon']} 0{lecon.lecon_ordre} -{" "}
                                {capitalize(lecon.lecon_titre)} -{" "}
                                {capitalize(exercice.exercice_titre)}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-center w-auto shrink-0">
                            {exercice.statut === "termine" ? (
                              <p className="text-vert-reussite font-medium text-md bg-vert-reussite/20 py-1 px-5 rounded-xl">
                                {exercice.note}
                              </p>
                            ) : exercice.statut === "soumis" ? (
                              <p className="text-bleu-secondaire font-medium text-md bg-bleu-secondaire/20 py-1 px-5 rounded-xl">
                                {translations[lang]['soumis']}
                              </p>
                            ) : exercice.statut === null ? (
                              <p className="text-gris-fonce/40 font-medium text-md bg-gris-clair py-1 px-5 rounded-xl">
                                {translations[lang]['verrouille']}
                              </p>
                            ) : (
                              <p className="text-orange-cuivre font-medium text-md bg-orange-cuivre/20 py-1 px-5 rounded-xl">
                                {translations[lang]['aFaire']}
                              </p>
                            )}
                          </div>
                        </Link>
                      </div>
                    )),
                )}
            </div>
          ))}
        </>
      )}
    </div>
    </div>
  );
};

export default MesExercices;
