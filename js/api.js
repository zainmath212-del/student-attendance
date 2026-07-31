// =====================================
// KONFIGURASI API
// =====================================

const API_URL =
"https://script.google.com/macros/s/AKfycbzxRG0MglizzdThP38rGaAmuIQcZeGM0Xtu-4fwbOBM2u4YVhhdqfVWonU8sdYJgAWUtQ/exec";


// =====================================
// KIRIM DATA ABSENSI
// =====================================

async function sendAttendance(id){

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                id:id
            })

        });

        const result = await response.json();

        return result;

    }catch(err){

        return{

            success:false,

            message:"Tidak dapat terhubung ke server."

        };

    }

}
