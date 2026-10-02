const $=s=>document.querySelector(s);
const SK=[["C","lang"],["C++","lang"],["Embedded C","lang"],["PIC18F4580","mcu"],["UART","proto"],["SPI","proto"],["I2C","proto"],["CAN","proto"],["Process scheduling","linux"],["IPC: pipes, shared memory","linux"],["System calls","linux"],["Ubuntu","linux"],["GCC","tool"],["MPLAB","tool"],["XC8","tool"],["Windows","tool"]];
const PJ=[
["Car Black Box","Embedded C · PIC18F4580","emb","Records real-time vehicle data for monitoring and accident analysis.",["Logs time, speed and gear changes","Stores events and retrieves them on demand","Built in Embedded C on the PIC18F4580"],["Embedded C","PIC18F4580","XC8"]],
["Hybrid Energy Storage for EVs","Academic project, 2021–2024","emb","Lithium-ion batteries plus super capacitors with a smart energy management system.",["Optimises how energy is shared between the two sources","Improves regenerative braking efficiency","Extends battery life"],["EV","Power electronics","EMS"]],
["Minishell","Linux internals","lin","A custom shell built to learn how Linux runs programs.",["Runs commands and parses arguments","Supports piping (|) between processes","Uses system calls, process management and pipes for IPC"],["C","fork/exec","Pipes"]],
["Image Steganography","Pure C","c","Hides a secret message inside a BMP image using the LSB technique.",["Changes the least significant bits of pixels","Message stays invisible to the eye","BMP is uncompressed, so pixel data is easy to edit"],["C","File I/O","BMP"]],
["Accurate Precision Calculator","Pure C","c","Arithmetic on numbers far larger than the standard data types allow.",["Addition, subtraction, multiplication and division","Handles high-precision, very large values"],["C","Data structures"]],
["Address Book","Pure C","c","A contact manager with reliable file storage.",["Add, search, edit, update and delete contacts","Optimised data and file handling"],["C","File handling"]]];

const skl=$("#skl");
SK.forEach(([n,c])=>{const d=document.createElement("div");d.className="sk";d.dataset.c=c;d.textContent=n;skl.appendChild(d)});
$("#tabs").onclick=e=>{const b=e.target.closest(".tab");if(!b)return;
document.querySelectorAll("#tabs .tab").forEach(t=>t.setAttribute("aria-pressed",t===b));
document.querySelectorAll(".sk").forEach(s=>s.classList.toggle("off",b.dataset.f!=="all"&&s.dataset.c!==b.dataset.f))};

const pj=$("#pj");
PJ.forEach(([t,s,k,d,l,g])=>{const b=document.createElement("button");b.className="proj";b.dataset.k=k;b.setAttribute("aria-expanded","false");
b.innerHTML=`<div class="ph"><h3>${t}</h3><span class="pl" aria-hidden="true">+</span></div><p class="pd">${s}. ${d}</p><div class="more"><div><ul>${l.map(x=>`<li>${x}</li>`).join("")}</ul></div></div><div class="tags">${g.map(x=>`<span>${x}</span>`).join("")}</div>`;
b.onclick=()=>b.setAttribute("aria-expanded",b.getAttribute("aria-expanded")!=="true");pj.appendChild(b)});
$("#ptabs").onclick=e=>{const b=e.target.closest(".tab");if(!b)return;
document.querySelectorAll("#ptabs .tab").forEach(t=>t.setAttribute("aria-pressed",t===b));
document.querySelectorAll(".proj").forEach(p=>p.classList.toggle("hide",b.dataset.f!=="all"&&p.dataset.k!==b.dataset.f))};

function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");setTimeout(()=>t.classList.remove("on"),1800)}
$("#copy").onclick=()=>{const m="pulicherlavenkat75@gmail.com";
(navigator.clipboard?navigator.clipboard.writeText(m):Promise.reject()).then(()=>toast("Email copied"),()=>toast(m))};

// theme
$("#theme").onclick=()=>{const r=document.documentElement;const dark=r.dataset.theme?r.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=dark?"light":"dark"};

// counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);
const n=+e.target.dataset.n,t0=performance.now();(function f(t){const p=Math.min((t-t0)/900,1);e.target.textContent=Math.round(n*p);if(p<1)requestAnimationFrame(f)})(t0)}));
document.querySelectorAll("[data-n]").forEach(x=>io.observe(x));

// nav highlight
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-45% 0px -50% 0px"});
document.querySelectorAll("section").forEach(s=>so.observe(s));

// terminal
const out=$("#out"),inp=$("#cmd");
const CMDS={
help:()=>"Commands: about, skills, projects, education, contact, clear",
about:()=>"Pulicherla Venkatakiran\nEEE graduate (B.Tech 2024) from Tadipatri, Andhra Pradesh.\nFocus: C, Embedded C, Linux internals.\nStatus: looking for an entry-level embedded/software role.",
skills:()=>"lang   : C, C++, Embedded C\nmcu    : PIC18F4580\nproto  : UART, SPI, I2C, CAN\nlinux  : scheduling, IPC, system calls\ntools  : GCC, MPLAB, XC8",
projects:()=>"1. Car Black Box (Embedded C)\n2. Hybrid Energy Storage for EVs\n3. Minishell (pipes, IPC)\n4. Image Steganography (LSB)\n5. Accurate Precision Calculator\n6. Address Book\nScroll down to open each one.",
education:()=>"B.Tech EEE, 2021-2024, CGPA 7.50\nDiploma EEE, 2018-2021, 69.88%\nTraining: Emertxe, Advanced Embedded Systems",
contact:()=>"pulicherlavenkat75@gmail.com\n+91 91603 67368",
sudo:()=>"Nice try. Permission denied. Send me an email instead."
};
function print(t,cls){const d=document.createElement("div");if(cls)d.className=cls;d.textContent=t;out.appendChild(d);out.scrollTop=out.scrollHeight}
function run(c){c=c.trim().toLowerCase();if(!c)return;print("$ "+c,"c");
if(c==="clear"){out.innerHTML="";return}
const k=c.split(" ")[0];print(CMDS[k]?CMDS[k]():"command not found: "+c+". Type help.")}
inp.addEventListener("keydown",e=>{if(e.key==="Enter"){run(inp.value);inp.value=""}});
["help","about","skills","projects","contact"].forEach(c=>{const b=document.createElement("button");b.textContent=c;b.onclick=()=>run(c);$("#chips").appendChild(b)});

const boot=["[ OK ] PIC18F4580 clock stable","[ OK ] UART0 115200 8N1 ready","[ OK ] SPI, I2C, CAN initialised","[ OK ] Loading profile: Venkatakiran","Welcome. Type help or tap a command below."];
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
boot.forEach((l,i)=>reduce?print(l,i<4?"o":""):setTimeout(()=>print(l,i<4?"o":""),350*(i+1)));
