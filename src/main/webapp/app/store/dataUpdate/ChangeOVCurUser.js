Ext.define('pf.store.dataUpdate.ChangeOVCurUser', {
	extend : 'pf.store.dataUpdate.AbstractDataUpdateStore',
	storeId : 'changeOVCurUserId',
	model : 'pf.model.dataUpdate.ChangeOVCurUser',
	sorters : [ {
		property : 'priority',
		direction : 'DESC'
	} ]
});
