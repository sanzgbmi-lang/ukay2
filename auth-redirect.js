async function redirectIfLoggedIn() {
  const { data: { user } } =
    await window.supabaseClient.auth.getUser();

  if (user) {
    window.location.replace("home.html");
  }
}

redirectIfLoggedIn();
