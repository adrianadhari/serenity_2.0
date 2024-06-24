import BackButton from "@/Components/BackButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PascaAnalyticProvider } from "./context/PascaAnalyticContext";
import CreateForm from "./Partials/CreateForm";

export default function CreateAnalytic({ auth, kode_pra_analisa }) {
    const title = "Tambah Pasca Analisa";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <PascaAnalyticProvider>
                <div className="py-4">
                    <BackButton href={route("lab.pasca-analisa.index")} />

                    <CreateForm kode_pra_analisaa={kode_pra_analisa} />
                </div>
            </PascaAnalyticProvider>
        </AuthenticatedLayout>
    );
}
