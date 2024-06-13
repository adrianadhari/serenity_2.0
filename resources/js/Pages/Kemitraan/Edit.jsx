import BackButton from "@/Components/BackButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import EditForm from "./Partials/EditForm";
import { PartnershipProvider } from "./context/PartnershipContext";

export default function EditKemitraan({
    auth,
    kategori,
    status,
    partnership,
    institutions,
}) {
    const title = "Edit Kemitraan";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <PartnershipProvider>
                <div className="py-6">
                    <BackButton href={route("kemitraan.index")} />

                    <EditForm
                        kategoriOption={kategori}
                        statusOption={status}
                        partnership={partnership}
                        institutionOption={institutions}
                    />
                </div>
            </PartnershipProvider>
        </AuthenticatedLayout>
    );
}
