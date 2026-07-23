// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onValue
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


form.addEventListener("submit",function(e){

    e.preventDefault();

    const data={

        nama:document.getElementById("guestName").value,

        phone:document.getElementById("guestPhone").value,

        pax:parseInt(document.getElementById("guestPax").value),

        status:document.querySelector('input[name="attendance"]:checked').value,

        wish:document.getElementById("guestWish").value,

        time:Date.now()

    };


    push(ref(db,"rsvp"),data);

    form.reset();

});




// =========================

// PAPAR SEMUA RSVP

// =========================

onValue(ref(db,"rsvp"),(snapshot)=>{

    wishContainer.innerHTML="";

    let total=0;

    snapshot.forEach((child)=>{

        const item=child.val();

        if(item.status==="Hadir"){

            total+=item.pax;

        }

        const card=document.createElement("div");

        card.className="wish-card";

        card.innerHTML=`

            <strong>${item.nama}</strong><br>

            📞 ${item.phone}<br>

            👥 ${item.pax} Pax<br>

            <small>${item.status}</small>

            <p>${item.wish}</p>

        `;

        wishContainer.prepend(card);

    });

    totalAttendance.textContent=total;

});