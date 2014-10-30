Ext.define('pf.view.main.MainToolBar', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.mainToolBar',
	floating : false,
	cls : 'mainPanel',
	initComponent : function() {
		var timeDisplay = Ext.create('Ext.toolbar.TextItem', {
			listeners : {
				render : function() {
					Ext.TaskManager.start({
						run : function() {
							timeDisplay.setText(Ext.Date.format(new Date(), 'd.m.Y H:i:s'));
						},
						interval : 1000,
						scope : this
					});
				}
			}
		});
		Ext.apply(this, {
			items : [ {
				xtype : 'panel',
				region : 'north',
				items : [ {
					xtype : 'toolbar',
					border : false,
					cls : 'mainToolbar',
					items : [ {
						text : loc.mnuMain,
						tooltip : loc.mnuMain,
						itemId : 'menu/main',
						hidden : !(pf.LoggedInUser.inRole('OPERATOR,ACCOUNTANT,SUPERVISOR,SUPERVISOR_HEAD'))
					}, {
						xtype : 'tbseparator',
						hidden : !(pf.LoggedInUser.inRole('OPERATOR,ACCOUNTANT,SUPERVISOR,VALUATOR,SYNCHRONIZER,BRANCH_HEAD,SUPERVISOR_HEAD'))
					}, {
						text : loc.mnuReports,
						tooltip : loc.mnuReports,
						itemId : 'menu/reports',
						hidden : !(pf.LoggedInUser.inRole('OPERATOR,ACCOUNTANT,SUPERVISOR,VALUATOR,SYNCHRONIZER,BRANCH_HEAD,SUPERVISOR_HEAD'))
					}, {
						xtype : 'tbseparator',
						hidden : !(pf.LoggedInUser.inRole('BRANCH_HEAD,SUPERVISOR,SUPERVISOR_HEAD'))
					}, {
						text : loc.mnuStatistics,
						tooltip : loc.mnuStatistics,
						itemId : 'menu/statistics',
						hidden : !(pf.LoggedInUser.inRole('BRANCH_HEAD,SUPERVISOR,SUPERVISOR_HEAD'))
					}, {
						xtype : 'tbseparator',
						hidden : !pf.LoggedInUser.inRole('ADMIN,ADMIN_HEAD')
					}, {
						text : loc.mnuAdmin,
						tooltip : loc.mnuAdmin,
						itemId : 'menu/admin',
						hidden : !pf.LoggedInUser.inRole('ADMIN,ADMIN_HEAD')
					}, {
						xtype : 'tbseparator',
						hidden : !(pf.LoggedInUser.inRole('OPERATOR,ACCOUNTANT,SUPERVISOR,VALUATOR,SYNCHRONIZER,BRANCH_HEAD'))
					}, {
						text : loc.mnuMyCabinet,
						tooltip : loc.mnuMyCabinet,
						itemId : 'menu/issues',
						hidden : !(pf.LoggedInUser.inRole('OPERATOR,ACCOUNTANT,SUPERVISOR,VALUATOR,SYNCHRONIZER,BRANCH_HEAD'))
					}, '->', {
						xtype : 'image',
						src : 'resources/images/user-icon.png'
					}, ' ', {
						xtype : 'label',
						tooltip : 'Користувач',
						itemId : 'lblUserDesc',
						cls : 'lblUserDesc'
					}, ' ', {
						xtype : 'image',
						src : 'resources/images/Business-Organization-icon.png'
					}, ' ', {
						xtype : 'label',
						tooltip : 'Місце роботи',
						inputAttrTpl : " data-qtip='This is my quick tip!' ",
						itemId : 'lblUserWorkplaceDesc',
						cls : 'lblUserDesc'
					}, ' ', {
						xtype : 'image',
						src : 'resources/images/clock.png'
					}, timeDisplay, {
						iconCls : 'system-shutdown',
						text : loc.btnExit,
						tooltip : loc.btnExit,
						scope : this,
						itemId : 'logout'
					} ]
				} ]
			} ]
		});
		this.callParent(arguments);
	}
});