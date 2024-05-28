import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import { PublicationProvider } from "./context/PublicationCotext";
import CreateForm from "./Partials/CreateForm";

export default function CreatePublikasi({ auth, typeData, statusData }) {
    const title = "Tambah Publikasi";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <PublicationProvider>
                <div className="py-4">
                    <BackButton href={route("publikasi.index")} />

                    <CreateForm typeData={typeData} statusData={statusData} />
                </div>
            </PublicationProvider>
        </AuthenticatedLayout>
    );
}
