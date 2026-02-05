const SUPABASE_URL = "https://ozqyemgpjtvijnwdaemq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cXllbWdwanR2aWpud2RhZW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODY4ODYsImV4cCI6MjA4NTE2Mjg4Nn0.SQ_BpsgSQiTDGczS6oSXaDAXILTfghYvtGAm1fSKtCQ";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// Enhanced loading state with spinner animation
function setLoading(buttonId, isLoading) {
    const btn = document.getElementById(buttonId);
    const msg = document.getElementById("msg");
    
    if (isLoading) {
        btn.disabled = true;
        btn.classList.add('loading');
        // Clear previous messages when starting new action
        msg.textContent = '';
        msg.className = 'message';
    } else {
        btn.disabled = false;
        btn.classList.remove('loading');
    }
}

// Display message with appropriate styling
function showMessage(text, type = 'error') {
    const msg = document.getElementById("msg");
    msg.textContent = text;
    msg.className = `message ${type}`;
}

// Signup function
async function signup(event) {
    if (event) event.preventDefault();
    
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    
    // Validation
    if (!email || !password) {
        showMessage("Please enter both email and password", "error");
        return;
    }
    
    if (password.length < 8) {
        showMessage("Password must be at least 8 characters long", "error");
        return;
    }
    
    setLoading("signupBtn", true);
    
    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password
        });
        
        if (error) throw error;
        
        // Success
        showMessage("Signup successful! Check your email to verify your account.", "success");
        
        // Clear form
        document.getElementById("signupEmail").value = '';
        document.getElementById("signupPassword").value = '';
        
        // Optional: Auto-focus login email field
        setTimeout(() => {
            document.getElementById("email").value = email;
            document.getElementById("email").focus();
        }, 2000);
        
    } catch (error) {
        showMessage(error.message || "Signup failed. Please try again.", "error");
    } finally {
        setLoading("signupBtn", false);
    }
}

// Login function
async function login(event) {
    if (event) event.preventDefault();
    
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    
    // Validation
    if (!email || !password) {
        showMessage("Please enter both email and password", "error");
        return;
    }
    
    setLoading("loginBtn", true);
    
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        
        // Success
        showMessage("Login successful! Redirecting...", "success");
        
        // Redirect after short delay
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
        
    } catch (error) {
        showMessage(error.message || "Login failed. Please check your credentials.", "error");
        setLoading("loginBtn", false);
    }
}

// Clear error messages when user starts typing
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const msg = document.getElementById('msg');
            if (msg.textContent && msg.classList.contains('error')) {
                msg.textContent = '';
                msg.className = 'message';
            }
        });
    });
    
    // Check if user is already logged in
    checkAuthStatus();
});

// Check authentication status on page load
async function checkAuthStatus() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    
    if (session) {
        // User is already logged in, redirect to dashboard
        window.location.href = "dashboard.html";
    }
}

// Handle Enter key press in inputs
document.addEventListener('DOMContentLoaded', () => {
    // Login form
    const loginInputs = [
        document.getElementById('email'),
        document.getElementById('password')
    ];
    
    loginInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                login(e);
            }
        });
    });
    
    // Signup form
    const signupInputs = [
        document.getElementById('signupEmail'),
        document.getElementById('signupPassword')
    ];
    
    signupInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                signup(e);
            }
        });
    });
});
