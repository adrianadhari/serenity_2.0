import BackButton from "@/Components/BackButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import EditForm from "./Partials/EditForm";

export default function EditMagang({ auth, students, internDetail }) {
    const title = "Edit Magang";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-6">
                <BackButton href={route("magang.index")} />

                <EditForm students={students} internDetail={internDetail} />
            </div>
        </AuthenticatedLayout>
    );
}
