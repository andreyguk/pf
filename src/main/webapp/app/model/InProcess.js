Ext.define('pf.model.InProcess', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'contractNum',
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
		name : 'otherObjectsNearby',
		type : 'string'
	}, {
		name : 'state',
		type : 'string'
	}, {
		name : 'blank',
		type : 'string'
	}, {
		name : 'createDateBlank',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	}, {
		name : 'isJointOwnership',
		type : 'boolean'
	},
	// / Місцезнаходження об'єкта оцінки (територія)
	{
		name : 'locationTerritory',
		type : 'string'
	},

	// / Місцезнаходження (район населеного пункту)
	{
		name : 'locationCityDistrict',
		type : 'int'
	},

	// / Місцезнаходження (вулиця)
	{
		name : 'locationStreet',
		type : 'string'
	},

	// / Місцезнаходження (будинок)
	{
		name : 'locationBuilding',
		type : 'string'
	},

	// / Місцезнаходження (квартира)
	{
		name : 'locationFlat',
		type : 'string'
	},

	// / Категорія населеного пункту
	{
		name : 'localityCategory',
		type : 'string'
	},

	// / Структура населенного пункту
	{
		name : 'localityStructure',
		type : 'string'
	},

	// / Знаходження в плані населеного пункту
	{
		name : 'localityStanding',
		type : 'string'
	},

	// / Клас капітальності будівлі
	{
		name : 'buildingMainClass',
		type : 'string'
	},

	// / Тип будівлі
	{
		name : 'buildingType',
		type : 'string'
	},

	// / Рік введення в експлуатацію
	{
		name : 'maintenanceYear',
		type : 'string'
	},

	// / Тип приміщення
	{
		name : 'flatType',
		type : 'string'
	},

	// / Тип ринку, на якому здійснюється угода з майном
	{
		name : 'marketType',
		type : 'string'
	},

	// / Матеріал: Зовнішні двері
	{
		name : 'materialOfExternalDoors',
		type : 'string'
	},

	// / Матеріал: Внутрішні двері
	{
		name : 'materialOfInternalDoors',
		type : 'string'
	},

	// / Матеріал: Вікна
	{
		name : 'materialOfWindows',
		type : 'string'
	},

	// / Матеріал стін
	{
		name : 'materialOfWalls',
		type : 'string'
	},

	// / Матеріал перекриття
	{
		name : 'materialOfCover',
		type : 'string'
	},

	// / Кількість поверхів будинку
	{
		name : 'floorsQty',
		type : 'string'
	},

	// / Номер поверху (номера поверхів)
	{
		name : 'objectFloorNum',
		type : 'string'
	},

	// / Цокольний поверх
	{
		name : 'isSocleFloor',
		type : 'boolean'
	},

	// / Мансардний поверх
	{
		name : 'isAtticFloor',
		type : 'boolean'
	},

	// / Загальна площа (кв.м.)
	{
		name : 'totalArea',
		type : 'string'
	},

	// / Площа житлових приміщень (кв.м.)
	{
		name : 'livingArea',
		type : 'string'
	},

	// / Площа підсобних приміщень (кв.м.)
	{
		name : 'storeroomArea',
		type : 'string'
	},

	// / У тому числі кухні (кв.м.)
	{
		name : 'kitchenArea',
		type : 'string'
	},

	// / Площа цокольного, підвального поверху (кв.м.)
	{
		name : 'socleArea',
		type : 'string'
	},

	// / Висота від підлоги до стелі (м)
	{
		name : 'floorHeight',
		type : 'string'
	},

	// / Висота підвального поверху (м)
	{
		name : 'cellarHeight',
		type : 'string'
	},

	// / Будівельний об'єм (куб.м.)
	{
		name : 'constructiveDimension',
		type : 'string'
	},

	// / Кількість кімнат (од.)
	{
		name : 'roomQty',
		type : 'string'
	},

	// / Тип планування кімнат
	{
		name : 'roomPlanningType',
		type : 'string'
	},

	// / Тип опалення
	{
		name : 'heatingType',
		type : 'string'
	},

	// / Інші автоматичні системи (охоронна, протипожежна, та ін.)
	{
		name : 'otherAutomaticSystems',
		type : 'string'
	},

	// / Загальний стан приміщень
	{
		name : 'generalRoomCondition',
		type : 'string'
	},

	// / Наявність поблизу інших об'єктів
	{
		name : 'otherObjectsNearby',
		type : 'string'
	},

	// / До центру населеного пункту (м)
	{
		name : 'distanceFromCentre',
		type : 'string'
	},

	// / До автомагістралі (м)
	{
		name : 'distanceFromHighway',
		type : 'string'
	},

	// / До лісу (парку) (м)
	{
		name : 'distanceFromPark',
		type : 'string'
	},

	// / До водойми (м)
	{
		name : 'distanceFromRiver',
		type : 'string'
	},

	// / До зупинки гр. транспорту (м)
	{
		name : 'distanceFromBusStop',
		type : 'string'
	},

	// / До з/д вокзалу (м)
	{
		name : 'distanceFromRailway',
		type : 'string'
	},

	// / До аеропорту (м)
	{
		name : 'distanceFromAirport',
		type : 'string'
	},

	// / До р/м порту (м)
	{
		name : 'distanceFromSeaport',
		type : 'string'
	},

	// / Сумма передбачуваної угоди, (грн.)
	{
		name : 'contractSum',
		type : 'string'
	},

	// / Кошторисна вартість, (грн.)
	{
		name : 'budgetCost',
		type : 'string'
	},

	// / Інвентарізаційна вартість, (грн.)
	{
		name : 'inventoryCost',
		type : 'string'
	},

	// / Додаткова інформація, яка може істотно вплинути на результат оцінки
	{
		name : 'addInfo',
		type : 'string'
	},

	// / Інші надвірні будівлі та споруди (асоціація)
	{
		name : 'otherExternalBuildings',
		type : 'string'
	},

	// / Додаткові характеристики
	{
		name : 'addDescription',
		type : 'string'
	},
	// / Дані правовстановлюючих документів (асоціація)
	{
		name : 'constitutiveDocs',
		type : 'string'
	},
	// / Опис приміщень (асоціація)
	{
		name : 'roomDescription',
		type : 'string'
	}, {
		name : 'addDescription',
		type : 'string'
	}, {
		name : 'infrastructure',
		type : 'string'
	}, {
		name : 'valuationParts',
		type : 'string'
	}, {
		name : 'analogue',
		type : 'string'
	}, {
		name : 'applicantType',
		type : 'int'
	}, {
		name : 'applicantTypeName',
		type : 'string'
	}, {
		name : 'isAppOwner',
		type : 'int'
	}, {
		name : 'ownerLastName',
		type : 'string'
	}, {
		name : 'ownerFirstName',
		type : 'string'
	}, {
		name : 'ownerMiddleName',
		type : 'string'
	}, {
		name : 'ownerCompanyName',
		type : 'string'
	}, {
		name : 'ownerAttorneyNumber',
		type : 'string'
	}, {
		name : 'ownerAttorneyDate',
		type : 'string'
	}, {
		name : 'appAddressTerritory',
		type : 'string'
	}, {
		name : 'appAddressIndex',
		type : 'string'
	}, {
		name : 'appAddressStreet',
		type : 'string'
	}, {
		name : 'appAddressHouse',
		type : 'string'
	}, {
		name : 'appAddressFlat',
		type : 'string'
	}, {
		name : 'valuationPartNumer',
		type : 'string'
	}, {
		name : 'valuationPartDenom',
		type : 'string'
	}, {
		name : 'fdmuNum',
		type : 'string'
	}, {
		name : 'statsMin',
		type : 'string'
	}, {
		name : 'statsMax',
		type : 'string'
	}, {
		name : 'statsMid',
		type : 'string'
	}, {
		name : 'statsMed',
		type : 'string'
	}, {
		name : 'currencyRate',
		type : 'string'
	}, {
		name : 'valuationCostUSD',
		type : 'string'
	}, {
		name : 'valuationCostUAH',
		type : 'string'
	}, {
		name : 'valuationDate',
		type : 'string'
	}, {
		name : 'paymentDeliveryType',
		type : 'string'
	}, {
		name : 'reportDeliveryType',
		type : 'string'
	}, {
		name : 'ownerType',
		type : 'string'
	}, {
		name : 'valuator',
		type : 'string'
	}, {
		name : 'otherOwners',
		type : 'string'
	}, {
		name : 'retrospectiveValuation',
		type : 'string'
	}, {
		name : 'needsRetrospectiveValuation',
		type : 'boolean'
	}, {
		name : 'corrections',
		type : 'string'
	}, {
		name : 'isManual',
		type : 'string'
	}, {
		name : 'addInf',
		type : 'string'
	},
	// ЗЕМЛЯ ================================================================

	{
		name : 'plotPurpose',
		type : 'string'
	}, {
		name : 'roadLocation',
		type : 'string'
	}, {
		name : 'roadType',
		type : 'string'
	}, {
		name : 'plotForm',
		type : 'string'
	}, {
		name : 'plotIncline',
		type : 'string'
	}, {
		name : 'geologicalConditions',
		type : 'string'
	}, {
		name : 'plotDescription',
		type : 'string'
	}, {
		name : 'plotQty',
		type : 'string'
	}, {
		name : 'plotArea',
		type : 'string'
	}, {
		name : 'usedArea',
		type : 'string'
	}, {
		name : 'cadastralNumber',
		type : 'string'
	}, {
		name : 'usageLimitation',
		type : 'string'
	}, {
		name : 'distanceFromRegCentre',
		type : 'string'
	}, {
		name : 'distanceFromBusStation',
		type : 'string'
	}, {
		name : 'attachmentDocs',
		type : 'string'
	}, {
		name : 'signer',
		type : 'string'
	},
	// ДОМОВОЛОДІННЯ ==========================
	{
		name : 'readyCoeff',
		type : 'string'
	}, {
		name : 'maintenanceYearHouse',
		type : 'string'
	}, {
		name : 'isPrivateLand',
		type : 'int'
	}, {
		name : 'landLocationStreet',
		type : 'string'
	}, {
		name : 'landLocationBuilding',
		type : 'string'
	}, {
		name : 'landLocationPlot',
		type : 'string'
	}, {
		name : 'housePlot2Analogue',
		type : 'string'
	}, {
		name : 'correctionsHousePlot',
		type : 'string'
	}, {
		name : 'ovLandLink',
		type : 'string'
	}, {
		name : 'ovLandNum',
		type : 'string'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'OVInProcess'
		},
		api : {
			create : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Create.cls',
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls',
			update : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Create.cls'
		}
	}
});
