import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";

export default function CreateAgenda({ auth }) {
    const title = "Input Buku Agenda Penerimaan Contoh";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-4">
                <BackButton href={route("lab.pra-analisa.index")} />
            </div>
        </AuthenticatedLayout>
    );
}
