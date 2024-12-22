// QuickSort implementation
function quicksort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quicksort(left), ...middle, ...quicksort(right)];
}

// MergeSort implementation
function mergesort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
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

// Function to measure execution time
function measureTime(algorithm, data) {
  const start = performance.now();
  algorithm(data.slice()); // Clone the array to avoid modifying the original data
  const end = performance.now();
  return end - start; // Time in milliseconds
}

// Generate data based on type
function generateData(size, type) {
  const data = Array.from({ length: size }, () => Math.floor(Math.random() * 10000));
  if (type === "sorted") return data.sort((a, b) => a - b);
  if (type === "reversed") return data.sort((a, b) => b - a);
  return data;
}

// Generate and display graph
function generateAndDisplayGraph() {
  const sizesInput = document.getElementById("sizesInput").value;

  // Validasi input: hanya terima angka positif dan non-nol
  const sizes = sizesInput.split(",")
    .map(Number)
    .filter(size => size > 0 && size <= 100000 && !isNaN(size)); // Abaikan nilai yang tidak valid

  if (sizes.length === 0) {
    alert("Input ukuran data tidak valid! Harus berupa bilangan bulat positif dan <= 100000.");
    return;
  }

  const quicksortTimes = { random: [], sorted: [], reversed: [] };
  const mergesortTimes = { random: [], sorted: [], reversed: [] };

  sizes.forEach(size => {
    ["random", "sorted", "reversed"].forEach(type => {
      const data = generateData(size, type);

      quicksortTimes[type].push(measureTime(quicksort, data));
      mergesortTimes[type].push(measureTime(mergesort, data));
    });
  });

  // Reset the canvas for the new chart
  const chartContainer = document.getElementById("chart-container");
  chartContainer.innerHTML = '<canvas id="chart"></canvas>';

  // Display the chart
  const ctx = document.getElementById("chart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: sizes,
      datasets: [
        {
          label: "QuickSort (acak)",
          data: quicksortTimes.random,
          borderColor: "blue",
          fill: false,
        },
        {
          label: "MergeSort (acak)",
          data: mergesortTimes.random,
          borderColor: "orange",
          fill: false,
        },
        {
          label: "QuickSort (terurut)",
          data: quicksortTimes.sorted,
          borderColor: "green",
          fill: false,
        },
        {
          label: "MergeSort (terurut)",
          data: mergesortTimes.sorted,
          borderColor: "red",
          fill: false,
        },
        {
          label: "QuickSort (terbalik)",
          data: quicksortTimes.reversed,
          borderColor: "purple",
          fill: false,
        },
        {
          label: "MergeSort (terbalik)",
          data: mergesortTimes.reversed,
          borderColor: "brown",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Perbandingan Kinerja QuickSort vs MergeSort",
        },
      },
    },
  });
}
