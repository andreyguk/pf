Ext.define('pf.view.main.menu.AdminMenu', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.adminMenu',
	itemId : 'adminMenuId',
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
				title : 'Управління довідниками',
				cls : 'reportsMenu',
				items : [ {
					xtype : 'menu',
					collapseDirection : 'left',
					floating : false,
					showSeparator : false,
					width : 250,
					items : [ {
						text : loc.mnuOrganizations,
						iconCls : 'icon-menu-list',
						itemId : 'mnuOrganizations'
					}, "-", {
						text : loc.mnuUsers,
						iconCls : 'icon-menu-list',
						itemId : 'mnuUsers'
					}, "-", {
						text : loc.mnuHandbooks,
						iconCls : 'icon-menu-list',
						hidden : true,
						menu : [ {
							text : 'dict1',
							iconCls : 'tableEditIcon'
						} ]
					} ]
				} ]
			}, {
				xtype : 'panel',
				cls : 'reportsMenu',
				bodyStyle : {
					background : '#F0F0F0'
				},
				title : loc.mnuIssues,
				items : [ {
					xtype : 'menu',
					collapseDirection : 'left',
					floating : false,
					showSeparator : false,
					width : 250,
					items : [ {
						text : loc.mnuUsersIssue,
						iconCls : 'icon-menu-list',
						itemId : 'mnuUsersIssue'
					} ]
				} ]
			}, {
				xtype : 'panel',
				// collapsed : true,
				cls : 'reportsMenu',
				bodyStyle : {
					background : '#F0F0F0'
				},
				title : loc.mnuDataManagement,
				items : [ {
					xtype : 'menu',
					collapseDirection : 'left',
					floating : false,
					showSeparator : false,
					width : 250,
					items : [ {
						text : loc.mnuChangeOVState,
						iconCls : 'icon-menu-list',
						itemId : 'mnuChangeOVState'
					}, "-", {
						text : loc.mnuChangeOVCurUser,
						iconCls : 'icon-menu-list',
						itemId : 'mnuChangeOVCurUser'
					}, "-", {
						text : loc.mnuDeleteOV,
						iconCls : 'icon-menu-list',
						itemId : 'mnuDeleteOV'
					}, "-", {
						text : loc.mnuChangeValuationDate,
						iconCls : 'icon-menu-list',
						itemId : 'mnuChangeValuationDate'
					}, "-", {
						text : loc.mnuChangeIsManual,
						iconCls : 'icon-menu-list',
						itemId : 'mnuChangeIsManual'
					}, "-", {
						text : loc.mnuEditBlank,
						iconCls : 'icon-menu-list',
						itemId : 'mnuEditBlank'
					}, "-", {
						text : loc.mnuEditApplicant,
						iconCls : 'icon-menu-list',
						itemId : 'mnuEditApplicant'
					} ]
				} ]
			}, {
				xtype : 'panel',
				bodyStyle : {
					background : '#F0F0F0'
				},
				margin : '0 0 300 0',
				hidden : !(pf.LoggedInUser.inRole('ADMIN_HEAD')),
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
