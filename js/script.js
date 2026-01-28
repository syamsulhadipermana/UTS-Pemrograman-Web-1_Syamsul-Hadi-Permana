// --- data produk ---
const guitars = [
  {
    id: 'sg-red',
    name: 'Gibson SG Red',
    price: 'Rp 12.500.000',
    img: 'images/SG_Red.webp',
    desc: 'Gibson SG Red memiliki karakter suara tajam dan sustain panjang.',
    specs: {
      body: 'Mahogany Solid Body',
      neck: 'Mahogany Slim Taper',
      fretboard: 'Rosewood, 22 Frets',
      pickup: 'Dual Humbucker Classic',
      hardware: 'Chrome Finish',
      scale: '24.75 inch'
    }
  },
  {
    id: 'sg-black',
    name: 'Gibson SG Black',
    price: 'Rp 13.200.000',
    img: 'images/SG_Black.webp',
    desc: 'Gibson SG Black menawarkan tone powerful dan elegan.',
    specs: {
      body: 'Mahogany Glossy',
      neck: 'Mahogany Slim Neck',
      fretboard: 'Ebony, 22 Frets',
      pickup: 'Humbucker 490R/498T',
      hardware: 'Black Nickel',
      scale: '24.75 inch'
    }
  },
  {
    id: 'sg-brown',
    name: 'Gibson SG Brown',
    price: 'Rp 14.750.000',
    img: 'images/SG_Brown.webp',
    desc: 'Warna classic brown dengan nuansa vintage.',
    specs: {
      body: 'Mahogany Satin Finish',
      neck: 'Vintage Mahogany',
      fretboard: 'Rosewood, Dot Inlay',
      pickup: 'Custom PAF Humbucker',
      hardware: 'Vintage Chrome',
      scale: '24.75 inch'
    }
  },
  {
    id: 'sg-white',
    name: 'Gibson SG Classic White',
    price: 'Rp 15.000.000',
    img: 'images/SG_White.webp',
    desc: 'Varian premium dengan finishing putih klasik.',
    specs: {
      body: 'Mahogany High Gloss White',
      neck: 'Slim Taper Neck',
      fretboard: 'Ebony, 22 Frets',
      pickup: 'Classic 57 Humbucker',
      hardware: 'Gold Hardware',
      scale: '24.75 inch'
    }
  }
];

