import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ToolProvider } from "./context/ToolContext";
import BackButton from "@/Components/BackButton";
import EditForm from "./Partials/EditForm";

export default function EditTools({
    auth,
    toolDetail,
    kategori_alat,
    sumber_dana,
    status_bmn,
}) {
    const title = "Edit Alat";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <ToolProvider>
                <div className="py-4">
                    <BackButton href={route("lab.alat.index")} />

                    <EditForm
                        toolDetail={toolDetail}
                        kategori_alats={kategori_alat}
                        status_bmns={status_bmn}
                        sumber_danas={sumber_dana}
                    />
                </div>
            </ToolProvider>
        </AuthenticatedLayout>
    );
}
