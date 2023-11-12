import { supa } from "../connection/supabase.js";

document.getElementById("generate-prompt").addEventListener("click", generatePrompt);
document.getElementById("reset-profile").addEventListener("click", resetProfile);
document.getElementById("delete-profile").addEventListener("click", deleteProfile);
document.getElementById("save-profile").addEventListener("click", saveProfile);

const initialUser = supa.auth.user();
let profileName = document.getElementById("profile-name");
let Description = document.getElementById("profile-description");
let inputUserInstruction = document.getElementById("input-user-instructions");
let typeSelect = document.getElementById("type");
let answerLanguageSelect = document.getElementById("answer-language");
let areaOfUseSelect = document.getElementById("area-of-use");
let answerLength = document.getElementById("answer-length");
let inputPrompt = document.getElementById("input-prompt");

//
let profileId = null;
console.log("profileId: ", profileId);

loadSelectOptions();

const loadScript = (FILE_URL, async = true, type = "text/javascript") => {
    return new Promise((resolve, reject) => {
        try {
            const scriptEle = document.createElement("script");
            scriptEle.type = type;
            scriptEle.async = async;
            scriptEle.src =FILE_URL;
            //scriptEle.addEventListener("load", (ev) => {
            scriptEle.addEventListener("load", () => {
                resolve({ status: true });
            });
            //scriptEle.addEventListener("error", (ev) => {
            scriptEle.addEventListener("error", () => {
                reject({
                    status: false,
                    message: `Failed to load the script ${FILE_URL}`
                });
            });

            document.body.appendChild(scriptEle);
        } catch (error) {
            reject(error);
        }
    });
};


async function loadSelectOptions() {
    const { data : typedata, error : typeerror } = await supa.from("type").select("*").order('id');
    if (typeerror) {
        console.error(typeerror);
        return;
    } 

    for (const type of typedata) {
        const option = document.createElement("option");
        option.value = type.id;
        option.textContent = type.type;
        typeSelect.appendChild(option);
        console.log(type);
    }

    console.log(typedata);

    const { data: languagedata, error: languageerror } = await supa.from("answer_language").select("*").order('id');
    if (languageerror) {
        console.error(languageerror);
        return;
    } 

    for (const language of languagedata) {
        const option = document.createElement("option");
        option.value = language.id;
        option.textContent = language.answerLanguage;
        answerLanguageSelect.appendChild(option);
        console.log(language);
    }

    console.log(languagedata);

    const { data: areaOfUsedata, error: areaofuseerror } = await supa.from("area_of_use").select("*").order('id');
    if (areaofuseerror) {
        console.error(areaofuseerror);
        return;
    }

    for (const areaOfUseObject of areaOfUsedata) {
        const option = document.createElement("option");
        option.value = areaOfUseObject.id;
        option.textContent = areaOfUseObject.areaOfUse;
        areaOfUseSelect.appendChild(option);
        console.log(areaOfUseObject);
    }

    console.log(areaOfUsedata);
    
    loadScript("./js/dropdown-select.js")
    .then( data  => {
    console.log("Script loaded successfully", data);
    })
    .catch( err => {
        console.error(err);
    });

}

function generatePrompt() {
    // generate prompt based on user input
    console.log("generatePrompt started");
    
    // check if there is a prompt already
    if (inputPrompt.value !== "") {
        var userConfirmation = confirm("Do You want to override the existing prompt?");
        if (userConfirmation == true) {
        // User clicked "OK", put your code here
        } else {
        // User clicked "Cancel", put your code here
    }
        return;
    }   
    console.log("generatePrompt after prompt check");

    // check if those fields are filled
    // if (profileName.value === "") {
    //     alert("Please fill in a profile name.");
    //     return;
    // }
    // if (Description.value === "") {
    //     alert("Please fill in a short description.");
    //     return;
    // }
    if (inputUserInstruction.value === "") {
        alert("Please fill in a user instruction.");
        console.log(inputUserInstruction.value)
        return;
    }
    if (typeSelect.value === "") {
        alert("Please select a type.");
        console.log(typeSelect.value)
        return;
    }
    if (answerLanguageSelect.value === "") {
        alert("Please select an answer language.");
        console.log(answerLanguageSelect.value)
        return;
    }
    if (areaOfUseSelect.value === "") {
        alert("Please select an area of use.");
        console.log(areaOfUseSelect.value)
        return;
    }
    if (answerLength.value === "") {
        alert("Please fill in an answer length.");
        console.log(answerLength.value)
        return;
    }
    
    // generate prompt
    let typeSelectText = type.options[type.selectedIndex].textContent;
    console.log(typeSelectText);
    let answerLanguageSelectText = answerLanguageSelect.options[answerLanguageSelect.selectedIndex].textContent;
    console.log(answerLanguageSelectText);
    let areaOfUseSelectText = areaOfUseSelect.options[areaOfUseSelect.selectedIndex].textContent;
    console.log(areaOfUseSelectText);

    inputPrompt.value = "#This is a customized prompt for individual instructions.\nBased on the following user inputs, please generate an appropriate text: \nSpecific Details or Instructions: " + inputUserInstruction.value + "\nLanguage to be Used: " + answerLanguageSelectText + "\nType of text: " + areaOfUseSelectText + "\nText Category: " + typeSelectText + "\nDesired text length: " + answerLength.value + "\nThank you for your help!"; 

    console.log("generatePrompt ended");
}

