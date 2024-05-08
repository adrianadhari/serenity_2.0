import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import CreateForm from "./Partials/CreateForm";
import { SchoolProvider } from "./context/SchoolContext";
import BackButton from "@/Components/BackButton";

export default function CreateSekolah({
    auth,
    school,
    schoolCategory,
    schoolType,
}) {
    const title = "Tambah Sekolah";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <SchoolProvider>
                <div className="py-4">
                    <BackButton href={route("sekolah.index")} />

                    <CreateForm
                        school={school}
                        schoolCategory={schoolCategory}
                        schoolType={schoolType}
                    />
                </div>
            </SchoolProvider>
        </AuthenticatedLayout>
    );
}
