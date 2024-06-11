import HeaderIndex from "@/Components/HeaderIndex";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMountEffect } from "primereact/hooks";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import TrainingTable from "./Partials/TrainingTable";
import AddEmployee from "@/Components/AddEmployee";

export default function Pelatihan({ auth, flash, trainings }) {
    const title = "Pelatihan Pegawai";

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
                            <HeaderIndex
                                link={route("pelatihan.create")}
                            ></HeaderIndex>
                            <AddEmployee
                                link={route("pegawai.create")}
                            ></AddEmployee>
                        </div>
                        <TrainingTable trainings={trainings} />
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
