exports.phy = function(){
	
	var win_phy= Ti.UI.createWindow({
		backgroundImage: "/images/titanium-texture.jpg"
	});
	
	var dataB= Ti.Database.install('/datbs/physi.db','physi');
	
	var img_phy=Ti.UI.createImageView({
		image: "/images/phy.png"
	});
	
	var head = Ti.UI.createView({
	backgroundImage: '',
	height : "10%",top: 0
	});
	
	head.add(img_phy);
	
	var submit_button= Ti.UI.createButton({
		backgroundImage: "/images/ok_button.png",
		width: 200,
		height: 100,
		bottom: 100
	});
	
	var mid = Ti.UI.createScrollView({
		//height: "80%",
		top:"10%",
		bottom: "10%",
		layout: 'vertical'
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
		right:0,
		height: "10%",
		bottom: 0
	});	
 	foot.add(img);
 	foot.add(img1);
 	
 	//////////Database Part !!
	
	var Ans = [10];
	var Rwrong = 0;
	
	//+ '\n   1)' + opti.fieldByName('op1')+ '\n   2)' + opti.fieldByName('op2')+ '\n   3)' + opti.fieldByName('op3')+ '\n   4)' + opti.fieldByName('op4')
	
			var db_row= dataB.execute('SELECT ques FROM phy WHERE sets=?', myglo.k+1 );
			var opti = dataB.execute('SELECT op1,op2,op3,op4 FROM phy WHERE sets=?', myglo.k+1 );
			
			var viw = function(){
				
				var main_view = Ti.UI.createView({
					layout: 'vertical',
					height: 250,
					ans: 0
				});
				
				var labels=[5];
				
				for(var lb=0;lb<5;lb++){
					
					labels[lb] = Ti.UI.createLabel({
						font: { fontFamily:'Arial', fontSize: '20dp',fontWeight:'normal' },
						color: 'white',
					});
					
				}
				
				labels[0].text = '\n'+ db_row.fieldByName('ques');
				
				
				main_view.add(labels[0]);
				
				for(var kb=1;kb<5;kb++)
				{
					var uy = 'op'+ kb;
					labels[kb].text = '\t' + kb + ' )' + opti.fieldByName(uy);
					
					main_view.add(labels[kb]);
				}
				
				for(var cnt= 1; cnt<5 ; cnt++){
					
					labels[cnt].addEventListener('click', function(){
						
						//alert(cnt);
						main_view.ans= cnt-1;
					});
				}
				
				// view.add(labels);
				return main_view;
			};
			
			var views = [10];
			for(var vu=0;vu<10;vu++)
			{	
				while(db_row.isValidRow()&&opti.isValidRow()){
						views[vu] = viw();
						Ans[vu]= views[vu].ans;
						var db_ans= dataB.execute('SELECT tr FROM phy WHERE rowid=?', vu+1 );
						var rwrong= db_ans.fieldByName('tr');
						if(rwrong==Ans[vu])
						Rwrong++;
						mid.add(views[vu]);
						db_row.next();
						opti.next();
				}	
			}
			
			
			
			db_row.close();
			opti.close();
			dataB.close();
	//
	
	win_phy.add(head);
	win_phy.add(mid);
	// mid.add(view);
	
	// for(var iter=0;iter < 10; iter++){
		// mid.add(views[iter]);
	// }
	
	submit_button.addEventListener('click',function(){
		alert('You got  ' + Rwrong + ' out of 10 !!');
	});
	
	mid.add(submit_button);
	win_phy.add(foot);
	win_phy.open();
	
	win_phy.addEventListener('android:back',function(){
	 	win_phy.close();
	 	myglo.k = 0;
	 }); 
	
	return win_phy;
};
