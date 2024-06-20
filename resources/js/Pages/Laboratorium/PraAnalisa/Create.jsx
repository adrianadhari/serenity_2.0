import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import { PraAnalisaProvider } from "./context/PraAnalisaContext";
import CreateForm from "./Partials/CreateForm";

export default function CreatePraAnalisa({
    auth,
    jenis,
    status,
    customers_name,
}) {
    const title = "Tambah Data Laboratorium Pra Analisa";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <PraAnalisaProvider>
                <div className="py-4">
                    <BackButton href={route("lab.pra-analisa.index")} />

                    <CreateForm
                        jenis={jenis}
                        status={status}
                        customers_name={customers_name}
                    />
                </div>
            </PraAnalisaProvider>
        </AuthenticatedLayout>
    );
}
