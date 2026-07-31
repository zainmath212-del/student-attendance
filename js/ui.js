// =====================================
// TAMPILKAN HASIL
// =====================================

function showResult(data){

    const message = document.getElementById("message");
    const nama = document.getElementById("nama");
    const kelas = document.getElementById("kelas");
    const status = document.getElementById("status");
    const keterangan = document.getElementById("keterangan");

    // Reset warna
    message.classList.remove("success","error","warning");

    if(data.success){

        message.innerHTML = "✅ " + data.message;
        message.classList.add("success");

        nama.innerHTML = data.nama || "-";
        kelas.innerHTML = data.kelas || "-";
        status.innerHTML = data.status || "-";
        keterangan.innerHTML = data.message || "-";

    }else{

        message.innerHTML = "❌ " + data.message;
        message.classList.add("error");

    }

    // Bunyi beep
    try{

        const audio = new Audio(
            "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
        );

        audio.play();

    }catch(e){}

    // Getar HP
    if(navigator.vibrate){

        navigator.vibrate(200);

    }

}
