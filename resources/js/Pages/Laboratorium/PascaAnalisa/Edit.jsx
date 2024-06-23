import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PascaAnalyticProvider } from "./context/PascaAnalyticContext";
import BackButton from "@/Components/BackButton";
import EditForm from "./Partials/EditForm";

export default function EditPascaAnalytic({
    auth,
    pascaAnalyticDetail,
    kode_pra_analisa
}) {
    const title = "Edit Pasca Analisa";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <PascaAnalyticProvider>
                <div className="py-4">
                    <BackButton href={route("lab.pasca-analisa.index")} />

                    <EditForm
                        pascaAnalyticDetail={pascaAnalyticDetail}
                        kode_pra_analisaa={kode_pra_analisa}
                    />
                </div>
            </PascaAnalyticProvider>
        </AuthenticatedLayout>
    );
}
