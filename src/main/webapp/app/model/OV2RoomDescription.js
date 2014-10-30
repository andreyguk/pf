/**
 * Об'єкт оцінки - Опис приміщень
 */
Ext.define('pf.model.OV2RoomDescription', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'int'
	}, {
		name : 'roomType',
		type : 'int'
	}, {
		name : 'roomTypeName',
		type : 'string'
	}, {
		name : 'floorType',
		type : 'int'
	}, {
		name : 'floorTypeName',
		type : 'string'
	}, {
		name : 'wallsType',
		type : 'int'
	}, {
		name : 'wallsTypeName',
		type : 'string'
	}, {
		name : 'ceilingType',
		type : 'int'
	}, {
		name : 'ceilingTypeName',
		type : 'string'
	}, {
		name : 'objectValuation',
		type : 'int'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'OV2RoomDescription'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls'
		}
	}
});
