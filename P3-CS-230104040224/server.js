const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

// Data awal: 5 mahasiswa
let mahasiswa = [
  { nim: "2310511001", nama: "Siti Alayda Salsabila", prodi: "Teknologi Informasi", angkatan: 2023 },
  { nim: "2310511002", nama: "Budi Santoso", prodi: "Teknologi Informasi", angkatan: 2023 },
  { nim: "2310511003", nama: "Aulia Rahman", prodi: "Sistem Informasi", angkatan: 2024 },
  { nim: "2310511004", nama: "Dewi Lestari", prodi: "Teknologi Informasi", angkatan: 2022 },
  { nim: "2310511005", nama: "Rizky Pratama", prodi: "Manajemen Informatika", angkatan: 2023 }
];

// Endpoint GET /hello
app.get('/hello', (req, res) => {
  res.send('Hello World from Client-Server Architecture!');
});

// GET semua data mahasiswa
app.get('/mahasiswa', (req, res) => {
  res.json(mahasiswa);
});

// POST tambah data mahasiswa
app.post('/mahasiswa', (req, res) => {
  mahasiswa.push(req.body);
  res.status(201).json(req.body);
});

// PUT ubah data mahasiswa berdasarkan NIM
app.put('/mahasiswa/:nim', (req, res) => {
  const index = mahasiswa.findIndex(m => m.nim === req.params.nim);
  if (index !== -1) {
    mahasiswa[index] = { ...mahasiswa[index], ...req.body };
    res.json(mahasiswa[index]);
  } else {
    res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
  }
});

// DELETE hapus data mahasiswa berdasarkan NIM
app.delete('/mahasiswa/:nim', (req, res) => {
  const before = mahasiswa.length;
  mahasiswa = mahasiswa.filter(m => m.nim !== req.params.nim);
  if (mahasiswa.length < before) {
    res.json({ message: "Data berhasil dihapus" });
  } else {
    res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`✅ Server berjalan di http://localhost:${port}`);
});
