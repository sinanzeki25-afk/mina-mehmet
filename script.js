```javascript
console.log("SCRIPT.JS ÇALIŞIYOR ❤️");

/* ==================================================
   GÜNLÜK ŞARKI LİSTESİ
================================================== */

const dailySongs = [
    {
        title: "Aşk Laftan Anlamazki",
        artist: "Yıldız Tilbe",
        id: "6ISpHcsG1LZMI2EyvzgW5P"
    },
    {
        title: "Şivesi Sensin Aşkın",
        artist: "Yıldız Tilbe",
        id: "6a0erEKjQmdWH6OzremXOW"
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
        id: "3aNLb5wo8gxb24YZUGMfbv"
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

/* ==================================================
   GÜNLÜK ŞARKI
================================================== */

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

    const songStartDate =
        new Date(2026, 8, 10);

    const today =
        new Date();

    songStartDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const difference =
        today.getTime() -
        songStartDate.getTime();

    const dayNumber =
        Math.floor(
            difference / 86400000
        );

    const songIndex =
        (
            dayNumber %
            dailySongs.length +
            dailySongs.length
        ) %
        dailySongs.length;

    const song =
        dailySongs[songIndex];

    songTitle.textContent =
        song.title;

    songArtist.textContent =
        song.artist;

    spotifyFrame.src =
        "https://open.spotify.com/embed/track/" +
        song.id +
        "?utm_source=generator";

    console.log(
        "BUGÜNÜN ŞARKISI:",
        song.title,
        "-",
        song.artist
    );
}


/* ==================================================
   GÜN SAYACI
================================================== */

function updateLoveCounter() {

    const counter =
        document.getElementById("daysTogether");

    if (!counter) {
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

    const days =
        Math.floor(
            difference / 86400000
        );

    counter.textContent =
        Math.max(days, 0);
}


/* ==================================================
   MEKTUP
================================================== */

function setupLetter() {

    const letterButton =
        document.getElementById("letterButton");

    const letterContent =
        document.getElementById("letterContent");

    if (
        !letterButton ||
        !letterContent
    ) {
        return;
    }

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


/* ==================================================
   SUPABASE
================================================== */

const SUPABASE_URL =
    "https://jqppvpymbfqsjrnaccat.supabase.co";

const SUPABASE_KEY =
    "sb_publishable__ve5vd2YY7eksu4zBRPJ2g_XyM8bAzw";

const NOTES_API =
    SUPABASE_URL + "/rest/v1/notes";


/* ==================================================
   NOTLARI GETİR
================================================== */

async function loadNotes() {

    const notesList =
        document.getElementById("notesList");

    if (!notesList) {
        return;
    }

    try {

        const response =
            await fetch(
                NOTES_API +
                "?select=*&order=created_at.desc",
                {
                    method: "GET",

                    headers: {
                        "apikey":
                            SUPABASE_KEY,

                        "Authorization":
                            "Bearer " +
                            SUPABASE_KEY
                    }
                }
            );

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "NOTLAR GETİRİLEMEDİ:",
                errorText
            );

            notesList.innerHTML =
                "<p>Notlar yüklenemedi.</p>";

            return;
        }

        const notes =
            await response.json();

        notesList.innerHTML = "";

        if (notes.length === 0) {

            notesList.innerHTML =
                "<p>Henüz hiç not yok. İlk notu sen bırak ❤️</p>";

            return;
        }

        notes.forEach(function (note) {

            const noteCard =
                document.createElement("div");

            noteCard.className =
                "note-card";

            const date =
                new Date(note.created_at);

            const formattedDate =
                date.toLocaleDateString(
                    "tr-TR"
                ) +
                " " +
                date.toLocaleTimeString(
                    "tr-TR",
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                );

            noteCard.innerHTML = `
                <div class="note-text">
                    ${escapeHtml(note.text)}
                </div>

                <div class="note-footer">

                    <span class="note-date">
                        ${formattedDate}
                    </span>

                    <button
                        class="delete-note-button"
                        onclick="deleteNote(${note.id})">
                        Notu Sil
                    </button>

                </div>
            `;

            notesList.appendChild(
                noteCard
            );
        });

    } catch (error) {

        console.error(
            "NOTLAR HATASI:",
            error
        );

        notesList.innerHTML =
            "<p>Notlar yüklenirken hata oluştu.</p>";
    }
}


/* ==================================================
   NOT EKLE
================================================== */

async function addNote() {

    const noteInput =
        document.getElementById("noteInput");

    const addNoteButton =
        document.getElementById(
            "addNoteButton"
        );

    if (
        !noteInput ||
        !addNoteButton
    ) {
        return;
    }

    const text =
        noteInput.value.trim();

    if (!text) {

        alert(
            "Önce bir not yaz ❤️"
        );

        return;
    }

    addNoteButton.disabled =
        true;

    addNoteButton.textContent =
        "Ekleniyor...";

    try {

        const response =
            await fetch(
                NOTES_API,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "apikey":
                            SUPABASE_KEY,

                        "Authorization":
                            "Bearer " +
                            SUPABASE_KEY,

                        "Prefer":
                            "return=minimal"
                    },

                    body: JSON.stringify({
                        text: text
                    })
                }
            );

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "NOT EKLENEMEDİ:",
                errorText
            );

            alert(
                "Not eklenemedi.\n\n" +
                errorText
            );

            return;
        }

        noteInput.value = "";

        await loadNotes();

    } catch (error) {

        console.error(
            "NOT EKLEME HATASI:",
            error
        );

        alert(
            "Not eklenirken bağlantı hatası oluştu."
        );

    } finally {

        addNoteButton.disabled =
            false;

        addNoteButton.textContent =
            "Not Bırak ❤️";
    }
}


/* ==================================================
   NOT SİL
================================================== */

async function deleteNote(id) {

    const confirmed =
        confirm(
            "Bu notu silmek istediğine emin misin?"
        );

    if (!confirmed) {
        return;
    }

    try {

        const response =
            await fetch(
                NOTES_API +
                "?id=eq." +
                id,
                {
                    method: "DELETE",

                    headers: {
                        "apikey":
                            SUPABASE_KEY,

                        "Authorization":
                            "Bearer " +
                            SUPABASE_KEY,

                        "Prefer":
                            "return=minimal"
                    }
                }
            );

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "NOT SİLİNEMEDİ:",
                errorText
            );

            alert(
                "Not silinemedi.\n\n" +
                errorText
            );

            return;
        }

        await loadNotes();

    } catch (error) {

        console.error(
            "NOT SİLME HATASI:",
            error
        );

        alert(
            "Not silinirken bağlantı hatası oluştu."
        );
    }
}


/* ==================================================
   GÜVENLİ METİN
================================================== */

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;
}


/* ==================================================
   NOT SİSTEMİNİ BAŞLAT
================================================== */

function setupNotes() {

    const addNoteButton =
        document.getElementById(
            "addNoteButton"
        );

    if (!addNoteButton) {
        return;
    }

    addNoteButton.addEventListener(
        "click",
        addNote
    );

    loadNotes();
}


/* ==================================================
   PUSH BİLDİRİMLERİ
================================================== */

const VAPID_PUBLIC_KEY = "";


function urlBase64ToUint8Array(
    base64String
) {

    const padding =
        "=".repeat(
            (4 -
                base64String.length % 4
            ) % 4
        );

    const base64 =
        (
            base64String +
            padding
        )
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData =
        window.atob(base64);

    const outputArray =
        new Uint8Array(
            rawData.length
        );

    for (
        let i = 0;
        i < rawData.length;
        ++i
    ) {

        outputArray[i] =
            rawData.charCodeAt(i);
    }

    return outputArray;
}


async function setupPushNotifications() {

    const button =
        document.getElementById(
            "enableNotifications"
        );

    const status =
        document.getElementById(
            "notificationStatus"
        );

    if (!button) {
        return;
    }

    if (
        !("serviceWorker" in navigator)
    ) {
        return;
    }

    if (
        !("PushManager" in window)
    ) {
        return;
    }

    if (
        !("Notification" in window)
    ) {
        return;
    }

    if (!VAPID_PUBLIC_KEY) {

        if (status) {

            status.textContent =
                "Bildirim sistemi kuruluyor...";
        }

        return;
    }

    try {

        const registration =
            await navigator.serviceWorker.register(
                "./sw.js"
            );

        button.onclick =
            async function () {

                try {

                    button.disabled =
                        true;

                    button.textContent =
                        "Hazırlanıyor...";

                    const permission =
                        await Notification.requestPermission();

                    if (
                        permission !== "granted"
                    ) {

                        if (status) {

                            status.textContent =
                                "Bildirim izni verilmedi.";
                        }

                        button.disabled =
                            false;

                        button.textContent =
                            "🔔 Bildirimleri Aç";

                        return;
                    }

                    let subscription =
                        await registration
                            .pushManager
                            .getSubscription();

                    if (!subscription) {

                        subscription =
                            await registration
                                .pushManager
                                .subscribe({
                                    userVisibleOnly:
                                        true,

                                    applicationServerKey:
                                        urlBase64ToUint8Array(
                                            VAPID_PUBLIC_KEY
                                        )
                                });
                    }

                    const subscriptionJSON =
                        subscription.toJSON();

                    console.log(
                        "PUSH ABONELİĞİ:",
                        subscriptionJSON
                    );

                    if (status) {

                        status.textContent =
                            "Bildirimler başarıyla açıldı ❤️";
                    }

                    button.textContent =
                        "🔔 Bildirimler Açık";

                } catch (error) {

                    console.error(
                        "PUSH HATASI:",
                        error
                    );

                    if (status) {

                        status.textContent =
                            "HATA: " +
                            error.message;
                    }

                    button.disabled =
                        false;

                    button.textContent =
                        "🔔 Bildirimleri Aç";
                }
            };

    } catch (error) {

        console.error(
            "Service Worker hatası:",
            error
        );
    }
}


/* ==================================================
   SİTEYİ BAŞLAT
================================================== */

updateDailySong();

updateLoveCounter();

setupLetter();

setupNotes();

setupPushNotifications();
```
