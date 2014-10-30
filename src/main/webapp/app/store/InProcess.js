Ext.define('pf.store.InProcess', {
	extend : 'Ext.data.Store',
	storeId : 'storeInProcessId',
	model : 'pf.model.InProcess',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	remoteSort : true,
	autoSync : false,
	listeners : {
		beforeload : function(store, operation, eOpts) {
			var items = store.filters.items;
			for ( var i = 0; i <= items.length - 1; i++) {
				if (items[i].property == "createDateBlank") {
					items[i].value = items[i].value + '^' + items[i].operator;
				}
			}
		}
	}
});
