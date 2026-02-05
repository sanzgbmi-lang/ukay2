const SUPABASE_URL = "https://ozqyemgpjtvijnwdaemq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cXllbWdwanR2aWpud2RhZW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODY4ODYsImV4cCI6MjA4NTE2Mjg4Nn0.SQ_BpsgSQiTDGczS6oSXaDAXILTfghYvtGAm1fSKtCQ";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

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

async function signup() {

    setLoading("signupBtn", true);

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const { error } = await supabaseClient.auth.signUp({
        email,
        password
    });

    setLoading("signupBtn", true);

    document.getElementById("msg").innerText =
        error ? error.message : "Signup successful! You can log in.";
}

async function login() {

    setLoading("loginBtn", true);

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    setLoading("loginBtn", true);

    if (error) {
        document.getElementById("msg").innerText = error.message;
        return;
    }

    // Redirect after login
    window.location.href = "dashboard.html";
}
