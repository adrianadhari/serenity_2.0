import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { TeacherProvider } from "./context/GuruContext";
import BackButton from "@/Components/BackButton";
import EditForm from "./Partials/EditForm";

export default function EditGuru({
    auth,
    gender,
    pendidikan,
    schools_name,
    teacherDetail,
}) {
    const title = "Edit Guru";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <TeacherProvider>
                <div className="py-4">
                    <BackButton href={route("guru.index")} />

                    <EditForm
                        gender={gender}
                        pendidikan_option={pendidikan}
                        schools_name={schools_name}
                        teacherDetail={teacherDetail}
                    />
                </div>
            </TeacherProvider>
        </AuthenticatedLayout>
    );
}
