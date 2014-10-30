Ext.define('pf.store.dataUpdate.DeleteBlank', {
	extend : 'pf.store.dataUpdate.AbstractDataUpdateStore',
	model : 'pf.model.dataUpdate.DeleteBlank',
	sorters : [ {
		property : 'priority',
		direction : 'DESC'
	} ]
});
