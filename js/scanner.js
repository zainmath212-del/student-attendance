// =====================================
// SCANNER.JS
// Student Attendance v2.0
// =====================================

let html5QrCode = null;
let cameras = [];
let currentCamera = 0;
let isProcessing = false;

// ===============================
// MULAI SCANNER
// ===============================
async function startScanner() {

    try {

        html5QrCode = new Html5QrCode("reader");

        cameras = await Html5QrCode.getCameras();

        if (!cameras || cameras.length === 0) {

            setMessage("❌ Kamera tidak ditemukan", "error");
            return;

        }

        // Mulai selalu dari kamera belakang
        currentCamera = 0;

        await startCamera();

    } catch (err) {

        console.error(err);

        setMessage("❌ Gagal mengakses kamera", "error");

    }

}

// ===============================
// START CAMERA
// ===============================
async function startCamera() {

    try {

        if (html5QrCode) {

            try {
                await html5QrCode.stop();
            } catch (e) {}

            try {
                await html5QrCode.clear();
            } catch (e) {}

        }

        html5QrCode = new Html5QrCode("reader");

        const cameraConfig =
            currentCamera === 0
                ? { facingMode: "environment" }
                : { facingMode: "user" };

        console.log("Current Camera:", currentCamera);

        await html5QrCode.start(

            cameraConfig,

            {
                fps: 10,
                qrbox: {
                    width: 250,
                    height: 250
                }
            },

            onScanSuccess

        );

        setMessage("📷 Scanner Ready");

    } catch (err) {

        console.error(err);

        setMessage("❌ Kamera gagal dijalankan", "error");

    }

}

// ===============================
// QR BERHASIL
// ===============================
async function onScanSuccess(decodedText) {

    if (isProcessing) return;

    isProcessing = true;

    setMessage("⏳ Mengirim data...");

    try {

        const hasil = await sendAttendance(decodedText.trim());

        showResult(hasil);

        // Beep
        try {

            const audio = new Audio(
                "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
            );

            audio.play();

        } catch (e) {}

        // Vibrate
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }

    } catch (err) {

        console.error(err);

        showResult({
            success: false,
            message: "Terjadi kesalahan."
        });

    }

    // Scanner siap lagi
    setTimeout(() => {

        isProcessing = false;

        setMessage("📷 Scanner Ready");

    }, 1500);

}

// ===============================
// GANTI KAMERA
// ===============================
async function switchCamera() {

    if (cameras.length < 2) {

        alert("Hanya ada satu kamera.");

        return;

    }

    currentCamera++;

    if (currentCamera >= cameras.length) {

        currentCamera = 0;

    }

    await startCamera();

}

// ===============================
// MESSAGE
// ===============================
function setMessage(text, type = "") {

    const el = document.getElementById("message");

    el.innerHTML = text;

    el.className = "";

    if (type) {

        el.classList.add(type);

    }

}

// ===============================
// EVENT
// ===============================
window.addEventListener("load", () => {

    document
        .getElementById("switchCamera")
        .addEventListener("click", switchCamera);

    // Tunggu layout selesai
    setTimeout(() => {
        startScanner();
    }, 400);

});
