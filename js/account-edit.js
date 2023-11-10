import { supa } from "../connection/supabase.js";
import { redirect } from "./global-functions.js";
import { checkNicknameCharacters } from "./global-functions.js";

import { logOutPagesToFalse } from "./account.js";


const initialUser = supa.auth.user();
console.log(initialUser);
console.log(initialUser.id);

document.getElementById('updateAccountEntries').addEventListener('click', updateAccountEntries);
// document.getElementById('loadAccountEntries').addEventListener('click', loadAccountEntries);
document.getElementById('nickname').addEventListener('input', checkNicknameCharacters);

let isNicknameUpdated = true;

window.onload = async function() {
// async function loadAccountEntries() {
    console.log("check if user_data.entries exist");
    const initialUser = supa.auth.user();
    console.log(initialUser.id);
    logOutPagesToFalse(initialUser);
    if (initialUser) {
        console.log(initialUser.id);
        const { data : [theActiveUser] } = await supa
            .from('user_data')
            // .select("*")
            .select(`name,surname,nickname,profession`)
            .eq('id', initialUser.id);
        // const { data, error } = await supa.from("user_data").select(["name","surname","nickname","profession"]).eq('id', initialUser.id);
        // const { active_user } = await supa.from("user_data").select(["name", "surname", "nickname", "profession"]).eq('id', initialUser.id);
        console.log("Next Level: Data_load done");
        console.log(theActiveUser);
        if (theActiveUser.nickname === null) {
            console.log("No nickname found. User has to setup account.");
        } else {
            console.log("Nickname found. User has already setup account. Now going to display account entries");
            console.log(theActiveUser);
            document.getElementById('username').value = theActiveUser.name;
            document.getElementById('usersurname').value = theActiveUser.surname;
            document.getElementById('nickname').value = theActiveUser.nickname;
            document.getElementById('profession').value = theActiveUser.profession;
            document.getElementById('updateAccountEntries').innerHTML = 'Update';
        }
    } else {
        console.log("user not logged in");
        redirect("index.html");
    }
}

async function updateAccountEntries() {
    console.log('updateAccountEntries');
    let name_input = document.getElementById('username');
    console.log(name_input.value);
    let surname_input = document.getElementById('usersurname');
    console.log(surname_input.value);
    let nickname_input = document.getElementById('nickname');
    console.log(nickname_input.value);
    let profession_input = document.getElementById('profession');
    console.log(profession_input.value);
    if (name_input.value == '' || surname_input.value == '' || nickname_input.value == '' || profession_input.value == '' ) {
        alert('Please fill out all fields');
        console.log('Please fill out all fields');   
    } else {
    // check if nickname already exists
        document.getElementById('updateAccountEntries').innerHTML = '<i>Updating...</i>';
        try {
            const { check_nickname, error: error_nickname } = await supa
                .from('user_data')
                .update({ nickname: nickname_input.value })
                .eq('id', initialUser.id);
            if (error_nickname) { 
                document.getElementById('updateAccountEntries').innerHTML = 'Update';
                isNicknameUpdated = false;
                throw error_nickname;
            } else {
                console.log('nickname updated');
            }
        }   catch (error_nickname) {
                console.log(error_nickname.message);
                alert('Nickname already exists! Please choose another one.');
                console.log('Nickname already exists');
            }
        if (isNicknameUpdated == true) {
            try {
                const { data, error } = await supa
                    .from('user_data')
                    .update({ name: name_input.value, surname: surname_input.value, profession: profession_input.value })
                    .eq('id', initialUser.id);
                if (error) { 
                    document.getElementById('updateAccountEntries').innerHTML = 'Update';
                    throw error;
                } else {
                    document.getElementById('updateAccountEntries').innerHTML = 'Update';
                    console.log('user_data updated');
                    updateMessage.textContent = "Account has been updated.";
                }
            }   catch (error) {
                console.log(error.message);
                alert('Something went wrong');
                console.log('Something went wrong');
                document.getElementById('updateAccountEntries').innerHTML = 'Update';
            }
        }
    }
    isNicknameUpdated = true;
}
