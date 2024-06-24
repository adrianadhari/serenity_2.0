import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import SppcForm from "./Partials/SppcForm";

export default function CreateSppc({ auth, id }) {
    const title = "Input Surat Permohonan Pemeriksaan Contoh";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-4">
                <BackButton href={route("lab.pra-analisa.show", id)} />

                <SppcForm id={id} />
            </div>
        </AuthenticatedLayout>
    );
}
