// =====================================
// UI.JS
// =====================================

function showResult(data) {

    const nama = document.getElementById("nama");
    const kelas = document.getElementById("kelas");
    const status = document.getElementById("status");
    const ket = document.getElementById("keterangan");

    if (!data.success) {

        nama.innerHTML = "❌ Gagal";
        kelas.innerHTML = "-";
        status.innerHTML = "-";
        ket.innerHTML = data.message || "Terjadi kesalahan.";

        return;
    }

    // Nama
    nama.innerHTML = "👤 <b>" + data.nama + "</b>";

    // Kelas
    kelas.innerHTML = "🏫 Grade " + data.kelas;

    // Status
    if (data.status === "Hadir") {

        status.innerHTML = "🟢 Hadir";

    } else if (data.status === "Terlambat") {

        status.innerHTML = "🟠 Terlambat";

    } else {

        status.innerHTML = "🔴 " + data.status;

    }

    // Keterangan
    ket.innerHTML = "✔ " + data.message;

}
