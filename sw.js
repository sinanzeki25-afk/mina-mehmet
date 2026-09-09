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

    }
);
