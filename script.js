console.log("SCRIPT.JS ÇALIŞIYOR ❤️");

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


/* =========================
   GÜNLÜK ŞARKI
========================= */

function updateDailySong() {
    const songTitle = document.getElementById("dailySongTitle");
    const songArtist = document.getElementById("dailySongArtist");
    const spotifyFrame = document.getElementById("dailySpotify");

    if (!songTitle || !songArtist || !spotifyFrame) {
        return;
    }

    const startDate = new Date(2026, 3, 1);
    const today = new Date();

    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const difference =
        today.getTime() - startDate.getTime();

    const dayNumber =
        Math.floor(difference / 86400000);

    const songIndex =
        ((dayNumber % dailySongs.length) + dailySongs.length)
        % dailySongs.length;

    const song = dailySongs[songIndex];

    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;

    spotifyFrame.src =
        "https://open.spotify.com/embed/track/" +
        song.id +
        "?utm_source=generator";
}


/* =========================
   GÜN SAYACI
========================= */

function updateLoveCounter() {
    const counter = document.getElementById("daysTogether");

    if (!counter) {
        return;
    }

    const startDate =
        new Date("2026-04-01T00:00:00");

    const today = new Date();

    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const difference =
        today.getTime() - startDate.getTime();

    const days =
        Math.floor(difference / 86400000);

    counter.textContent =
        Math.max(days, 0);
}


/* =========================
   MEKTUP
========================= */

function setupLetter() {
    const letterButton =
        document.getElementById("letterButton");

    const letterContent =
        document.getElementById("letterContent");

    if (!letterButton || !letterContent) {
        return;
    }

    letterButton.addEventListener("click", function () {

        letterContent.classList.toggle("show");

        if (letterContent.classList.contains("show")) {
            letterButton.textContent =
                "Mektubu Kapat";
        } else {
            letterButton.textContent =
                "Mektubu Aç ❤️";
        }
    });
}


/* =========================
   SUPABASE
========================= */

const SUPABASE_URL =
    "https://jqppvpymbfqsjrnaccat.supabase.co";

const SUPABASE_KEY =
    "sb_publishable__ve5vd2YY7eksu4zBRPJ2g_XyM8bAzw";

let supabaseClient = null;


function setupSupabase() {

    if (
        !window.supabase ||
        !window.supabase.createClient
    ) {
        console.error(
            "Supabase kütüphanesi yüklenemedi."
        );

        return false;
    }

    try {

        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_KEY
            );

        console.log("SUPABASE BAĞLANDI ❤️");

        return true;

    } catch (error) {

        console.error(
            "Supabase başlatılamadı:",
            error
        );

        return false;
    }
}


/* =========================
   NOTLARI YÜKLE
========================= */

async function loadNotes() {

    const notesList =
        document.getElementById("notesList");

    if (!notesList) {
        console.error(
            "notesList bulunamadı."
        );

        return;
    }

    if (!supabaseClient) {
        console.error(
            "Supabase bağlantısı yok."
        );

        return;
    }

    try {

        const result =
            await supabaseClient
                .from("notes")
                .select("*")
                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                );

        if (result.error) {

            console.error(
                "Notlar yüklenemedi:",
                result.error
            );

            return;
        }

        notesList.innerHTML = "";

        const notes =
            result.data || [];

        notes.forEach(function (note) {

            const card =
                document.createElement("div");

            card.className =
                "note-card";


            const text =
                document.createElement("p");

            text.textContent =
                note.text || "";


            const date =
                document.createElement("div");

            date.className =
                "note-date";


            if (note.created_at) {

                const noteDate =
                    new Date(note.created_at);

                date.textContent =
                    noteDate.toLocaleDateString(
                        "tr-TR"
                    );
            }


            card.appendChild(text);
            card.appendChild(date);

            notesList.appendChild(card);
        });

        console.log(
            "NOTLAR YÜKLENDİ:",
            notes.length
        );

    } catch (error) {

        console.error(
            "Not yükleme hatası:",
            error
        );
    }
}


/* =========================
   NOT EKLE
========================= */

async function addNote() {

    const noteInput =
        document.getElementById("noteInput");

    const addNoteButton =
        document.getElementById(
            "addNoteButton"
        );


    if (!noteInput) {
        alert("Not kutusu bulunamadı.");
        return;
    }


    if (!addNoteButton) {
        alert("Not butonu bulunamadı.");
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


    if (!supabaseClient) {

        alert(
            "Supabase bağlantısı kurulamadı."
        );

        return;
    }


    addNoteButton.disabled = true;

    addNoteButton.textContent =
        "Ekleniyor...";


    try {

        const result =
            await supabaseClient
                .from("notes")
                .insert([
                    {
                        text: text
                    }
                ]);


        if (result.error) {

            console.error(
                "NOT EKLEME HATASI:",
                result.error
            );

            alert(
                "Not eklenemedi:\n" +
                result.error.message
            );

            return;
        }


        noteInput.value = "";

        await loadNotes();


    } catch (error) {

        console.error(
            "NOT HATASI:",
            error
        );

        alert(
            "Bir hata oluştu:\n" +
            error.message
        );


    } finally {

        addNoteButton.disabled = false;

        addNoteButton.textContent =
            "Not Bırak ❤️";
    }
}


/* =========================
   NOT SİSTEMİNİ BAŞLAT
========================= */

function setupNotes() {

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


    console.log(
        "NOT ELEMANLARI:",
        {
            button: !!addNoteButton,
            input: !!noteInput,
            list: !!notesList
        }
    );


    if (
        !addNoteButton ||
        !noteInput ||
        !notesList
    ) {

        console.error(
            "Not HTML elemanları eksik."
        );

        return;
    }


    addNoteButton.addEventListener(
        "click",
        addNote
    );


    loadNotes();
}


/* =========================
   BİLDİRİMLER
========================= */

async function setupNotifications() {

    const notificationButton =
        document.getElementById(
            "enableNotifications"
        );

    const notificationStatus =
        document.getElementById(
            "notificationStatus"
        );


    if (!notificationButton) {
        return;
    }


    if (!("serviceWorker" in navigator)) {

        if (notificationStatus) {

            notificationStatus.textContent =
                "Service Worker desteklenmiyor.";
        }

        return;
    }


    try {

        const registration =
            await navigator.serviceWorker.register(
                "./sw.js"
            );


        if (notificationStatus) {

            notificationStatus.textContent =
                "Bildirimleri açmak için butona bas.";
        }


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


                    if (
                        permission !== "granted"
                    ) {

                        notificationStatus.textContent =
                            "Bildirim izni verilmedi.";

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
    }
}


/* =========================
   SAYFA AÇILINCA HEPSİ
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "SAYFA HAZIR ❤️"
        );


        updateDailySong();

        updateLoveCounter();

        setupLetter();


        const supabaseReady =
            setupSupabase();


        if (supabaseReady) {

            setupNotes();
        }


        setupNotifications();
    }
);
