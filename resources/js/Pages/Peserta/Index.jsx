import ButtonDropdown from "@/Components/ButtonDropdown";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useMountEffect } from "primereact/hooks";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import ParticipantsTable from "./Partials/ParticipantsTable";
import HeaderIndex from "@/Components/HeaderIndex";

export default function Peserta({ auth, flash, participants }) {
    const title = "Peserta";

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
                    <HeaderIndex link={route("peserta.create")}>
                        <ButtonDropdown>
                            <ButtonDropdown.Trigger>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 mr-2 -ml-1"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M13 10H18L12 16L6 10H11V3H13V10ZM4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19Z"></path>
                                </svg>
                                <span>Import Data</span>
                            </ButtonDropdown.Trigger>
                            <ButtonDropdown.Content>
                                <ButtonDropdown.Link>
                                    <button
                                        className="w-full text-start"
                                        onClick={() => setImportModal(true)}
                                    >
                                        Upload File
                                    </button>
                                </ButtonDropdown.Link>
                                <ButtonDropdown.Link>
                                    <Link
                                        href={route("peserta.downloadTemplate")}
                                    >
                                        Download Format
                                    </Link>
                                </ButtonDropdown.Link>
                            </ButtonDropdown.Content>
                        </ButtonDropdown>

                        <Link
                            href={route("peserta.export")}
                            className="justify-center flex items-center px-4 py-2 btn-primary"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 mr-2 -ml-1"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19ZM13 9V16H11V9H6L12 3L18 9H13Z"></path>
                            </svg>
                            <span>Export Data</span>
                        </Link>
                    </HeaderIndex>

                    <ParticipantsTable participants={participants} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
