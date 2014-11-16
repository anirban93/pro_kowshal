exports.win = function(){

var parent_win = Ti.UI.createWindow({
	backgroundImage: "/images/b2.jpg"
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

var foot= Ti.UI.createView({
	height: "10%",
	bottom:0
});

var about_win = Ti.UI.createWindow({
	id: 'about',
	backgroundImage: "/images/about_1.png",
	opacity: .9
});

// var about_img= Ti.UI.createView({
	// backgroundImage: "/images/about_1.png",
	// width: 400,
	// height: 500,
// });

// about_win.addEventListener('click', function(e){
	// if(e.source.id==='about'){
		// about_win.close();
	// }
// });


var close_button= Ti.UI.createButton({
	backgroundImage: "/images/close-icon.png",
	top: 5,
	right: 5,
	width: 50,
	height: 50
});

//about_win.add(about_img);
about_win.add(close_button);

close_button.addEventListener('click', function (){
	about_win.close();
});

var info_button=Ti.UI.createButton({
	width: 40,
	height: 40,
	backgroundImage: "/images/info.png"
});

info_button.addEventListener('click', function(){
	about_win.open();
});

foot.add(info_button);

var dat = [
    { properties: { title: 'পদার্থবিজ্ঞান', height: 110 ,font: { fontFamily:'kalpurush', fontSize: '27dp',fontWeight:'bold' }, color: '#994C00'  } },
    { properties: { title: 'রসায়ন', height: 110 , font: { fontFamily:'kalpurush', fontSize: '27dp',fontWeight:'bold' }, color: '#994C00' } },
    { properties: { title: 'গণিত', height: 110 ,  font: { fontFamily:'kalpurush', fontSize: '27dp',fontWeight:'bold' }, color: '#994C00' } }, 
    { properties: { title: 'English' , height: 110 , font: { fontFamily:'kalpurush', fontSize: '27dp',fontWeight:'bold' }, color: '#994C00' } },
];

var subjects = Ti.UI.createListSection({
	items: dat,
});

var par_view= Ti.UI.createListView({
	sections: [subjects],
	left: "15%",
	right: "15%",
	top: 30
});

mid.add(par_view);

///Set selection part

var win_temp = Ti.UI.createWindow({
		id: 'temo',
		opacity: .9
	});

txt_data=[];
for(var f=0;f<3;f++)
txt_data[f]=Ti.UI.createPickerRow({title: 'Set '+(f+1), id: f});

var txt = Ti.UI.createPicker({
	 top: 20,
	 left: 20,
	 width: 100
});

txt.add(txt_data);

txt.addEventListener('change', function(e){
	myglo.k= e.rowIndex;
});

txt.selectionIndicator = true;

		var bt= Titanium.UI.createButton({
		backgroundImage: '/images/Cute-Ball-Go-icon.png',
		top: 20,
		left: 120,
		width: 50,
		height: 50
	});
	
	var vu_img=Ti.UI.createImageView({
		image: 'images/graphic.png',
		right: 0,
	});
	
	var vu = Ti.UI.createView({
		backgroundColor: 'white',
		height: 100,
		width: 200,
		borderRadius: 15,
		borderWidth: 5,
		borderColor: '#994C00',
		bottom: "11%"
	});
		
	vu.add(txt);
	vu.add(bt);
	//vu.add(vu_img);
	
	win_temp.add(vu);
////
par_view.addEventListener('itemclick',function(e){
	var g= e.itemIndex;

	win_temp.addEventListener('click', function(e){
		if(e.source.id==='temo'){
			win_temp.close();
		}
	});
	
	win_temp.open();	
	bt.addEventListener('click', function (){
		if(g===0)			
		{
			var win0 = require('physics');
			win0.phy();
		}
		else if(g===1)
		{
			var win1 = require('chemistry');
			win1.chem();
		}
		else if(g===3)
		{
			var win2 = require('mathematics');
			win2.math();
		}
		else if(g===4)
		{
			var win3 = require('english');
			win3.eng();
		}
		win_temp.close();
	});
	
});


parent_win.add(head);
parent_win.add(mid);
parent_win.add(foot);

parent_win.open();

return parent_win;
};