import { WifiOff } from "lucide-react";

const FetchError = () => {
  return (
    <div className="flex flex-col items-center gap-3 text-center py-10">
      <div className="rounded-full bg-gris-clair w-16 h-16 flex items-center justify-center">
        <WifiOff size={28} className="text-bleu-secondaire" />
      </div>
      <h3 className="font-titres text-bleu-principal font-semibold text-lg">
        Impossible de charger les données
      </h3>
      <p className="text-gris-fonce text-sm">
        Vérifiez votre connexion et réessayez.
      </p>
    </div>
  );
};

export default FetchError;
