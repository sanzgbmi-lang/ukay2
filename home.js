async function protectHome() {
  const { data: { user } } =
    await window.supabaseClient.auth.getUser();

  if (!user) {
    window.location.replace("index.html");
    return;
  }
}

const tabs = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach(t => t.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

function goToDashboard() {
  window.location.href = "dashboard.html";
}

protectHome();