// Render product grid - index.html & menu.html
function renderGrid(isHome = true){
  const container = document.getElementById('product-grid');
  if(!container) return;
  container.innerHTML = '';
  guitars.forEach(g => {
    const col = document.createElement('div');
    // Di home: 4 kolom besar, Di menu: 3 kolom per row
    col.className = isHome ? 'col-lg col-md-6 col-sm-12' : 'col-md-3 col-sm-6';
    col.innerHTML = `
      <div class="card">
        <img src="${g.img}" class="card-img-top" alt="${g.name}">
        <div class="card-body">
          <h5 class="card-title">${g.name}</h5>
          <p class="card-text">${g.price}</p>
          <a href="detail.html?id=${g.id}" class="btn btn-dark">Detail</a>
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
  const id = q.get('id') || '';
  const g = guitars.find(x => x.id === id);
  if(!g){
    wrap.innerHTML = '<div class="alert alert-warning">Gitar tidak ditemukan. Kembali ke <a href="index.html">katalog</a>.</div>';
    return;
  }
  
  // Tentukan link back - jika login ke menu.html, jika belum ke index.html
  const loggedUserName = localStorage.getItem('loggedUserName');
  const backLink = loggedUserName ? 'menu.html' : 'index.html';
  const backText = loggedUserName ? 'Kembali ke Menu' : 'Kembali ke Home';
  
  let specsHtml = '';
  if(g.specs) {
    specsHtml = `
      <div class="spec-box mt-4">
        <h4 class="mb-3">Spesifikasi Lengkap</h4>
        <ul>
          <li><b>Body:</b> ${g.specs.body}</li>
          <li><b>Neck:</b> ${g.specs.neck}</li>
          <li><b>Fretboard:</b> ${g.specs.fretboard}</li>
          <li><b>Pickup:</b> ${g.specs.pickup}</li>
          <li><b>Hardware:</b> ${g.specs.hardware}</li>
          <li><b>Scale Length:</b> ${g.specs.scale}</li>
        </ul>
      </div>
    `;
  }
  
  wrap.innerHTML = `
    <div class="row align-items-center">
      <div class="col-md-6">
        <img src="${g.img}" class="img-fluid detail-img" alt="${g.name}">
      </div>
      <div class="col-md-6 mt-4 mt-md-0">
        <h3>${g.name}</h3>
        <h4 class="text-danger fw-bold">${g.price}</h4>
        <p class="mt-3">${g.desc}</p>
        <a href="${backLink}" class="btn btn-custom mt-3">${backText}</a>
      </div>
    </div>
    ${specsHtml}
  `;
}

// ----------------
// Login validation
// ----------------
function validateLogin(username, password){
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const demoUser = {username:'admin', password:'1234', name:'Administrator', role:'admin'};

  // if untuk demoUser
  if(username === demoUser.username && password === demoUser.password){
    localStorage.setItem('loggedUser', JSON.stringify(demoUser));
    localStorage.setItem('loggedUserName', demoUser.name);
    localStorage.setItem('loggedUserRole', demoUser.role);
    return true;
  }

  // cek daftar registrasi
  for(let i=0;i<users.length;i++){
    const u = users[i];
    if(username === u.username && password === u.password){
      u.role = u.role || 'user';
      localStorage.setItem('loggedUser', JSON.stringify(u));
      localStorage.setItem('loggedUserName', u.name);
      localStorage.setItem('loggedUserRole', u.role);
      return true;
    }
  }

  return false;
}

// ----------------
// Check if user is admin
// ----------------
function isAdmin(){
  return localStorage.getItem('loggedUserRole') === 'admin';
}

// ----------------
// Initialize guitars dari localStorage atau gunakan default
// ----------------
function initializeGuitars(){
  const stored = localStorage.getItem('guitars');
  if(!stored){
    localStorage.setItem('guitars', JSON.stringify(guitars));
  } else {
    // Update global guitars variable dengan data dari localStorage
    const storedGuitars = JSON.parse(stored);
    guitars.length = 0;
    guitars.push(...storedGuitars);
  }
}

// ----------------
// CRUD Operations
// ----------------

// Read all guitars
function getGuitars(){
  return JSON.parse(localStorage.getItem('guitars') || '[]');
}

// Get single guitar by id
function getGuitarById(id){
  const allGuitars = getGuitars();
  return allGuitars.find(g => g.id === id);
}

// Create new guitar
function createGuitar(guitarData){
  const allGuitars = getGuitars();
  // Generate unique ID
  const newId = 'sg-' + Date.now();
  const newGuitar = {
    id: newId,
    ...guitarData
  };
  allGuitars.push(newGuitar);
  localStorage.setItem('guitars', JSON.stringify(allGuitars));
  
  // Update global guitars array
  guitars.length = 0;
  guitars.push(...allGuitars);
  
  return newGuitar;
}

// Update guitar
function updateGuitar(id, guitarData){
  const allGuitars = getGuitars();
  const index = allGuitars.findIndex(g => g.id === id);
  
  if(index !== -1){
    allGuitars[index] = {
      id: allGuitars[index].id,
      ...guitarData
    };
    localStorage.setItem('guitars', JSON.stringify(allGuitars));
    
    // Update global guitars array
    guitars.length = 0;
    guitars.push(...allGuitars);
    
    return allGuitars[index];
  }
  return null;
}

// Delete guitar
function deleteGuitar(id){
  const allGuitars = getGuitars();
  const filteredGuitars = allGuitars.filter(g => g.id !== id);
  localStorage.setItem('guitars', JSON.stringify(filteredGuitars));
  
  // Update global guitars array
  guitars.length = 0;
  guitars.push(...filteredGuitars);
  
  return true;
}

// Render dashboard table
function renderDashboard(){
  const tableBody = document.getElementById('guitarsTableBody');
  if(!tableBody) return;
  
  const allGuitars = getGuitars();
  tableBody.innerHTML = '';
  
  if(allGuitars.length === 0){
    tableBody.innerHTML = '<tr><td colspan="6" class="text-center">Belum ada produk. <a href="form-produk.html">Tambah Produk</a></td></tr>';
    return;
  }
  
  allGuitars.forEach(g => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${g.id}</td>
      <td>${g.name}</td>
      <td>${g.price}</td>
      <td>${g.desc.substring(0, 30)}...</td>
      <td>
        <a href="form-produk.html?id=${g.id}" class="btn btn-sm btn-warning">Edit</a>
        <button class="btn btn-sm btn-danger" onclick="deleteGuitarAndRefresh('${g.id}')">Hapus</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Helper function to delete and refresh
function deleteGuitarAndRefresh(id){
  if(confirm('Yakin ingin menghapus produk ini?')){
    deleteGuitar(id);
    renderDashboard();
    alert('Produk berhasil dihapus!');
  }
}

// Render form edit/create
function renderFormEdit(){
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  
  const form = document.getElementById('guitarsForm');
  const pageTitle = document.getElementById('formPageTitle');
  
  if(id){
    // Mode edit
    pageTitle.textContent = 'Edit Produk';
    const guitar = getGuitarById(id);
    if(guitar){
      document.getElementById('guitarId').value = guitar.id;
      document.getElementById('guitarName').value = guitar.name;
      document.getElementById('guitarPrice').value = guitar.price;
      document.getElementById('guitarDesc').value = guitar.desc;
      document.getElementById('guitarBody').value = guitar.specs.body;
      document.getElementById('guitarNeck').value = guitar.specs.neck;
      document.getElementById('guitarFretboard').value = guitar.specs.fretboard;
      document.getElementById('guitarPickup').value = guitar.specs.pickup;
      document.getElementById('guitarHardware').value = guitar.specs.hardware;
      document.getElementById('guitarScale').value = guitar.specs.scale;
      document.getElementById('guitarImg').value = guitar.img;
      
      // Show current image preview
      const preview = document.getElementById('imagePreview');
      if(preview && guitar.img){
        preview.src = guitar.img;
        preview.style.display = 'block';
      }
    }
  } else {
    // Mode create
    pageTitle.textContent = 'Tambah Produk Baru';
  }
}

// Handle form submit
function handleGuitarFormSubmit(e){
  e.preventDefault();
  
  const id = document.getElementById('guitarId').value;
  const name = document.getElementById('guitarName').value.trim();
  const price = document.getElementById('guitarPrice').value.trim();
  const desc = document.getElementById('guitarDesc').value.trim();
  const body = document.getElementById('guitarBody').value.trim();
  const neck = document.getElementById('guitarNeck').value.trim();
  const fretboard = document.getElementById('guitarFretboard').value.trim();
  const pickup = document.getElementById('guitarPickup').value.trim();
  const hardware = document.getElementById('guitarHardware').value.trim();
  const scale = document.getElementById('guitarScale').value.trim();
  const img = document.getElementById('guitarImg').value.trim();
  
  // Validasi
  if(!name || !price || !desc || !body || !neck || !fretboard || !pickup || !hardware || !scale || !img){
    alert('Semua field harus diisi!');
    return;
  }
  
  const guitarData = {
    name,
    price,
    desc,
    img,
    specs: { body, neck, fretboard, pickup, hardware, scale }
  };
  
  if(id){
    // Update existing
    updateGuitar(id, guitarData);
    alert('Produk berhasil diupdate!');
  } else {
    // Create new
    createGuitar(guitarData);
    alert('Produk berhasil ditambahkan!');
  }
  
  window.location.href = 'dashboard.html';
}

// expose
window.renderGrid = renderGrid;
window.renderDetailFromQuery = renderDetailFromQuery;
window.validateLogin = validateLogin;
window.isAdmin = isAdmin;
window.initializeGuitars = initializeGuitars;
window.getGuitars = getGuitars;
window.getGuitarById = getGuitarById;
window.createGuitar = createGuitar;
window.updateGuitar = updateGuitar;
window.deleteGuitar = deleteGuitar;
window.renderDashboard = renderDashboard;
window.deleteGuitarAndRefresh = deleteGuitarAndRefresh;
window.renderFormEdit = renderFormEdit;
window.handleGuitarFormSubmit = handleGuitarFormSubmit;
