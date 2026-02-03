const SUPABASE_URL = "https://ozqyemgpjtvijnwdaemq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cXllbWdwanR2aWpud2RhZW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODY4ODYsImV4cCI6MjA4NTE2Mjg4Nn0.SQ_BpsgSQiTDGczS6oSXaDAXILTfghYvtGAm1fSKtCQ";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

async function signup() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  document.getElementById("msg").innerText =
    error ? error.message : "Signup successful! You can log in.";
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    document.getElementById("msg").innerText = error.message;
    return;
  }

  // Redirect after login
  window.location.href = "dashboard.html";
}

