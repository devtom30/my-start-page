var IN_MODIFICATION_STATE = 'started_modifications';
Session.setDefault(IN_MODIFICATION_STATE, false);

CURRENT_DASHBOARD = 'dashboard_displayed';
Session.setDefault(CURRENT_DASHBOARD, false);
Template.appBody.helpers({
	dashboard:function(){
		return Dashboards.findOne(Session.get(CURRENT_DASHBOARD));
	}
});
Template.appBody
		.events({
			'click #modification_toggle' : function() {
				Session.set(IN_MODIFICATION_STATE, !Session
						.get(IN_MODIFICATION_STATE));
				if (Session.get(IN_MODIFICATION_STATE)) {
					// start dragging;
					var gridSize = 150;// 140+2*5margin
					$('#dashboard li')
							.draggable(
									{
										handle : '.dragHandle',
										grid : [ gridSize, gridSize ],
										drag : function(event, ui) {
											if (ui.position.left === ui.helper
													.position().left
													&& ui.position.top === ui.helper
															.position().top) {
												return true;
											}

											ui.position.top = Math.max(5,
													ui.position.top);
											ui.position.left = Math
													.max(
															5,
															Math
																	.min(
																			ui.helper
																					.parent()
																					.width()
																					- (ui.helper
																							.parent()
																							.width() % gridSize)
																					- gridSize
																					+ 5
																					- ui.helper
																							.outerWidth()
																					+ 140,
																			ui.position.left));

											if (this.invalidPositions[ui.position.top]
													&& this.invalidPositions[ui.position.top][ui.position.left]) {
												ui.position = ui.helper
														.position();
											}
										},
										start : function(event, ui) {
											var invalidPositions = {};
											// Calculate all positions taken by
											// the other blocks.
											ui.helper
													.siblings()
													.each(
															function(k, elem) {
																var $elem = $(elem);
																var pos = $elem
																		.position();
																for (var i = $elem
																		.outerWidth() - 140; i >= 0; i = i
																		- gridSize) {
																	for (var u = $elem
																			.outerHeight() - 140; u >= 0; u = u
																			- gridSize) {
																		if (!invalidPositions[$elem
																				.position().top
																				+ u]) {
																			invalidPositions[$elem
																					.position().top
																					+ u] = {};
																		}
																		invalidPositions[$elem
																				.position().top
																				+ u][$(
																				elem)
																				.position().left
																				+ i] = true;
																	}
																}
															});
											var invalidPositions2 = {};
											// Using the positions of other
											// block,
											// Calculate the invalid positions
											// according to current block's
											// size.
											for (var i = ui.helper.outerWidth() - 140; i >= 0; i = i
													- gridSize) {
												for (var u = ui.helper
														.outerHeight() - 140; u >= 0; u = u
														- gridSize) {
													$
															.each(
																	invalidPositions,
																	function(
																			posTop,
																			arr) {
																		$
																				.each(
																						arr,
																						function(
																								left,
																								arr2) {
																							if (!invalidPositions2[posTop
																									- u]) {
																								invalidPositions2[posTop
																										- u] = {};
																							}
																							invalidPositions2[posTop
																									- u][left
																									- i] = true;
																						});
																	});
												}
											}
											this.invalidPositions = _
													.deepExtend(
															invalidPositions,
															invalidPositions2);
										},
										stop : function(event, ui) {
											var change = {};
											change.row = ((ui.position.top - 5) / 150) + 1;
											change.col = ((ui.position.left - 5) / 150) + 1;
											Blaze.getData(this).modify(change);
										},
										stack : ('#dashboard li')
									});
					$('#dashboard li')
							.resizable(
									{
										helper : "ui-resizable-helper",
										grid : [ gridSize, gridSize ],
										start : function(event, ui) {
											var max_height_at_width = {};
											// Get max width possible.
											var max_width = 30 * gridSize - 10;
											ui.element
													.siblings()
													.each(
															function(k, elem) {
																var $elem = $(elem);
																var width = $elem
																		.position().left
																		- ui.element
																				.position().left
																		- 10;
																if (_
																		.overlap(
																				[
																						$elem
																								.position().top,
																						$elem
																								.position().top
																								+ $elem
																										.outerHeight() ],
																				ui.element
																						.position().top)
																		&& max_width > width
																		&& width > 0) {
																	max_width = width;
																}
															});
											for (var i = max_width; i >= 0; i = i
													- gridSize) {
												max_height_at_width[i] = null;
												ui.element
														.siblings()
														.each(
																function(k,
																		elem) {
																	var $elem = $(elem);
																	if (!_
																			.overlap(
																					[
																							$elem
																									.position().left,
																							$elem
																									.position().left
																									+ $elem
																											.outerWidth() ],
																					[
																							ui.element
																									.position().left,
																							ui.element
																									.position().left
																									+ i ])) {
																		// The
																		// element
																		// is
																		// out
																		// of
																		// collision
																		// possibility.
																		return true;
																	} else {
																		if (max_height_at_width[i] === null
																				|| max_height_at_width[i] > ui.element
																						.position().top
																						- $elem
																								.position().top
																						- 5) {
																			max_height_at_width[i] = $elem
																					.position().top
																					- ui.element
																							.position().top
																					- 5;
																		}
																	}
																});
											}
											this.max_height_at_width = max_height_at_width;
											// Calculate all max height possible
											// for each possible widths.

											this.last_width = 140 + (Math
													.round((ui.size.width + 10)
															/ gridSize) - 1) * 150;
											this.last_height = ui.size.height = 140 + (Math
													.round((ui.size.height + 10)
															/ gridSize) - 1) * 150;
										},
										resize : function(event, ui) {
											ui.size.width = 140 + (Math
													.round((ui.size.width + 10)
															/ gridSize) - 1) * 150;
											ui.size.height = 140 + (Math
													.round((ui.size.height + 10)
															/ gridSize) - 1) * 150;
											if (typeof this.max_height_at_width[ui.size.width] == 'undefined'
													|| (this.max_height_at_width[ui.size.width] < ui.size.height && this.max_height_at_width[ui.size.width] !== null)) {
												ui.size.width = this.last_width;
												ui.size.height = this.last_height;
											} else {
												this.last_width = ui.size.width;
												this.last_height = ui.size.height;
											}
										},
										stop : function(event, ui) {
											var change = {};
											ui.size.width = 140 + (Math
													.round((ui.size.width + 10)
															/ gridSize) - 1) * 150;
											ui.size.height = 140 + (Math
													.round((ui.size.height + 10)
															/ gridSize) - 1) * 150;
											ui.element.width(ui.size.width);
											ui.element.height(ui.size.height);
											change.height = Math
													.round((ui.size.height + 10)
															/ gridSize);
											change.width = Math
													.round((ui.size.width + 10)
															/ gridSize);
											Blaze.getData(this).modify(change);
										}
									});
				} else {
					// stop dragging;
					$('#dashboard li').draggable('disable');
				}
			},
			'click #change_background':function(){
				$('#backgroundConfigModal').modal('show');
			},
			'click #add_widget':function(){
				$('#widgetAddModal').modal('show');
			}
		});

Template.registerHelper('in_modification_state', function() {
	return Session.get(IN_MODIFICATION_STATE);
});

