Ext.define('pf.store.dataUpdate.ChangeIsManual', {
	extend : 'pf.store.dataUpdate.AbstractDataUpdateStore',
	storeId : 'changeIsManualId',
	model : 'pf.model.dataUpdate.ChangeIsManual',
	sorters : [ {
		property : 'priority',
		direction : 'DESC'
	} ]
});
