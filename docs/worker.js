'use strict';

self.addEventListener('push', function (event) {
    console.log("受け取ったんかいな", event);

    // message 設定はどこからしようかね。
    var title = "わんこ。デモにようこそ";
    var body = "ここになんやら訴求文言かけるとええな！\n調子乗って改行もしてみるで！\nこれほしいねん";
    var icon = "wanko_512x512.png";
    var rand = Math.floor(Math.random() * 4);
    console.log(rand)
    var tag = "wanko-sample";
    var url = "";
    switch (rand) {
        case 0:
            url = "https://www.amazon.co.jp/dp/B01466G94O/";
        case 1:
            url = "http://google.com";
        case 2:
            url = "http://yahoo.co.jp";
        case 3:
            url = "http://goo.jp";
    }


    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon,
            tag: tag,
            data: {
                url: url
            }
        })
    );
});

self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();

    var notoficationURL = "/"
    if (event.notification.data.url) {
        console.log("url　setting");
        notoficationURL = event.notification.data.url
    }

    event.waitUntil(clients.matchAll({
        type: 'window'
    }).then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url === '/' && 'focus' in client) {
                return client.focus();
            }
        }
        if (clients.openWindow) {
            return clients.openWindow(notoficationURL);
        }
    }));
});