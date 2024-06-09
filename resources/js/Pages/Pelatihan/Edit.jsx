import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import EditForm from "./Partials/EditForm";

export default function EditTraining({ auth, trainingDetail }) {
    const title = "Edit Pelatihan";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-4">
                <BackButton href={route("pelatihan.index")} />

                <EditForm trainingDetail={trainingDetail} />
            </div>
        </AuthenticatedLayout>
    );
}
