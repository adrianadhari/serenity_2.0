import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import ButtonDropdown from "@/Components/ButtonDropdown";
import { useRef, useState, useEffect } from "react";
import { useMountEffect } from "primereact/hooks";
import { Toast } from "primereact/toast";
import SchoolsTable from "./Partials/SchoolsTable";
import { Dialog } from "primereact/dialog";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";

export default function Sekolah({ auth, flash, schools }) {
    const [importModal, setImportModal] = useState(false);
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

    const { setData, post, processing, errors } = useForm({
        file: null,
    });

    const uploadFile = async (e) => {
        e.preventDefault();

        post(route("sekolah.import"), {
            preserveScroll: true,
            onSuccess: () => setImportModal(false),
            onFinish: () => {
                toast.current.show({
                    severity: "success",
                    summary: "Sekolah Berhasil Diimport!",
                });
            },
        });
    };

    return (
        <>
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
                                            <button
                                                className="w-full text-start"
                                                onClick={() =>
                                                    setImportModal(true)
                                                }
                                            >
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
                                            <Link
                                                href={route("sekolah.export")}
                                                className="w-full text-start"
                                            >
                                                Excel
                                            </Link>
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

            <Dialog
                header="Import File"
                visible={importModal}
                onHide={() => setImportModal(false)}
                draggable={false}
                className="md:w-1/2"
            >
                <form
                    onSubmit={uploadFile}
                    className="flex items-center justify-between flex-col lg:flex-row gap-2 mt-2"
                >
                    <input
                        required
                        type="file"
                        className="file-input file-input-bordered w-full"
                        onChange={(e) => setData("file", e.target.files[0])}
                    />

                    <div className="flex justify-end">
                        <DangerButton disabled={processing}>
                            Upload File
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${
                                    processing ? "" : "hidden"
                                } animate-spin h-5 w-5 ml-2`}
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path>
                            </svg>
                        </DangerButton>
                    </div>
                </form>
                <InputError message={errors.file} />
            </Dialog>
        </>
    );
}
