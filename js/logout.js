import { supa } from "../connection/supabase.js";

// import { updateUserStatus } from './magiclink.js';

import { logout } from "./magiclink.js";

document.getElementById('logoutButton').addEventListener('click', logout);