Ext.define('pf.controller.card.Statistics', {
	extend : 'pf.controller.Abstract',
	views : [ 'pf.view.form.statistics.DailyReportFilter', 'pf.view.form.statistics.DailyReportBlanksFilter', 'pf.view.form.statistics.BlankSummary',
	          'pf.view.form.statistics.BranchBlanksReport', 'pf.view.form.statistics.BranchOVsReport', 'pf.view.form.statistics.SyncReport',
	          'pf.view.form.statistics.SyncSummary', 'pf.view.form.statistics.SyncReport', 'pf.view.form.statistics.OVSummary'],
	refs : [{
		ref : 'gridBlankSummary', selector : '[xtype=blankSummary] grid#gridBlankSummary'
	}, {
		ref : 'gridOVSummary', selector : '[xtype=ovSummary] grid#gridOVSummary'
	}, {
		ref : 'gridReadyOVSummary', selector : '[xtype=readyOVSummary] grid#gridReadyOVSummary'
	}, {
		ref : 'gridBranchBlanksReport', selector : '[xtype=branchBlanksReport] grid#gridBranchBlanksReport'
	}, {
		ref : 'gridBranchOVsReport', selector : '[xtype=branchOVsReport] grid#gridBranchOVsReport'
	}, {
		ref : 'gridSyncSummary', selector : '[xtype=syncSummary] grid#gridSyncSummary'
	}],
	
	init : function() {
		this.listen({
			component : {
				'[xtype=dailyReportFilter] button#runReport' : {
					click : this.runDailyReport
				},
				'[xtype=dailyReportBlanksFilter] button#runReport' : {
					click : this.runDailyBlanksReport
				},
				'[xtype=blankSummary] button#runBlankSummary' : {
					click : this.runBlankSummary
				},
				'[xtype=ovSummary] button#runOVSummary' : {
					click : this.runOVSummary
				},
				'[xtype=readyOVSummary] button#runReadyOVSummary' : {
					click : this.runReadyOVSummary
				},
				'[xtype=branchBlanksReport] button#runBranchBlanksReport' : {
					click : this.runBranchBlanksReport
				},
				'[xtype=branchOVsReport] button#runBranchOVsReport' : {
					click : this.runBranchOVsReport
				},
				'[xtype=syncSummary] button#runSyncSummary' : {
					click : this.runSyncSummary
				},
				'[xtype=syncReport] button#runReport' : {
					click : this.runSyncReport
				},
				'[xtype=dailyReportFilter] combobox#objectTypesId' : {
					change : this.onChangeObjectType
				}
			}
		});
	},
	runDailyReport : function(button) {
		var params = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
	    var form = button.up('form');
	    var filters = {
	    	objectSubType : form.down('[itemId=objectSubTypesId]').getValue(),
		    objectType : form.down('[itemId=objectTypesId]').getValue(),
		    ovState : form.down('[itemId=OVStateId]').getValue(),
		    organization : form.down('[itemId=organizationId]').getValue(),
		    valuationDateTo : form.down('[itemId=valuationDateToId]').getRawValue(),
		    valuationDateFrom : form.down('[itemId=valuationDateFromId]').getRawValue(),
		    blankCreateDateFrom : form.down('[itemId=blankCreateDateFromId]').getRawValue(),
		    blankCreateDateTo : form.down('[itemId=blankCreateDateToId]').getRawValue()
	    };
	    JSONfilters = JSON.stringify(filters);
	    var url = 'pf.proxy.manager.ReportManager.cls?reportName=dailyReport&params='+JSONfilters;
	    window.open(url, "Документ", params);
	},
	
	runDailyBlanksReport : function(button) {
		var params = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
	    var form = button.up('form');
	    var filters = {
	    	objectSubType : form.down('[itemId=objectSubTypesId]').getValue(),
		    objectType : form.down('[itemId=objectTypesId]').getValue(),
		    blankState : form.down('[itemId=blankStateId]').getValue(),
		    organization : form.down('[itemId=organizationId]').getValue(),
		    blankCreateDateFrom : form.down('[itemId=blankCreateDateFromId]').getRawValue(),
		    blankCreateDateTo : form.down('[itemId=blankCreateDateToId]').getRawValue()
	    };
	    JSONfilters = JSON.stringify(filters);
	    var url = 'pf.proxy.manager.ReportManager.cls?reportName=dailyBlanksReport&params='+JSONfilters;
	    window.open(url, "Документ", params);
	},
	
	onChangeObjectType : function(combo, value) {
		var objType = combo.getValue(), objSubType = combo.up('form').down('[itemId=objectSubTypesId]'), store, objTypeStore = combo.getStore();
		var objTypeCode = objTypeStore.findRecord('id', value).get('code');
		if (!objTypeCode) {
			return;
		}
		if ((objTypeCode == 5) || (objTypeCode == 6) || (objTypeCode == 7) || (objTypeCode == 8)) {
			objSubType.allowBlank = true;
			objSubType.setFieldLabel(loc.lblObjectSubType);
		} else {
			objSubType.allowBlank = false;
			objSubType.setFieldLabel(loc.lblObjectSubTypeRequired);
		}
		objSubType.setValue('');
		store = objSubType.getStore();
		filters = [ {
			property : 'objectType',
			value : objType
		} ];
		store.clearFilter(true);
		store.filter(filters);
	},

	runBlankSummary : function(button) {
		var me = this, form = button.up('form'), filters = [], filter = {}, store = me.getGridBlankSummary().getStore();
		var blankCreateDateFrom = form.down('[itemId=blankCreateDateFromId]').getRawValue();
		if (!Ext.isEmpty(blankCreateDateFrom)) {
			filter = {
				property : 'blankCreateDateFrom',
				value : blankCreateDateFrom
			};
			filters.push(filter);
		}
		var blankCreateDateTo = form.down('[itemId=blankCreateDateToId]').getRawValue();
		if (!Ext.isEmpty(blankCreateDateTo)) {
			filter = {
				property : 'blankCreateDateTo',
				value : blankCreateDateTo
			};
			filters.push(filter);
		}
		me.setFilter(store, filters)
	},
	
	runOVSummary : function(button) {
		var me = this, form = button.up('form'), filters = [], filter = {}, store = me.getGridOVSummary().getStore();
		var blankCreateDateFrom = form.down('[itemId=blankCreateDateFromId]').getRawValue();
		if (!Ext.isEmpty(blankCreateDateFrom)) {
			filter = {
				property : 'blankCreateDateFrom',
				value : blankCreateDateFrom
			};
			filters.push(filter);
		}
		var blankCreateDateTo = form.down('[itemId=blankCreateDateToId]').getRawValue();
		if (!Ext.isEmpty(blankCreateDateTo)) {
			filter = {
				property : 'blankCreateDateTo',
				value : blankCreateDateTo
			};
			filters.push(filter);
		}
		me.setFilter(store, filters)
	},
	
	runReadyOVSummary : function(button) {
		var me = this, form = button.up('form'), filters = [], filter = {}, store = me.getGridReadyOVSummary().getStore();
		var readyDateFrom = form.down('[itemId=readyDateFromId]').getRawValue();
		if (!Ext.isEmpty(readyDateFrom)) {
			filter = {
				property : 'readyDateFrom',
				value : readyDateFrom
			};
			filters.push(filter);
		}
		var readyDateTo = form.down('[itemId=readyDateToId]').getRawValue();
		if (!Ext.isEmpty(readyDateTo)) {
			filter = {
				property : 'readyDateTo',
				value : readyDateTo
			};
			filters.push(filter);
		}
		me.setFilter(store, filters)
	},
	
	runBranchOVsReport : function(button) {
		var me = this, form = button.up('form'), filters = [], filter = {}, store = me.getGridBranchOVsReport().getStore();
		var blankCreateDateFrom = form.down('[itemId=blankCreateDateFromId]').getRawValue();
		if (!Ext.isEmpty(blankCreateDateFrom)) {
			filter = {
				property : 'blankCreateDateFrom',
				value : blankCreateDateFrom
			};
			filters.push(filter);
		}
		var blankCreateDateTo = form.down('[itemId=blankCreateDateToId]').getRawValue();
		if (!Ext.isEmpty(blankCreateDateTo)) {
			filter = {
				property : 'blankCreateDateTo',
				value : blankCreateDateTo
			};
			filters.push(filter);
		}
		me.setFilter(store, filters)
	},
	
	runBranchBlanksReport : function(button) {
		var me = this, form = button.up('form'), filters = [], filter = {}, store = me.getGridBranchBlanksReport().getStore();
		var blankCreateDateFrom = form.down('[itemId=blankCreateDateFromId]').getRawValue();
		if (!Ext.isEmpty(blankCreateDateFrom)) {
			filter = {
				property : 'blankCreateDateFrom',
				value : blankCreateDateFrom
			};
			filters.push(filter);
		}
		var blankCreateDateTo = form.down('[itemId=blankCreateDateToId]').getRawValue();
		if (!Ext.isEmpty(blankCreateDateTo)) {
			filter = {
				property : 'blankCreateDateTo',
				value : blankCreateDateTo
			};
			filters.push(filter);
		}
		me.setFilter(store, filters)
	},
	
	runSyncSummary : function(button) {
		var me = this, form = button.up('form'), filters = [], filter = {}, store = me.getGridSyncSummary().getStore();
		var syncDateFrom = form.down('[itemId=syncDateFromId]').getRawValue();
		if (!Ext.isEmpty(syncDateFrom)) {
			filter = {
				property : 'syncDateFrom',
				value : syncDateFrom
			};
			filters.push(filter);
		}
		var syncDateTo = form.down('[itemId=syncDateToId]').getRawValue();
		if (!Ext.isEmpty(syncDateTo)) {
			filter = {
				property : 'syncDateTo',
				value : syncDateTo
			};
			filters.push(filter);
		}
		me.setFilter(store, filters)
	},
	
	runSyncReport : function(button) {
		var params = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
	    var form = button.up('form');
	    var filters = {
	    	synchronizer : form.down('[itemId=synchronizerId]').getValue(),
	    	syncDateFrom : form.down('[itemId=syncDateFromId]').getRawValue(),
	    	syncDateTo : form.down('[itemId=syncDateToId]').getRawValue()
	    };
	    JSONfilters = JSON.stringify(filters);
	    var url = 'pf.proxy.manager.ReportManager.cls?reportName=syncReport&params='+JSONfilters;
	    window.open(url, "Документ", params);
	},
	
	setFilter : function(store, filter) {
		store.clearFilter(true);
		store.filter(filter);
	}
});