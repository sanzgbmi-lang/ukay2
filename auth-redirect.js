const supabaseClient = window.supabaseClient;

async function redirectIfLoggedIn() {
  const { data: { user } } = await supabaseClient.auth.getUser();

  if (user) {
    window.location.replace("home.html");
  }
}

redirectIfLoggedIn();

