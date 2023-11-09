import { supa } from "../connection/supabase.js";

const initialUser = supa.auth.user();
console.log(initialUser);

document.getElementById('saveAccountEntries').addEventListener('click', saveAccountEntries);

let isNicknameUpdated = true;

async function saveAccountEntries() {
    console.log('saveAccountEntries');
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
    document.getElementById('saveAccountEntries').innerHTML = '<i>Saving...</i>';
    try {
        const { check_nickname, error: error_nickname } = await supa
            .from('user_data')
            .update({ nickname: nickname_input.value })
            .eq('id', initialUser.id);
        if (error_nickname) { 
            document.getElementById('saveAccountEntries').innerHTML = 'Save';
            isNicknameUpdated = false;
            throw error_nickname;
        } else {
            console.log('nickname updated');
        }
    }   catch (error_nickname) {
            console.log(error_nickname.message);
            alert('Nickname already exists');
            console.log('Nickname already exists');
        }
    }
    if (isNicknameUpdated == true) {
        try {
            const { data, error } = await supa
                .from('user_data')
                .update({ name: name_input.value, surname: surname_input.value, profession: profession_input.value })
                .eq('id', initialUser.id);
            if (error) { 
                document.getElementById('saveAccountEntries').innerHTML = 'Save';
                throw error;
            } else {
                document.getElementById('saveAccountEntries').innerHTML = 'Update';
                console.log('user_data updated');
            }
        }   catch (error) {
            console.log(error.message);
            alert('Something went wrong');
            console.log('Something went wrong');
            document.getElementById('saveAccountEntries').innerHTML = 'Save';
        }
    }
    isNicknameUpdated = true;
}
    
    // const { data, error } = await supa
    //     .from('user_data')
    //     .update({
    //         username: 'name',
    //         surname: 'surname',
    //         profession: 'profession',
    //         nickname: 'nickname'
    //     })
    //     .eq('id', initialUser.id);
    
    
        // structure needed?
    // if (data.length == 0) {
    //     const { data, error } = await supa
    //         .from('user_data')
    //         .insert([
    //             { id: initialUser.id, loggedOut: false, accountSetup: true }
    //         ]);
    // } else {
    //     const { data, error } = await supa
    //         .from('user_data')
    //         .update({ accountSetup: true })
    //         .eq('id', initialUser.id);
    // }

function redirect(url) {
    window.location.href = url;
}