/**
 * Аналоги об'єкту оцінки
 */
Ext.define('pf.store.common.Analogue', {
	extend : 'Ext.data.Store',
	storeId : 'storeAnalogueId',
	model : 'pf.model.common.Analogue',
	remoteFilter : true,
	remoteSort : true,
	autoSync : false,
	autoLoad : false,
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	objTerritory : '',
	ovFuncType : '',
	listeners : {
		beforeload : function(store, operation, eOpts) {
			if (store.objTerritory != '') {
				var filter = new Ext.util.Filter({
					property : 'objTerritory',
					value : store.objTerritory
				});
				store.filters.items.push(filter);
			}
			if (store.ovFuncType != '') {
				var filter = new Ext.util.Filter({
					property : 'ovFuncType',
					value : store.ovFuncType
				});
				store.filters.items.push(filter);
			}
		}
	}
});
