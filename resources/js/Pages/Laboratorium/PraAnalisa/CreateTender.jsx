import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import TenderForm from "./Partials/TenderForm";

export default function CreateTender({ auth, id }) {
    const title = "Input Kaji Ulang Permintaan, Tender, dan Kontrak";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-4">
                <BackButton href={route("lab.pra-analisa.show", id)} />

                <TenderForm id={id} />
            </div>
        </AuthenticatedLayout>
    );
}
