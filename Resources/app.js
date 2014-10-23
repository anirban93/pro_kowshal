var parent_win = Ti.UI.createWindow({
	//backgroundImage: "/images/titanium-texture.jpg",
	backgroundColor: 'white'
});


var myglo = {
	k: 0,
	checkvalue: 0,
	count: 0
};

var img_log= Ti.UI.createImageView({
	image: "/images/name.png"
});

var head = Ti.UI.createView({
	backgroundImage: '' ,
	height : "10%",
	top:0
});

head.add(img_log);

var mid = Ti.UI.createView({
	height: "80%",
});

var img= Ti.UI.createImageView({
		image: '/images/logo.png',
		left: 0
	});

var img1= Ti.UI.createImageView({
	 image: '/images/grameen-solutions-logo.png',
	 right:0,
	 left: 235
});

var foot= Ti.UI.createView({
	height: "10%",
	bottom:0
});

foot.add(img);
foot.add(img1);
//Physics

var dat = [
    { properties: { title: 'পদার্থবিজ্ঞান', height: 110 ,font: { fontFamily:'Arial', fontSize: '30dp',fontWeight:'bold' }, color: '#994C00'  } },
    { properties: { title: 'রসায়ন', height: 110 , font: { fontFamily:'Arial', fontSize: '30dp',fontWeight:'bold' }, color: 'blue' } },
    { properties: { title: 'গণিত', height: 110 ,  font: { fontFamily:'Arial', fontSize: '30dp',fontWeight:'bold' }, color: 'blue' } }, 
    { properties: { title: 'English' , height: 110 , font: { fontFamily:'Arial', fontSize: '30dp',fontWeight:'bold' }, color: '#994C00' } },
];

var subjects = Ti.UI.createListSection({
	items: dat,
});

var par_view= Ti.UI.createListView({
	sections: [subjects],
	left: "20%",
	right: "10%",
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
		width: 300,
		borderRadius: 15,
		borderWidth: 5,
		borderColor: 'black',
		bottom: "11%"
	});
		
	vu.add(txt);
	vu.add(bt);
	vu.add(vu_img);
	
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
			var win2 = require('physics');
			win2.phy();
		}
		else if(g===1)
		{
			var win2 = require('chemistry');
			win2.chem();
		}
		win_temp.close();
	});
	
});


parent_win.add(head);
parent_win.add(mid);
parent_win.add(foot);

parent_win.open();