import BackButton from "@/Components/BackButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateForm from "./Partials/CreateForm";

export default function CreatePelatihan({ auth }) {
    const title = "Tambah Pelatihan Pegawai";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-4">
                <BackButton href={route("pelatihan.index")} />

                <CreateForm />
            </div>
        </AuthenticatedLayout>
    );
}
