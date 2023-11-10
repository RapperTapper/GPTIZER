// Desc: Global functions for the site
import { supa } from "../connection/supabase.js";

export function redirect(url) {
    window.location.href = url;
}

export function checkNicknameCharacters() {
    let nickname_input = document.getElementById('nickname');
    let pattern = /^[A-Za-z0-9-_.]*$/; // Allow empty string - so no error message is shown
    // let pattern = /^[A-Za-z0-9-_.]+$/; // Do not allow empty string
    if (!pattern.test(nickname_input.value)) {
        alert('Invalid characters in nickname. Only A-Z, a-z, 0-9, -, _ and . are allowed.');
        nickname_input.value = nickname_input.value.replace(/[^A-Za-z0-9-_.]/g, '');
    }
}

export async function logOutPagesToFalse() {
    let session = supa.auth.session(); //supabase.auth.session changed to supa.auth.session
    const { error } = await supa
    .from('user_data')
    .update({ loggedOut: false })
    .eq('id', session.user.id);
}