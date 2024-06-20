import BackButton from "@/Components/BackButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ToolProvider } from "./context/ToolContext";
import CreateForm from "./Partials/CreateForm";

export default function CreateTools({
    auth,
    kategori_alat,
    status_bmn,
    sumber_dana,
}) {
    const title = "Tambah Alat";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <ToolProvider>
                <div className="py-4">
                    <BackButton href={route("lab.alat.index")} />

                    <CreateForm
                        kategori_alat={kategori_alat}
                        status_bmn={status_bmn}
                        sumber_dana={sumber_dana}
                    />
                </div>
            </ToolProvider>
        </AuthenticatedLayout>
    );
}
