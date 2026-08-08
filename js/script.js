// ======================================
// MENTAL HEALTH TRACKER - SCRIPT.JS
// ======================================

// ------------------------------
// LOGIN
// ------------------------------
function login(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "12345") {
        localStorage.setItem("username", username);
        alert("✅ Login berhasil!");
        window.location.href = "dashboard.html";
    } else {
        alert("❌ Username atau password salah!");
    }
}

// ------------------------------
// LOGOUT
// ------------------------------
function logout() {
    localStorage.removeItem("username");
    window.location.href = "index.html";
}

// ------------------------------
// SIMPAN MOOD
// ------------------------------
function simpanMood() {
    const tanggal = document.getElementById("tanggal").value;
    const mood = document.getElementById("mood").value;
    const stress = document.getElementById("stress").value;
    const catatan = document.getElementById("catatan").value;

    if (tanggal === "" || stress === "") {
        alert("Tanggal dan tingkat stres harus diisi!");
        return;
    }

    let dataMood = JSON.parse(localStorage.getItem("mood")) || [];

    dataMood.push({
        tanggal: tanggal,
        mood: mood,
        stress: parseInt(stress),
        catatan: catatan
    });

    localStorage.setItem("mood", JSON.stringify(dataMood));

    alert("💖 Mood berhasil disimpan!");

    if (document.getElementById("formMood")) {
        document.getElementById("formMood").reset();
    }
}

// ------------------------------
// TAMPILKAN DATA MOOD
// ------------------------------
function tampilMood() {
    const tabel = document.getElementById("tabelMood");
    if (!tabel) return;

    let dataMood = JSON.parse(localStorage.getItem("mood")) || [];

    tabel.innerHTML = "";

    dataMood.forEach((item, index) => {
        tabel.innerHTML += `
        <tr>
            <td>${item.tanggal}</td>
            <td>${item.mood}</td>
            <td>${item.stress}</td>
            <td>${item.catatan}</td>
            <td>
                <button onclick="editMood(${index})">✏️</button>
                <button onclick="hapusMood(${index})">🗑️</button>
            </td>
        </tr>
        `;
    });
}

// ------------------------------
// SEARCHING (LINEAR SEARCH)
// ------------------------------
function cariMood() {
    const keyword = document.getElementById("searchMood").value.toLowerCase();
    const tabel = document.getElementById("tabelMood");
    if (!tabel) return;

    let dataMood = JSON.parse(localStorage.getItem("mood")) || [];

    tabel.innerHTML = "";

    dataMood.forEach((item, index) => {
        if (item.mood.toLowerCase().includes(keyword)) {
            tabel.innerHTML += `
            <tr>
                <td>${item.tanggal}</td>
                <td>${item.mood}</td>
                <td>${item.stress}</td>
                <td>${item.catatan}</td>
                <td>
                    <button onclick="editMood(${index})">✏️</button>
                    <button onclick="hapusMood(${index})">🗑️</button>
                </td>
            </tr>
            `;
        }
    });
}

// ------------------------------
// SORTING (BUBBLE SORT)
// ------------------------------
function urutStress() {
    let dataMood = JSON.parse(localStorage.getItem("mood")) || [];

    // Bubble Sort
    for (let i = 0; i < dataMood.length - 1; i++) {
        for (let j = 0; j < dataMood.length - i - 1; j++) {
            if (dataMood[j].stress > dataMood[j + 1].stress) {
                let temp = dataMood[j];
                dataMood[j] = dataMood[j + 1];
                dataMood[j + 1] = temp;
            }
        }
    }

    localStorage.setItem("mood", JSON.stringify(dataMood));
    tampilMood();

    alert("📊 Data berhasil diurutkan berdasarkan tingkat stres.");
}

// ------------------------------
// HAPUS DATA
// ------------------------------
function hapusMood(index) {
    let dataMood = JSON.parse(localStorage.getItem("mood")) || [];

    if (confirm("Yakin ingin menghapus data ini?")) {
        dataMood.splice(index, 1);
        localStorage.setItem("mood", JSON.stringify(dataMood));
        tampilMood();
    }
}

// ------------------------------
// EDIT DATA
// ------------------------------
function editMood(index) {
    let dataMood = JSON.parse(localStorage.getItem("mood")) || [];
    let item = dataMood[index];

    let tanggal = prompt("Tanggal", item.tanggal);
    let mood = prompt("Mood", item.mood);
    let stress = prompt("Stress (1-10)", item.stress);
    let catatan = prompt("Catatan", item.catatan);

    if (tanggal === null || mood === null || stress === null || catatan === null) {
        return;
    }

    dataMood[index] = {
        tanggal: tanggal,
        mood: mood,
        stress: parseInt(stress),
        catatan: catatan
    };

    localStorage.setItem("mood", JSON.stringify(dataMood));
    tampilMood();
}

// ------------------------------
// STATISTIK MOOD
// ------------------------------
function hitungStatistik() {
    let dataMood = JSON.parse(localStorage.getItem("mood")) || [];

    let hasil = {
        bahagia: 0,
        biasa: 0,
        sedih: 0,
        marah: 0,
        cemas: 0
    };

    dataMood.forEach(item => {
        if (item.mood.includes("Bahagia")) hasil.bahagia++;
        else if (item.mood.includes("Biasa")) hasil.biasa++;
        else if (item.mood.includes("Sedih")) hasil.sedih++;
        else if (item.mood.includes("Marah")) hasil.marah++;
        else if (item.mood.includes("Cemas")) hasil.cemas++;
    });

    return hasil;
}

// ------------------------------
// STREAK
// ------------------------------
function hitungStreak() {
    let dataMood = JSON.parse(localStorage.getItem("mood")) || [];

    if (dataMood.length === 0) return 0;

    let tanggal = [...new Set(dataMood.map(item => item.tanggal))];
    tanggal.sort();

    let streak = 1;

    for (let i = tanggal.length - 1; i > 0; i--) {
        let t1 = new Date(tanggal[i]);
        let t2 = new Date(tanggal[i - 1]);

        let selisih = (t1 - t2) / (1000 * 60 * 60 * 24);

        if (selisih === 1) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

// ------------------------------
// MEDITASI
// ------------------------------
function mulaiMeditasi(nama) {
    alert(
        "🧘 Memulai meditasi: " + nama +
        "\n\nTarik napas perlahan..." +
        "\nBuang napas perlahan..." +
        "\nFokus pada dirimu selama beberapa menit."
    );
}

// ------------------------------
// MUSIK RELAKSASI
// ------------------------------
let audio = new Audio();

function putar(file) {
    audio.pause();
    audio.currentTime = 0;

    audio.src = file;
    audio.loop = true;
    audio.volume = 1.0;

    audio.play().then(() => {
        const status = document.getElementById("statusMusik");
        if (status) {
            status.innerHTML = "🎵 Sedang memutar musik...";
        }
    }).catch(err => {
        console.error(err);
        alert("Gagal memutar audio.");
    });
}

function stopMusik() {
    audio.pause();
    audio.currentTime = 0;

    const status = document.getElementById("statusMusik");
    if (status) {
        status.innerHTML = "⏹ Musik dihentikan";
    }
}

// ------------------------------
// TAMPILKAN USER DI DASHBOARD
// ------------------------------
window.onload = function () {
    const user = localStorage.getItem("username");
    const nama = document.getElementById("namaUser");
    const streak = document.getElementById("streak");

    if (nama && user) {
        nama.innerHTML = user;
    }

    if (streak) {
        streak.innerHTML = hitungStreak();
    }

    tampilMood();
};