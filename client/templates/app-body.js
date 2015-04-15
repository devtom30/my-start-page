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
						ui.position.top = Math.max( 5, ui.position.top );
						
						ui.position.left = Math.max( 5, Math.min(ui.helper.parent().width()-(ui.helper.parent().width()%gridSize)-gridSize+5,ui.position.left));
						
						if(this.invalidPositions[ui.position.top+'.'+ui.position.left]){
							ui.position = ui.helper.position();
						}
					},
					start:function(event,ui){
						var invalidPositions = {};
						ui.helper.siblings().each(function(k,elem){
							var pos = $(elem).position();
							invalidPositions[$(elem).position().top+'.'+$(elem).position().left] = true;
							for(var i=($(elem).outerWidth()-140)/150;i>0;i--){
								invalidPositions[$(elem).position().top+'.'+($(elem).position().left+(150*(i)))] = true;
							}
						});
						this.invalidPositions = invalidPositions;
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