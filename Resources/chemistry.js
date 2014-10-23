exports.chem = function(){
	
	var win_chem= Ti.UI.createWindow({
		//backgroundImage: "/images/titanium-texture.jpg"
		backgroundColor: 'white'
	});
	
	var dataB= Ti.Database.install('/datbs/chem.db','chem');
	
	var img_phy=Ti.UI.createImageView({
		image: "/images/phy.png"
	});
	
	var head = Ti.UI.createView({
	backgroundImage: '',
	height : "10%",top: 0
	});
	
	head.add(img_phy);
	
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
		backgroundImage: '',
		right:0,
		height: "10%",
		bottom: 0
	});	
 	foot.add(img);
 	foot.add(img1);
 	
 	
 	//////////Database Part !!
 	
	chem_dt = [];
	 				
			var db_row= dataB.execute('SELECT ques FROM chem WHERE sets=?', myglo.k+1 );
			var opti = dataB.execute('SELECT op1,op2,op3,op4 FROM chem WHERE sets=?', myglo.k+1 );
			
			while(db_row.isValidRow()&&opti.isValidRow()){
				var row= Ti.UI.createTableViewRow({
					//height: 60,
					font: { fontFamily:'Arial', fontSize: '20dp',fontWeight:'normal' },
					color: 'black',
					title: db_row.fieldByName('ques') + '\n   1)' + opti.fieldByName('op1')+ '\n   2)' + opti.fieldByName('op2')+ '\n   3)' + opti.fieldByName('op3')+ '\n   4)' + opti.fieldByName('op4')
			});
			
			// var labe=Ti.UI.createLabel({
				// text: row.title,
				// align: 'center',
				// color: 'white',
				// fontWeight: 'Bold',
				// height: 40
			// });
// 			
			// var win3 = Ti.UI.createWindow({
				// backgroundColor:'cyan',
				// height: 300,
				// width: 300
			// });
			// win3.add(labe);
// 			
			// row.addEventListener('click', function(){
				// win3.open();
			// });
// 			
			chem_dt.push(row);
			db_row.next();
			opti.next();
			}

	db_row.close();
	dataB.close();
	//
	var tab=Ti.UI.createTableView({
		left: 60,
		right: 60,
		data: chem_dt
	 });
	 
	win_chem.add(head);
	win_chem.add(mid);
	mid.add(tab);
	win_chem.add(foot);
	win_chem.open();
	
	win_chem.addEventListener('android:back',function(){
	 	win_chem.close();
	 	myglo.k = 0;
	 }); 
	
	return win_chem;

};
