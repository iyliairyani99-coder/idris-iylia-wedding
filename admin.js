// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

const firebaseConfig = {

    apiKey: "AIzaSyD48sEKVCCtQibmwQWb5KFQByE4Syr1_SY",

    authDomain: "idris-iylia-wedding.firebaseapp.com",

    databaseURL: "https://idris-iylia-wedding-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "idris-iylia-wedding",

    storageBucket: "idris-iylia-wedding.firebasestorage.app",

    messagingSenderId: "735287224789",

    appId: "1:735287224789:web:4100aa7f68400bb7e3355c"

};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const tbody = document.getElementById("tableBody");

const hadirPax = document.getElementById("hadirPax");
const tidakHadir = document.getElementById("tidakHadir");
const jumlahRSVP = document.getElementById("jumlahRSVP");
const jumlahUcapan = document.getElementById("jumlahUcapan");

const search = document.getElementById("search");

let semuaData = [];

function paparTable(data){

    tbody.innerHTML="";

    data.forEach(item=>{

        tbody.innerHTML += `

        <tr>

            <td>${item.nama}</td>

            <td>${item.phone}</td>

            <td>${item.pax}</td>

            <td>${item.status}</td>

            <td>${item.wish}</td>

        </tr>

        `;

    });

}

onValue(ref(db,"rsvp"),snapshot=>{

    semuaData=[];

    let pax=0;

    let tidak=0;

    let ucapan=0;

    snapshot.forEach(child=>{

        const item=child.val();

        semuaData.push(item);

        if(item.status==="Hadir"){

            pax += Number(item.pax);

        }else{

            tidak++;

        }

        if(item.wish.trim()!=""){

            ucapan++;

        }

    });

    hadirPax.textContent=pax;

    tidakHadir.textContent=tidak;

    jumlahRSVP.textContent=semuaData.length;

    jumlahUcapan.textContent=ucapan;

    paparTable(semuaData);

});

search.addEventListener("keyup",()=>{

    const keyword=search.value.toLowerCase();

    const hasil=semuaData.filter(item=>

        item.nama.toLowerCase().includes(keyword)

        ||

        item.phone.toLowerCase().includes(keyword)

    );

    paparTable(hasil);

});
const downloadBtn = document.getElementById("downloadExcel");

downloadBtn.addEventListener("click", () => {

    const dataExcel = semuaData.map((item, index) => {

        const tarikh = item.time
            ? new Date(item.time).toLocaleDateString("ms-MY")
            : "";

        const masa = item.time
            ? new Date(item.time).toLocaleTimeString("ms-MY")
            : "";

        return {
            "Bil": index + 1,
            "Nama": item.nama || "",
            "Nombor Telefon": item.phone || "",
            "Bilangan Pax": item.pax || 0,
            "Status": item.status || "",
            "Ucapan": item.wish || "",
            "Tarikh RSVP": tarikh,
            "Masa RSVP": masa
        };

    });

    if(dataExcel.length === 0){

        alert("Belum ada data RSVP untuk dimuat turun.");

        return;

    }

    const worksheet = XLSX.utils.json_to_sheet(dataExcel);

    worksheet["!cols"] = [
        { wch: 6 },
        { wch: 28 },
        { wch: 18 },
        { wch: 14 },
        { wch: 16 },
        { wch: 45 },
        { wch: 15 },
        { wch: 15 }
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Senarai RSVP"
    );

    XLSX.writeFile(
        workbook,
        "RSVP-Idris-Iylia.xlsx",
        { compression: true }
    );

});