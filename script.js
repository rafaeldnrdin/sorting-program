// QuickSort Implementation
function quicksort(arr) {
  if (arr.length <= 1) return arr;
  const pivotIndex = Math.floor(Math.random() * arr.length);
  const pivot = arr[pivotIndex];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quicksort(left), ...middle, ...quicksort(right)];
}

// MergeSort Implementation
function mergesort(arr) {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length / 2);
  const left = mergesort(arr.slice(0, middle));
  const right = mergesort(arr.slice(middle));
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}

// Generate Large Input
function generateLargeInput(size) {
  const products = [];
  for (let i = 1; i <= size; i++) {
    products.push(`Produk${i} ${i * 100}`);
  }
  return products.join(", ");
}

// Validate Input
function validateInput(input) {
  const regex = /([A-Za-z0-9 ]+) (\d+)/g;
  const matches = [...input.matchAll(regex)];
  if (matches.length === 0) {
    alert("Format tidak valid. Gunakan format: 'Nama Harga', contoh: 'Roti 2000'");
    return false;
  }
  return matches.map(match => ({ name: match[1].trim(), price: parseInt(match[2], 10) }));
}

// Measure Execution Time
function measureTime(algorithm, data) {
  const start = performance.now();
  const sorted = algorithm(data.map(item => item.price));
  const end = performance.now();
  return { time: end - start, sorted };
}

// Visualize Comparison
function visualizeComparison(results) {
  const ctx = document.getElementById("chart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: results.labels,
      datasets: [
        {
          label: "QuickSort Execution Time (ms)",
          data: results.quickSort.times,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: false,
          tension: 0,
        },
        {
          label: "MergeSort Execution Time (ms)",
          data: results.mergeSort.times,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: false,
          tension: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Data Ke",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Execution Time (ms)",
          },
        },
      },
    },
  });
}

// Display Conclusion
function displayConclusion(quickTimes, mergeTimes) {
  const quickAvg = quickTimes.reduce((a, b) => a + b, 0) / quickTimes.length;
  const mergeAvg = mergeTimes.reduce((a, b) => a + b, 0) / mergeTimes.length;

  document.getElementById("quicksortConclusion").textContent = 
    `QuickSort rata-rata eksekusi dalam ${quickAvg.toFixed(2)} ms.`;
  document.getElementById("mergesortConclusion").textContent = 
    `MergeSort rata-rata eksekusi dalam ${mergeAvg.toFixed(2)} ms.`;

  if (quickAvg < mergeAvg) {
    document.getElementById("quicksortConclusion").textContent += 
      " QuickSort lebih cepat dibandingkan MergeSort.";
  } else if (quickAvg > mergeAvg) {
    document.getElementById("mergesortConclusion").textContent += 
      " MergeSort lebih cepat dibandingkan QuickSort.";
  } else {
    document.getElementById("quicksortConclusion").textContent += 
      " Keduanya memiliki waktu eksekusi yang hampir sama.";
  }
}

// Event Listener for Generate Large Input
document.getElementById("generateLargeInputBtn").addEventListener("click", () => {
  const largeInput = generateLargeInput(1000); // Generate input with 1000 elements
  document.getElementById("dataInput").value = largeInput; // Fill the textarea with generated input
});

// Event Listener for Compare Button
document.getElementById("compareBtn").addEventListener("click", () => {
  const input = document.getElementById("dataInput").value;
  const data = validateInput(input);
  if (!data) return;

  const quickTimes = [];
  const mergeTimes = [];
  for (let i = 1; i <= 5; i++) {
    const quickResult = measureTime(quicksort, data);
    quickTimes.push(quickResult.time);

    const mergeResult = measureTime(mergesort, data);
    mergeTimes.push(mergeResult.time);
  }

  visualizeComparison({
    labels: ["1", "2", "3", "4", "5"],
    quickSort: { times: quickTimes },
    mergeSort: { times: mergeTimes },
  });

  displayConclusion(quickTimes, mergeTimes);
});
