Ext.define('pf.view.main.menu.MainMenu', {
	extend : 'Ext.menu.Menu',
	alias : 'widget.mainMenu',
	itemId : 'mainMenuId',
	collapseDirection : 'left',
	floating : false,
	showSeparator : false,
	width : 250,
	// cls : 'mainMenu',
	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				text : loc.mnuCreate,
				iconCls : 'icon-menu-list',
				itemId : 'create',
				hidden : !(pf.LoggedInUser.inRole('OPERATOR,SUPERVISOR'))
			}, {
				xtype : 'menuseparator',
				hidden : !(pf.LoggedInUser.inRole('OPERATOR,SUPERVISOR'))
			}, {
				text : loc.mnuUpaid,
				iconCls : 'icon-menu-list',
				itemId : 'unpaid',
				hidden : !(pf.LoggedInUser.inRole('OPERATOR,SUPERVISOR'))
			}, {
				xtype : 'menuseparator',
				hidden : !(pf.LoggedInUser.inRole('ACCOUNTANT,SUPERVISOR,OPERATOR'))
			}, {
				text : loc.mnuPaid,
				iconCls : 'icon-menu-list',
				itemId : 'paid',
				hidden : !(pf.LoggedInUser.inRole('ACCOUNTANT,SUPERVISOR,OPERATOR'))
			}, {
				xtype : 'menuseparator',
				hidden : !(pf.LoggedInUser.inRole('ACCOUNTANT,SUPERVISOR,OPERATOR'))
			}, {
				text : loc.mnuAccounted,
				iconCls : 'icon-menu-list',
				itemId : 'accounted',
				hidden : !(pf.LoggedInUser.inRole('ACCOUNTANT,SUPERVISOR,OPERATOR'))
			}, {
				xtype : 'menuseparator',
				hidden : !pf.LoggedInUser.inRole('SUPERVISOR_HEAD')
			}, {
				text : loc.mnuAllBlanks,
				iconCls : 'icon-menu-list',
				itemId : 'allBlanks',
				hidden : !pf.LoggedInUser.inRole('SUPERVISOR_HEAD')

			} ]

		}), this.callParent(arguments);
	}
});
