/**
 * Об'єкт оцінки - Аналоги об'єктів
 */
Ext.define('pf.model.OV2Analogue', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'int'
	}, {
		name : 'locationId',
		type : 'string'
	}, {
		name : 'location',
		type : 'string'
	}, {
		name : 'rayon',
		type : 'string'
	}, {
		name : 'address',
		type : 'string'
	}, {
		name : 'origin',
		type : 'string'
	}, {
		name : 'contacts',
		type : 'string'
	}, {
		name : 'object',
		type : 'string'
	}, {
		name : 'description',
		type : 'string'
	}, {
		name : 'area',
		type : 'string'
	}, {
		name : 'costAll',
		type : 'string'
	}, {
		name : 'costMetre',
		type : 'string'
	}, {
		name : 'proposeDate',
		type : 'string'
	}, {
		name : 'buildingTypeId',
		type : 'string'
	}, {
		name : 'buildingType',
		type : 'string'
	}, {
		name : 'roomQty',
		type : 'string'
	}, {
		name : 'floorNum',
		type : 'string'
	}, {
		name : 'floorsQty',
		type : 'string'
	}, {
		name : 'plotPurposeName',
		type : 'string'
	}, {
		name : 'plotPurpose',
		type : 'string'
	}, {
		name : 'isPrivateLand',
		type : 'boolean'
	}, {
		name : 'plotArea',
		type : 'string'
	}, {
		name : 'plotAreaIsUndefined',
		type : 'boolean'
	},
	{
		name : 'isScreenExist',
		type : 'boolean'
	}],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'OV2Analogue'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls'
		}
	}
});
