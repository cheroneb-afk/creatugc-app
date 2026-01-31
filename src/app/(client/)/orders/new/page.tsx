import BriefForm from "@/components/brief/BriefForm";

export default function NewOrderPage() {
    return (
        <div className="max-w-6xl mx-auto py-8">
            <div className="mb-10 flex flex-col items-center text-center">
                <h1 className="text-4xl font-black tracking-tighter mb-4 text-gradient">Créer un nouveau brief</h1>
                <p className="text-gray-400 max-w-xl">
                    Plus votre brief est détaillé, plus nos algorithmes IA seront performants pour générer la vidéo parfaite.
                </p>
            </div>

            <BriefForm />
        </div>
    );
}
