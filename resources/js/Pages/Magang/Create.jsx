import BackButton from "@/Components/BackButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateForm from "./Partials/CreateForm";

export default function CreateMagang({ auth, students }) {
    const title = "Tambah Magang";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-6">
                <BackButton href={route("magang.index")} />

                <CreateForm students={students} />
            </div>
        </AuthenticatedLayout>
    );
}
