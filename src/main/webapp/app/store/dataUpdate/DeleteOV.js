Ext.define('pf.store.dataUpdate.DeleteOV', {
	extend : 'pf.store.dataUpdate.AbstractDataUpdateStore',
	storeId : 'storeDeleteOVId',
	model : 'pf.model.dataUpdate.DeleteOV',
	sorters : [ {
		property : 'priority',
		direction : 'DESC'
	} ]
});
