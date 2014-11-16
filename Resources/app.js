var main_win= Ti.UI.createWindow({
	backgroundImage: "/images/b1.jpg",
	exitOnClose: true
});

var myglo = {
	k: -1,
	checkvalue: 0,
	count: 0
};



var about_win = Ti.UI.createWindow({
	id: 'about',
	opacity: .9
});

var about_img= Ti.UI.createView({
	backgroundImage: "/images/about_1.png",
	width: 400,
	height: 500,
});

about_win.addEventListener('click', function(e){
	if(e.source.id==='about'){
		about_win.close();
	}
});


var test_button= Ti.UI.createButton({
	backgroundImage: "/images/test2.png",
	height: 200,
	width: 200,
	//top: 200,
	bottom: "40%",
	//text: 'Take Test',
	color: 'black'
});

var close_button= Ti.UI.createButton({
	backgroundImage: "/images/close-icon.png",
	top: 5,
	right: 5,
	width: 50,
	height: 50
});

about_win.add(about_img);
about_img.add(close_button);

close_button.addEventListener('click', function (){
	about_win.close();
});

var img_log= Ti.UI.createImageView({
	image: "/images/name.png"
});

var head = Ti.UI.createView({
	height : "10%",
	top:0
});

head.add(img_log);

var mid = Ti.UI.createView({
	height: "80%",
});

mid.add(test_button);

test_button.addEventListener('click', function(){
	var win_main = require('app2');
	win_main.win();
});


var info_button=Ti.UI.createButton({
	width: 40,
	height: 40,
	backgroundImage: "/images/info.png"
});

info_button.addEventListener('click', function(){
	about_win.open();
});


var foot= Ti.UI.createView({
	height: "10%",
	bottom:0
});

foot.add(info_button);
main_win.add(head);
main_win.add(mid);
main_win.add(foot);
main_win.open();
