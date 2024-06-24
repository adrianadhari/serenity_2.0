import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import AgendaForm from "./Partials/AgendaForm";

export default function CreateAgenda({ auth, id }) {
    const title = "Input Buku Agenda Penerimaan Contoh";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-4">
                <BackButton href={route("lab.pra-analisa.show", id)} />

                <AgendaForm id={id} />
            </div>
        </AuthenticatedLayout>
    );
}
