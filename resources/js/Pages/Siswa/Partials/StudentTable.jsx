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

export default function StudentTable({ students }) {
    const [dataStudents, setDataStudents] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [detailDataModal, setDetailDataModal] = useState(false);
    const [historyActivityModal, sethistoryActivityModal] = useState(false);
    const [detailStudent, setDetailStudent] = useState(null);
    const [selectedDatas, setSelectedDatas] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        setDataStudents(students);
    }, [students]);

    const confirmDeleteSelected = () => {
        setDeleteModal(true);
    };

    const confirmDetailData = (data) => {
        setDetailStudent(data);
        setDetailDataModal(true);
    };

    const confirmHistoryData = (data) => {
        setDetailStudent(data);
        sethistoryActivityModal(true);
    };

    const { setData, post, processing } = useForm({
        codes: [],
    });

    const deleteStudents = (e) => {
        e.preventDefault();

        post(route("siswa.multipleDelete"), {
            preserveScroll: true,
            onSuccess: () => setDeleteModal(false),
            onFinish: () => {
                setSelectedDatas(null);
                toast.current.show({
                    severity: "success",
                    summary: "Siswa Berhasil Dihapus",
                });
            },
        });
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-1">
                <button
                    onClick={() => confirmHistoryData(rowData)}
                    className="p-2 btn-danger"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path>
                    </svg>
                </button>

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
                    href={route("siswa.edit", rowData.kode_siswa)}
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
            e.value.map((item) => item.kode_siswa)
        );
    };

    return (
        <>
            <Toast ref={toast} />

            <div className="card shadow-lg">
                <DataTable
                    value={dataStudents}
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
                    currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} siswa"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                >
                    <Column selectionMode="multiple" />
                    <Column sortable field="kode_siswa" header="Kode Siswa" />
                    <Column sortable field="nama_siswa" header="Nama Siswa" />
                    <Column sortable field="nis" header="NIS Siswa" />
                    <Column
                        sortable
                        field="school.nama_sekolah"
                        header="Sekolah"
                    />
                    <Column body={actionBodyTemplate} />
                </DataTable>
            </div>

            <Dialog
                header="Detail Siswa"
                visible={detailDataModal}
                onHide={() => setDetailDataModal(false)}
                draggable={false}
                className="md:w-1/2"
            >
                {detailStudent && (
                    <>
                        <table className="table-auto mb-4">
                            <tbody>
                                <tr>
                                    <td className="font-bold">Kode Siswa</td>
                                    <td className="p-2">:</td>
                                    <td className="p-2">
                                        {detailStudent.kode_siswa}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Nama Siswa</td>
                                    <td className="p-2">:</td>
                                    <td className="p-2">
                                        {detailStudent.nama_siswa}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold">NIS Siswa</td>
                                    <td className="p-2">:</td>
                                    <td className="p-2">{detailStudent.nis}</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Jenis Kelamin</td>
                                    <td className="p-2">:</td>
                                    <td className="p-2">
                                        {detailStudent.jenis_kelamin}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Email</td>
                                    <td className="p-2">:</td>
                                    <td className="p-2">
                                        {detailStudent.email}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Nomor Telepon</td>
                                    <td className="p-2">:</td>
                                    <td className="p-2">
                                        {detailStudent.telp}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Nama Wali</td>
                                    <td className="p-2">:</td>
                                    <td className="p-2">
                                        {detailStudent.nama_wali}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Keterangan</td>
                                    <td className="p-2">:</td>
                                    <td className="p-2">
                                        {detailStudent.keterangan}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold">
                                        Tanggal Registrasi
                                    </td>
                                    <td className="p-2">:</td>
                                    <td className="p-2">
                                        {moment(
                                            detailStudent.created_at
                                        ).format("D/MM/YYYY")}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <details className="collapse collapse-arrow bg-gray-100">
                            <summary className="collapse-title text-lg font-semibold">
                                Data Sekolah
                            </summary>
                            <table className="table-auto mx-4 mb-4">
                                <tbody>
                                    <tr>
                                        <td className="font-bold">
                                            Kode Sekolah
                                        </td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {detailStudent.school.kode_sekolah}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">
                                            Nama Sekolah
                                        </td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {detailStudent.school.nama_sekolah}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">
                                            Kategori Sekolah
                                        </td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {
                                                detailStudent.school
                                                    .kategori_sekolah
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">
                                            Jenis Sekolah
                                        </td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {detailStudent.school.jenis_sekolah}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">
                                            Tipe Sekolah
                                        </td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {detailStudent.school.tipe_sekolah}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">
                                            Alamat Sekolah
                                        </td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {
                                                detailStudent.school
                                                    .alamat_sekolah
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Provinsi</td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {detailStudent.school.provinsi}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Kota</td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {detailStudent.school.kota}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">
                                            Nama Kontak
                                        </td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {detailStudent.school.nama_kontak}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">
                                            Nomor Telepon
                                        </td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {detailStudent.school.telp}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Email</td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {detailStudent.school.email}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </details>
                    </>
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
                            onClick={deleteStudents}
                        >
                            Ya, Hapus
                            <Spinner isLoading={processing} />
                        </PrimaryButton>
                    </div>
                </div>
            </Dialog>

            <Dialog
                header="Kegiatan yang diikuti"
                visible={historyActivityModal}
                onHide={() => sethistoryActivityModal(false)}
                draggable={false}
                className="md:w-1/2"
            >
                {detailStudent &&
                    detailStudent.peserta_kegiatans.map((item, index) => (
                        <details
                            className="collapse collapse-arrow bg-gray-100 mb-4"
                            key={index}
                        >
                            <summary className="collapse-title text-lg font-semibold">
                                {item.kegiatan.judul_kegiatan}
                            </summary>
                            <table className="table-auto mx-4 mb-4">
                                <tbody>
                                    <tr>
                                        <td className="font-bold">
                                            Kode Kegiatan
                                        </td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">{item.kode}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">
                                            Judul Kegiatan
                                        </td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {item.kegiatan.judul_kegiatan}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">
                                            Jenis Kegiatan
                                        </td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {item.kegiatan.jenis_kegiatan}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">
                                            Jenis Flagship
                                        </td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {item.kegiatan.jenis_flagship}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">
                                            Narasumber
                                        </td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {item.kegiatan.narasumber}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Jadwal</td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">{`${moment(
                                            item.kegiatan.jadwal_mulai
                                        ).format("D/MM/YYYY h:mm")} - ${moment(
                                            item.kegiatan.jadwal_selesai
                                        ).format("D/MM/YYYY h:mm")}`}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Materi</td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {item.kegiatan.materi}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Link</td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            <a
                                                href={item.kegiatan.link}
                                                className="underline text-blue-500"
                                                target="_blank"
                                            >
                                                {item.kegiatan.link}
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Lokasi</td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {item.kegiatan.lokasi}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">
                                            Min. Score
                                        </td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {item.kegiatan.min_score}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Moda</td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {item.kegiatan.moda}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Semester</td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {item.kegiatan.semester}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Status</td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {item.kegiatan.status}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">
                                            Target Peserta
                                        </td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {item.kegiatan.target_peserta}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">
                                            Template Sertifikat
                                        </td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {item.kegiatan.sertifikat ? (
                                                <a
                                                    target="__blank"
                                                    className="text-sm text-blue-500 underline"
                                                    href={`storage/sertifikat-kegiatan/${item.kegiatan.sertifikat}`}
                                                >
                                                    Lihat File
                                                </a>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Tentang</td>
                                        <td className="p-2">:</td>
                                        <td className="p-2">
                                            {item.kegiatan.tentang}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </details>
                    ))}
            </Dialog>
        </>
    );
}
