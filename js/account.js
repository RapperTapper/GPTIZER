import { supa } from "../connection/supabase.js";

const initialUser = supa.auth.user();
console.log(initialUser);

export async function logOutPagesToFalse() {
    let session = supa.auth.session(); //supabase.auth.session changed to supa.auth.session
    console.log("logOutPagesToFalse - Session", session);
    const { error } = await supa
    .from('user_data')
    .update({ loggedOut: false })
    .eq('id', session.user.id);
    const { data } = await supa.from("user_data").select("loggedOut").eq('id', initialUser.id).single();
    console.log("checked logOutStatus:", data.loggedOut);
}

window.onload = async function() {
    const initialUser = supa.auth.user();
    console.log(initialUser);
    logOutPagesToFalse(initialUser);
}