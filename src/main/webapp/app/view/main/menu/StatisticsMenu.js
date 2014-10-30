Ext.define('pf.view.main.menu.StatisticsMenu', {
	extend : 'Ext.menu.Menu',
	alias : 'widget.statisticsMenu',
	collapseDirection : 'left',
	floating : false,
	showSeparator : false,
	width : 250,
	// cls : 'mainMenu',
	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				text : loc.mnuDailyReport,
				iconCls : 'icon-menu-list',
				itemId : 'dailyReport',
				hidden : !(pf.LoggedInUser.inRole('BRANCH_HEAD,SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				xtype : 'menuseparator',
				hidden : !(pf.LoggedInUser.inRole('ACCOUNTANT,SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				text : loc.mnuDailyReportBlanks,
				iconCls : 'icon-menu-list',
				itemId : 'dailyReportBlanks',
				hidden : !(pf.LoggedInUser.inRole('ACCOUNTANT,SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				xtype : 'menuseparator',
				hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				text : loc.mnuBlankStateSummary,
				iconCls : 'icon-menu-list',
				itemId : 'blankStateSummary',
				hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				xtype : 'menuseparator',
				hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				text : loc.mnuOVStateSummary,
				iconCls : 'icon-menu-list',
				itemId : 'ovStateSummary',
				hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				xtype : 'menuseparator',
				hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				text : loc.mnuReadyOVSummary,
				iconCls : 'icon-menu-list',
				itemId : 'readyOVSummary',
				hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				xtype : 'menuseparator',
				hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				text : loc.mnuBranchBlanksReport,
				iconCls : 'icon-menu-list',
				itemId : 'branchBlanksReport',
				hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				xtype : 'menuseparator',
				hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				text : loc.mnuBranchOVsReport,
				iconCls : 'icon-menu-list',
				itemId : 'branchOVsReport',
				hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				xtype : 'menuseparator',
				hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				text : loc.mnuSyncSummary,
				iconCls : 'icon-menu-list',
				itemId : 'syncSummary',
				hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				xtype : 'menuseparator',
				hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				text : loc.mnuSyncReport,
				iconCls : 'icon-menu-list',
				itemId : 'syncReport',
				hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
			}, {
				xtype : 'menuseparator',
				hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
			} ]

		}), this.callParent(arguments);
	}
});
