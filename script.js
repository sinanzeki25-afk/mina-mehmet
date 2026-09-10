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

```
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

/*
    10.09.2026 = Güle Güle

    Sonraki günlerde liste otomatik ilerler.
*/

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
```

}

/* =========================
GÜN SAYACI
========================= */

function updateLoveCounter() {

```
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
```

}

/* =========================
MEKTUP
========================= */

function setupLetter() {

```
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
```

}

/* =========================
SUPABASE
========================= */

const SUPABASE_URL =
"https://jqppvpymbfqsjrnaccat.supabase.co";

const SUPABASE_KEY =
"sb_publishable__ve5vd2YY7eksu4zBRPJ2g_XyM8bAzw";

let supabaseClient =
null;

function setupSupabase() {

```
try {

    if (
        !window.supabase ||
        !window.supabase.createClient
    ) {

        console.error(
            "Supabase kütüphanesi yüklenemedi."
        );

        return false;
    }

    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );

    console.log(
        "SUPABASE BAĞLANDI ❤️"
    );

    return true;

} catch (error) {

    console.error(
        "Supabase başlatılamadı:",
        error
    );

    return false;
}
```

}

/* =========================
NOTLAR
========================= */

function setupNotes() {

```
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

if (
    !addNoteButton ||
    !noteInput ||
    !notesList
) {
    return;
}

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

        if (!supabaseClient) {

            alert(
                "Not sistemi şu anda bağlanamadı."
            );

            return;
        }

        addNoteButton.disabled =
            true;

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
                    "NOT EKLENEMEDİ:",
                    result.error
                );

                alert(
                    "Not eklenemedi:\n" +
                    result.error.message
                );

                return;
            }

            noteInput.value =
                "";

            await loadNotes();

        } catch (error) {

            console.error(
                "Not ekleme hatası:",
                error
            );

            alert(
                "Not eklenemedi:\n" +
                error.message
            );

        } finally {

            addNoteButton.disabled =
                false;

            addNoteButton.textContent =
                "Not Bırak ❤️";
        }
    }
);

loadNotes();
```

}

/* =========================
NOTLARI GETİR
========================= */

async function loadNotes() {

```
const notesList =
    document.getElementById(
        "notesList"
    );

if (
    !notesList ||
    !supabaseClient
) {
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
            "NOTLAR YÜKLENEMEDİ:",
            result.error
        );

        return;
    }

    const data =
        result.data || [];

    notesList.innerHTML =
        "";

    data.forEach(
        function (note) {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "note-card";

            const text =
                document.createElement(
                    "p"
                );

            text.textContent =
                note.text || "";

            const date =
                document.createElement(
                    "div"
                );

            date.className =
                "note-date";

            if (note.created_at) {

                date.textContent =
                    new Date(
                        note.created_at
                    ).toLocaleDateString(
                        "tr-TR"
                    );
            }

            const deleteButton =
                document.createElement(
                    "button"
                );

            deleteButton.type =
                "button";

            deleteButton.className =
                "delete-note";

            deleteButton.textContent =
                "Notu Sil";

            deleteButton.addEventListener(
                "click",
                function () {

                    deleteNote(
                        note.id
                    );
                }
            );

            card.appendChild(
                text
            );

            card.appendChild(
                date
            );

            card.appendChild(
                deleteButton
            );

            notesList.appendChild(
                card
            );
        }
    );

} catch (error) {

    console.error(
        "Not yükleme hatası:",
        error
    );
}
```

}

/* =========================
NOT SİL
========================= */

async function deleteNote(id) {

```
if (!supabaseClient) {
    return;
}

const confirmed =
    confirm(
        "Bu notu silmek istediğine emin misin?"
    );

if (!confirmed) {
    return;
}

try {

    const result =
        await supabaseClient
            .from("notes")
            .delete()
            .eq(
                "id",
                id
            );

    if (result.error) {

        alert(
            "Not silinemedi:\n" +
            result.error.message
        );

        return;
    }

    await loadNotes();

} catch (error) {

    console.error(
        "Not silme hatası:",
        error
    );
}
```

}

