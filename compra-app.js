const defaultGame = {
  title: 'ULTRAKILL',
  image: 'img/ultrakill-logo.jpg',
  price: 19.99,
  oldPrice: 39.99
};

const params = new URLSearchParams(window.location.search);
const game = {
  title: params.get('title') || defaultGame.title,
  image: params.get('image') || defaultGame.image,
  price: Number(params.get('price') || defaultGame.price),
  oldPrice: Number(params.get('oldPrice') || defaultGame.oldPrice)
};

const currency = (value) => `$${Number(value).toFixed(2)}`;

document.title = `Compra - ${game.title}`;
document.getElementById('checkoutGameTitle').textContent = game.title;
document.getElementById('checkoutGameImage').src = game.image;
document.getElementById('checkoutGameImage').alt = game.title;
document.getElementById('summaryGameName').textContent = game.title;
document.getElementById('summaryOldPrice').textContent = currency(game.oldPrice);
document.getElementById('summaryPrice').textContent = currency(game.price);
document.getElementById('summaryTotal').textContent = currency(game.price);

const paymentSelect = document.getElementById('metodo');
const cardBrandLogo = document.getElementById('cardBrandLogo');
const logoMap = {
  visa: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="84" height="52" viewBox="0 0 84 52">
      <rect width="84" height="52" rx="8" fill="#1a1f71"/>
      <text x="42" y="30" text-anchor="middle" fill="#ffffff" font-size="22" font-family="Arial, sans-serif" font-weight="700">VISA</text>
    </svg>
  `),
  mastercard: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="84" height="52" viewBox="0 0 84 52">
      <rect width="84" height="52" rx="8" fill="#f6f6f6"/>
      <circle cx="32" cy="26" r="13" fill="#eb001b"/>
      <circle cx="52" cy="26" r="13" fill="#f79e1b"/>
      <path d="M40 26c3.5-5 8.3-8 14-8 4.2 0 8.1 1.7 11 4.5-2.8 2.8-6.6 4.5-11 4.5-5.7 0-10.5-3.1-14-7.5z" fill="#ff5f00" opacity="0.8"/>
    </svg>
  `),
  amex: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="84" height="52" viewBox="0 0 84 52">
      <rect width="84" height="52" rx="8" fill="#0a3d91"/>
      <text x="42" y="31" text-anchor="middle" fill="#ffffff" font-size="16" font-family="Arial, sans-serif" font-weight="700">AMEX</text>
    </svg>
  `),
  paypal: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="84" height="52" viewBox="0 0 84 52">
      <rect width="84" height="52" rx="8" fill="#f5f7fb"/>
      <path d="M27 18h16c9.5 0 15.5 5.3 15.5 13.5 0 10.8-7.5 17.5-19 17.5H29l-2.5 16H18l6.5-47zm18.2 11.7h-8.5l-1.1 6.7h7.1c6.6 0 9.2-2.7 9.2-7.1 0-4.2-2.7-6.6-6.7-6.6z" fill="#0070ba"/>
    </svg>
  `)
};

function updateCardLogo() {
  const value = paymentSelect.value;
  cardBrandLogo.src = logoMap[value] || logoMap.visa;
}

paymentSelect.addEventListener('change', updateCardLogo);
updateCardLogo();
