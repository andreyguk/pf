Ext.define('pf.store.dataUpdate.ChangeOVState', {
	extend : 'pf.store.dataUpdate.AbstractDataUpdateStore',
	storeId : 'changeOVStateId',
	model : 'pf.model.dataUpdate.ChangeOVState',
	sorters : [ {
		property : 'priority',
		direction : 'DESC'
	} ]
});
