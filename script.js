// =====================================================
// MINA ♥ MEHMET
// Ana JavaScript Dosyası
// =====================================================


// =====================================================
// GÜNLÜK ŞARKILAR
// =====================================================

const dailySongs = [
    {
        title: "Güle Güle",
        artist: "Kenan Doğulu",
        id: "6zq2ip8cCibUMG6cmvQgwc"
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


// Şarkı listesinin başladığı tarih
const songStartDate = new Date(2026, 8, 10);


// =====================================================
// BUGÜNÜN ŞARKISI
// =====================================================

function updateDailySong() {

    const titleElement = document.getElementById("songTitle");
    const artistElement = document.getElementById("songArtist");
    const player = document.getElementById("spotifyPlayer");

    if (!titleElement || !artistElement || !player) {
        return;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const start = new Date(songStartDate);

    start.setHours(0, 0, 0, 0);

    const difference =
        Math.floor((today - start) / 86400000);

    const index =
        ((difference % dailySongs.length) + dailySongs.length)
        % dailySongs.length;

    const song = dailySongs[index];

    titleElement.textContent = song.title;
    artistElement.textContent = song.artist;

    player.src =
        `https://open.spotify.com/embed/track/${song.id}?utm_source=generator`;
}


// =====================================================
// BİRLİKTE GEÇEN GÜN SAYISI
// =====================================================

function updateLoveCounter() {

    const counter = document.getElementById("daysTogether");

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
        Math.floor(
            (today - startDate) / 86400000
        );

    counter.textContent =
        Math.max(0, difference);
}


// =====================================================
// HİKÂYEMİZE BAŞLA BUTONU
// =====================================================

function setupStartButton() {

    const button =
        document.getElementById("startButton");

    if (!button) {
        return;
    }

    button.addEventListener("click", () => {

        const story =
            document.getElementById("story");

        if (story) {
            story.scrollIntoView({
                behavior: "smooth"
            });
        }

    });
}


// =====================================================
// SUPABASE
// =====================================================

const SUPABASE_URL =
    "https://jqppvpymbfqsjrnaccat.supabase.co";

const SUPABASE_KEY =
    "sb_publishable__ve5vd2YY7eksu4zBRPJ2g_XyM8bAzw";

const NOTES_URL =
    `${SUPABASE_URL}/rest/v1/notes`;


// =====================================================
// NOTLARI GETİR
// =====================================================

async function loadNotes() {

    const notesList =
        document.getElementById("notesList");

    const status =
        document.getElementById("noteStatus");

    if (!notesList) {
        return;
    }

    try {

        if (status) {
            status.textContent =
                "Notlar yükleniyor...";
        }

        const response =
            await fetch(
                `${NOTES_URL}?select=id,text,created_at&order=created_at.desc`,
                {
                    method: "GET",

                    headers: {
                        "apikey": SUPABASE_KEY,
                        "Authorization":
                            `Bearer ${SUPABASE_KEY}`
                    }
                }
            );

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Notlar alınamadı:",
                errorText
            );

            throw new Error(
                "Notlar yüklenemedi."
            );
        }

        const notes =
            await response.json();

        notesList.innerHTML = "";

        if (!notes.length) {

            notesList.innerHTML = `
                <div class="note">
                    <div class="note-text">
                        Henüz bir not yok. İlk notu sen bırak ❤️
                    </div>
                </div>
            `;

            if (status) {
                status.textContent = "";
            }

            return;
        }

        notes.forEach(note => {

            const noteElement =
                document.createElement("div");

            noteElement.className =
                "note";

            const date =
                new Date(note.created_at);

            noteElement.innerHTML = `
                <div class="note-text"></div>

                <div class="note-bottom">

                    <div class="note-date">
                        ${formatDate(date)}
                    </div>

                    <button
                        class="delete-note"
                        type="button">
                        Sil
                    </button>

                </div>
            `;

            const textElement =
                noteElement.querySelector(".note-text");

            textElement.textContent =
                note.text;

            const deleteButton =
                noteElement.querySelector(".delete-note");

            deleteButton.addEventListener(
                "click",
                () => deleteNote(note.id)
            );

            notesList.appendChild(
                noteElement
            );
        });

        if (status) {
            status.textContent = "";
        }

    } catch (error) {

        console.error(error);

        if (status) {
            status.textContent =
                "Notlar yüklenirken bir hata oluştu.";
        }
    }
}


// =====================================================
// NOT EKLE
// =====================================================

async function addNote() {

    const input =
        document.getElementById("noteInput");

    const button =
        document.getElementById("addNoteButton");

    const status =
        document.getElementById("noteStatus");

    if (!input) {
        return;
    }

    const text =
        input.value.trim();

    if (!text) {

        if (status) {
            status.textContent =
                "Önce bir şeyler yaz ❤️";
        }

        return;
    }

    try {

        if (button) {
            button.disabled = true;
            button.textContent =
                "Ekleniyor...";
        }

        if (status) {
            status.textContent = "";
        }

        const response =
            await fetch(
                NOTES_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "apikey":
                            SUPABASE_KEY,

                        "Authorization":
                            `Bearer ${SUPABASE_KEY}`,

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
                "Not ekleme hatası:",
                errorText
            );

            throw new Error(
                errorText
            );
        }

        input.value = "";

        await loadNotes();

    } catch (error) {

        console.error(error);

        if (status) {
            status.textContent =
                "Not eklenemedi. Lütfen tekrar dene.";
        }

    } finally {

        if (button) {
            button.disabled = false;
            button.textContent =
                "Not Bırak ❤️";
        }
    }
}


// =====================================================
// NOT SİL
// =====================================================

async function deleteNote(id) {

    const status =
        document.getElementById("noteStatus");

    const confirmed =
        confirm(
            "Bu not silinsin mi?"
        );

    if (!confirmed) {
        return;
    }

    try {

        if (status) {
            status.textContent =
                "Not siliniyor...";
        }

        const response =
            await fetch(
                `${NOTES_URL}?id=eq.${encodeURIComponent(id)}`,
                {
                    method: "DELETE",

                    headers: {
                        "apikey":
                            SUPABASE_KEY,

                        "Authorization":
                            `Bearer ${SUPABASE_KEY}`,

                        "Prefer":
                            "return=minimal"
                    }
                }
            );

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Not silme hatası:",
                errorText
            );

            throw new Error(
                errorText
            );
        }

        await loadNotes();

    } catch (error) {

        console.error(error);

        if (status) {
            status.textContent =
                "Not silinemedi.";
        }
    }
}


// =====================================================
// TARİH FORMATLA
// =====================================================

function formatDate(date) {

    return date.toLocaleString(
        "tr-TR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


// =====================================================
// NOT SİSTEMİNİ BAŞLAT
// =====================================================

function setupNotes() {

    const button =
        document.getElementById("addNoteButton");

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        addNote
    );

    loadNotes();
}


// =====================================================
// SAYFA BAŞLANGICI
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateDailySong();

        updateLoveCounter();

        setupStartButton();

        setupNotes();

    }
);
