<!-- HTML File auf der Root des Servers für Authentifizierung -->

<!-- START Magiclink Authentication -->

<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SupaBase Auth </title>
    <script src="https://unpkg.com/@supabase/supabase-js@2"> </script>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@1.29.0/dist/umd/supabase.min.js"></script>

</head>

<body>
<!-- was isch de mit däm hie los? Das wird mir ja garnid aazeigt. -->
    <h2 style="color:red" id="rootCheck">Checking location...</h2>

    <div>
        <h2>Magic Link Authentication</h2>
        <input type="email" id="emailInput" placeholder="Enter your email" />
        <button id="sendMagicLinkButton">Send Magic Link</button>
    </div>

    <p id="userStatus">Checking authentication status...</p>

    <button id="logoutButton">Logout</button>

    <script type="module" src="connection/supabase.js"></script>
    <script type="module" src="magiclink.js"></script>

    <script>

        // script prüft, ob wir uns auf der root des servers befinden

        window.addEventListener('DOMContentLoaded', (event) => {
            const rootCheckElem = document.getElementById('rootCheck');
    
            if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
                rootCheckElem.textContent = "You are on the root of the server.";
                rootCheckElem.style.display = "none"; // Hide it if you don't want any message on the root
            } else {
                rootCheckElem.innerHTML = 'Authentication funktioniert nur auf der Root des Servers! Das ist nicht hier, sondern <a href="/"> da </a>';
            }
        });
    </script>

</body>

<!-- <body>

    <div>
        <h2>Magic Link Authentication</h2>
        <input type="email" id="emailInput" placeholder="Enter your email" />
        <button id="sendMagicLinkButton">Send Magic Link</button>
    </div>

    <p id="userStatus">Checking authentication status...</p>

    <button id="logoutButton">Logout</button>

    <script type="module" src="../../00_setup/supabase.js"></script>
    <script type="module" src="03_authentication/1_magiclink.js"></script>

</body> -->

</html>

<!-- ENDE Magiclink Authentication -->
<!-- ENDE Magiclink Authentication -->
<!-- ENDE Magiclink Authentication -->
<!-- ENDE Magiclink Authentication -->