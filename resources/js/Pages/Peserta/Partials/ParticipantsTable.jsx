import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Link, useForm } from "@inertiajs/react";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import Spinner from "@/Components/Spinner";
import PrimaryButton from "@/Components/PrimaryButton";
import moment from "moment";

export default function ParticipantsTable({ participants }) {
    const [dataParticipants, setDataParticipants] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [detailDataModal, setDetailDataModal] = useState(false);
    const [detailParticipant, setDetailParticipant] = useState(null);
    const [selectedDatas, setSelectedDatas] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        setDataParticipants(participants);
    }, [participants]);

    const confirmDeleteSelected = () => {
        setDeleteModal(true);
    };

    const confirmDetailData = (data) => {
        setDetailParticipant(data);
        setDetailDataModal(true);
    };

    const { setData, post, processing } = useForm({
        codes: [],
    });

    const deleteParticipant = (e) => {
        e.preventDefault();

        post(route("peserta.multipleDelete"), {
            preserveScroll: true,
            onSuccess: () => setDeleteModal(false),
            onFinish: () => {
                setSelectedDatas(null);
                toast.current.show({
                    severity: "success",
                    summary: "Peserta Berhasil Dihapus",
                });
            },
        });
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-1">
                <button
                    onClick={() => confirmDetailData(rowData)}
                    className="p-2 btn-info"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                    </svg>
                </button>

                <Link
                    href={route("peserta.edit", rowData.kode_peserta)}
                    className="p-2 btn-success"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
                    </svg>
                </Link>
            </div>
        );
    };

    const header = (
        <div
            className={`${
                !selectedDatas || !selectedDatas.length
                    ? "justify-end flex"
                    : "justify-between flex"
            } items-center flex-wrap gap-4`}
        >
            <button
                onClick={confirmDeleteSelected}
                className={`${
                    !selectedDatas || !selectedDatas.length ? "hidden" : "flex"
                } items-center gap-2 py-2 order-2 lg:order-1 lg:w-1/6 w-full justify-center btn-danger`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                </svg>
                Hapus Data
            </button>

            <div className="flex items-center order-1 lg:order-2">
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
                    className="border-0 bg-transparent border-b pl-0 focus:ring-0 focus:border-black w-full"
                />
            </div>
        </div>
    );

    const onSelectionChange = (e) => {
        setSelectedDatas(e.value);
        setData(
            "codes",
            e.value.map((item) => item.kode_peserta)
        );
    };

    return (
        <>
            <Toast ref={toast} />

            <div className="card shadow-lg">
                <DataTable
                    value={dataParticipants}
                    paginator
                    rows={10}
                    globalFilter={globalFilter}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    header={header}
                    emptyMessage="Tidak ada data."
                    stripedRows
                    removableSort
                    selection={selectedDatas}
                    onSelectionChange={onSelectionChange}
                    currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} peserta"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                >
                    <Column selectionMode="multiple" />
                    <Column
                        sortable
                        field="kode_peserta"
                        header="Kode Peserta"
                    />
                    <Column
                        sortable
                        field="tipe_peserta"
                        header="Tipe Peserta"
                    />
                    <Column
                        sortable
                        field="nama_peserta"
                        header="Nama Peserta"
                    />
                    <Column
                        sortable
                        field="institution.nama"
                        header="Institusi"
                    />
                    <Column sortable field="jabatan" header="Jabatan" />
                    <Column body={actionBodyTemplate} />
                </DataTable>
            </div>

            <Dialog
                header="Detail Peserta"
                visible={detailDataModal}
                onHide={() => setDetailDataModal(false)}
                draggable={false}
                className="md:w-1/2"
            >
                {detailParticipant && (
                    <table className="table-auto">
                        <tbody>
                            <tr>
                                <td className="font-bold">Kode Peserta</td>
                                <td className="p-2">:</td>
                                <td className="p-2">
                                    {detailParticipant.kode_peserta}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-bold">Nama Peserta</td>
                                <td className="p-2">:</td>
                                <td className="p-2">
                                    {detailParticipant.nama_peserta}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-bold">Tipe Peserta</td>
                                <td className="p-2">:</td>
                                <td className="p-2">
                                    {detailParticipant.tipe_peserta}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-bold">Institusi</td>
                                <td className="p-2">:</td>
                                <td className="p-2">
                                    {detailParticipant.institution.nama}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-bold">Email</td>
                                <td className="p-2">:</td>
                                <td className="p-2">
                                    {detailParticipant.email}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-bold">Telp</td>
                                <td className="p-2">:</td>
                                <td className="p-2">
                                    {detailParticipant.telp}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-bold">Jabatan</td>
                                <td className="p-2">:</td>
                                <td className="p-2">
                                    {detailParticipant.jabatan}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-bold">Pendidikan</td>
                                <td className="p-2">:</td>
                                <td className="p-2">
                                    {detailParticipant.pendidikan}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-bold">Jenis Kelamin</td>
                                <td className="p-2">:</td>
                                <td className="p-2">
                                    {detailParticipant.jenis_kelamin}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-bold">
                                    Tanggal Registrasi
                                </td>
                                <td className="p-2">:</td>
                                <td className="p-2">
                                    {moment(
                                        detailParticipant.created_at
                                    ).format("D/MM/YYYY")}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </Dialog>

            <Dialog
                header="Hapus Data Terpilih"
                visible={deleteModal}
                onHide={() => setDeleteModal(false)}
                draggable={false}
            >
                <div className="flex flex-col items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="rgba(255,0,0,1)"
                        className="w-24"
                    >
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path>
                    </svg>
                    <p className="font-medium text-lg">
                        Anda yakin ingin menghapus data yang dipilih?
                    </p>
                    <div className="flex items-center">
                        <PrimaryButton
                            className="mt-2 px-4 py-2 btn-danger"
                            disabled={processing}
                            onClick={deleteParticipant}
                        >
                            Ya, Hapus
                            <Spinner isLoading={processing} />
                        </PrimaryButton>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
