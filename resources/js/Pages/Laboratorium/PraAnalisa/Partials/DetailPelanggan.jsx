export default function DetailPelanggan({ pelanggan }) {
    let { kode, instansi, nama_instansi, nama_pelanggan, alamat, telp, email } =
        pelanggan;

    return (
        <div className="overflow-x-auto form-card mt-4">
            <p className="font-bold text-2xl underline text-center mb-4">
                Profil Pelanggan & Instansi
            </p>

            <table className="table table-zebra">
                <tbody>
                    <tr>
                        <td className="font-bold">Kode Pelanggan</td>
                        <td>{kode}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Instansi</td>
                        <td>{instansi}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Nama Instansi</td>
                        <td>{nama_instansi}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Nama Pelanggan</td>
                        <td>{nama_pelanggan}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">No. Telp</td>
                        <td>{telp}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Email</td>
                        <td>{email}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Alamat</td>
                        <td>{alamat}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
