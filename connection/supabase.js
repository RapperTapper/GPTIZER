console.log("Initialisierung Supabase");

// Supabase Initialisierung
const supabaseUrl = 'https://gpqouxszigofgdxszbuu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwcW91eHN6aWdvZmdkeHN6YnV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4NDQxNzYsImV4cCI6MjAxMjQyMDE3Nn0.a8uCxjG2p0zLn7MlSGFtodKa-6zbhzx8OXW3HO6bPNE'
// const supabaseUrl = 'https://zuryshnbvjntfyvyjuqs.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cnlzaG5idmpudGZ5dnlqdXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0NDU3MDYsImV4cCI6MjAxMzAyMTcwNn0.fc1_NMQZJUg5Azv2hmsmAnCbGnWJh0dXvvTjG_ahf94'
const supa = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
    },
});

export { supa }