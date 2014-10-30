Ext.define('pf.model.ToSync', {
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
		name : 'applicantType',
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
		name : 'objFuncType',
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
		type : 'float'
	}, {
		name : 'livingArea',
		type : 'float'
	}, {
		name : 'storeroomArea',
		type : 'float'
	}, {
		name : 'kitchenArea',
		type : 'float'
	}, {
		name : 'floorHeight',
		type : 'float'
	}, {
		name : 'cellarHeight',
		type : 'float'
	}, {
		name : 'constructiveDimension',
		type : 'string'
	}, {
		name : 'materialOfWalls',
		type : 'string'
	}, {
		name : 'materialOfCover',
		type : 'string'
	}, {
		name : 'heatingType',
		type : 'string'
	}, {
		name : 'generalRoomCondition',
		type : 'string'
	}, {
		name : 'localityCategory',
		type : 'string'
	}, {
		name : 'localityStanding',
		type : 'string'
	}, {
		name : 'localityStructure',
		type : 'string'
	}, {
		name : 'distanceFromCentre',
		type : 'float'
	}, {
		name : 'distanceFromBusStop',
		type : 'float'
	}, {
		name : 'distanceFromRailway',
		type : 'float'
	}, {
		name : 'distanceFromAirport',
		type : 'float'
	}, {
		name : 'distanceFromSeaport',
		type : 'float'
	}, {
		name : 'isSocleFloor',
		type : 'string'
	}, {
		name : 'isAtticFloor',
		type : 'string'
	}, {
		name : 'budgetCost',
		type : 'float'
	}, {
		name : 'valuationCostUAH',
		type : 'float'
	}, {
		name : 'valuationCostUSD',
		type : 'float'
	}, {
		name : 'contractNum',
		type : 'string'
	}, {
		name : 'locationTerritory',
		type : 'string'
	}, {
		name : 'locationStreet',
		type : 'string'
	}, {
		name : 'locationBuilding',
		type : 'string'
	}, {
		name : 'locationFlat',
		type : 'string'
	}, {
		name : 'orgName',
		type : 'string'
	}, {
		name : 'orgLocation',
		type : 'string'
	}, {
		name : 'orgAddress',
		type : 'string'
	}, {
		name : 'orgCertNumber',
		type : 'string'
	}, {
		name : 'orgCertDate',
		type : 'string'
	}, {
		name : 'addDescription',
		type : 'auto'
	}, {
		name : 'otherExternalBuildings',
		type : 'auto'
	}, {
		name : 'valuator',
		type : 'string'
	}, {
		name : 'isManual',
		type : 'boolean'
	}, {
		name : 'valuatorCertNum',
		type : 'string'
	}, {
		name : 'valuatorCertDate',
		type : 'string'
	}, {
		name : 'createDateBlank',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	}, {
		name : 'attachmentDocs',
		type : 'string'
	}, {
		name : 'docNumRaise',
		type : 'string'
	}, {
		name : 'docDateRaise',
		type : 'string'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'getOVToSync'
		},
		api : {
			create : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Create.cls',
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls'
		}
	}
});
