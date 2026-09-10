```js
/* =========================
   GÜNLÜK ŞARKI LİSTESİ
========================= */

const dailySongs = [

    {
        title: "Güle Güle",
        artist: "Kenan Doğulu",
        id: "6zq2ip8cCibUMG6cmvQgwc"
    },

    {
        title: "Şivesi Sensin Aşkın",
        artist: "Yıldız Tilbe",
        id: "5AC4F6qclq8oJp8XY5QNl6"
    },

    {
        title: "Med Cezir",
        artist: "Levent Yüksel",
        id: "2wwfz934Be5gDAIZktSaUs"
    },

    {
        title: "Kandırdım",
        artist: "Kenan Doğulu",
        id: "4HuYkE2g6IV8iQjkqkynBu"
    },

    {
        title: "Aşktan Ne Haber",
        artist: "Sezen Aksu",
        id: "5Ftku2ydxC3nkYHlkZU5Tx"
    },

    {
        title: "Merak Etme Sen",
        artist: "Ferdi Tayfur",
        id: "6FM9XeNGodJPCsrTR0CE8w"
    },

    {
        title: "İşim Olmaz",
        artist: "Yıldız Tilbe",
        id: ""
    },

    {
        title: "Sana Değer",
        artist: "Yıldız Tilbe",
        id: "4eMwobkGjF1KlhGrMA3lGy"
    },

    {
        title: "Beni Hatırla",
        artist: "Nazan Öncel",
        id: "48Ldt3JkOLelOzhtL0wG2l"
    },

    {
        title: "Seni Özlüyorum",
        artist: "Gazapizm",
        id: "3kXbPFT8z6iEbkplTrousF"
    }
];


/* =========================
   BUGÜNÜN ŞARKISINI GETİR
========================= */

function updateDailySong() {

    const songTitle =
        document.getElementById("dailySongTitle");

    const songArtist =
        document.getElementById("dailySongArtist");

    const spotifyFrame =
        document.getElementById("dailySpotify");

    if (
        !songTitle ||
        !songArtist ||
        !spotifyFrame
    ) {
        return;
    }


    const startDate =
        new Date(2026, 3, 1);

    const today =
        new Date();

    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);


    const difference =
        today.getTime() -
        startDate.getTime();


    const dayNumber =
        Math.floor(
            difference / 86400000
        );


    const songIndex =
        ((dayNumber % dailySongs.length)
        + dailySongs.length)
        % dailySongs.length;


    const song =
        dailySongs[songIndex];


    songTitle.textContent =
        song.title;

    songArtist.textContent =
        song.artist;


    if (song.id) {

        spotifyFrame.src =
            "https://open.spotify.com/embed/track/" +
            song.id +
            "?utm_source=generator";

    }

}


updateDailySong();
```
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
   NOT ELEMENTLERİ
========================= */

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
   NOT EKLE
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

            addNoteButton.disabled = true;

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

            addNoteButton.disabled = false;

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
   NOTLARI YÜKLE
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


    document
        .querySelectorAll(
            ".delete-note"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        deleteNote(
                            button.dataset.id
                        );

                    }
                );

            }
        );

}


/* =========================
   NOT SİL
========================= */

async function deleteNote(id) {

    const confirmed =
        confirm(
            "Bu not silinsin mi?"
        );

    if (!confirmed) return;

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
   HTML SECURITY
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
   BAŞLAT
========================= */

loadNotes();


/* =========================
   BİLDİRİMLER - iPHONE
========================= */

const notificationButton =
    document.getElementById(
        "enableNotifications"
    );

const notificationStatus =
    document.getElementById(
        "notificationStatus"
    );


async function setupNotifications() {

    if (!notificationButton) return;


    if (!("serviceWorker" in navigator)) {

        notificationStatus.textContent =
            "Service Worker desteklenmiyor.";

        return;

    }


    try {

        const registration =
            await navigator.serviceWorker.register(
                "./sw.js"
            );


        console.log(
            "Service Worker:",
            registration
        );


        notificationStatus.textContent =
            "Bildirimleri açmak için butona bas.";


        notificationButton.onclick =
            async function () {

                try {

                    if (!("Notification" in window)) {

                        notificationStatus.textContent =
                            "Notification API bulunamadı.";

                        return;

                    }


                    const permission =
                        await Notification.requestPermission();


                    console.log(
                        "Bildirim izni:",
                        permission
                    );


                    if (permission !== "granted") {

                        notificationStatus.textContent =
                            "Bildirim izni verilmedi.";

                        return;

                    }


                    const pushManager =
                        registration.pushManager;


                    console.log(
                        "PushManager:",
                        pushManager
                    );


                    if (!pushManager) {

                        notificationStatus.textContent =
                            "PushManager bulunamadı.";

                        return;

                    }


                    notificationStatus.textContent =
                        "Bildirimler başarıyla açıldı ❤️";


                    notificationButton.textContent =
                        "🔔 Bildirimler Açık";


                    notificationButton.disabled =
                        true;


                } catch (error) {

                    console.error(
                        "Bildirim hatası:",
                        error
                    );

                    notificationStatus.textContent =
                        "HATA: " +
                        error.name +
                        " - " +
                        error.message;

                }

            };


    } catch (error) {

        console.error(
            "Service Worker hatası:",
            error
        );

        notificationStatus.textContent =
            "Service Worker başlatılamadı.";

    }

}


setupNotifications();
