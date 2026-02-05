const SUPABASE_URL = "https://ozqyemgpjtvijnwdaemq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cXllbWdwanR2aWpud2RhZW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODY4ODYsImV4cCI6MjA4NTE2Mjg4Nn0.SQ_BpsgSQiTDGczS6oSXaDAXILTfghYvtGAm1fSKtCQ";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

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
