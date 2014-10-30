/**
 * 
 */
Ext.define('pf.model.common.OVTemplate', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'valuationDate',
		type : 'date',
		dateFormat : 'Y-m-d'
	}, {
		name : 'createDateBlank',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	}, {
		name : 'contractNum',
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
		name : 'address',
		type : 'string'
	}, {
		name : 'valuationCostUSD',
		type : 'string'
	}, {
		name : 'totalArea',
		type : 'string'
	}, {
		name : 'roomQty',
		type : 'string'
	}, {
		name : 'objectFloorNum',
		type : 'string'
	}, {
		name : 'floorsQty',
		type : 'string'
	}, {
		name : 'buildingType',
		type : 'string'
	}, {
		name : 'generalRoomCondition',
		type : 'string'
	}, {
		name : 'objFuncType',
		type : 'string'
	}, {
		name : 'plotArea',
		type : 'string'
	}, {
		name : 'plotPurpose',
		type : 'string'
	}, {
		name : 'totalCorr',
		type : 'string'
	}, {
		name : 'valuationCostUSD',
		type : 'string'
	}, {
		name : 'costMetre',
		type : 'string'
	}, {
		name : 'isPrivateLand',
		type : 'boolean'
	}, {
		name : 'plotArea',
		type : 'string'
	}, {
		name : 'costMetrePlot',
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
		name : 'fdmuNum',
		type : 'string'
	}, {
		name : 'ovState',
		type : 'string'
	}, {
		name : 'reportMaker',
		type : 'string'
	}, {
		name : 'synchronizer',
		type : 'string'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'getOVImage'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls',
			destroy : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Delete.cls'
		}
	}
});
