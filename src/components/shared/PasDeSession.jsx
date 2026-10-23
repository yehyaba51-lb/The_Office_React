import { WifiOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { translations } from "../../translations";

const PasDeSession = ({ language }) => {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col w-full items-center pt-50 gap-3 text-center">
      <div className="rounded-full bg-gris-clair w-30 h-30 flex items-center justify-center">
        <WifiOff size={50} className="text-bleu-secondaire" />
      </div>
      <h3 className="font-titres text-bleu-principal font-semibold text-2xl">
        {translations[language]['pasDeSession']}
      </h3>
      <p className="text-gris-fonce text-xl">
        {translations[language]['veuillezConnecter']}
      </p>
      <button
      onClick={() => navigate('/')}
        className={`text-sm mx-2 md:mx-0 w-full md:w-1/6 bg-bleu-principal rounded-xl p-2 cursor-pointer text-white font-semibold hover:bg-bleu-principal/90 transition duration-300 ease-in-out`}
      >
        {translations[language]['seConnecter']}
      </button>
    </div>
  );
};

export default PasDeSession;