/* ==================================================
iPHONE WEB PUSH
================================================== */

/*
BURAYA VAPID PUBLIC KEY GELECEK.

```
Şimdilik boş bırakıyoruz.
Bir sonraki adımda oluşturacağımız
VAPID public key'i buraya koyacağız.
```

*/

const VAPID_PUBLIC_KEY =
"";

/* =========================
BASE64 → UINT8ARRAY
========================= */

function urlBase64ToUint8Array(base64String) {

```
const padding =
    "=".repeat(
        (4 - base64String.length % 4) % 4
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
```

}

/* =========================
iPHONE PUSH ABONELİĞİ
========================= */

async function setupPushNotifications() {

```
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


/*
    Tarayıcı Push desteği
*/

if (
    !("serviceWorker" in navigator)
) {

    if (status) {

        status.textContent =
            "Bu tarayıcı Service Worker desteklemiyor.";

    }

    return;
}


if (
    !("PushManager" in window)
) {

    if (status) {

        status.textContent =
            "Bu cihaz Push bildirimlerini desteklemiyor.";

    }

    return;
}


if (
    !("Notification" in window)
) {

    if (status) {

        status.textContent =
            "Bildirim sistemi desteklenmiyor.";

    }

    return;
}


/*
    VAPID anahtarı henüz eklenmediyse
    sistemi çalıştırmıyoruz.
*/

if (!VAPID_PUBLIC_KEY) {

    if (status) {

        status.textContent =
            "Bildirim sistemi kuruluyor...";

    }

    console.log(
        "VAPID PUBLIC KEY henüz eklenmedi."
    );

    return;
}


try {

    /*
        Service Worker'ı al
    */

    const registration =
        await navigator.serviceWorker.register(
            "./sw.js"
        );


    console.log(
        "SERVICE WORKER HAZIR ❤️"
    );


    /*
        Kullanıcıdan bildirim izni iste
    */

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


                /*
                    Daha önce abonelik varsa onu kullan,
                    yoksa yeni abonelik oluştur.
                */

                let subscription =
                    await registration.pushManager.getSubscription();


                if (!subscription) {

                    subscription =
                        await registration.pushManager.subscribe({

                            userVisibleOnly:
                                true,

                            applicationServerKey:
                                urlBase64ToUint8Array(
                                    VAPID_PUBLIC_KEY
                                )
                        });
                }


                console.log(
                    "PUSH ABONELİĞİ:",
                    subscription
                );


                /*
                    Aboneliği Supabase'e kaydet.
                */

                const subscriptionJSON =
                    subscription.toJSON();


                const result =
                    await supabaseClient
                        .from("push_subscriptions")
                        .upsert(
                            [
                                {
                                    endpoint:
                                        subscription.endpoint,

                                    p256dh:
                                        subscriptionJSON.keys?.p256dh || "",

                                    auth:
                                        subscriptionJSON.keys?.auth || ""
                                }
                            ],
                            {
                                onConflict:
                                    "endpoint"
                            }
                        );


                if (result.error) {

                    console.error(
                        "PUSH ABONELİĞİ KAYDEDİLEMEDİ:",
                        result.error
                    );

                    if (status) {

                        status.textContent =
                            "Abonelik kaydedilemedi.";

                    }

                    button.disabled =
                        false;

                    button.textContent =
                        "🔔 Bildirimleri Aç";

                    return;
                }


                if (status) {

                    status.textContent =
                        "Bildirimler başarıyla açıldı ❤️";

                }


                button.textContent =
                    "🔔 Bildirimler Açık";


                button.disabled =
                    true;


                console.log(
                    "IPHONE PUSH HAZIR ❤️"
                );


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

    if (status) {

        status.textContent =
            "Bildirim sistemi başlatılamadı.";

    }
}
```

}

/* =========================
SİTEYİ BAŞLAT
========================= */

updateDailySong();

updateLoveCounter();

setupLetter();

const supabaseReady =
setupSupabase();

if (supabaseReady) {

```
setupNotes();

setupPushNotifications();
```

}
