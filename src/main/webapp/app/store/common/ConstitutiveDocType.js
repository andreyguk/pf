/**
 * Тип правовстановлюючого документа
 */
Ext.define('pf.store.common.ConstitutiveDocType', {
	extend : 'Ext.data.Store',
	model : 'pf.model.common.ConstitutiveDocType',
	remoteFilter : true,
	autoLoad : true
});
