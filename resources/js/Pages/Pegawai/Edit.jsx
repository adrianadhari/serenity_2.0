import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import EditForm from "./Partials/EditForm";

export default function EditEmployee({ auth, employeeDetail }) {
    const title = "Edit Peserta";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-4">
                <BackButton
                    href={route("pegawai.show", {
                        id: employeeDetail.training_id,
                    })}
                />

                <EditForm employeeDetail={employeeDetail} />
            </div>
        </AuthenticatedLayout>
    );
}
