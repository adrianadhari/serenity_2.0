import BackButton from "@/Components/BackButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateForm from "./Partials/CreateForm";
import { PartnershipProvider } from "./context/PartnershipContext";

export default function CreateKemitraan({
    auth,
    status,
    kategori,
    institutions,
}) {
    const title = "Tambah Kemitraan";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <PartnershipProvider>
                <div className="py-6">
                    <BackButton href={route("kemitraan.index")} />

                    <CreateForm
                        statusOption={status}
                        kategoriOption={kategori}
                        institutionOption={institutions}
                    />
                </div>
            </PartnershipProvider>
        </AuthenticatedLayout>
    );
}
