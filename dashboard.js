async function loadDashboard() {
    // 1. Get logged-in user
    const { data: { user } } =
    await window.supabaseClient.auth.getUser();

    if (!user) {
        window.location.replace("index.html");
        return;
    }

    // 2. Show email
    document.getElementById("userEmail").innerText = user.email;

    // 3. Get role from profiles table
    const { data, error } = await window.supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    // 4. Show admin button if admin
    if (data.role === "admin") {
        const adminBtn = document.getElementById("adminBtn");
        adminBtn.style.display = "block";
        adminBtn.removeAttribute("aria-hidden");
    }
}

async function logout() {
    await window.supabaseClient.auth.signOut();
    window.location.replace("index.html");
}

loadDashboard();
