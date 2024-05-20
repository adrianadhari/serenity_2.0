import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import BackButton from "@/Components/BackButton";
import { TeacherProvider } from "./context/GuruContext";
import CreateForm from "./Partials/CreateForm";

export default function CreateGuru({ auth, gender, pendidikan, schools_name }) {
    const title = "Tambah Guru";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <TeacherProvider>
                <div className="py-4">
                    <BackButton href={route("guru.index")} />

                    <CreateForm
                        gender={gender}
                        pendidikan={pendidikan}
                        schools_name={schools_name}
                    />
                </div>
            </TeacherProvider>
        </AuthenticatedLayout>
    );
}
