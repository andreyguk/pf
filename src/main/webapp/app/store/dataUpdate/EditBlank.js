Ext.define('pf.store.dataUpdate.EditBlank', {
	extend : 'pf.store.dataUpdate.AbstractDataUpdateStore',
	storeId : 'editBlankId',
	model : 'pf.model.dataUpdate.EditBlank',
	sorters : [ {
		property : 'priority',
		direction : 'DESC'
	} ]
});
