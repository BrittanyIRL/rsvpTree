var db = require("./models");

db.setting.create({
	weddingDate: 011716,
	location: 'Seattle',
	time: '4:00pm',
	registry: 'http://fakesitehere.com',
	about:'A snake slithers across a tree branch, past what looks like the large iris of a flower his smile vanishes, both eyes pop open, and a terrible thought sweeps across his face. His eyes flick to the side',
	picture: 'http://fakepictureurl.com',
	phone: 303,
	email: 'brittany.brassell@gmail.com',
	siteName: 'SITE NAME HERE',
	greeting: 'greeting here',
	brideFirst: 'Brittany',
	brideLast: 'Brassell',
	groomFirst: 'Gerrit',
	groomLast: 'Feenstra',
	portalCode: 1234
}).then(function(setting) {
    console.log(setting.get());
  });
