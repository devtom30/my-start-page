var IN_MODIFICATION_STATE = 'started_modifications';
Session.setDefault(IN_MODIFICATION_STATE, false);


Template.appBody.events({
		'click #modification_toggle':function(){
			Session.set(IN_MODIFICATION_STATE,!Session.get(IN_MODIFICATION_STATE));
			if(Session.get(IN_MODIFICATION_STATE)){
				//start dragging;
				var gridSize = 150;//140+2*5margin
				$('#dashboard li').draggable({
					handle:'.dragHandle',
					grid:[gridSize,gridSize],
					drag:function(event,ui){
						if(ui.position.left===ui.helper.position().left && ui.position.top===ui.helper.position().top){
							return true;
						}
						
						ui.position.top = Math.max( 5, ui.position.top );
						ui.position.left = Math.max( 5, Math.min(ui.helper.parent().width()-(ui.helper.parent().width()%gridSize)-gridSize+5-ui.helper.outerWidth()+140,ui.position.left));
						
						
						if(this.invalidPositions[ui.position.top] && this.invalidPositions[ui.position.top][ui.position.left]){
							ui.position = ui.helper.position();
						}
					},
					start:function(event,ui){
						var invalidPositions = {};
						ui.helper.siblings().each(function(k,elem){
							var $elem = $(elem);
							var pos = $elem.position();
							for(var i=$elem.outerWidth()-140;i>=0;i=i-gridSize){
								for(var u=$elem.outerHeight()-140;u>=0;u=u-gridSize){
									if(!invalidPositions[$elem.position().top+u]){
										invalidPositions[$elem.position().top+u]={};
									}
									invalidPositions[$elem.position().top+u][$(elem).position().left+i] = true;
								}
							}
						});
						var invalidPositions2={};
						for(var i=ui.helper.outerWidth()-140;i>=0;i=i-gridSize){
							for(var u=ui.helper.outerHeight()-140;u>=0;u=u-gridSize){
								$.each(invalidPositions,function(posTop,arr){
									$.each(arr,function(left,arr2){
										if(!invalidPositions2[posTop-u]){
											invalidPositions2[posTop-u]={};
										}
										invalidPositions2[posTop-u][left-i]=true;
									});
								});
							}
						}
						this.invalidPositions = _.deepExtend(invalidPositions,invalidPositions2);
					},
					stop:function(event,ui){
						var change = {};
						change.row = ((ui.position.top-5)/150)+1;
						change.col	= ((ui.position.left-5)/150)+1;
						Blaze.getData(this).modify(change);
					},
					stack:('#dashboard li')
				});
			}else{
				//stop dragging;
				$('#dashboard li').draggable('disable');
			}
		}
});

Template.registerHelper('in_modification_state',function(){return Session.get(IN_MODIFICATION_STATE);});