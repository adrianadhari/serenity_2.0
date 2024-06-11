import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import { PegawaiProvider } from "./context/PegawaiContext";
import CreateForm from "./Partials/CreateForm";

export default function CreatePelanggan({ auth, gender, pendidikan }) {
    const title = "Tambah Pegawai";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <PegawaiProvider>
                <div className="py-4">
                    <BackButton href={route("lab.pegawai.index")} />

                    <CreateForm gender={gender} pendidikan={pendidikan} />
                </div>
            </PegawaiProvider>
        </AuthenticatedLayout>
    );
}
