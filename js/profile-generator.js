import { supa } from "../connection/supabase.js";

document.getElementById("generate-prompt").addEventListener("click", generatePrompt);
document.getElementById("reset-profile").addEventListener("click", resetProfile);
document.getElementById("save-profile").addEventListener("click", saveProfile);

const initialUser = supa.auth.user();
const profileName = document.getElementById("profile-name");
const shortDescription = document.getElementById("profile-description");
const inputUserInstruction = document.getElementById("input-user-instructions");
const typeSelect = document.getElementById("type");
const answerLanguageSelect = document.getElementById("answer-language");
const areaOfUseSelect = document.getElementById("area-of-use");
const answerLength = document.getElementById("answer-length");
const inputPrompt = document.getElementById("input-prompt");

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
    const { data : typedata, error : typeerror } = await supa.from("type").select("*");
    if (typeerror) {
        console.error(typeerror);
        return;
    } 

    // // Create an empty option
    // const emptyOption = document.createElement("option");
    // emptyOption.value = "";
    // emptyOption.textContent = "Select a type";
    // typeSelect.appendChild(emptyOption);

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

    const { data: areaofusedata, error: areaofuseerror } = await supa.from("area_of_use").select("*");
    if (areaofuseerror) {
        console.error(areaofuseerror);
        return;
    }

    for (const areaOfUse of areaofusedata) {
        const option = document.createElement("option");
        option.value = areaOfUse.id;
        option.textContent = areaOfUse.areaOfUse;
        areaOfUseSelect.appendChild(option);
        console.log(areaOfUse);
    }

    console.log(areaofusedata);
    
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
    // if (error) {
    //     console.error(error);
    //     alert("Error while generating profile");
    //     return;
    // }
    console.log("generatePrompt ended");

}

function resetProfile() {
    console.log("resetProfile started");
        // Select the form
    // var form = document.getElementById('profile-generator-form');
    //     // Check if form exists
    // if(form){
    //         // Reset all input fields in the form
    //     for (var i = 0; i < form.elements.length; i++) {
    //         if (form.elements[i].type == "text" || form.elements[i].type == "number" || form.elements[i].type == "email" || form.elements[i].type == "password") {
    //             form.elements[i].value = "";
    //         }
    //             // For select elements
    //         else if(form.elements[i].tagName == "SELECT") {
    //             form.elements[i].selectedIndex = 0;
    //         }
    //             // For textarea elements
    //         else if(form.elements[i].tagName == "TEXTAREA") {
    //             form.elements[i].value = "";
    //         }
    //     }
    // } else {
    //     console.log("Form with id 'profile-generator-form' not found");
    // }
    
    // reset profile to default values = null
    
    document.getElementById("profile-name").value = "";
    document.getElementById("profile-description").value = "";
    document.getElementById("input-user-instructions").value = "";
    document.getElementById("type").value = "";
    document.getElementById("answer-language").value = "";
    document.getElementById("area-of-use").value = "";
    document.getElementById("answer-length").value = "";
    document.getElementById("input-prompt").value = "";

    console.log("resetProfile done for none dropdowns");
    // profileName.value = "";
    // shortDescription.value = "";
    // inputUserInstruction.value = "";
    // typeSelect.value = "";
    // answerLanguageSelect.value = "";
    // areaOfUseSelect.value = "";
    // answerLength.value = "";
    // inputPrompt.value = "";
}    

async function saveProfile() {
    // if a or b then
    // a generateProfile();
    // b updateProfile();

    // const { error } = await supa
    //     .from('profile')
    //     .insert({
    //         user_id: initialUser.id,
    //         user_instruction: inputUserInstruction.value,
    //         name: 'Denmark'
    //     });

    // if (error) {
    //     console.error(error);
    //     alert("Error while generating profile");
    //     return;
    // }

}

