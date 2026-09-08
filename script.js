// =========================
// SUPABASE AYARLARI
// =========================

const SUPABASE_URL = "https://jqppvpymbfqsjrnaccat.supabase.co";

const SUPABASE_KEY =
    "sb_publishable__ve5vd2YY7eksu4zBRPJ2g_XyM8bAzw";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// =========================
// HİKÂYEMİZE BAŞLA
// =========================

const startButton =
    document.getElementById("startButton");

if (startButton) {

    startButton.addEventListener("click", function () {

        const story =
            document.getElementById("story");

        if (story) {

            story.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


// =========================
// ELEMENTLER
// =========================

const noteInput =
    document.getElementById("noteInput");

const addNoteButton =
    document.getElementById("addNote");

const notesList =
    document.getElementById("notesList");

const adminLoginButton =
    document.getElementById("adminLoginButton");

const loginPanel =
    document.getElementById("loginPanel");

const editorPanel =
    document.getElementById("editorPanel");

const loginButton =
    document.getElementById("loginButton");

const logoutButton =
    document.getElementById("logoutButton");

const emailInput =
    document.getElementById("emailInput");

const passwordInput =
    document.getElementById("passwordInput");

const loginMessage =
    document.getElementById("loginMessage");

const noteMessage =
    document.getElementById("noteMessage");


// =========================
// TARİH FORMATLAMA
// =========================

function formatDate(dateString) {

    const date =
        new Date(dateString);

    return date.toLocaleDateString(
        "tr-TR",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );

}


// =========================
// HTML GÜVENLİĞİ
// =========================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// =========================
// NOTLARI GETİR
// =========================

async function loadNotes() {

    if (!notesList) {
        return;
    }

    const {
        data,
        error
    } = await supabaseClient
        .from("notes")
        .select("*")
        .order("created_at", {
            ascending: false
        });


    if (error) {

        console.error(
            "Notlar alınamadı:",
            error
        );

        notesList.innerHTML = `
            <p class="notes-intro">
                Notlar şu anda yüklenemedi.
            </p>
        `;

        return;

    }


    displayNotes(data);

}


// =========================
// NOTLARI GÖSTER
// =========================

async function displayNotes(notes) {

    if (!notesList) {
        return;
    }

    notesList.innerHTML = "";


    if (!notes || notes.length === 0) {

        return;

    }


    const {
        data: {
            user
        }
    } = await supabaseClient.auth.getUser();


    notes.forEach(function(note) {

        const noteCard =
            document.createElement("div");

        noteCard.className =
            "note-card";


        const deleteButton =
            user
                ? `
                    <button
                        class="delete-note"
                        data-id="${note.id}"
                    >
                        Sil
                    </button>
                  `
                : "";


        noteCard.innerHTML = `

            <div class="note-date">
                ${formatDate(note.created_at)}
            </div>

            <div class="note-text">
                ${escapeHTML(note.text)}
            </div>

            ${deleteButton}

        `;


        notesList.appendChild(noteCard);


        if (user) {

            const button =
                noteCard.querySelector(
                    ".delete-note"
                );


            if (button) {

                button.addEventListener(
                    "click",
                    function() {

                        deleteNote(note.id);

                    }
                );

            }

        }

    });

}


// =========================
// NOT EKLE
// =========================

if (addNoteButton) {

    addNoteButton.addEventListener(
        "click",
        async function() {

            const text =
                noteInput.value.trim();


            if (text === "") {

                if (noteMessage) {

                    noteMessage.textContent =
                        "Önce Mina'ya bırakmak istediğin bir şeyler yaz ❤️";

                }

                return;

            }


            addNoteButton.disabled = true;


            if (noteMessage) {

                noteMessage.textContent =
                    "Not bırakılıyor...";

            }


            const {
                data: {
                    user
                }
            } = await supabaseClient.auth.getUser();


            if (!user) {

                if (noteMessage) {

                    noteMessage.textContent =
                        "Önce giriş yapmalısın.";

                }

                addNoteButton.disabled = false;

                return;

            }


            const {
                error
            } = await supabaseClient
                .from("notes")
                .insert([
                    {
                        text: text
                    }
                ]);


            if (error) {

                console.error(
                    "Not eklenemedi:",
                    error
                );

                if (noteMessage) {

                    noteMessage.textContent =
                        "Not bırakılırken bir hata oluştu.";

                }

                addNoteButton.disabled = false;

                return;

            }


            noteInput.value = "";


            if (noteMessage) {

                noteMessage.textContent =
                    "Notun Mina'ya bırakıldı ❤️";

            }


            await loadNotes();


            addNoteButton.disabled = false;

        }
    );

}


// =========================
// NOT SİL
// =========================

async function deleteNote(id) {

    const confirmed =
        confirm(
            "Bu notu silmek istediğine emin misin?"
        );


    if (!confirmed) {

        return;

    }


    const {
        error
    } = await supabaseClient
        .from("notes")
        .delete()
        .eq("id", id);


    if (error) {

        console.error(
            "Not silinemedi:",
            error
        );

        alert(
            "Not silinirken bir hata oluştu."
        );

        return;

    }


    await loadNotes();

}


// =========================
// GİRİŞ PANELİ
// =========================

if (adminLoginButton) {

    adminLoginButton.addEventListener(
        "click",
        function() {

            if (loginPanel) {

                loginPanel.classList.toggle(
                    "hidden"
                );

            }

        }
    );

}


// =========================
// GİRİŞ YAP
// =========================

if (loginButton) {

    loginButton.addEventListener(
        "click",
        async function() {

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            if (!email || !password) {

                if (loginMessage) {

                    loginMessage.textContent =
                        "E-posta ve şifreyi gir.";

                }

                return;

            }


            loginButton.disabled = true;


            if (loginMessage) {

                loginMessage.textContent =
                    "Giriş yapılıyor...";

            }


            const {
                data,
                error
            } = await supabaseClient.auth
                .signInWithPassword({
                    email: email,
                    password: password
                });


            if (error) {

                console.error(
                    "Giriş hatası:",
                    error
                );

                if (loginMessage) {

                    loginMessage.textContent =
                        "E-posta veya şifre hatalı.";

                }

                loginButton.disabled = false;

                return;

            }


            if (loginMessage) {

                loginMessage.textContent =
                    "Hoş geldin Mehmet ❤️";

            }


            if (loginPanel) {

                loginPanel.classList.add(
                    "hidden"
                );

            }


            if (editorPanel) {

                editorPanel.classList.remove(
                    "hidden"
                );

            }


            emailInput.value = "";

            passwordInput.value = "";


            await loadNotes();


            loginButton.disabled = false;

        }
    );

}


// =========================
// ÇIKIŞ YAP
// =========================

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async function() {

            await supabaseClient.auth.signOut();


            if (editorPanel) {

                editorPanel.classList.add(
                    "hidden"
                );

            }


            if (loginPanel) {

                loginPanel.classList.add(
                    "hidden"
                );

            }


            await loadNotes();

        }
    );

}


// =========================
// OTURUM KONTROLÜ
// =========================

async function checkUser() {

    const {
        data: {
            user
        }
    } = await supabaseClient.auth.getUser();


    if (user) {

        if (editorPanel) {

            editorPanel.classList.remove(
                "hidden"
            );

        }

    } else {

        if (editorPanel) {

            editorPanel.classList.add(
                "hidden"
            );

        }

    }


    await loadNotes();

}


// =========================
// ❤️ 1 NİSAN 2026'DAN BERİ
// =========================

function updateLoveCounter() {

    // Başlangıç tarihi:
    // 1 Nisan 2026
    const startDate =
        new Date(2026, 3, 1);

    const today =
        new Date();


    // Saatleri sıfırla
    // Böylece saat farkı problem olmaz.

    startDate.setHours(
        0,
        0,
        0,
        0
    );

    today.setHours(
        0,
        0,
        0,
        0
    );


    // İki tarih arasındaki fark

    const difference =
        today.getTime() -
        startDate.getTime();


    // Gün sayısını hesapla

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    // HTML'deki sayaç

    const counter =
        document.getElementById(
            "daysTogether"
        );


    if (counter) {

        counter.textContent =
            days;

    }

}


// Sayacı çalıştır

updateLoveCounter();


// =========================
// BAŞLAT
// =========================

checkUser();
