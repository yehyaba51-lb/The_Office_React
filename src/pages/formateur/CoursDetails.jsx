import { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import StateBox from "../../components/shared/PageComponents/StateBox";
import LessonBuilderModal from "../../components/modals/LessonBuilderModal";
import SuccessModal from "../../components/modals/SuccessModal";
import TableData from "../../components/shared/PageComponents/TableData";
import { etudiantsInscritsColumns } from "../../fakeData";
import { FileX } from "lucide-react";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";
import { toast } from "react-toastify";

const CoursDetails = () => {
  const [file, setFile] = useState(null);
  const [cours, setCours] = useState([]);
  const [lecons, setLecons] = useState([]);
  const [exercices, setExercices] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const [isEditSpec, setIsEditSpec] = useState(false);
  const [description, setDescription] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const showModal = searchParams.get("create") === "true";
  const showSuccess = searchParams.get("success") === "true";

  const getCours = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/cours.php?id=${id}`,
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return false;
      }

      setCours(data);
      return true;
    } catch (error) {
      setCours(null);
      return false;
    }
  };

  const getLecons = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/lecons.php?id=${id}`,
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return false;
      }

      setLecons(data);
      return true;
    } catch (error) {
      setLecons([]);
      return false;
    }
  };

  const getExercices = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/exercices.php?id=${id}`,
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return false;
      }

      setExercices(data);
      return true;
    } catch (error) {
      setExercices([]);
      return false;
    }
  };

  const getInscriptions = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/inscriptions.php?id=${id}`,
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return false;
      }

      setInscriptions(data);
      return true;
    } catch (error) {
      setInscriptions([]);
      return false;
    }
  };

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([
        getCours(),
        getLecons(),
        getExercices(),
        getInscriptions(),
      ]);
      setHasErrors(results.includes(false));

      setLoading(false);
    };

    loadEverything();
  }, [id]);

  useEffect(() => {
    setDescription(cours ? cours.description : "");
  }, [cours]);

  const updateDescriptions = async (insertedDescription) => {
    const textRegex = /^[a-zA-ZÀ-ÿ0-9' :\-,.!?;()\n]*$/;
    if (!textRegex.test(insertedDescription.description)) {
      toast.error("Description invalide");
      return false;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/cours.php?id=${id}&description=true`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(insertedDescription),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return false;
      }

      toast.success("Description modifié");
      getCours();
      return true;
    } catch (error) {
      toast.error("Description peut pas etre modifié");
      return false;
    }
  };

  const formRef = useRef();

  const uploadImage = async (image) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const TAILLE_MAX = 5 * 1024 * 1024;

    if(!image){
      toast.error("Pas d'image uploadé");
      return false;
    }
    if (!allowedTypes.includes(image.type)) {
      toast.error("Type d'image invalide");
      return false;
    }

    if (image.size > TAILLE_MAX) {
      toast.error("Taile d'image trop grande");
      return false;
    }

    
    const formData = new FormData()
    formData.append('fichier', image)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/upload.php?id=${id}&image=true`, {
          method: 'POST',
          body: formData
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return false;
      }

      toast.success("Image uploadé");
      return data.url;
    } catch (error) {
      toast.error("Impossible de uploader l'image");
      setFile(null)
      return false;
    }
  };
  return (
    <div
      className={`flex flex-col gap-4 justify-center items-center ${loading && "mt-25"}`}
    >
      {showModal && <LessonBuilderModal lecon={lecons} />}
      {showSuccess && (
        <SuccessModal
          type={"Leçon"}
          content={cours?.cours_titre}
          create={true}
          lecon={true}
        />
      )}
      {loading ? (
        <Spinner />
      ) : hasErrors ? (
        <FetchError />
      ) : (
        <div className="w-full">
          {cours && cours.lecons > 0 ? (
            <>
              <div className="flex justify-between">
                <StateBox
                  titre={"Étudiants inscrits"}
                  label={inscriptions.length}
                />
                <StateBox titre={"Leçons"} label={cours.lecons} />
                <StateBox titre={"Exercices"} label={cours.exercices} />
              </div>
              <h3 className="px-4 text-bleu-principal text-sm mb-1">
                Importer une image
              </h3>
              <form action="" method="post" ref={formRef}>
                <div className="border-2 border-gris-clair rounded-xl flex justify-between items-center px-4 py-2 mx-5">
                  <p className="text-sm text-bleu-secondaire">
                    {file ? file.name : "Aucun fichier sélectionné"}
                  </p>
                  <input
                    name="image"
                    type="file"
                    accept="image/png, image/jpeg, .jpg, .jpeg"
                    onChange={(e) => {
                      const selected = e.target.files[0] || null
                      setFile(selected)
                      if(selected) uploadImage(selected);
                    }}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="bg-bleu-secondaire text-white rounded-xl px-6 py-2 cursor-pointer hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out"
                  >
                    Parcourir
                  </label>
                </div>
                <div className="m-5 border-2 border-gris-clair rounded-2xl px-5 py-2 flex flex-col gap-2 items-start justify-between">
                  <h3 className="font-titres text-gris-fonce/80 text-xl">
                    Description
                  </h3>
                  {isEditSpec ? (
                    <>
                      <textarea
                        name="description"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        className="text-bleu-principal text-md w-full min-h-32 resize-none outline-none"
                      />
                    </>
                  ) : (
                    <p
                      onClick={() => setIsEditSpec(true)}
                      className="w-full whitespace-pre-line text-bleu-principal text-md hover:text-bleu-principal/90 cursor-pointer"
                      title="Modifier"
                    >
                      {description}
                    </p>
                  )}
                </div>
                {isEditSpec && (
                  <div className="w-full flex justify-end">
                    <button
                      type="button"
                      onClick={async () => {
                        const formData = new FormData(formRef.current);
                        const descriptionInput = formData.get("description");

                        const success = await updateDescriptions({
                          description: descriptionInput,
                        });

                        if (success) {
                          setIsEditSpec(false);
                        }
                      }}
                      className="mx-5 bg-bleu-secondaire px-4 py-2 text-white font-semibold text-center rounded-lg hover:bg-bleu-secondaire/95 transition duration-300 ease-in-out cursor-pointer"
                    >
                      Enregistrer
                    </button>
                  </div>
                )}
              </form>
              <div className="flex flex-col gap-3 px-5 py-2">
                <h3 className="font-titres text-bleu-principal font-semibold text-xl">
                  Leçons
                </h3>
                <div className="w-full border-2 border-gris-clair rounded-2xl p-1 flex flex-col gap-2 justify-between">
                  {lecons.map((lecon) => {
                    const exosForThisLecon = exercices.filter(
                      (ex) => ex.lecon_id === lecon.id,
                    );

                    return (
                      <div
                        key={`${lecon.id}-${lecon.cours_id}`}
                        onClick={() =>
                          navigate(`${location.pathname}/lecons/${lecon.id}`)
                        }
                        className={`flex flex-col  border-t-${lecon.id === 1 ? "0" : "2"} border-gris-clair p-4 gap-3 items-center cursor-pointer`}
                      >
                        <div className="flex justify-between w-full">
                          <div className="flex gap-4">
                            <div className="bg-orange-cuivre/30 w-12 h-12 rounded flex items-center justify-center text-orange-cuivre text-2xl font-bold">
                              {String(lecon.lecon_ordre).padStart(2, "0")}
                            </div>
                            <div className="flex flex-col items-start">
                              <h3 className="font-titres text-bleu-principal font-semibold text-lg">
                                {lecon.lecon_titre}
                              </h3>
                              <p className="text-bleu-secondaire text-sm">
                                {`Leçon ${lecon.lecon_ordre}`}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <p className="text-bleu-secondaire flex text-md">
                              {lecon.types.join(" · ")}
                            </p>
                          </div>
                        </div>
                        <hr className={`w-7/8 text-gris-clair border-2 my-2`} />
                        <div className="w-7/8 flex gap-5">
                          {exosForThisLecon.map((exo) => (
                            <Link
                              onClick={(e) => e.stopPropagation()}
                              to={`/formateur/cours/${id}/exercices/${exo.exercice_id}`}
                              key={exo.exercice_id}
                              className="font-semibold px-8 py-2 border-2 border-gris-clair rounded-xl text-bleu-secondaire"
                            >
                              {exo.exercice_titre}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-3 px-5 py-2 mb-3">
                <h3 className="font-titres text-bleu-principal font-semibold text-xl">
                  Étudiants inscrits
                </h3>
                <TableData
                  columns={etudiantsInscritsColumns}
                  rows={inscriptions}
                  admin={false}
                />
              </div>
            </>
          ) : cours && cours.lecons === 0 ? (
            <>
              <div className="flex justify-between">
                <StateBox
                  titre={"Étudiants inscrits"}
                  label={inscriptions.length}
                />
                <StateBox titre={"Leçons"} label={cours.lecons} />
                <StateBox titre={"Exercices"} label={cours.exercices} />
              </div>
              <div className="border-2 border-gris-clair rounded-xl flex justify-between items-center px-4 py-2 mx-5">
                <p className="text-sm text-bleu-secondaire">
                  {file ? file.name : "Aucun fichier sélectionné"}
                </p>
                <input
                  name="image"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0] || null)}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="bg-bleu-secondaire text-white rounded-xl px-6 py-2 cursor-pointer hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out"
                >
                  Parcourir
                </label>
              </div>
              <form action="" method="post">
                <div className="m-5 border-2 border-gris-clair rounded-2xl px-5 py-2 flex flex-col gap-2 items-start justify-between">
                  <h3 className="font-titres text-gris-fonce/80 text-xl">
                    Description
                  </h3>
                  {isEditSpec ? (
                    <>
                      <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="text-bleu-principal text-md w-full min-h-32 resize-none outline-none"
                      />
                    </>
                  ) : (
                    <p
                      onClick={() => setIsEditSpec(true)}
                      className="w-full whitespace-pre-line text-bleu-principal text-md hover:text-bleu-principal/90 cursor-pointer"
                      title="Modifier"
                    >
                      Pas de description
                    </p>
                  )}
                </div>
                {isEditSpec && (
                  <button
                    type="button"
                    onClick={async () => {
                      const formData = new FormData(formRef.current);
                      const descriptionInput = formData.get("description");

                      const success = await updateDescriptions({
                        description: descriptionInput,
                      });

                      if (success) {
                        setIsEditSpec(false);
                      }
                    }}
                    className="mx-5 bg-bleu-secondaire px-4 py-2 text-white font-semibold text-center rounded-lg hover:bg-bleu-secondaire/95 transition duration-300 ease-in-out cursor-pointer"
                  >
                    Enregistrer
                  </button>
                )}
              </form>
              <div className="flex flex-col gap-3 px-5 py-2">
                <h3 className="font-titres text-bleu-principal font-semibold text-xl">
                  Leçons
                </h3>
                <div className="w-full border-2 border-gris-clair rounded-2xl p-1 flex flex-col gap-2 justify-between">
                  <p className="text-bleu-secondaire self-center p-4">
                    Pas de leçons
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 px-5 py-2 mb-3">
                <h3 className="font-titres text-bleu-principal font-semibold text-xl">
                  Étudiants inscrits
                </h3>
                <TableData
                  columns={etudiantsInscritsColumns}
                  rows={inscriptions}
                  edit={false}
                />
              </div>
            </>
          ) : (
            !cours && (
              <div className="border-2 border-gris-clair rounded-2xl p-12 flex flex-col items-center gap-3 text-center m-5">
                <div className="w-14 h-14 rounded-full bg-gris-fonce/10 flex items-center justify-center mb-2">
                  <FileX className="text-gris-fonce" size={26} />
                </div>
                <h3 className="text-bleu-principal font-titres font-semibold text-lg">
                  Cours introuvable
                </h3>
                <p className="text-gris-fonce text-sm max-w-sm">
                  Ce cours n'existe pas ou a été supprimé. Vérifiez le lien ou
                  retournez à la liste des cours.
                </p>
                <button
                  onClick={() => navigate("/formateur/cours")}
                  className="mt-3 bg-bleu-secondaire text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out cursor-pointer"
                >
                  Retour aux cours
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CoursDetails;
