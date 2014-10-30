Ext.define('pf.store.dataUpdate.AbstractDataUpdateStore', {
	extend : 'Ext.data.Store',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	remoteSort : true,
	autoSync : false,
	autoLoad : true,
	listeners : {
		beforeload : function(store, operation, eOpts) {
			var items = store.filters.items;
			for ( var i = 0; i <= items.length - 1; i++) {
				if (items[i].property == "createDate") {
					items[i].value = items[i].value + '^' + items[i].operator;
				}
			}
		}
	}
});
