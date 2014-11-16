exports.chem = function(){
	
	var win_chem= Ti.UI.createWindow({
		backgroundImage: "/images/b2.jpg"
	});
	
	var dataChem= Ti.Database.install('/datbs/chems.db','chems');
	
	var img_phy=Ti.UI.createImageView({
		image: "/images/name.png"
	});
	
	var img_phy2=Ti.UI.createImageView({
		image: "/images/badge_c.png",
		top: 20,
		right: 20,
		height: 100,
		width: 150
	});
	
	var head = Ti.UI.createView({
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
	
	
	var foot= Ti.UI.createView({
		right:0,
		height: "10%",
		bottom: 0
	});	
	
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
		
		var info_button=Ti.UI.createButton({
			width: 40,
			height: 40,
			backgroundImage: "/images/info.png"
		});
		
		info_button.addEventListener('click', function(){
			about_win.open();
		});
		
		
		 	
 	
 	foot.add(info_button);
 	
 	//scoring
 	
 	var score_win= Ti.UI.createWindow({
 		id: 'score',
 		opacity: .9
 	});
 	var score_img= Ti.UI.createLabel({
 		backgroundImage: "/images/score1.png",
 		font: { fontFamily:'kalpurush', fontSize: '30dp',fontWeight:'bold' }, 
 		color: '#b80a0a',
 		text: {top: 15,left: 20},
 		height: 400,
 		width: 400
 	});
 	score_win.addEventListener('click',function(e){
 		if(e.source.id==='score'){
 			score_win.close();
 		}
 	});
 	
 	score_win.add(score_img);
 	var ans_array = [];
 	var got_marks= 0;
	//var m;
 	//////////dataChemase Part !!
	
	
			var db_cow= dataChem.execute('SELECT ques FROM chem WHERE sets=?', myglo.k+1 );
			var octi = dataChem.execute('SELECT op1,op2,op3,op4 FROM chem WHERE sets=?', myglo.k+1 );
			
			var viw = function(m){
				
				var main_view = Ti.UI.createView({
					layout: 'vertical',
					height: 250,
					ans: 0
				});
				
					labels = Ti.UI.createLabel({
						font: { fontFamily:'kalpurush', fontSize: '20dp',fontWeight:'normal' },
						color: 'black',
					});
					
				
				
				labels.text = '\n'+ db_cow.fieldByName('ques');
				
				
				main_view.add(labels);
				
				var checkboxArray = [];
 
				for (var i = 0; i<4; i++){
					
					var uy = 'op'+ (i+1);
					
				    var checkbox = Ti.UI.createSwitch({
				        objName:+ i,
				        style:Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
				        title:'\t' + (i+1) + ' )' + octi.fieldByName(uy) ,
				        color:"black",
				        value:false,
				        cng: 0,
				        answer_indexed: m,
				        answer_clicked: (i+1)
				    });
				 
				    main_view.add(checkbox);
				    checkboxArray.push(checkbox);
				 
				    checkbox.addEventListener("change", function(e){
				        
				        
				        Ti.API.info(e.source.objName + " has been set to " + e.source.value);
				       
				       
				       
				       if(e.source.cng==0&&e.source.value==true){	
				       e.source.cng=1;
				       
				       for(var j=0;j<4;j++){
				       			if(checkboxArray[j].cng==1&&checkboxArray[j].value==true&&j!=e.source.objName)
				       			{
				       				checkboxArray[j].cng=0;
				       				checkboxArray[j].value=false;
				       			}
				       		}
				       
				       } 
				        
				        
				    });
				    
				    checkbox.addEventListener('click',function(e){
				    	var ans_push = parseInt(e.source.answer_clicked);
				        
				    	ans_array[e.source.answer_indexed]= ans_push;
				    	
				    	Ti.API.info("and answer selected " + e.source.answer_clicked + " " +ans_array[e.source.answer_indexed]+"  "+ e.source.answer_indexed);
				    });
				    
				    
				 
				}

				return main_view;
			};
			
			var views = [10];
			for( var vu=0;vu<10;vu++)
			{	
				
				while(db_cow.isValidRow()&&octi.isValidRow()){
						views[vu] = viw(vu);
						
						
						var db_ans= dataChem.execute('SELECT tr FROM chem WHERE rowid=?', vu+1 );
						var rwrong= parseInt(db_ans.fieldByName('tr'));
						if(ans_array[vu]==rwrong)
						got_marks = got_marks + 1;
						
						
						
						mid.add(views[vu]);
						db_cow.next();
						octi.next();
				}	
			}
			db_cow.close();
			octi.close();
			dataChem.close();
	//
	win_chem.add(img_phy2);
	win_chem.add(head);
	win_chem.add(mid);
	
	submit_button.addEventListener('click',function(){
		//alert('You got  ' + got_marks + ' out of 10 !!');
		score_img.text = got_marks;
		score_win.open();
	});
	
	mid.add(submit_button);
	
	
	
	win_chem.add(foot);
	
	win_chem.addEventListener('android:back',function(){
	 	myglo.k=-1;
	 	win_chem.close();
	 }); 
	
	
	win_chem.open();
	return win_chem;
};
