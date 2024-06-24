import BackButton from "@/Components/BackButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { AnalyticProvider } from "./context/AnalyticContext";
import CreateForm from "./Partials/CreateForm";

export default function CreateAnalytic({ auth, kode_pra_analisa }) {
    const title = "Tambah Analisa";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <AnalyticProvider>
                <div className="py-4">
                    <BackButton href={route("lab.analisa.index")} />

                    <CreateForm kode_pra_analisaa={kode_pra_analisa} />
                </div>
            </AnalyticProvider>
        </AuthenticatedLayout>
    );
}
