const button = document.getElementById("openInvitation");

const music = document.getElementById("weddingMusic");

const cover = document.querySelector(".cover");

button.addEventListener("click",()=>{

    music.volume=0;

    music.play();

    let volume=0;

    const fade=setInterval(()=>{

        volume+=0.05;

        if(volume>=1){

            volume=1;

            clearInterval(fade);

        }

        music.volume=volume;

    },80);

    cover.classList.add("hide");

    setTimeout(()=>{

        cover.remove();

    },1000);

});



// =======================
// COUNTDOWN
// =======================

const weddingDate = new Date("2026-08-31T11:00:00").getTime();

const boxes = document.querySelectorAll("#countdown h3");

function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if(distance <= 0){

        boxes[0].textContent = "0";
        boxes[1].textContent = "0";
        boxes[2].textContent = "0";
        boxes[3].textContent = "0";

        return;
    }

    const days = Math.floor(distance/(1000*60*60*24));

    const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const minutes = Math.floor((distance%(1000*60*60))/(1000*60));

    const seconds = Math.floor((distance%(1000*60))/1000);

    boxes[0].textContent = days;
    boxes[1].textContent = hours;
    boxes[2].textContent = minutes;
    boxes[3].textContent = seconds;

}

updateCountdown();

setInterval(updateCountdown,1000);



// =======================
// SAKURA
// =======================

const petals = document.querySelector(".petals");

for(let i=0;i<35;i++){

    const petal = document.createElement("div");

    petal.className="petal";

    petal.style.left=Math.random()*100+"%";

    const size=10+Math.random()*18;

    petal.style.width=size+"px";

    petal.style.height=size*0.8+"px";

    petal.style.animationDuration=
    (6+Math.random()*6)+"s,"+
    (3+Math.random()*3)+"s";

    petal.style.animationDelay=Math.random()*6+"s";

    petals.appendChild(petal);

}



// =======================
// COPY ACCOUNT
// =======================

const copyBtn=document.getElementById("copyAccount");

if(copyBtn){

copyBtn.addEventListener("click",()=>{

const account=document.getElementById("accountNumber").innerText;

navigator.clipboard.writeText(account);

copyBtn.innerHTML="✅ Disalin";

setTimeout(()=>{

copyBtn.innerHTML="Salin Nombor Akaun";

},2000);

});

}

function copyAccount(account,button){

    navigator.clipboard.writeText(account);

    button.innerHTML="✅ Disalin";

    setTimeout(()=>{

        button.innerHTML="📋 Salin No Akaun";

    },2000);

}


