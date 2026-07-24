// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onValue,
    get,
    update
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";


// Firebase Config

const firebaseConfig = {

    apiKey: "AIzaSyD48sEKVCCtQibmwQWb5KFQByE4Syr1_SY",

    authDomain: "idris-iylia-wedding.firebaseapp.com",

    databaseURL: "https://idris-iylia-wedding-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "idris-iylia-wedding",

    storageBucket: "idris-iylia-wedding.firebasestorage.app",

    messagingSenderId: "735287224789",

    appId: "1:735287224789:web:4100aa7f68400bb7e3355c"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


// =========================

// RSVP

// =========================

const form = document.getElementById("rsvpForm");

const wishContainer = document.getElementById("wishContainer");

const totalAttendance = document.getElementById("totalAttendance");


form.addEventListener("submit", async function(e){

    e.preventDefault();

    const attendance =
        document.querySelector('input[name="attendance"]:checked');

    if(!attendance){

        alert("Sila pilih status kehadiran.");

        return;

    }

    const phoneInput =
        document.getElementById("guestPhone").value.trim();

    const phoneBersih =
        phoneInput.replace(/[^0-9]/g, "");

    const data = {

        nama:
            document.getElementById("guestName").value.trim(),

        phone: phoneInput,

        pax:
            parseInt(document.getElementById("guestPax").value) || 1,

        status:
            attendance.value,

        wish:
            document.getElementById("guestWish").value.trim(),

        time:
            Date.now()

    };

    try{

        const snapshot = await get(ref(db, "rsvp"));

        let existingKey = "";

        if(snapshot.exists()){

            snapshot.forEach((child)=>{

                const item = child.val();

                console.log("Ucapan:", JSON.stringify(item.wish));

                const nomborDalamFirebase =
                    String(item.phone || "")
                    .replace(/[^0-9]/g, "");

                if(nomborDalamFirebase === phoneBersih){

                    existingKey = child.key;

                }

            });

        }

        if(existingKey !== ""){

            await update(
                ref(db, "rsvp/" + existingKey),
                data
            );

            alert("Anda telah mengemaskini RSVP anda.");

        }else{

            await push(
                ref(db, "rsvp"),
                data
            );

            alert("Terima kasih! RSVP anda berjaya dihantar.");

        }

        form.reset();

        document.getElementById("guestPax").value = 1;

    }catch(error){

        console.error(error);

        alert("Berlaku ralat. RSVP tidak berjaya dihantar.");

    }

});




// =========================

// PAPAR SEMUA RSVP

// =========================

onValue(ref(db, "rsvp"), (snapshot) => {

    wishContainer.innerHTML = "";

    let total = 0;

    snapshot.forEach((child) => {

        const item = child.val();

        if(item.status === "Hadir"){
            total += Number(item.pax || 0);
        }

        const wish = String(item.wish || "").trim();

        // Jangan buat kad jika ucapan kosong
        if(wish === ""){
            return;
        }

        const card = document.createElement("div");

        card.className = "wish-card";

        card.innerHTML = `

            <div class="wish-name">
                🌸 <strong>${item.nama}</strong>
            </div>

            <div class="wish-text">
                "${wish}"
            </div>

        `;

        wishContainer.prepend(card);

    });

    totalAttendance.textContent = total;

});