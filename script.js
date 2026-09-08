/* =========================
   SUPABASE
========================= */

const SUPABASE_URL =
    "https://jqppvpymbfqsjrnaccat.supabase.co";

const SUPABASE_KEY =
    "sb_publishable__ve5vd2YY7eksu4zBRPJ2g_XyM8bAzw";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =========================
   LOVE COUNTER
========================= */

function updateLoveCounter() {

    const startDate =
        new Date(2026, 3, 1);

    const today =
        new Date();

    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const difference =
        today.getTime() -
        startDate.getTime();

    const days =
        Math.floor(
            difference / 86400000
        );

    const counter =
        document.getElementById(
            "daysTogether"
        );

    if (counter) {

        counter.textContent =
            Math.max(days, 0);

    }

}

updateLoveCounter();


/* =========================
   LETTER
========================= */

const letterButton =
    document.getElementById(
        "letterButton"
    );

const letterContent =
    document.getElementById(
        "letterContent"
    );

if (
    letterButton &&
    letterContent
) {

    letterButton.addEventListener(
        "click",
        function () {

            letterContent.classList.toggle(
                "show"
            );

            if (
                letterContent.classList.contains(
                    "show"
                )
            ) {

                letterButton.textContent =
                    "Mektubu Kapat";

            } else {

                letterButton.textContent =
                    "Mektubu Aç ❤️";

            }

        }
    );

}


/* =========================
   LOGIN ELEMENTS
========================= */

const loginButton =
    document.getElementById(
        "loginButton"
    );

const logoutButton =
    document.getElementById(
        "logoutButton"
    );

const loginArea =
    document.getElementById(
        "loginArea"
    );

const noteForm =
    document.getElementById(
        "noteForm"
    );

const addNoteButton =
    document.getElementById(
        "addNoteButton"
    );

const noteInput =
    document.getElementById(
        "noteInput"
    );

const notesList =
    document.getElementById(
        "notesList"
    );


/* =========================
   CHECK USER
========================= */

async function checkUser() {

    const {
        data: {
            user
        }
    } =
        await supabaseClient
            .auth
            .getUser();

    if (user) {

        showLoggedIn();

    } else {

        showLoggedOut();

    }

}


/* =========================
   LOGGED IN
========================= */

function showLoggedIn() {

    if (loginArea) {

        loginArea.innerHTML = `
            <p style="
                opacity:0.5;
                font-size:12px;
                margin-bottom:15px;
            ">
                Hoş geldin ❤️
            </p>
        `;

    }

    if (noteForm) {

        noteForm.style.display =
            "block";

    }

    loadNotes();

}


/* =========================
   LOGGED OUT
========================= */

function showLoggedOut() {

    if (loginArea) {

        loginArea.innerHTML = `
            <button
                id="loginButton"
                class="note-button">

                Giriş Yap

            </button>
        `;

        document
            .getElementById("loginButton")
            .addEventListener(
                "click",
                login
            );

    }

    if (noteForm) {

        noteForm.style.display =
            "none";

    }

}


/* =========================
   LOGIN
========================= */

async function login() {

    const email =
        prompt(
            "Supabase e-posta adresin:"
        );

    if (!email) return;

    const password =
        prompt(
            "Şifren:"
        );

    if (!password) return;

    const {
        error
    } =
        await supabaseClient
            .auth
            .signInWithPassword({
                email,
                password
            });

    if (error) {

        alert(
            "Giriş yapılamadı:\n" +
            error.message
        );

        return;

    }

    checkUser();

}


/* =========================
   LOGOUT
========================= */

async function logout() {

    await supabaseClient
        .auth
        .signOut();

    showLoggedOut();

}


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        logout
    );

}


/* =========================
   ADD NOTE
========================= */

if (addNoteButton) {

    addNoteButton.addEventListener(
        "click",
        async function () {

            const text =
                noteInput.value.trim();

            if (!text) {

                alert(
                    "Önce bir not yaz ❤️"
                );

                return;

            }

            const {
                error
            } =
                await supabaseClient
                    .from("notes")
                    .insert([
                        {
                            text: text
                        }
                    ]);

            if (error) {

                alert(
                    "Not eklenemedi:\n" +
                    error.message
                );

                return;

            }

            noteInput.value = "";

            loadNotes();

        }
    );

}


/* =========================
   LOAD NOTES
========================= */

async function loadNotes() {

    if (!notesList) return;

    const {
        data,
        error
    } =
        await supabaseClient
            .from("notes")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );

    if (error) {

        console.error(
            "Notlar yüklenemedi:",
            error
        );

        return;

    }

    notesList.innerHTML = "";

    data.forEach(
        function (note) {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "note-card";

            const date =
                new Date(
                    note.created_at
                );

            card.innerHTML = `
                <p>
                    ${escapeHtml(note.text)}
                </p>

                <div class="note-date">
                    ${date.toLocaleDateString(
                        "tr-TR"
                    )}
                </div>

                <button
                    class="delete-note"
                    data-id="${note.id}">

                    Notu sil

                </button>
            `;

            notesList.appendChild(
                card
            );

        }
    );


    /* DELETE BUTTONS */

    document
        .querySelectorAll(
            ".delete-note"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            button.dataset.id;

                        deleteNote(id);

                    }
                );

            }
        );

}


/* =========================
   DELETE NOTE
========================= */

async function deleteNote(id) {

    const confirmDelete =
        confirm(
            "Bu not silinsin mi?"
        );

    if (!confirmDelete) return;

    const {
        error
    } =
        await supabaseClient
            .from("notes")
            .delete()
            .eq(
                "id",
                id
            );

    if (error) {

        alert(
            "Not silinemedi:\n" +
            error.message
        );

        return;

    }

    loadNotes();

}


/* =========================
   SECURITY
========================= */

function escapeHtml(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;

}


/* =========================
   START
========================= */

checkUser();
