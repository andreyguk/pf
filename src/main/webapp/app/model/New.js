Ext.define('pf.model.New', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'contractNum',
		type : 'string'
	}, {
		name : 'valuationDate',
		type : 'date',
		dateFormat : 'd.m.Y'
	}, {
		name : 'fdmuNum',
		type : 'string'
	}, {
		name : 'applicant',
		type : 'string'
	}, {
		name : 'objectName',
		type : 'string'
	}, {
		name : 'objectType',
		type : 'string'
	}, {
		name : 'objectSubType',
		type : 'string'
	}, {
		name : 'creatorOrg',
		type : 'string'
	}, {
		name : 'objRegion',
		type : 'string'
	}, {
		name : 'objRayon',
		type : 'string'
	}, {
		name : 'objCity',
		type : 'string'
	}, {
		name : 'maintenanceYear',
		type : 'string'
	}, {
		name : 'buildingMainClass',
		type : 'string'
	}, {
		name : 'floorsQty',
		type : 'string'
	}, {
		name : 'objectFloorNum',
		type : 'string'
	}, {
		name : 'totalArea',
		type : 'string'
	}, {
		name : 'livingArea',
		type : 'string'
	}, {
		name : 'storeroomArea',
		type : 'string'
	}, {
		name : 'kitchenArea',
		type : 'string'
	}, {
		name : 'floorHeight',
		type : 'string'
	}, {
		name : 'cellarHeight',
		type : 'string'
	}, {
		name : 'constructiveDimension',
		type : 'string'
	}, {
		name : 'materialOfWalls',
		type : 'string'
	}, {
		name : 'createDateBlank',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'getNewOV'
		},
		api : {
			create : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Create.cls',
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls'
		}
	}
});
