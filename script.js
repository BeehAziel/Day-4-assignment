const noteText = document.querySelector("#note-text");
const charCount = document.querySelector("#char-count");
const wordCount = document.querySelector("#word-count");
const clearButton = document.querySelector("#clear-btn");
const themeToggle = document.querySelector("#theme-toggle");

function updateCounts() {
  const text = noteText.value;
  const characterTotal = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  charCount.textContent = `${characterTotal} / 200 characters`;
  wordCount.textContent = `${words} words`;

  charCount.classList.toggle("warning", characterTotal > 180);
  charCount.classList.toggle("over", characterTotal > 200);
}

function clearNote() {
  noteText.value = "";
  localStorage.removeItem("quickNotesDraft");
  updateCounts();
}

function updateThemeLabel() {
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "Light mode"
    : "Dark mode";
}

// Restore saved draft and theme on page load.
noteText.value = localStorage.getItem("quickNotesDraft") || "";

if (localStorage.getItem("quickNotesTheme") === "dark") {
  document.body.classList.add("dark");
}

updateThemeLabel();
updateCounts();

// Update counters and save the draft whenever the text changes.
noteText.addEventListener("input", () => {
  updateCounts();
  localStorage.setItem("quickNotesDraft", noteText.value);
});

clearButton.addEventListener("click", clearNote);

noteText.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    clearNote();
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("quickNotesTheme", theme);
  updateThemeLabel();
});