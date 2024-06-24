import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { AnalyticProvider } from "./context/AnalyticContext";
import BackButton from "@/Components/BackButton";
import EditForm from "./Partials/EditForm";

export default function EditAnalytic({
    auth,
    analyticDetail,
    kode_pra_analisa
}) {
    const title = "Edit Analisa";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <AnalyticProvider>
                <div className="py-4">
                    <BackButton href={route("lab.analisa.index")} />

                    <EditForm
                        analyticDetail={analyticDetail}
                        kode_pra_analisaa={kode_pra_analisa}
                    />
                </div>
            </AnalyticProvider>
        </AuthenticatedLayout>
    );
}
