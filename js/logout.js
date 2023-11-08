import { supa } from "../connection/supabase.js";

// import { updateUserStatus } from './magiclink.js';

// import { logout } from "./magiclink.js";

async function logOutPages() {
    // user_data.loggedOut = true;
    const { data, error } = await supabase
        .from('user_data')
        .update({ loggedOut: true })
        .eq('id', user_id);
    redirect('https://gptizer.raphaelschnell.ch/');
}  

document.getElementById('logoutButtonPages').addEventListener('click', logOutPages);