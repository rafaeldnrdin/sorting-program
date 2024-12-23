// QuickSort Implementation
function quicksortProduk(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)].harga;
  const left = arr.filter(item => item.harga < pivot);
  const middle = arr.filter(item => item.harga === pivot);
  const right = arr.filter(item => item.harga > pivot);

  return [...quicksortProduk(left), ...middle, ...quicksortProduk(right)];
}

// MergeSort Implementation
function mergesortProduk(arr) {
  if (arr.length <= 1) return arr;

  const middle = Math.floor(arr.length / 2);
  const left = mergesortProduk(arr.slice(0, middle));
  const right = mergesortProduk(arr.slice(middle));

  return mergeProduk(left, right);
}

function mergeProduk(left, right) {
  let result = [], i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i].harga < right[j].harga) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}

// Measure Execution Time
function ukurWaktu(algorithm, data) {
  const start = performance.now();
  const hasil = algorithm(data);
  const end = performance.now();
  return { waktu: end - start, hasil };
}

// Process Data and Generate Results
function prosesData() {
  const input = document.getElementById("produkInput").value.trim();

  // Split input berdasarkan koma dan proses setiap pasangan nama-harga
  const produk = input.split(",").map(item => {
    const parts = item.trim().split(" ");
    const harga = parseInt(parts.pop()); // Ambil elemen terakhir sebagai harga
    const nama = parts.join(" "); // Gabungkan sisanya sebagai nama
    return { nama: nama.trim(), harga: harga };
  });

  // Periksa validasi harga
  if (produk.some(item => isNaN(item.harga) || item.harga <= 0)) {
    alert("Format salah! Pastikan harga berupa angka positif. Contoh: 'Roti 5000, Air Mineral 2500'");
    return;
  }

  // QuickSort dan MergeSort
  const quicksortHasil = ukurWaktu(quicksortProduk, [...produk]);
  const mergesortHasil = ukurWaktu(mergesortProduk, [...produk]);

  // Grafik perbandingan waktu
  const ctx = document.getElementById("chart").getContext("2d");
  new Chart(ctx, {
    type: "line", // Line chart untuk tren
    data: {
      labels: produk.map(p => p.nama), // Nama produk pada sumbu X
      datasets: [
        {
          label: "QuickSort",
          data: produk.map(p => p.harga),
          borderColor: "blue",
          fill: false,
        },
        {
          label: "MergeSort",
          data: produk.map(p => p.harga),
          borderColor: "orange",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Harga Produk",
          },
        },
      },
    },
  });

  // Kesimpulan
  const summaryDiv = document.getElementById("summary");
  const quickerAlgorithm =
    quicksortHasil.waktu < mergesortHasil.waktu ? "QuickSort" : "MergeSort";
  const difference = Math.abs(
    quicksortHasil.waktu - mergesortHasil.waktu
  ).toFixed(2);

  summaryDiv.innerText = `
    Algoritma yang lebih cepat adalah ${quickerAlgorithm} dengan selisih waktu ${difference} ms.
    QuickSort memerlukan waktu ${quicksortHasil.waktu.toFixed(2)} ms, sedangkan MergeSort memerlukan waktu ${mergesortHasil.waktu.toFixed(2)} ms.
  `;
}
