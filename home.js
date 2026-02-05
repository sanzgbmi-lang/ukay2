const supabaseClient = window.supabaseClient;

async function protectPage() {
  const { data: { user } } = await supabaseClient.auth.getUser();

  if (!user) {
    // Not logged in → go to login page
    window.location.href = "index.html";
    return;
  }

  // Optional: user is logged in
  console.log("Logged in as:", user.email);
}

protectPage();

