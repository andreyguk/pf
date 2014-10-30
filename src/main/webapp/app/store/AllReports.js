Ext.define('pf.store.AllReports', {
	extend : 'Ext.data.Store',
	storeId : 'storeAllReportsId',
	model : 'pf.model.AllReports',
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
			if (store.objectType) {
				var objectType = new Ext.util.Filter({
					property : 'objectType',
					value : store.objectType
				});
				store.filters.items.push(objectType);
			}
		}
	}
});
