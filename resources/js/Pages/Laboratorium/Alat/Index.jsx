import HeaderIndex from "@/Components/HeaderIndex";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useMountEffect } from "primereact/hooks";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import ToolTable from "./Partials/ToolTable";

export default function Alat({ auth, flash, tools }) {
    const title = "Alat Laboratorium";

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
                        <HeaderIndex
                            link={route("lab.alat.create")}
                        ></HeaderIndex>

                        <ToolTable tools={tools} />
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
