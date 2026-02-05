const SUPABASE_URL = "https://ozqyemgpjtvijnwdaemq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cXllbWdwanR2aWpud2RhZW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODY4ODYsImV4cCI6MjA4NTE2Mjg4Nn0.SQ_BpsgSQiTDGczS6oSXaDAXILTfghYvtGAm1fSKtCQ";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// Show/hide different states
function showState(state) {
  const loadingState = document.getElementById('loadingState');
  const profileSection = document.getElementById('profileSection');
  const errorState = document.getElementById('errorState');

  // Hide all states
  loadingState.style.display = 'none';
  profileSection.style.display = 'none';
  errorState.style.display = 'none';

  // Show requested state
  switch(state) {
    case 'loading':
      loadingState.style.display = 'flex';
      break;
    case 'profile':
      profileSection.style.display = 'block';
      break;
    case 'error':
      errorState.style.display = 'flex';
      break;
  }
}

// Format date nicely
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short' };
  return date.toLocaleDateString('en-US', options);
}

// Load user profile
async function loadProfile() {
  showState('loading');

  try {
    // Get current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError) throw userError;
    
    if (!user) {
      // Not authenticated, redirect to login
      window.location.href = "index.html";
      return;
    }

    // Update UI with user email
    document.getElementById('userEmail').textContent = user.email;
    
    // Format and display member since date
    if (user.created_at) {
      document.getElementById('memberSince').textContent = formatDate(user.created_at);
    }

    // Try to get role from profiles table
    try {
      const { data: profileData, error: profileError } = await supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        // If profiles table doesn't exist or no role found, use default
        console.warn('Profile fetch warning:', profileError.message);
        document.getElementById('userRole').textContent = 'User';
      } else if (profileData && profileData.role) {
        // Capitalize role
        const role = profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1);
        document.getElementById('userRole').textContent = role;
      } else {
        document.getElementById('userRole').textContent = 'User';
      }
    } catch (profileErr) {
      console.warn('Profile table error:', profileErr);
      document.getElementById('userRole').textContent = 'User';
    }

    // Show profile section
    showState('profile');

  } catch (error) {
    console.error('Error loading profile:', error);
    
    // Show error state
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = error.message || 'Unable to load your profile. Please try again.';
    showState('error');
  }
}

// Logout function
async function logout() {
  const logoutBtn = document.getElementById('logoutBtn');
  
  // Disable button and show loading
  logoutBtn.disabled = true;
  logoutBtn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" opacity="0.25"></circle>
      <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
      </path>
    </svg>
    <span>Logging out...</span>
  `;

  try {
    await supabaseClient.auth.signOut();
    window.location.href = "index.html";
  } catch (error) {
    console.error('Logout error:', error);
    alert('Failed to logout. Please try again.');
    
    // Restore button
    logoutBtn.disabled = false;
    logoutBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
      <span>Logout</span>
    `;
  }
}

// Listen for auth state changes
supabaseClient.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    window.location.href = 'index.html';
  }
});

// Load profile on page load
loadProfile();

// Add click handlers for action cards (you can customize these)
document.addEventListener('DOMContentLoaded', () => {
  const actionCards = document.querySelectorAll('.action-card');
  
  actionCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      const actions = [
        'Edit Profile',
        'Security Settings',
        'General Settings',
        'Help & Support'
      ];
      
      // For now, just show an alert
      // You can replace this with actual navigation or modals
      console.log(`Clicked: ${actions[index]}`);
      
      // Example: You could navigate to different pages
      // window.location.href = `${actions[index].toLowerCase().replace(' ', '-')}.html`;
    });
  });
});
