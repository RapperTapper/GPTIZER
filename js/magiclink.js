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
export function updateUserStatus(user) {
  const userStatusElement = document.getElementById('userStatus');
  if (user) {
      userStatusElement.textContent = `→ Authenticated as: ${user.email}`;
      console.log("userStatusChangeToAuthenticatedInActioin");
  } else {
      userStatusElement.textContent = `→ You are not authenticated.`;
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
function redirect(url) {
    window.location.href = url;
}



async function checkUsername(user, session) {
    console.log("checkUsername");
    console.log(user);
    console.log(session);
    console.log("Step 1: check if user has a nickname already");
    if (user) {
        //Explanation - the initialUser = session.user :)
        //console.log("initialUser.id")
        // console.log(initialUser.id);
        // console.log("session.user.id");
        // console.log(session.user.id);
        const { data } = await supa.from("user_data").select("nickname").eq('id', user.id).single();
        console.log("Step 2: check done. redirect to account-setup.html or account.html");
        console.log(data);
        logOutPagesToFalse(user);
        if (data.nickname === null) {
            redirect("account-setup.html");
            console.log("redirect to account-setup.html");
            console.log(data);
        } else {
            redirect("account.html");
            console.log("redirect to account.html");
            console.log(data);
        }
    } else {
        console.log("user not logged in");
    }
}

supa.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
        console.log("User signed in: ", session.user);
        updateUserStatus(session.user);
        // abfrage der Datenbank, ob bei user_data.name ein Eintrag vorhanden ist.
        // wenn ja, dann redirect auf account.html
        // wenn nicht, dann redirect auf account-setup.html
        checkUsername(session.user, session);
    }});


window.onload = async function(session) {
    // const currentSession = supa.auth.session();
    console.log("checked logOutStatus A");
    console.log(session);
    const actualUser = supa.auth.user();
    console.log(actualUser);
    if (actualUser === null) {
        console.log("user not logged in");
    } else {    
        console.log(actualUser.id);
        const { data } = await supa.from("user_data").select("loggedOut").eq('id', actualUser.id).single();
        console.log("checked logOutStatus B");
        console.log(data.loggedOut);
        if (data.loggedOut === true) {
            logout();
            console.log("logout command sent")
        } else {
        checkUsername(initialUser, session);
        }
    }
};

async function logOutPagesToFalse() {
    
    let session = supa.auth.session(); //supabase.auth.session changed to supa.auth.session
    const { error } = await supa
    .from('user_data')
    .update({ loggedOut: false })
    .eq('id', session.user.id);
}

// 3. Logout Logik
export async function logout() {
  const { error } = await supa.auth.signOut();
  console.log("logout in action")
  if (error) {
      console.error("Error during logout:", error);
  } else {
      updateUserStatus(null);
      console.log("User logged out successfully.");
  }
}

document.getElementById('logoutButton').addEventListener('click', logout);