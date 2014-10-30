Ext.define('pf.view.main.menu.ReportsMenu', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.reportsMenu',
	layout : {
		type : 'accordion',
		fill : false,
		multi : true
	},
	width : 250,
	bodyStyle : {
		background : '#F0F0F0'
	},
	showSeparator : false,
	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				xtype : 'panel',
				bodyStyle : {
					background : '#F0F0F0'
				},
				title : 'Усі звіти',
				cls : 'reportsMenu',
				items : [ {
					xtype : 'menu',
					itemId : 'reportsMenuId',
					collapseDirection : 'left',
					floating : false,
					showSeparator : false,
					width : 250,
					items : [ {
						text : loc.mnuNew,
						iconCls : 'icon-menu-list',
						itemId : 'new',
						hidden : !(pf.LoggedInUser.inRole('VALUATOR,SUPERVISOR'))
					}, {
						xtype : 'menuseparator',
						hidden : !(pf.LoggedInUser.inRole('VALUATOR,SUPERVISOR'))
					}, {
						text : loc.mnuFinished,
						iconCls : 'icon-menu-list',
						itemId : 'finished',
						hidden : !(pf.LoggedInUser.inRole('SYNCHRONIZER,SUPERVISOR'))
					}, {
						xtype : 'menuseparator',
						hidden : !(pf.LoggedInUser.inRole('SYNCHRONIZER,SUPERVISOR'))
					}, {
						text : loc.mnuSynched,
						iconCls : 'icon-menu-list',
						itemId : 'synched',
						hidden : !(pf.LoggedInUser.inRole('ACCOUNTANT,SUPERVISOR'))
					}, {
						xtype : 'menuseparator',
						hidden : !(pf.LoggedInUser.inRole('ACCOUNTANT,SUPERVISOR'))
					}, {
						text : loc.mnuReady,
						iconCls : 'icon-menu-list',
						itemId : 'ready',
						hidden : !(pf.LoggedInUser.inRole('OPERATOR,SUPERVISOR'))
					}, {
						xtype : 'menuseparator',
						hidden : !(pf.LoggedInUser.inRole('OPERATOR,SUPERVISOR'))
					}, {
						text : loc.mnuHanded,
						iconCls : 'icon-menu-list',
						itemId : 'handed',
						hidden : !(pf.LoggedInUser.inRole('OPERATOR,SUPERVISOR,ACCOUNTANT'))
					}, {
						xtype : 'menuseparator',
						hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
					}, {
						text : loc.mnuAllReports,
						iconCls : 'icon-menu-list',
						itemId : 'allReports',
						hidden : !(pf.LoggedInUser.inRole('SUPERVISOR,SUPERVISOR_HEAD'))
					} ]
				} ]
			}, {
				xtype : 'panel',
				cls : 'reportsMenu',
				hidden : !(pf.LoggedInUser.inRole('VALUATOR,SUPERVISOR,SYNCHRONIZER')),
				bodyStyle : {
					background : '#F0F0F0'
				},
				margin : '0 0 300 0',
				title : 'Мої звіти',
				items : [ {
					xtype : 'menu',
					itemId : 'myReportsMenuId',
					collapseDirection : 'left',
					floating : false,
					showSeparator : false,
					width : 250,
					items : [ {
						text : loc.mnuInProcess,
						iconCls : 'icon-menu-list',
						itemId : 'inProcess',
						hidden : !(pf.LoggedInUser.inRole('VALUATOR,SUPERVISOR'))
					}, {
						xtype : 'menuseparator',
						hidden : !(pf.LoggedInUser.inRole('VALUATOR,SUPERVISOR'))
					}, {
						text : loc.mnuToSync,
						iconCls : 'icon-menu-list',
						itemId : 'toSync',
						hidden : !(pf.LoggedInUser.inRole('SYNCHRONIZER,SUPERVISOR'))
					} ]
				} ]
			} ]
		}), this.callParent(arguments);
	}
});
