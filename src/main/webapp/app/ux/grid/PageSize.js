Ext.define('pf.ux.grid.PageSize', {
	extend : 'Ext.AbstractPlugin',
	alias : 'plugin.pageSize',
	pluginId : 'pageSize',
	init : function(paging) {
		this.overrideBottomToolbar(paging);
	},

	/**
	 * add combobox on bottom toolbar for select page size
	 */
	overrideBottomToolbar : function(paging) {
		var me = this, store = paging.getStore()
		var toolbar = paging.down('pagingtoolbar');
		var items = {
			xtype : 'combobox',
			width : 50,
			store : new Ext.data.ArrayStore({
				fields : [ 'value', 'text' ],
				data : [ [ '25', '25' ], [ '50', '50' ], [ '100', '100' ], [ '200', '200' ], [ 'All', PlPageSize.valueAll ] ]
			}),
			mode : 'local',
			value : '25',
			listWidth : 40,
			triggerAction : 'all',
			displayField : 'text',
			valueField : 'value',
			editable : false,
			forceSelection : true,
			listeners : {
				'change' : function(combo, newValue, oldValue, eOpts) {
					var rowCount = (newValue == 'All') ? 10000 : newValue;
					store.pageSize = rowCount;
					store.load({
						params : {
							limit : rowCount
						}
					});
				}
			}
		};
		if (toolbar == null) {
			paging.add({
				xtype : 'tbseparator'
			}, items, {
				xtype : 'label',
				text : PlPageSize.lblRowCount
			});
		} else
			toolbar.insert(11, items);
	}

})