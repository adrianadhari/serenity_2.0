import HeaderIndex from "@/Components/HeaderIndex";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import KegiatanTable from "./Partials/KegiatanTable";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useMountEffect } from "primereact/hooks";

export default function Kegiatan({ auth, activities, flash }) {
    const title = "Kegiatan";

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

            <div className="pb-12">
                <Toast ref={toast} />

                <div className="max-w-7xl mx-auto">
                    <HeaderIndex link={route("kegiatan.create")} />

                    <KegiatanTable activities={activities} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
