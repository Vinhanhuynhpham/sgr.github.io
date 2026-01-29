const toggleButton = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark-mode");
  }

  toggleButton.addEventListener("click", (e) => {
  // Dark mode toggle
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Tạo ripple
  const ripple = document.createElement("span");
  ripple.classList.add("ripple-effect");

  // Lấy vị trí click
  const rect = toggleButton.getBoundingClientRect();
  ripple.style.left = `${e.clientX - rect.left}px`;
  ripple.style.top = `${e.clientY - rect.top}px`;

  toggleButton.appendChild(ripple);

  // Xoá sau animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
});

