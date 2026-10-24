import { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
  useNavigate,
  useOutletContext,
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
import { translations } from "../../translations";

const CoursDetails = () => {
  const capitalize = (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const [file, setFile] = useState(null);
  const [cours, setCours] = useState([]);
  const [lecons, setLecons] = useState([]);
  const [exercices, setExercices] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false)
  const [isEditSpec, setIsEditSpec] = useState(false);
  const [description, setDescription] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, lang } = useOutletContext()
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const showModal = searchParams.get("create") === "true";
  const showSuccess = searchParams.get("success") === "true";

  const getCours = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/cours.php?id=${id}`, {
          credentials: 'include',
        }
      );
      const data = await response.json();

      if(response.status === 403){
        setAccessDenied(true)
        return 
      } else if(!response.ok){
        toast.error(data.error)
        return false
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
        `${import.meta.env.VITE_SERVER_URL}/lecons.php?id=${id}`, {
          credentials: 'include',
        }
      );
      const data = await response.json();

      if(response.status === 403){
        setAccessDenied(true)
        return 
      } else if(!response.ok){
        toast.error(data.error)
        return false
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
        `${import.meta.env.VITE_SERVER_URL}/exercices.php?id=${id}`, {
          credentials: 'include',
        }
      );
      const data = await response.json();

      if(response.status === 403){
        setAccessDenied(true)
        return 
      } else if(!response.ok){
        toast.error(data.error)
        return false
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
        `${import.meta.env.VITE_SERVER_URL}/inscriptions.php?id=${id}`, {
          credentials: 'include',
        }
      );
      const data = await response.json();

      if(response.status === 403){
        setAccessDenied(true)
        return 
      } else if(!response.ok){
        toast.error(data.error)
        return false
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
  }, [id, showSuccess]);

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
          credentials: 'include',
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
      toast.error("Taille d'image trop grande");
      return false;
    }

    
    const formData = new FormData()
    formData.append('fichier', image)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/image_uploader.php?id=${id}&image=true`, {
          method: 'POST',
          credentials: 'include',
          body: formData
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return false;
      }

      toast.success("Image uploadé");
      getCours()
      return data.url;
    } catch (error) {
      toast.error("Impossible de uploader l'image");
      setFile(null)
      return false;
    }
  }
  
  
  return (
    <div className="flex flex-col justify-center">
      {showModal && <LessonBuilderModal lecon={lecons} language={lang} />}
      {showSuccess && (
        <SuccessModal
          type={"lecon"}
          content={ capitalize(cours?.cours_titre) }
          create={true}
          lecon={true}
          language={lang}
        />
      )}
      <div
        className={`flex flex-col items-center justify-center p-2 mx-0 md:mx-5 ${loading && "mt-25"}`}
      >
        {loading ? <Spinner /> : accessDenied ? <FetchError accessDenied={true} language={lang} /> : hasErrors ? <FetchError language={lang} /> : (
          <div className="w-full">
            {cours && cours.lecons > 0 ? (
              <>
                <div className="flex justify-between w-full flex-wrap">
                  <StateBox
                    titre={translations[lang]['etudiantsInscrits']}
                    label={inscriptions.length}
                  />
                  <StateBox titre={translations[lang]['lecons']} label={cours.lecons} />
                  <StateBox titre={translations[lang]['exercices']} label={cours.exercices} />
                </div>
                <h3 className="px-4 text-bleu-principal text-sm mb-1 mt-4">
                  {translations[lang]['importerImage']}
                </h3>
                <form action="" method="post" ref={formRef}>
                  <div className="border-2 border-gris-clair rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-3 gap-3 mx-2 md:mx-5">
                    <p className="text-sm text-bleu-secondaire truncate w-full min-w-0">
                      {cours && cours.url_image ? cours.url_image.split('thumbnails/')[1] : translations[lang]['aucunFichierSelectionne']}
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
                      className="bg-bleu-secondaire text-white rounded-xl px-6 py-2 cursor-pointer hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out w-full sm:w-auto text-center"
                    >
                      {translations[lang]['parcourir']}
                    </label>
                  </div>
                  <div className="mx-2 md:mx-5 my-5 border-2 border-gris-clair rounded-2xl px-5 py-2 flex flex-col gap-2 items-start justify-between">
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
                        title={translations[lang]['modifier']}
                      >
                        {description ? capitalize(description) : translations[lang]['pasDeDescription']}
                      </p>
                    )}
                  </div>
                  {isEditSpec && (
                    <div className="w-full flex justify-end px-0 md:px-5">
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
                        className="mx-2 bg-bleu-secondaire px-4 py-2 text-white font-semibold text-center rounded-lg hover:bg-bleu-secondaire/95 transition duration-300 ease-in-out cursor-pointer"
                      >
                        {translations[lang]['enregistrer']}
                      </button>
                    </div>
                  )}
                </form>
                <div className="flex flex-col gap-3 px-5 py-2">
                  <h3 className="font-titres text-bleu-principal font-semibold text-xl">
                    {translations[lang]['lecons']}
                  </h3>
                  <div className="w-full border-2 border-gris-clair rounded-2xl p-1 flex flex-col gap-2 justify-between">
                    {lecons.map((lecon, i) => {
                      const exosForThisLecon = exercices.filter(
                        (ex) => ex.lecon_id === lecon.id,
                      );

                      return (
                        <div
                          key={`${lecon.id}-${lecon.cours_id}`}
                          onClick={() =>
                            navigate(`${location.pathname}/lecons/${lecon.id}`)
                          }
                          className={`flex flex-col ${i === 0 ? 'border-t-0' : 'border-t-2'} border-gris-clair p-4 gap-3 items-center cursor-pointer`}
                        >
                          <div className="flex flex-col sm:flex-row justify-between w-full gap-3 sm:gap-0">
                            <div className="flex gap-4 min-w-0 w-full">
                              <div className="bg-orange-cuivre/30 w-12 h-12 shrink-0 rounded flex items-center justify-center text-orange-cuivre text-2xl font-bold">
                                {String(lecon.lecon_ordre).padStart(2, "0")}
                              </div>
                              <div className="flex flex-col items-start min-w-0 w-full">
                                <h3 className="font-titres text-bleu-principal font-semibold text-base sm:text-lg w-full">
                                  {capitalize(lecon.lecon_titre)}
                                </h3>
                                <p className="text-bleu-secondaire text-sm">
                                  {`${translations[lang]['lecon']} ${lecon.lecon_ordre}`}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-1 shrink-0">
                              <p className="text-bleu-secondaire flex text-sm sm:text-md whitespace-nowrap">
                                {lecon.types.join(" · ")}
                              </p>
                            </div>
                          </div>
                          <hr className={`w-7/8 text-gris-clair border-2 my-2`} />
                          <div className="w-full flex flex-col sm:flex-row flex-wrap gap-3">
                            {exosForThisLecon.map((exo) => (
                              <Link
                                onClick={(e) => e.stopPropagation()}
                                to={`/formateur/cours/${id}/exercices/${exo.exercice_id}`}
                                key={exo.exercice_id}
                                className="font-semibold px-4 py-2 border-2 border-gris-clair rounded-xl text-bleu-secondaire text-center w-full sm:w-auto"
                              >
                                {capitalize(exo.exercice_titre)}
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
                    {translations[lang]['etudiantsInscrits']}
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
                <div className="flex justify-between flex-wrap gap-1">
                  <StateBox
                    titre={translations[lang]['etudiantsInscrits']}
                    label={inscriptions.length}
                  />
                  <StateBox titre={translations[lang]['lecons']} label={cours.lecons} />
                  <StateBox titre={translations[lang]['exercices']} label={cours.exercices} />
                </div>
                <h3 className="px-4 text-bleu-principal text-sm mb-1 mt-4">
                  {translations[lang]['importerImage']}
                </h3>
                <form action="" method="post" ref={formRef}>
                  <div className="border-2 border-gris-clair rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-3 gap-3 mx-2 md:mx-5">
                    <p className="text-sm text-bleu-secondaire truncate w-full min-w-0">
                      {cours && cours.url_image ? cours.url_image.split('thumbnails/')[1] : translations[lang]['aucunFichierSelectionne']}
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
                      className="bg-bleu-secondaire text-white rounded-xl px-6 py-2 cursor-pointer hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out w-full sm:w-auto text-center"
                    >
                      {translations[lang]['parcourir']}
                    </label>
                  </div>
                  <div className="mx-2 md:mx-5 my-5 border-2 border-gris-clair rounded-2xl px-5 py-2 flex flex-col gap-2 items-start justify-between">
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
                        title={translations[lang]['modifier']}
                      >
                        {description !== '' && description !== null ? description : translations[lang]['pasDeDescription']}
                      </p>
                    )}
                  </div>
                  {isEditSpec && (
                    <div className="w-full flex justify-end px-0 md:px-5">
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
                        className="mx-2 bg-bleu-secondaire px-4 py-2 text-white font-semibold text-center rounded-lg hover:bg-bleu-secondaire/95 transition duration-300 ease-in-out cursor-pointer"
                      >
                        {translations[lang]['enregistrer']}
                      </button>
                    </div>
                  )}
                </form>
                <div className="mx-2 flex flex-col gap-2 px-0 md:px-5 py-2">
                  <h3 className="font-titres text-bleu-principal font-semibold text-xl">
                    {translations[lang]['lecons']}
                  </h3>
                  <div className="w-full border-2 border-gris-clair rounded-2xl flex flex-col divide-y-2 divide-gris-clair">
                    <p className="text-bleu-secondaire self-center p-4">
                      {translations[lang]['pasDeLecons']}
                    </p>
                  </div>
                </div>
                <div className="mx-2 flex flex-col gap-3 px-0 md:px-5 py-2 mb-3">
                  <h3 className="font-titres text-bleu-principal font-semibold text-xl">
                    {translations[lang]['etudiantsInscrits']}
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
                    {translations[lang]['coursIntrouvable']}
                  </h3>
                  <p className="text-gris-fonce text-sm max-w-sm">
                    {translations[lang]['coursIntrouvableTexte']}
                  </p>
                  <button
                    onClick={() => navigate("/formateur/cours")}
                    className="mt-3 bg-bleu-secondaire text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out cursor-pointer"
                  >
                    {translations[lang]['retourAuxCours']}
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursDetails;
