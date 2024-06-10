import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import { PelangganProvider } from "./context/PelangganContext";
import CreateForm from "./Partials/CreateForm";

export default function CreatePelanggan({ auth, gender, agency }) {
    const title = "Tambah Pelanggan";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <PelangganProvider>
                <div className="py-4">
                    <BackButton href={route("lab.pelanggan.index")} />

                    <CreateForm gender={gender} agency={agency} />
                </div>
            </PelangganProvider>
        </AuthenticatedLayout>
    );
}
