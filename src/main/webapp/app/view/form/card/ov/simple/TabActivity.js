Ext.define('pf.view.form.card.ov.simple.TabActivity', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ov.simple.TabActivity',
	itemId : 'activityId',
	initComponent : function() {
		var me = this;
		var storeActivity = Ext.create('pf.store.Activity');
		storeActivity.filter('ovId', me.ovID)
		Ext.applyIf(me, {
			items : [ {
				xtype : 'fieldset',
				layout : 'anchor',
				anchor : '100%',
				title : 'Історія внесених змін',
				items : [ {
					xtype : 'grid',
					store : storeActivity,
					selType : 'rowmodel',
					anchor : '70%',
					columnLines : true,
					itemId : 'gridActivity',
					dockedItems : [ {
						xtype : 'pagingtoolbar',
						dock : 'bottom',
						store : storeActivity,
						displayInfo : true
					} ],
					columns : me.buildColumns()
				}]
			} ]
		});
		me.callParent(arguments);
	},
	buildColumns : function() {
		return [ {
			xtype : 'rownumberer'
		}, {
			header : 'id',
			dataIndex : 'id',
			hidden : true,
			hideable : false
		}, {
			text : 'Дата дії',
			flex : 1,
			renderer : Ext.util.Format.dateRenderer('d.m.Y H:i:s'),
			dataIndex : 'actionDate'
		}, {
			text : 'Тип дії',
			flex : 2,
			dataIndex : 'actionType'
		}, {
			text : 'Користувач',
			dataIndex : 'creator',
			flex : 1
		}, {
			text : 'Додатковий опис',
			dataIndex : 'description',
			flex : 2
		}];
	}
})