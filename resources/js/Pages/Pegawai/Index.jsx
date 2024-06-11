import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMountEffect } from "primereact/hooks";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import EmployeeTable from "./Partials/EmployeeTable";
import BackButton from "@/Components/BackButton";

export default function Pegawai({ auth, flash, employees }) {
    const title = "Peserta Pelatihan";

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
        <>
            <AuthenticatedLayout user={auth.user} titlePage={title}>
                <Head title={title} />

                <div className="pb-12">
                    <Toast ref={toast} />

                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center space-x-4">
                            <BackButton href={route("pelatihan.index")} />
                        </div>

                        <EmployeeTable employees={employees} />
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
