/**
 * Вид об'єкту оцінки
 */
Ext.define('pf.store.common.OV2Infrastructure', {
	extend : 'Ext.data.Store',
	model : 'pf.model.common.OV2Infrastructure',
	storeId : 'storeOV2InfrastructureId',
	autoLoad : {
		start : 0,
		limit : 50
	},
	remoteFilter : true,
	autoSync : false,
	pageSize : 50,
	listeners : {
		beforeload : function(store, operation, eOpts) {
			var ov = new Ext.util.Filter({
				property : 'ov',
				value : store.ov
			});
			store.filters.items.push(ov);
		}
	}
});