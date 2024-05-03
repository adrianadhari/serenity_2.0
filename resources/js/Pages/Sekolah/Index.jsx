import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ButtonDropdown from "@/Components/ButtonDropdown";
import { useRef } from "react";
import { useMountEffect } from "primereact/hooks";
import { Toast } from "primereact/toast";
import SchoolsTable from "./Partials/SchoolsTable";

export default function Sekolah({ auth, flash, schools }) {
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
        <AuthenticatedLayout user={auth.user} titlePage="Sekolah">
            <Head title="Sekolah" />

            <div className="pb-12">
                <Toast ref={toast} />

                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between flex-wrap gap-2 py-8">
                        <Link
                            href={route("sekolah.create")}
                            className="justify-center flex items-center px-4 py-2 font-medium leading-5 text-white transition-colors duration-150 bg-rose-600 border border-transparent rounded-lg active:bg-rose-600 hover:bg-rose-700 focus:outline-none focus:shadow-outline-rose ease-in-out"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 mr-2 -ml-1"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                            </svg>
                            <span>Tambah Data</span>
                        </Link>

                        <div className="flex flex-col md:flex-row md:items-center gap-2">
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
                                        <button className="w-full text-start">
                                            Upload File
                                        </button>
                                    </ButtonDropdown.Link>
                                    <ButtonDropdown.Link>
                                        <button className="w-full text-start">
                                            Download Format
                                        </button>
                                    </ButtonDropdown.Link>
                                </ButtonDropdown.Content>
                            </ButtonDropdown>

                            <ButtonDropdown>
                                <ButtonDropdown.Trigger>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 mr-2 -ml-1"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19ZM13 9V16H11V9H6L12 3L18 9H13Z"></path>
                                    </svg>
                                    <span>Export Data</span>
                                </ButtonDropdown.Trigger>
                                <ButtonDropdown.Content>
                                    <ButtonDropdown.Link>
                                        <button className="w-full text-start">
                                            Excel
                                        </button>
                                    </ButtonDropdown.Link>
                                    <ButtonDropdown.Link>
                                        <button className="w-full text-start">
                                            PDF
                                        </button>
                                    </ButtonDropdown.Link>
                                </ButtonDropdown.Content>
                            </ButtonDropdown>
                        </div>
                    </div>

                    <SchoolsTable schools={schools} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
