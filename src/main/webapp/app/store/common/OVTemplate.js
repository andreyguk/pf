/**
 * 
 */
Ext.define('pf.store.common.OVTemplate', {
	extend : 'Ext.data.Store',
	storeId : 'storeCertSODId',
	model : 'pf.model.common.OVTemplate',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoSync : false,
	listeners : {
		beforeload : function(store, operation, eOpts) {
			var items = store.filters.items;

			if (store.objFuncType) {
				var objFuncType = new Ext.util.Filter({
					property : 'objFuncType',
					value : store.objFuncType
				});
				store.filters.items.push(objFuncType);
			}
			for ( var i = 0; i <= items.length - 1; i++) {
				if (items[i].property == "valuationDate") {
					items[i].value = items[i].value + '^' + items[i].operator;
				}
			}
		}
		
	}
});