function resetProfile() {
    console.log("resetProfile started");
        // Select the form
    var form = document.getElementById('profile-generator-form');
        // Check if form exists
    // if(form){
    // // Reset all selector fields in the form
    //     // for (var i = 0; i < form.elements.length; i++) {
    //     //         // For select elements
    //     //     if(form.elements[i].tagName == "SELECT") {
    //     //         form.elements[i].selectedIndex = 0;
    //     //     }
    //     document.getElementById("type").value = 0;
    //     document.getElementById("answer-language").value = 0;
    //     document.getElementById("area-of-use").value = 0;
    // } else {
    //     console.log("Form with id 'profile-generator-form' not found");
    // }
    // if(form){
    //     // Find the select element
    //     var typeSelect = document.getElementById("type");
    //     // Find the option with value 0
    //     var optionToSelect = Array.from(typeSelect.options).find(option => option.value === '1');
    //     // Set the option as selected
    //     if (optionToSelect) {
    //         typeSelect.value = optionToSelect.value;
    //     }
    //     // document.getElementById("answer-language").value = 0;
    //     // document.getElementById("area-of-use").value = 0;
    // } else {
    //     console.log("Form with id 'profile-generator-form' not found");
    // }

    // reset profile to default values = null
    
    document.getElementById("profile-name").value = "";
    document.getElementById("profile-description").value = "";
    document.getElementById("input-user-instructions").value = "";
    //those dropdown-reset are not working jet.
        // document.getElementById("type").value = "";
        // document.getElementById("answer-language").value = "";
        // document.getElementById("area-of-use").value = "";
    document.getElementById("answer-length").value = "";
    document.getElementById("input-prompt").value = "";

    console.log("resetProfile done for none dropdowns");
    // profileName.value = "";
    // Description.value = "";
    // inputUserInstruction.value = "";
    // typeSelect.value = "";
    // answerLanguageSelect.value = "";
    // areaOfUseSelect.value = "";
    // answerLength.value = "";
    // inputPrompt.value = "";
}    

function deleteProfile() {
    console.log("deleteProfile started");
    if (profileId && initialUser.id) {
        supa
            .from('profile')
            .delete()
            .match({ id: profileId, user_id: initialUser.id })
            .then(response => {
                if (response.error) {
                    console.error('Error deleting profile:', response.error);
                } else {
                    console.log('Profile deleted successfully');
                    resetProfile();
                }
            });
    } else {
        alert("Have you saved this Profile bevore? If not, there is noting to delete yet.");
        console.error('Profile ID or User ID is missing');
    }
}

async function saveProfile() {
    // check if those fields are filled
    if (profileName.value === "") {
        alert("Please fill in a profile name.");
        return;
    }
    if (Description.value === "") {
        alert("Please fill in a short description.");
        return;
    }
    if (inputUserInstruction.value === "") {
        alert("Please fill in a user instruction.");
        return;
    }
    if (typeSelect.value === "") {
        alert("Please select a type.");
        return;
    }
    if (answerLanguageSelect.value === "") {
        alert("Please select an answer language.");
        return;
    }
    if (areaOfUseSelect.value === "") {
        alert("Please select an area of use.");
        return;
    }
    if (answerLength.value === "") {
        alert("Please fill in an answer length.");
        return;
    }
    if (inputPrompt.value === "") {
        alert("Please write or generate a prompt first.");
        return;
    }
    console.log(inputPrompt.value);
    console.log("saveProfile started");
    // save profile to database
    const { data, error } = await supa
        .from('profile')
        .insert({
            user_id: initialUser.id,
            name: profileName.value,
            description: Description.value,
            user_instruction: inputUserInstruction.value,
            type_id: typeSelect.value,
            answer_language_id: answerLanguageSelect.value,
            area_of_use_id: areaOfUseSelect.value,
            answer_length: answerLength.value,
            prompt: inputPrompt.value
        })
        .single();

    if (error) {
        console.error(error);
        alert("Error while generating profile");
        return;
    } else {
        console.log('Inserted profile id: ', data.id);
        profileId = data.id;
    }

}

// Check on window.load -> if i have a profile.id sent to this page or not!
// Save Button change to Update Button if profile.id already exists (should be the same as data.id from above)
