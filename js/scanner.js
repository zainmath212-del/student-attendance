// =====================================
// QR SCANNER
// =====================================

let html5QrCode;

let scanning = false;

function startScanner() {

    html5QrCode = new Html5Qrcode("reader");

    Html5Qrcode.getCameras().then(cameras => {

        if (!cameras || cameras.length == 0) {

            document.getElementById("message").innerHTML =
                "❌ Kamera tidak ditemukan.";

            return;

        }

        html5QrCode.start(

            cameras[0].id,

            {
                fps: 10,
                qrbox: {
                    width: 250,
                    height: 250
                }
            },

            onScanSuccess

        );

    });

}

async function onScanSuccess(decodedText) {

    if (scanning) return;

    scanning = true;

    document.getElementById("message").innerHTML =
        "⏳ Mengirim data...";

    try {

        const hasil = await sendAttendance(decodedText);

        showResult(hasil);

    } catch (e) {

        showResult({
            success: false,
            message: "Terjadi kesalahan."
        });

    }

    setTimeout(() => {

        scanning = false;

        document.getElementById("message").innerHTML =
            "📷 Scanner Ready...";

    }, 2000);

}
