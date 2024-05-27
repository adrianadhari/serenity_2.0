import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import { PublicationProvider } from "./context/PublicationCotext";
import EditForm from "./Partials/EditForm";

export default function EditPublikasi({
    auth,
    typeData,
    statusData,
    publicationDetail,
}) {
    const title = "Edit Publikasi";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <PublicationProvider>
                <div className="py-4">
                    <BackButton href={route("publikasi.index")} />

                    <EditForm
                        typeData={typeData}
                        statusData={statusData}
                        publicationDetail={publicationDetail}
                    />
                </div>
            </PublicationProvider>
        </AuthenticatedLayout>
    );
}
