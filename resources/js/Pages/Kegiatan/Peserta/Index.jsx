import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useMountEffect } from "primereact/hooks";
import PesertaKegiatanTable from "./PesertaKegiatanTable";

export default function KegiatanAktif({ auth, activities, flash }) {
    const title = "Kegiatan Aktif";

    const toast = useRef(null);

    useMountEffect(() => {
        if (flash.message) {
            toast.current.show([
                {
                    severity: "success",
                    summary: flash.message,
                },
            ]);
        }
    });

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-12">
                <Toast ref={toast} />

                <div className="max-w-7xl mx-auto">
                    <PesertaKegiatanTable activities={activities} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
