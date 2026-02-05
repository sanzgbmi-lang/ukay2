const supabaseClient = window.supabase.createClient(
    window.SUPABASE_CONFIG.url,
    window.SUPABASE_CONFIG.anonKey
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
    window.location.href = "home.html";
}
