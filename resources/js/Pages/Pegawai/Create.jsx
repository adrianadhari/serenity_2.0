import BackButton from "@/Components/BackButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateForm from "./Partials/CreateForm";
import { EmployeeProvider } from "./context/EmployeeContext";

export default function CreatePelatihan({ auth, nama_pelatihan }) {
    const title = "Tambah Pegawai";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />
            <EmployeeProvider>
                <div className="py-4">
                    <BackButton href={route("pelatihan.index")} />

                    <CreateForm nama_pelatihan={nama_pelatihan} />
                </div>
            </EmployeeProvider>
        </AuthenticatedLayout>
    );
}
