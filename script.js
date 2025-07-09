const load = document.getElementById("load");
const main = document.getElementById("main");
const ota = document.getElementById("ota");
const input = document.getElementById("input");
const select = document.getElementById("select");

let odamlar = [];

async function getData() {
  const res = await fetch("https://randomuser.me/api/?results=100");
  const data = await res.json();
  chizish(data.results);
  odamlar = data.results;
}

function chizish(malumot) {
  ota.innerHTML = "";
  malumot.map(o => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src=${o.picture.large} alt="" />
      <h1>${o.name.title} ${o.name.first} ${o.name.last}</h1>
      <h2>yoshi: ${o.dob.age}</h2>
      <h3>Telefon: ${o.phone}</h3>
      <h4>Email: ${o.email}</h4>
      <h5>Manzil: ${o.location.country}, ${o.location.city}</h5>
    `;
    ota.appendChild(div);
  });
}

setTimeout(() => {
  load.style.display = "none";
  main.style.display = "block";
  getData();
}, 2000);

input.addEventListener("input", () => {
  const a = odamlar.filter(o => 
    o.name.first.toLowerCase().includes(input.value.toLowerCase())
  );
  chizish(a);
});

select.addEventListener("change", () => {
  if (select.value == "ism") {
    const d = odamlar.sort((o1, o2) => 
      o1.name.first.localeCompare(o2.name.first)
    );
    chizish(d);
  } else {
    const d = odamlar.sort((o1, o2) => 
      o1.dob.age - o2.dob.age
    );
    chizish(d);
  }
});
