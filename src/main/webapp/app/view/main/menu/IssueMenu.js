Ext.define('pf.view.main.menu.IssueMenu', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.issueMenu',
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
				title : loc.ttlIssue,
				cls : 'reportsMenu',
				items : [ {
					xtype : 'menu',
					itemId : 'reportsMenuId',
					collapseDirection : 'left',
					floating : false,
					showSeparator : false,
					width : 250,
					items : [ {
						text : loc.mnuCreateIssue,
						iconCls : 'icon-menu-list',
						itemId : 'createIssue'
					// hidden : !(pf.LoggedInUser.inRole('OPERATOR'))
					}, {
						xtype : 'menuseparator'
					// hidden : !(pf.LoggedInUser.inRole('OPERATOR'))
					}, {
						text : loc.mnuIssues,
						iconCls : 'icon-menu-list',
						itemId : 'listIssues'
					// hidden : !(pf.LoggedInUser.inRole('SUPERVISOR'))
					} ]
				} ]
			}, {
				xtype : 'panel',
				cls : 'reportsMenu',
				bodyStyle : {
					background : '#F0F0F0'
				},
				title : loc.ttlAccount,
				items : [ {
					xtype : 'menu',
					collapseDirection : 'left',
					floating : false,
					showSeparator : false,
					width : 250,
					items : [ {
						text : loc.mnuProfile,
						iconCls : 'icon-menu-list',
						menu : [ {
							text : 'Зміна паролю для входу',
							iconCls : 'modify-key-icon',
							itemId : 'profile'
						} ]
					} ]
				} ]
			}, {
				xtype : 'panel',
				bodyStyle : {
					background : '#F0F0F0'
				},
				margin : '0 0 300 0',
				title : loc.addInfoMenu,
				cls : 'reportsMenu',
				items : [ {
					xtype : 'menu',
					itemId : 'addInfoMenuId',
					collapseDirection : 'left',
					floating : false,
					showSeparator : false,
					width : 250,
					items : [ {
						text : loc.mnuUserManual,
						iconCls : 'icon-menu-list',
						itemId : 'listUserManual'
					} ]
				} ]
			} ]
		}), this.callParent(arguments);
	}
});
