import BackButton from "@/Components/BackButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function EditKemitraan({ auth }) {
    const title = "Edit Kemitraan";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-6">
                <BackButton href={route("kemitraan.index")} />
            </div>
        </AuthenticatedLayout>
    );
}
