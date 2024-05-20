import HeaderIndex from "@/Components/HeaderIndex";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useMountEffect } from "primereact/hooks";
import { Toast } from "primereact/toast";
import { useRef, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Spinner from "@/Components/Spinner";
import PrimaryButton from "@/Components/PrimaryButton";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export default function UserIndex({ auth, flash, users }) {
    const [datas, setDatas] = useState(null);
    const [deleteDataModal, setDeleteDataModal] = useState(false);
    const [data, setData] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);

    const title = "Daftar User";

    const toast = useRef(null);

    useEffect(() => {
        setDatas(users);
    }, []);

    const confirmDeleteData = (data) => {
        setData(data);
        setDeleteDataModal(true);
    };

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

    const actionBodyTemplate = (rowData) => {
        return (
            <button
                onClick={() => confirmDeleteData(rowData)}
                className="p-2 btn-danger"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                </svg>
            </button>
        );
    };

    const header = (
        <div className="flex items-center justify-end">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 mr-2"
                fill="currentColor"
            >
                <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
            </svg>
            <InputText
                onInput={(e) => setGlobalFilter(e.target.value)}
                placeholder="Cari..."
                className="border-0 bg-transparent border-b pl-0 focus:ring-0 focus:border-black lg:w-1/4 w-full"
            />
        </div>
    );

    const { delete: destroy, processing } = useForm();

    const deleteUser = (e) => {
        e.preventDefault();
        let users = datas.filter((val) => val.id !== data.id);

        destroy(route("user.destroy", data.id), {
            preserveScroll: true,
            onSuccess: () => setDeleteDataModal(false),
            onFinish: () => {
                setDatas(users);
                toast.current.show({
                    severity: "success",
                    summary: "User Berhasil Dihapus",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="pb-12">
                <Toast ref={toast} />

                <div className="max-w-7xl mx-auto">
                    <HeaderIndex link={route("register")} />

                    <div className="card shadow-lg">
                        <DataTable
                            value={datas}
                            paginator
                            rows={10}
                            globalFilter={globalFilter}
                            rowsPerPageOptions={[10, 25, 50, 100]}
                            header={header}
                            emptyMessage="Tidak ada data."
                            stripedRows
                            removableSort
                            currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} user"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                        >
                            <Column sortable field="name" header="Nama" />
                            <Column
                                sortable
                                field="username"
                                header="Username"
                            />
                            <Column sortable field="role" header="Role" />
                            <Column body={actionBodyTemplate} />
                        </DataTable>
                    </div>

                    <Dialog
                        header="Hapus Data"
                        visible={deleteDataModal}
                        onHide={() => setDeleteDataModal(false)}
                        draggable={false}
                        className="md:w-1/2"
                    >
                        {data && (
                            <form
                                onSubmit={deleteUser}
                                className="flex flex-col items-center gap-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="rgba(255,0,0,1)"
                                    className="w-24"
                                >
                                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path>
                                </svg>

                                <p className="font-medium text-lg">
                                    Anda yakin ingin menghapus data{" "}
                                    <span className="font-semibold">
                                        {data.username}
                                    </span>
                                    ?
                                </p>

                                <div className="flex items-center">
                                    <PrimaryButton
                                        className="mt-2 px-4 py-2 btn-danger"
                                        disabled={processing}
                                    >
                                        Ya, Hapus
                                        <Spinner isLoading={processing} />
                                    </PrimaryButton>
                                </div>
                            </form>
                        )}
                    </Dialog>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
