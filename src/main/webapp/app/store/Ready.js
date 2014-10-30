Ext.define('pf.store.Ready', {
	extend : 'Ext.data.Store',
	storeId : 'storeReadyId',
	model : 'pf.model.Ready',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoSync : false,
	remoteSort : true,
	listeners : {
		beforeload : function(store, operation, eOpts) {
			var items = store.filters.items;
			for ( var i = 0; i <= items.length - 1; i++) {
				if (items[i].property == "valuationDate") {
					items[i].value = items[i].value + '^' + items[i].operator;
				}
				if (items[i].property == "createDateBlank") {
					items[i].value = items[i].value + '^' + items[i].operator;
				}
			}
		}
	}
});
