import { supa } from "../connection/supabase.js";

// import { updateUserStatus } from './magiclink.js';

// import { logout } from "./magiclink.js";

async function logOutPages() {
    // user_data.loggedOut = true;
    let session = supa.auth.session(); //supabase.auth.session changed to supa.auth.session
    const { error } = await supa
        .from('user_data')
        .update({ loggedOut: true })
        .eq('id', session.user.id);
    redirect('https://gptizer.raphaelschnell.ch/');
}  

function redirect(url) {
    window.location.href = url;
}

document.getElementById('logoutButtonPages').addEventListener('click', logOutPages);