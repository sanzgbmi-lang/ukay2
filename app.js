function setLoading(buttonId, isLoading) {
  const btn = document.getElementById(buttonId);

  if (isLoading) {
    btn.disabled = true;
    btn.dataset.text = btn.innerText;
    btn.innerText = "Loading...";
  } else {
    btn.disabled = false;
    btn.innerText = btn.dataset.text;
  }
}

async function signup(event) {
  event.preventDefault();

  setLoading("signupBtn", true);

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const { error } = await window.supabaseClient.auth.signUp({
    email,
    password
  });

  setLoading("signupBtn", false);

  document.getElementById("msg").innerText =
    error
      ? error.message
      : "Signup successful! Please check your email to confirm.";
}

async function login(event) {
  event.preventDefault();

  setLoading("loginBtn", true);

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await window.supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  setLoading("loginBtn", false);

  if (error) {
    document.getElementById("msg").innerText = error.message;
    return;
  }

  window.location.replace("home.html");
}
