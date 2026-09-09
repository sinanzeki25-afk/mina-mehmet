/* =========================
   MINA ♥ MEHMET
   WEB PUSH SERVICE WORKER
========================= */


self.addEventListener(
    "install",
    function () {

        console.log(
            "Mina ♥ Mehmet Service Worker kuruldu."
        );

        self.skipWaiting();

    }
);


self.addEventListener(
    "activate",
    function () {

        console.log(
            "Mina ♥ Mehmet Service Worker aktif."
        );

        self.clients.claim();

    }
);


/* =========================
   PUSH
========================= */

self.addEventListener(
    "push",
    function (event) {

        let data = {};

        try {

            data =
                event.data
                    ? event.data.json()
                    : {};

        } catch (error) {

            data = {
                title: "Mina ♥ Mehmet",
                body: event.data
                    ? event.data.text()
                    : "Yeni bir bildirim var ❤️"
            };

        }


        const title =
            data.title ||
            "Mina ♥ Mehmet";


        const options = {

            body:
                data.body ||
                "Sana küçük bir mesaj var ❤️",

            icon:
                "./icon-192.png",

            badge:
                "./icon-192.png",

            data: {

                url:
                    data.url ||
                    "./"

            }

        };


        event.waitUntil(

            self.registration.showNotification(
                title,
                options
            )

        );

    }
);


/* =========================
   BİLDİRİME TIKLAMA
========================= */

self.addEventListener(
    "notificationclick",
    function (event) {

        event.notification.close();


        const url =
            event.notification.data &&
            event.notification.data.url
                ? event.notification.data.url
                : "./";


        event.waitUntil(

            clients.matchAll({
                type: "window",
                includeUncontrolled: true
            })

            .then(
                function (clientList) {

                    for (
                        const client
                        of clientList
                    ) {

                        if (
                            "focus" in client
                        ) {

                            client.navigate(url);

                            return client.focus();

                        }

                    }


                    if (
                        clients.openWindow
                    ) {

                        return clients.openWindow(
                            url
                        );

                    }

                }
            )

        );

    }
);
