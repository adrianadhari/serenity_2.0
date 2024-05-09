import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import { SchoolProvider } from "./context/SchoolContext";
import EditForm from "./Partials/EditForm";
import BackButton from "@/Components/BackButton";

export default function EditSekolah({
    auth,
    schoolDetail,
    school,
    schoolCategory,
    schoolType,
}) {
    const title = "Edit Sekolah";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <SchoolProvider>
                <div className="py-4">
                    <BackButton href={route("sekolah.index")} />

                    <EditForm
                        schoolDetail={schoolDetail}
                        school={school}
                        schoolCategory={schoolCategory}
                        schoolType={schoolType}
                    />
                </div>
            </SchoolProvider>
        </AuthenticatedLayout>
    );
}
