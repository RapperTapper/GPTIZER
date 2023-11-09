import { supa } from "../connection/supabase.js";

const initialUser = supa.auth.user();
console.log(initialUser);