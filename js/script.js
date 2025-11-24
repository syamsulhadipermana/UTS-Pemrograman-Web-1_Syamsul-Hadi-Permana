// --- data produk ---
const guitars = [
  {
    id:1,
    name:'Original Collection',
    price:'Rp 45.000.000',
    img:'images/SG_Original.webp', // <- path gambar yang kamu upload
    desc:'Handcrafted in Nashville. Vibrato and hardtail options in satin or full-gloss finish.'
  },
  {
    id:2,
    name:'Modern Collection',
    price:'Rp 38.500.000',
    img:'images/SG_Modern.webp',
    desc:'Compact, lightweight, modernized SG with premium pickups.'
  },
  {
    id:3,
    name:'Exclusive Collection',
    price:'Rp 58.000.000',
    img:'images/SG_Exclusive.webp',
    desc:'Exclusive SGs at our boutique — bold finishes and limited runs.'
  },
  {
    id:4,
    name:'Historic Collection',
    price:'Rp 62.000.000',
    img:'images/SG_Historic.webp',
    desc:'Historic reissues handcrafted with vintage specs.'
  }
];

// Render product grid - index.html
function renderGrid(isHome = true){
  const container = document.getElementById('product-grid');
  if(!container) return;
  container.innerHTML = '';
  guitars.forEach(g => {
    const col = document.createElement('div');
    col.className = 'col-lg col-md-6 col-sm-12';
    col.innerHTML = `
      <div class="card">
        <img src="${g.img}" class="card-img-top" alt="${g.name}">
        <div class="card-body">
          <h5 class="card-title">${g.name}</h5>
          <p class="card-text">${g.price}</p>
          <a href="detail.html?id=${g.id}" class="btn btn-outline-dark">Lihat Detail</a>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

// Render detail page
function renderDetailFromQuery(){
  const wrap = document.getElementById('detail-wrap');
  if(!wrap) return;
  const q = new URLSearchParams(window.location.search);
  const id = parseInt(q.get('id')) || 0;
  const g = guitars.find(x => x.id === id);
  if(!g){
    wrap.innerHTML = '<div class="alert alert-warning">Gitar tidak ditemukan. Kembali ke <a href="index.html">katalog</a>.</div>';
    return;
  }
  wrap.innerHTML = `
    <div class="detail-card">
      <div class="detail-image"><img src="${g.img}" alt="${g.name}"></div>
      <div class="detail-info">
        <h3>${g.name}</h3>
        <p class="price">${g.price}</p>
        <p>${g.desc}</p>
        <div class="mt-4">
          <a href="index.html" class="btn btn-light">Kembali</a>
          <button class="btn btn-primary ms-2">Beli Sekarang</button>
        </div>
      </div>
    </div>
  `;
}

// ----------------
// Login validation (menggunakan struktur percabangan if)
// ----------------
function validateLogin(username, password){
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const demoUser = {username:'admin', password:'1234', name:'Administrator'};

  // if untuk demoUser
  if(username === demoUser.username && password === demoUser.password){
    localStorage.setItem('loggedUser', JSON.stringify(demoUser));
    localStorage.setItem('loggedUserName', demoUser.name);
    return true;
  }

  // cek daftar registrasi
  for(let i=0;i<users.length;i++){
    const u = users[i];
    if(username === u.username && password === u.password){
      localStorage.setItem('loggedUser', JSON.stringify(u));
      localStorage.setItem('loggedUserName', u.name);
      return true;
    }
  }

  return false;
}

// expose
window.renderGrid = renderGrid;
window.renderDetailFromQuery = renderDetailFromQuery;
window.validateLogin = validateLogin;
