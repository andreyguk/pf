Ext.define('pf.controller.card.Filter', {
	extend : 'pf.controller.Abstract',
	views : [ 'pf.view.form.list.AnalogueList' ],
	refs : [ {
		ref : 'gridAnalogueList',
		selector : 'analogueList grid#gridAnalogueListId'
	}, {
		ref : 'proposeDateStart',
		selector : 'analogueList #proposeDateStart'
	}, {
		ref : 'proposeDateEnd',
		selector : 'analogueList #proposeDateEnd'
	}, {
		ref : 'location',
		selector : 'analogueList #location'
	}, {
		ref : 'rayon',
		selector : 'analogueList #rayon'
	}, {
		ref : 'address',
		selector : 'analogueList #address'
	}, {
		ref : 'areaStart',
		selector : 'analogueList #areaStart'
	}, {
		ref : 'areaEnd',
		selector : 'analogueList #areaEnd'
	}, {
		ref : 'costAllStart',
		selector : 'analogueList #costAllStart'
	}, {
		ref : 'costAllEnd',
		selector : 'analogueList #costAllEnd'
	}, {
		ref : 'costMetreStart',
		selector : 'analogueList #costMetreStart'
	}, {
		ref : 'costMetreEnd',
		selector : 'analogueList #costMetreEnd'
	}, {
		ref : 'roomQtyStart',
		selector : 'analogueList #roomQtyStart'
	}, {
		ref : 'roomQtyEnd',
		selector : 'analogueList #roomQtyEnd'
	}, {
		ref : 'floorNumStart',
		selector : 'analogueList #floorNumStart'
	}, {
		ref : 'floorNumEnd',
		selector : 'analogueList #floorNumEnd'
	}, {
		ref : 'floorsQtyStart',
		selector : 'analogueList #floorsQtyStart'
	}, {
		ref : 'floorsQtyEnd',
		selector : 'analogueList #floorsQtyEnd'
	}, {
		ref : 'isScreenExist',
		selector : 'analogueList #isScreenExist'
	}, {
		ref : 'plotPurpose',
		selector : 'analogueList #plotPurposeId'
	} ],
	init : function() {
		this.listen({
			component : {
				'[xtype=analogueList] button#setFilter' : {
					click : this.setFilter
				},
				'[xtype=analogueList] button#clearFilter' : {
					click : this.clearFilter
				}
			},
			store : {}
		});
	},
	setFilter : function(button) {
		var me = this, analogueStore = me.getGridAnalogueList().getStore();
		var filter = me.getFilters();
		analogueStore.clearFilter(true);
		analogueStore.filter(filter);
	},
	clearFilter : function(button) {
		var me = this, analogueStore = me.getGridAnalogueList().getStore();
		me.getProposeDateStart().setValue('');
		me.getProposeDateEnd().setValue('');
		me.getLocation().setValue('');
		me.getRayon().setValue('');
		me.getAddress().setValue('');
		me.getAreaStart().setValue('');
		me.getAreaEnd().setValue('');
		me.getCostAllStart().setValue('');
		me.getCostAllEnd().setValue('');
		me.getCostMetreStart().setValue('');
		me.getCostMetreEnd().setValue('');
		if (me.getRoomQtyStart()) {
			me.getRoomQtyStart().setValue('');
			me.getRoomQtyEnd().setValue('');
			me.getFloorNumStart().setValue('');
			me.getFloorNumEnd().setValue('');
			me.getFloorsQtyStart().setValue('');
			me.getFloorsQtyEnd().setValue('');
		}
		if (me.getPlotPurpose()) {
			me.getPlotPurpose().setValue('');
		}
		
		analogueStore.clearFilter();
	},
	getFilters : function() {
		var me = this, filters = [], filter = {};

		var proposeDateStart = me.getProposeDateStart().getRawValue();
		if (!Ext.isEmpty(proposeDateStart)) {
			filter = {
				property : 'proposeDateStart',
				value : proposeDateStart
			};
			filters.push(filter);
		}

		var proposeDateEnd = me.getProposeDateEnd().getRawValue();
		if (!Ext.isEmpty(proposeDateEnd)) {
			filter = {
				property : 'proposeDateEnd',
				value : proposeDateEnd
			};
			filters.push(filter);
		}

		var location = me.getLocation().getRawValue();
		if (!Ext.isEmpty(location)) {
			filter = {
				property : 'location',
				value : location
			};
			filters.push(filter);
		}

		var rayon = me.getRayon().getRawValue();
		if (!Ext.isEmpty(rayon)) {
			filter = {
				property : 'rayon',
				value : rayon
			};
			filters.push(filter);
		}

		var address = me.getAddress().getRawValue();
		if (!Ext.isEmpty(address)) {
			filter = {
				property : 'address',
				value : address
			};
			filters.push(filter);
		}
		var areaStart = me.getAreaStart().getRawValue();
		if (!Ext.isEmpty(areaStart)) {
			filter = {
				property : 'areaStart',
				value : areaStart
			};
			filters.push(filter);
		}
		var areaEnd = me.getAreaEnd().getRawValue();
		if (!Ext.isEmpty(areaEnd)) {
			filter = {
				property : 'areaEnd',
				value : areaEnd
			};
			filters.push(filter);
		}

		var costAllStart = me.getCostAllStart().getRawValue();
		if (!Ext.isEmpty(costAllStart)) {
			filter = {
				property : 'costAllStart',
				value : costAllStart
			};
			filters.push(filter);
		}
		var costAllEnd = me.getCostAllEnd().getRawValue();
		if (!Ext.isEmpty(costAllEnd)) {
			filter = {
				property : 'costAllEnd',
				value : costAllEnd
			};
			filters.push(filter);
		}

		var costMetreStart = me.getCostMetreStart().getRawValue();
		if (!Ext.isEmpty(costMetreStart)) {
			filter = {
				property : 'costMetreStart',
				value : costMetreStart
			};
			filters.push(filter);
		}
		var costMetreEnd = me.getCostMetreEnd().getRawValue();
		if (!Ext.isEmpty(costMetreEnd)) {
			filter = {
				property : 'costMetreEnd',
				value : costMetreEnd
			};
			filters.push(filter);
		}

		if (me.getRoomQtyStart()) {
			var roomQtyStart = me.getRoomQtyStart().getRawValue();
			if (!Ext.isEmpty(roomQtyStart)) {
				filter = {
					property : 'roomQtyStart',
					value : roomQtyStart
				};
				filters.push(filter);
			}
		}
		if (me.getRoomQtyEnd()) {
			var roomQtyEnd = me.getRoomQtyEnd().getRawValue();
			if (!Ext.isEmpty(roomQtyEnd)) {
				filter = {
					property : 'roomQtyEnd',
					value : roomQtyEnd
				};
				filters.push(filter);
			}
		}
		if (me.getFloorNumStart()) {
			var floorNumStart = me.getFloorNumStart().getRawValue();
			if (!Ext.isEmpty(floorNumStart)) {
				filter = {
					property : 'floorNumStart',
					value : floorNumStart
				};
				filters.push(filter);
			}
		}
		if (me.getFloorNumEnd()) {
			var floorNumEnd = me.getFloorNumEnd().getRawValue();
			if (!Ext.isEmpty(floorNumEnd)) {
				filter = {
					property : 'floorNumEnd',
					value : floorNumEnd
				};
				filters.push(filter);
			}
		}
		if (me.getFloorsQtyStart()) {
			var floorsQtyStart = me.getFloorsQtyStart().getRawValue();
			if (!Ext.isEmpty(floorsQtyStart)) {
				filter = {
					property : 'floorsQtyStart',
					value : floorsQtyStart
				};
				filters.push(filter);
			}
		}
		if (me.getFloorsQtyEnd()) {
			var floorsQtyEnd = me.getFloorsQtyEnd().getRawValue();
			if (!Ext.isEmpty(floorsQtyEnd)) {
				filter = {
					property : 'floorsQtyEnd',
					value : floorsQtyEnd
				};
				filters.push(filter);
			}
		}

		var isScreenExist = me.getIsScreenExist().getValue().isScreenExist;
		filter = {
			property : 'isScreenExist',
			value : isScreenExist
		};
		filters.push(filter);

		if (me.getPlotPurpose()) {
			var plotPurpose = me.getPlotPurpose().getValue();
			if (!Ext.isEmpty(plotPurpose)) {
				filter = {
					property : 'plotPurpose',
					value : plotPurpose
				};
				filters.push(filter);
			}
		}
		

		return filters;
	}

});