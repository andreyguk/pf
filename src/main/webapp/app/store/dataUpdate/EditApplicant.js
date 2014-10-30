Ext.define('pf.store.dataUpdate.EditApplicant', {
	extend : 'pf.store.dataUpdate.AbstractDataUpdateStore',
	storeId : 'editApplicantId',
	model : 'pf.model.dataUpdate.EditApplicant',
	sorters : [ {
		property : 'priority',
		direction : 'DESC'
	} ]
});
