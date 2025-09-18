// 1. Inisialisasi Peta
// Tentukan koordinat tengah dan level zoom awal
const map = L.map('map').setView([-6.2088, 106.8456], 10); // Contoh: Pusat Jakarta, zoom 10

// 2. Tambahkan Basemap (Peta Dasar)
// Menggunakan OpenStreetMap sebagai peta dasar gratis
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 3. Fungsi untuk menentukan warna berdasarkan kolom "kode"
function getColor(kode) {
    // Gunakan 'switch' atau 'if-else' untuk mencocokkan kode dengan warna
    // Ganti 'ZONA_A', 'ZONA_B', dst. dengan nilai unik dari kolom "kode" kamu
    // Ganti kode warna hex (#) sesuai keinginanmu
    switch (kode) {
        case 'ZONA_A': return '#FF5733'; // Merah-Oranye
        case 'ZONA_B': return '#33FF57'; // Hijau Cerah
        case 'ZONA_C': return '#3357FF'; // Biru
        case 'ZONA_D': return '#F1C40F'; // Kuning
        // Tambahkan case untuk 19 zonamu...
        case 'ZONA_S': return '#8E44AD'; // Ungu
        default:       return '#A9A9A9'; // Abu-abu untuk default
    }
}

// 4. Fungsi untuk mengatur style setiap poligon
function style(feature) {
    return {
        fillColor: getColor(feature.properties.kode), // Warna isian dari fungsi getColor
        weight: 2,         // Ketebalan garis batas
        opacity: 1,        // Opasitas garis
        color: 'white',    // Warna garis batas
        dashArray: '3',    // Gaya garis (putus-putus)
        fillOpacity: 0.7   // Opasitas warna isian
    };
}

// 5. Fungsi untuk interaktivitas (misalnya, menampilkan pop-up saat diklik)
function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.nama_zona) { // Ganti 'nama_zona' jika nama kolomnya beda
        layer.bindPopup("<b>Zona:</b> " + feature.properties.nama_zona + "<br><b>Kode:</b> " + feature.properties.kode);
    }
}

// 6. Memuat dan Menampilkan Data GeoJSON
fetch('data/zonasi.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: style,                 // Terapkan style yang sudah kita definisikan
            onEachFeature: onEachFeature  // Terapkan interaktivitas pop-up
        }).addTo(map);
    })
    .catch(err => console.error('Gagal memuat GeoJSON:', err));

// 7. (Opsional) Tambahkan fitur Geolokasi untuk akses lokasi pengguna
L.control.locate().addTo(map);