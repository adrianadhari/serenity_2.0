import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { InstitutionProvider } from "./context/InstitutionContext";
import EditForm from "./Partials/EditForm";
import BackButton from "@/Components/BackButton";

export default function EditInstitusi({
    auth,
    negara,
    grup,
    jenis,
    institutionDetail,
}) {
    const title = "Edit Institusi";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <InstitutionProvider>
                <div className="py-4">
                    <BackButton href={route("institusi.index")} />

                    <EditForm
                        negaraInstitusi={negara}
                        grupInstitusi={grup}
                        jenisInstitusi={jenis}
                        institutionDetail={institutionDetail}
                    />
                </div>
            </InstitutionProvider>
        </AuthenticatedLayout>
    );
}
