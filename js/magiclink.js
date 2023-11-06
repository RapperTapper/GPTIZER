import { supa } from "../connection/supabase.js";

console.log(window.location.origin);

// Funktion, um Magic Link zu senden
async function sendMagicLink() {
    const emailInput = document.getElementById('emailInput').value;
    const { error } = await supa.auth.signIn({
        email: emailInput//,
        // options: {
        //     emailRedirectTo: 'https://gptizer.raphaelschnell.ch/profile-generator.html'
        //   }
        });
    
    if (error) {
        // console.error("Error sending magic link: ", error.message);
        message.textContent = "Please enter a valid email address.";
    } else {
        console.log("Magic link sent to ", emailInput);
        message.textContent = "A magic link has been sent to your email.";
    }
} 

// Funktion, um User Status zu aktualisieren
function updateUserStatus(user) {
  const userStatusElement = document.getElementById('userStatus');

  if (user) {
      userStatusElement.textContent = `→ Authenticated as: ${user.email}`;
  } else {
      userStatusElement.textContent = "→ Not authenticated while developing.";
  }
}

// Prüfe und zeige den initialen User Status an
const initialUser = supa.auth.user();
updateUserStatus(initialUser);

// Eventlistener für Magic Link Button
document.getElementById('sendMagicLinkButton').addEventListener('click', sendMagicLink);

// Listener, für Änderungen des Auth Status
// UserStatus wird aktualisiert, wenn sich der Auth Status ändert
// supa.auth.onAuthStateChange((event, session) => {
//   if (event === "SIGNED_IN") {
//       console.log("User signed in: ", session.user);
//       updateUserStatus(session.user);
//   } else if (event === "SIGNED_OUT") {
//       console.log("User signed out");
//       updateUserStatus(null);
//   }
// });
// neu mit abschnitt für redirect

checkUsername();
    async function checkUsername() {
        const { data, error } = await supa.from("user_data").select("name");
        if (data.name === null) {
            redirect("account-setup.html");
        } else {
            redirect("account.html");
        }
        console.log(data);  
    }

supa.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
        console.log("User signed in: ", session.user);
        updateUserStatus(session.user);
        // abfrage der Datenbank, ob bei user_data.name ein Eintrag vorhanden ist.
        // wenn ja, dann redirect auf account.html
        // wenn nicht, dann redirect auf account-setup.html
        }});

// 3. Logout Logik
async function logout() {
  const { error } = await supa.auth.signOut();
  if (error) {
      console.error("Error during logout:", error);
  } else {
      updateUserStatus(null);
      console.log("User logged out successfully.");
  }
}

document.getElementById('logoutButton').addEventListener('click', logout);