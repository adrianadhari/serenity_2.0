import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { StudentProvider } from "./context/StudentContext";
import BackButton from "@/Components/BackButton";
import EditForm from "./Partials/EditForm";

export default function EditStudents({
    auth,
    studentDetail,
    gender,
    schools_name,
}) {
    const title = "Edit Siswa";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <StudentProvider>
                <div className="py-4">
                    <BackButton href={route("siswa.index")} />

                    <EditForm
                        studentDetail={studentDetail}
                        schools_name={schools_name}
                        gender={gender}
                    />
                </div>
            </StudentProvider>
        </AuthenticatedLayout>
    );
}
