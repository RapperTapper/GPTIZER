import { supa } from "../connection/supabase.js";

const initialUser = supa.auth.user();
const typeSelect = document.getElementById("type");
const answerLanguageSelect = document.getElementById("answer-language");
const inputUserInstruction = document.getElementById("input-user-instructions");

loadSelectOptions();

const loadScript = (FILE_URL, async = true, type = "text/javascript") => {
    return new Promise((resolve, reject) => {
        try {
            const scriptEle = document.createElement("script");
            scriptEle.type = type;
            scriptEle.async = async;
            scriptEle.src =FILE_URL;

            scriptEle.addEventListener("load", (ev) => {
                resolve({ status: true });
            });

            scriptEle.addEventListener("error", (ev) => {
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

  for (const type of typedata) {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = type.type;
    typeSelect.appendChild(option);
    console.log(type);
  }

  console.log(typedata);

  const { data: languagedata, error: languageerror } = await supa.from("answer_language").select("*");
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

  loadScript("./js/dropdown-select.js")
    .then( data  => {
        console.log("Script loaded successfully", data);
    })
    .catch( err => {
        console.error(err);
    });

}


async function generateProfile() {
    //Button verlinken bzw. Funktion triggern! YEAH
    const { error } = await supa
        .from('profile')
        .insert({
            user_id: initialUser.id,
            user_instruction: inputUserInstruction.value,
            name: 'Denmark'
        });

    if (error) {
        console.error(error);
        alert("Error while generating profile");
        return;
    }

}

