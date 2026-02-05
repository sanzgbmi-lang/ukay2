async function loadProfile() {
  const { data: { user } } = await window.supabaseClient.auth.getUser();

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const { data, error } = await window.supabaseClient
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error) return;

  const badge = document.getElementById("roleBadge");
  badge.innerText = data.role;
  badge.classList.add(data.role);

  if (data.role === "admin") {
    document.getElementById("adminBtn").style.display = "block";
  }
}

async function logout() {
  await window.supabaseClient.auth.signOut();
  window.location.href = "index.html";
}

loadProfile();


