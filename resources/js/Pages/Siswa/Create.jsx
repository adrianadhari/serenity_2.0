import BackButton from "@/Components/BackButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { StudentProvider } from "./context/StudentContext";
import CreateForm from "./Partials/CreateForm";

export default function CreateStudents({ auth, gender, schools_name }) {
    const title = "Tambah Siswa";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <StudentProvider>
                <div className="py-4">
                    <BackButton href={route("siswa.index")} />

                    <CreateForm
                        jenis_kelamin={gender}
                        schools_name={schools_name}
                    />
                </div>
            </StudentProvider>
        </AuthenticatedLayout>
    );
}
