import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import { PraAnalisaProvider } from "./context/PraAnalisaContext";
import EditForm from "./Partials/EditForm";

export default function EditPraAnalisa({
    auth,
    jenis,
    status,
    customers_name,
    detailData,
}) {
    const title = "Edit Data Laboratorium Pra Analisa";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <PraAnalisaProvider>
                <div className="py-4">
                    <BackButton href={route("lab.pra-analisa.index")} />

                    <EditForm
                        jenis={jenis}
                        status={status}
                        customers_name={customers_name}
                        detailData={detailData}
                    />
                </div>
            </PraAnalisaProvider>
        </AuthenticatedLayout>
    );
}
