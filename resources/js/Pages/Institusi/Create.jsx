import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { InstitutionProvider } from "./context/InstitutionContext";
import CreateForm from "./Partials/CreateForm";
import BackButton from "@/Components/BackButton";

export default function CreateInstitusi({ auth, negara, grup, jenis }) {
    const title = "Tambah Institusi";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <InstitutionProvider>
                <div className="py-4">
                    <BackButton href={route("institusi.index")} />

                    <CreateForm negara={negara} grup={grup} jenis={jenis} />
                </div>
            </InstitutionProvider>
        </AuthenticatedLayout>
    );
}
