import { supa } from "../connection/supabase.js";

// 3. Logout Logik
async function logout() {
    console.log('Logout button clicked');
    const { error } = await supa.auth.signOut();
    if (error) {
        console.error("Error during logout:", error);
    } else {
        updateUserStatus(null);
        console.log("User logged out successfully.");
    }
}

document.getElementById('logoutButton').addEventListener('click', logout);