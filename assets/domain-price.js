const price = (new Date().getFullYear() - 2025) * 300;
document.getElementById("domain-price").textContent = `${new Intl.NumberFormat("it-IT").format(price)} €`;
