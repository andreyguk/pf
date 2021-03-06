Ext.define('pf.store.Finished', {
	extend : 'Ext.data.Store',
	storeId : 'storeFinishedId',
	model : 'pf.model.Finished',
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
