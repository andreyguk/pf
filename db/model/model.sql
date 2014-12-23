/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     13.11.2014 11:47:19                          */
/*==============================================================*/


drop schema dict;

drop schema main;

/*==============================================================*/
/* User: dict                                                   */
/*==============================================================*/
create schema dict;

/*==============================================================*/
/* User: main                                                   */
/*==============================================================*/
create schema main;

/*==============================================================*/
/* Table: ActionType                                            */
/*==============================================================*/
create table dict.ActionType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_ACTIONTYPE primary key (id)
);

/*==============================================================*/
/* Table: AdditionalDescription                                 */
/*==============================================================*/
create table dict.AdditionalDescription (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   type                 VARCHAR(250)         null,
   constraint PK_ADDITIONALDESCRIPTION primary key (id)
);

/*==============================================================*/
/* Table: Analogue                                              */
/*==============================================================*/
create table main.Analogue (
   id                   SERIAL not null,
   location             INT4                 not null,
   rayon                VARCHAR(250)         null,
   address              VARCHAR(250)         not null,
   origin               VARCHAR(250)         null,
   contacts             VARCHAR(250)         null,
   object               VARCHAR(250)         null,
   description          varchar(4000)        not null,
   area                 numeric(12,2)        not null,
   costAll              numeric(12,2)        not null,
   costMetre            numeric(12,2)        not null,
   proposeDate          date                 not null,
   totalCorr            numeric(12,2)        null,
   costCorrected        numeric(12,2)        null,
   roomQty              INT4                 not null,
   floorNum             INT4                 not null,
   floorsQty            INT4                 not null,
   buildingType         INT4                 null,
   plotPurpose          INT4                 null,
   objFuncType          INT4                 null,
   isPrivateLand        BOOL                 not null default false
      constraint CKC_ISPRIVATELAND_ANALOGUE check (isPrivateLand in (true,false)),
   plotArea             numeric(12,2)        null,
   plotAreaIsUndefined  BOOL                 not null default false
      constraint CKC_PLOTAREAISUNDEFIN_ANALOGUE check (plotAreaIsUndefined in (true,false)),
   constraint PK_ANALOGUE primary key (id)
);

/*==============================================================*/
/* Table: Analogue2Correction                                   */
/*==============================================================*/
create table main.Analogue2Correction (
   id                   SERIAL not null,
   correctionType       INT4                 not null,
   correctionValue      numeric(12,2)        not null,
   correctionDescr      VARCHAR(250)         null,
   constraint PK_ANALOGUE2CORRECTION primary key (id)
);

/*==============================================================*/
/* Table: Applicant                                             */
/*==============================================================*/
create table main.Applicant (
   id                   SERIAL not null,
   applicantType        INT4                 not null,
   appPersonLastName    VARCHAR(250)         null,
   appPersonFirstName   VARCHAR(250)         null,
   appPersonMiddleName  VARCHAR(250)         null,
   appPersonPassportSeries VARCHAR(250)         null,
   appPersonPassportNumber VARCHAR(250)         null,
   appPersonPassportIssueOrgan VARCHAR(250)         null,
   appPersonPassportIssueDate date                 null,
   appContactPhone      VARCHAR(250)         null,
   appAddPhone          VARCHAR(250)         null,
   taxSystemType        INT4                 null,
   appINN               VARCHAR(250)         null,
   appVATNum            VARCHAR(250)         null,
   appRegDocs           VARCHAR(250)         null,
   appCitizenship       INT4                 null,
   appCompanyName       VARCHAR(250)         null,
   appCompanyHeadPosition VARCHAR(250)         null,
   appCompanyHeadName   VARCHAR(250)         null,
   appCompanyOKPO       VARCHAR(250)         null,
   appCompanyAddress    VARCHAR(250)         null,
   appCompanyHeadReason VARCHAR(250)         null,
   appCompanyEmail      VARCHAR(250)         null,
   appAddressTerritory  INT4                 null,
   appAddressStreet     VARCHAR(250)         null,
   appAddressHouse      VARCHAR(250)         null,
   appAddressFlat       VARCHAR(250)         null,
   appAddressIndex      VARCHAR(250)         null,
   creator              INT4                 null,
   creatorOrg           INT4                 null,
   constraint PK_APPLICANT primary key (id)
);

/*==============================================================*/
/* Table: ApplicantType                                         */
/*==============================================================*/
create table dict.ApplicantType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_APPLICANTTYPE primary key (id)
);

/*==============================================================*/
/* Table: Attachment                                            */
/*==============================================================*/
create table main.Attachment (
   id                   SERIAL not null,
   objId                INT4                 not null,
   fileName             VARCHAR(250)         not null,
   file                 bytea                not null,
   fSize                INT4                 not null,
   mimeType             VARCHAR(250)         not null,
   addDate              TIMESTAMP            not null,
   fileType             INT4                 not null,
   description          VARCHAR(250)         null,
   constraint PK_ATTACHMENT primary key (id)
);

/*==============================================================*/
/* Table: AttachmentType                                        */
/*==============================================================*/
create table dict.AttachmentType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_ATTACHMENTTYPE primary key (id)
);

/*==============================================================*/
/* Table: Blank                                                 */
/*==============================================================*/
create table main.Blank (
   id                   SERIAL not null,
   createDate           TIMESTAMP            null,
   creator              INT4                 null,
   creatorOrg           INT4                 null,
   contractNum          VARCHAR(250)         null,
   state                INT4                 null,
   applicant            INT4                 not null,
   objectName           varchar(4000)        not null,
   objectType           INT4                 not null,
   objectSubType        INT4                 null,
   paymentSum           money                not null,
   paymentSum2          money                null,
   prevValuationId      INT4                 null,
   prevInquiryId        INT4                 null,
   paymentDeliveryType  INT4                 null,
   reportDeliveryType   INT4                 null,
   isAppOwner           BOOL                 not null default false
      constraint CKC_ISAPPOWNER_BLANK check (isAppOwner in (true,false)),
   ownerType            INT4                 null,
   ownerLastName        VARCHAR(250)         null,
   ownerFirstName       VARCHAR(250)         null,
   ownerMiddleName      VARCHAR(250)         null,
   ownerCompanyName     VARCHAR(250)         null,
   ownerAttorneyNumber  VARCHAR(250)         null,
   ownerAttorneyDate    date                 null,
   valuationPart        VARCHAR(250)         null,
   valuationAllParts    VARCHAR(250)         null,
   valuationDate        date                 null,
   isAppIn1S            BOOL                 not null default false
      constraint CKC_ISAPPIN1S_BLANK check (isAppIn1S in (true,false)),
   otherOwners          VARCHAR(250)         null,
   valuationPartNumer   INT4                 null,
   valuationPartDenom   INT4                 null,
   valuationPurpose     INT4                 null,
   costType             INT4                 null,
   isJointOwnership     BOOL                 not null default false
      constraint CKC_ISJOINTOWNERSHIP_BLANK check (isJointOwnership in (true,false)),
   addInfo              varchar(4000)        null,
   constraint PK_BLANK primary key (id)
);

/*==============================================================*/
/* Table: Blank2ValuationParts                                  */
/*==============================================================*/
create table main.Blank2ValuationParts (
   id                   SERIAL not null,
   blank                INT4                 not null,
   ownerFio             VARCHAR(250)         not null,
   valuationPartNumer   INT4                 not null,
   valuationPartDenom   INT4                 not null,
   constraint PK_BLANK2VALUATIONPARTS primary key (id)
);

/*==============================================================*/
/* Table: BlankActivities                                       */
/*==============================================================*/
create table main.BlankActivities (
   id                   SERIAL not null,
   blank                INT4                 not null,
   actionType           INT4                 not null,
   actionDate           TIMESTAMP            not null,
   creator              INT4                 not null,
   paymentDate          date                 null,
   constraint PK_BLANKACTIVITIES primary key (id)
);

/*==============================================================*/
/* Table: BlankState                                            */
/*==============================================================*/
create table dict.BlankState (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_BLANKSTATE primary key (id)
);

/*==============================================================*/
/* Table: BuildingMainClass                                     */
/*==============================================================*/
create table dict.BuildingMainClass (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_BUILDINGMAINCLASS primary key (id)
);

/*==============================================================*/
/* Table: BuildingTechCondition                                 */
/*==============================================================*/
create table dict.BuildingTechCondition (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_BUILDINGTECHCONDITION primary key (id)
);

/*==============================================================*/
/* Table: BuildingType                                          */
/*==============================================================*/
create table dict.BuildingType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_BUILDINGTYPE primary key (id)
);

/*==============================================================*/
/* Table: CeilingType                                           */
/*==============================================================*/
create table dict.CeilingType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_CEILINGTYPE primary key (id)
);

/*==============================================================*/
/* Table: Citizenship                                           */
/*==============================================================*/
create table dict.Citizenship (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   nameEN               VARCHAR(250)         not null,
   constraint PK_CITIZENSHIP primary key (id)
);

/*==============================================================*/
/* Table: ConstitutiveDocType                                   */
/*==============================================================*/
create table dict.ConstitutiveDocType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   type                 VARCHAR(250)         null,
   constraint PK_CONSTITUTIVEDOCTYPE primary key (id)
);

/*==============================================================*/
/* Table: CorrectionType                                        */
/*==============================================================*/
create table dict.CorrectionType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_CORRECTIONTYPE primary key (id)
);

/*==============================================================*/
/* Table: Corrections                                           */
/*==============================================================*/
create table main.Corrections (
   id                   SERIAL not null,
   an1corrOnBargain     numeric(12,2)        null default 1,
   an1corrOnArea        numeric(12,2)        null default 1,
   an1corrOnDate        numeric(12,2)        null default 1,
   an1corrOnFloor       numeric(12,2)        null default 1,
   an1corrOnCondition   numeric(12,2)        null default 1,
   an1corrOnLocation    numeric(12,2)        null default 1,
   an1corrOnBuildingType numeric(12,2)        null default 1,
   an1corrOnWalls       numeric(12,2)        null default 1,
   an1corrOnFurniture   numeric(12,2)        null default 1,
   an1corrOnCom         numeric(12,2)        null default 1,
   an1corrOther         numeric(12,2)        null default 1,
   an1totalCorr         numeric(12,2)        not null,
   an1costCorrected     numeric(12,2)        not null,
   an2corrOnBargain     numeric(12,2)        null default 1,
   an2corrOnArea        numeric(12,2)        null default 1,
   an2corrOnDate        numeric(12,2)        null default 1,
   an2corrOnFloor       numeric(12,2)        null default 1,
   an2corrOnCondition   numeric(12,2)        null default 1,
   an2corrOnLocation    numeric(12,2)        null default 1,
   an2corrOnBuildingType numeric(12,2)        null default 1,
   an2corrOnWalls       numeric(12,2)        null default 1,
   an2corrOnFurniture   numeric(12,2)        null default 1,
   an2corrOnCom         numeric(12,2)        null default 1,
   an2corrOther         numeric(12,2)        null default 1,
   an2totalCorr         numeric(12,2)        not null,
   an2costCorrected     numeric(12,2)        not null,
   an3corrOnBargain     numeric(12,2)        null default 1,
   an3corrOnArea        numeric(12,2)        null default 1,
   an3corrOnDate        numeric(12,2)        null default 1,
   an3corrOnFloor       numeric(12,2)        null default 1,
   an3corrOnCondition   numeric(12,2)        null default 1,
   an3corrOnLocation    numeric(12,2)        null default 1,
   an3corrOnBuildingType numeric(12,2)        null default 1,
   an3corrOnWalls       numeric(12,2)        null default 1,
   an3corrOnFurniture   numeric(12,2)        null default 1,
   an3corrOnCom         numeric(12,2)        null default 1,
   an3corrOther         numeric(12,2)        null default 1,
   an3totalCorr         numeric(12,2)        not null,
   an3costCorrected     numeric(12,2)        not null,
   an4corrOnBargain     numeric(12,2)        null default 1,
   an4corrOnArea        numeric(12,2)        null default 1,
   an4corrOnDate        numeric(12,2)        null default 1,
   an4corrOnFloor       numeric(12,2)        null default 1,
   an4corrOnCondition   numeric(12,2)        null default 1,
   an4corrOnLocation    numeric(12,2)        null default 1,
   an4corrOnBuildingType numeric(12,2)        null default 1,
   an4corrOnWalls       numeric(12,2)        null default 1,
   an4corrOnFurniture   numeric(12,2)        null default 1,
   an4corrOnCom         numeric(12,2)        null default 1,
   an4corrOther         numeric(12,2)        null default 1,
   an4totalCorr         numeric(12,2)        not null,
   an4costCorrected     numeric(12,2)        not null,
   an1corrOnLandImprovements numeric(12,2)        null default 1,
   an1corrOnLandRights  numeric(12,2)        null default 1,
   an1corrOnLandPurpose numeric(12,2)        null default 1,
   an1corrOnLandDescr   numeric(12,2)        null default 1,
   an1corrOnLandTransport numeric(12,2)        null default 1,
   an1corrOnLandEnvironment numeric(12,2)        null default 1,
   an2corrOnLandImprovements numeric(12,2)        null default 1,
   an2corrOnLandRights  numeric(12,2)        null default 1,
   an2corrOnLandPurpose numeric(12,2)        null default 1,
   an2corrOnLandDescr   numeric(12,2)        null default 1,
   an2corrOnLandTransport numeric(12,2)        null default 1,
   an2corrOnLandEnvironment numeric(12,2)        null default 1,
   an3corrOnLandImprovements numeric(12,2)        null default 1,
   an3corrOnLandRights  numeric(12,2)        null default 1,
   an3corrOnLandPurpose numeric(12,2)        null default 1,
   an3corrOnLandDescr   numeric(12,2)        null default 1,
   an3corrOnLandTransport numeric(12,2)        null default 1,
   an3corrOnLandEnvironment numeric(12,2)        null default 1,
   an4corrOnLandImprovements numeric(12,2)        null default 1,
   an4corrOnLandRights  numeric(12,2)        null default 1,
   an4corrOnLandPurpose numeric(12,2)        null default 1,
   an4corrOnLandDescr   numeric(12,2)        null default 1,
   an4corrOnLandTransport numeric(12,2)        null default 1,
   an4corrOnLandEnvironment numeric(12,2)        null default 1,
   an1corrOnYear        numeric(12,2)        null default 1,
   an1corrOnMaterialQuality numeric(12,2)        null default 1,
   an1corrOnArchitecture numeric(12,2)        null default 1,
   an1corrOnReadinessRate numeric(12,2)        null default 1,
   an1corrOnAreaRatio   numeric(12,2)        null default 1,
   an1corrOnConstructState numeric(12,2)        null default 1,
   an2corrOnYear        numeric(12,2)        null default 1,
   an2corrOnMaterialQuality numeric(12,2)        null default 1,
   an2corrOnArchitecture numeric(12,2)        null default 1,
   an2corrOnReadinessRate numeric(12,2)        null default 1,
   an2corrOnAreaRatio   numeric(12,2)        null default 1,
   an2corrOnConstructState numeric(12,2)        null default 1,
   an2corrOnLandCost    numeric(12,2)        null default 1,
   an3corrOnYear        numeric(12,2)        null default 1,
   an3corrOnMaterialQuality numeric(12,2)        null default 1,
   an3corrOnArchitecture numeric(12,2)        null default 1,
   an3corrOnReadinessRate numeric(12,2)        null default 1,
   an3corrOnAreaRatio   numeric(12,2)        null default 1,
   an3corrOnConstructState numeric(12,2)        null default 1,
   an3corrOnLandCost    numeric(12,2)        null default 1,
   an1corrOnLandCost    numeric(12,2)        null default 1,
   an4corrOnYear        numeric(12,2)        null default 1,
   an4corrOnMaterialQuality numeric(12,2)        null default 1,
   an4corrOnArchitecture numeric(12,2)        null default 1,
   an4corrOnReadinessRate numeric(12,2)        null default 1,
   an4corrOnAreaRatio   numeric(12,2)        null default 1,
   an4corrOnConstructState numeric(12,2)        null default 1,
   an4corrOnLandCost    numeric(12,2)        null default 1,
   an1plotCost          numeric(12,2)        null,
   an2plotCost          numeric(12,2)        null,
   an3plotCost          numeric(12,2)        null,
   an4plotCost          numeric(12,2)        null,
   constraint PK_CORRECTIONS primary key (id)
);

/*==============================================================*/
/* Table: CostType                                              */
/*==============================================================*/
create table dict.CostType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   description          VARCHAR(250)         not null,
   constraint PK_COSTTYPE primary key (id)
);

/*==============================================================*/
/* Table: DocBelonging                                          */
/*==============================================================*/
create table dict.DocBelonging (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_DOCBELONGING primary key (id)
);

/*==============================================================*/
/* Table: ExternalEquipment                                     */
/*==============================================================*/
create table dict.ExternalEquipment (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_EXTERNALEQUIPMENT primary key (id)
);

/*==============================================================*/
/* Table: Flat                                                  */
/*==============================================================*/
create table main.Flat (
   id                   SERIAL not null,
   createDate           TIMESTAMP            not null,
   buildingMainClass    INT4                 null,
   buildingType         INT4                 null,
   maintenanceYear      INT4                 null,
   flatType             INT4                 null,
   marketType           INT4                 null,
   materialOfExternalDoors INT4                 null,
   materialOfInternalDoors INT4                 null,
   materialOfWindows    INT4                 null,
   materialOfWalls      INT4                 null,
   materialOfCover      INT4                 null,
   floorsQty            VARCHAR(250)         null,
   objectFloorNum       VARCHAR(250)         null,
   isSocleFloor         BOOL                 not null default false
      constraint CKC_ISSOCLEFLOOR_FLAT check (isSocleFloor in (true,false)),
   isAtticFloor         BOOL                 not null default false
      constraint CKC_ISATTICFLOOR_FLAT check (isAtticFloor in (true,false)),
   totalArea            numeric(12,2)        null,
   livingArea           numeric(12,2)        null,
   storeroomArea        numeric(12,2)        null,
   kitchenArea          numeric(12,2)        null,
   socleArea            numeric(12,2)        null,
   floorHeight          numeric(12,2)        null,
   cellarHeight         numeric(12,2)        null,
   constructiveDimension numeric(12,2)        null,
   roomQty              INT4                 null,
   roomPlanningType     INT4                 null,
   heatingType          INT4                 null,
   otherAutomaticSystems VARCHAR(250)         null,
   generalRoomCondition INT4                 null,
   otherObjectsNearby   VARCHAR(250)         null,
   contractSum          numeric(12,2)        null,
   budgetCost           numeric(12,2)        null,
   inventoryCost        numeric(12,2)        null,
   constraint PK_FLAT primary key (id)
);

/*==============================================================*/
/* Table: FlatType                                              */
/*==============================================================*/
create table dict.FlatType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_FLATTYPE primary key (id)
);

/*==============================================================*/
/* Table: FloorType                                             */
/*==============================================================*/
create table dict.FloorType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_FLOORTYPE primary key (id)
);

/*==============================================================*/
/* Table: GeneralRoomCondition                                  */
/*==============================================================*/
create table dict.GeneralRoomCondition (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_GENERALROOMCONDITION primary key (id)
);

/*==============================================================*/
/* Table: HeatingType                                           */
/*==============================================================*/
create table dict.HeatingType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_HEATINGTYPE primary key (id)
);

/*==============================================================*/
/* Table: House                                                 */
/*==============================================================*/
create table main.House (
   id                   SERIAL not null,
   createDate           TIMESTAMP            not null,
   buildingMainClass    INT4                 null,
   buildingTechCondition INT4                 null,
   maintenanceYear      INT4                 null,
   readyCoeff           numeric(12,2)        null,
   marketType           INT4                 null,
   materialOfExternalDoors INT4                 null,
   materialOfInternalDoors INT4                 null,
   materialOfWindows    INT4                 null,
   materialOfWalls      INT4                 null,
   materialOfCover      INT4                 null,
   floorsQty            VARCHAR(250)         null,
   isSocleFloor         BOOL                 not null default false
      constraint CKC_ISSOCLEFLOOR_HOUSE check (isSocleFloor in (true,false)),
   isAtticFloor         BOOL                 not null default false
      constraint CKC_ISATTICFLOOR_HOUSE check (isAtticFloor in (true,false)),
   totalArea            numeric(12,2)        null,
   livingArea           numeric(12,2)        null,
   storeroomArea        numeric(12,2)        null,
   kitchenArea          numeric(12,2)        null,
   socleArea            numeric(12,2)        null,
   floorHeight          numeric(12,2)        null,
   cellarHeight         numeric(12,2)        null,
   constructiveDimension numeric(12,2)        null,
   roomQty              INT4                 null,
   roomPlanningType     INT4                 null,
   heatingType          INT4                 null,
   otherAutomaticSystems VARCHAR(250)         null,
   generalRoomCondition INT4                 null,
   otherObjectsNearby   VARCHAR(250)         null,
   contractSum          numeric(12,2)        null,
   budgetCost           numeric(12,2)        null,
   inventoryCost        numeric(12,2)        null,
   isPrivateLand        BOOL                 not null default false
      constraint CKC_ISPRIVATELAND_HOUSE check (isPrivateLand in (true,false)),
   linkWithOVLandReport BOOL                 not null default false
      constraint CKC_LINKWITHOVLANDREP_HOUSE check (linkWithOVLandReport in (true,false)),
   ovLandLink           INT4                 null,
   landLocationTerritory INT4                 null,
   landLocationCityDistrict VARCHAR(250)         null,
   landLocationStreet   VARCHAR(250)         null,
   landLocationBuilding VARCHAR(250)         null,
   landLocationPlot     VARCHAR(250)         null,
   plotPurpose          INT4                 null,
   roadLocation         INT4                 null,
   roadType             INT4                 null,
   plotForm             VARCHAR(250)         null,
   plotIncline          numeric(12,2)        null,
   geologicalConditions VARCHAR(250)         null,
   plotDescription      VARCHAR(250)         null,
   plotQty              INT4                 null,
   plotArea             numeric(12,2)        null,
   usedArea             numeric(12,2)        null,
   cadastralNumber      VARCHAR(250)         null,
   usageLimitation      VARCHAR(250)         null,
   corrections          INT4                 null,
   constraint PK_HOUSE primary key (id)
);

/*==============================================================*/
/* Table: Infrastructure                                        */
/*==============================================================*/
create table dict.Infrastructure (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_INFRASTRUCTURE primary key (id)
);

/*==============================================================*/
/* Table: LandSiteAddDescription                                */
/*==============================================================*/
create table dict.LandSiteAddDescription (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_LANDSITEADDDESCRIPTION primary key (id)
);

/*==============================================================*/
/* Table: LandSiteLegalState                                    */
/*==============================================================*/
create table dict.LandSiteLegalState (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_LANDSITELEGALSTATE primary key (id)
);

/*==============================================================*/
/* Table: LandSitePlacement                                     */
/*==============================================================*/
create table dict.LandSitePlacement (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_LANDSITEPLACEMENT primary key (id)
);

/*==============================================================*/
/* Table: LandSitePurpose                                       */
/*==============================================================*/
create table dict.LandSitePurpose (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_LANDSITEPURPOSE primary key (id)
);

/*==============================================================*/
/* Table: LocalityCategory                                      */
/*==============================================================*/
create table dict.LocalityCategory (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_LOCALITYCATEGORY primary key (id)
);

/*==============================================================*/
/* Table: LocalityStanding                                      */
/*==============================================================*/
create table dict.LocalityStanding (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_LOCALITYSTANDING primary key (id)
);

/*==============================================================*/
/* Table: LocalityStructure                                     */
/*==============================================================*/
create table dict.LocalityStructure (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_LOCALITYSTRUCTURE primary key (id)
);

/*==============================================================*/
/* Table: MarketType                                            */
/*==============================================================*/
create table dict.MarketType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_MARKETTYPE primary key (id)
);

/*==============================================================*/
/* Table: MaterialOfCover                                       */
/*==============================================================*/
create table dict.MaterialOfCover (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_MATERIALOFCOVER primary key (id)
);

/*==============================================================*/
/* Table: MaterialOfExternalDoors                               */
/*==============================================================*/
create table dict.MaterialOfExternalDoors (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_MATERIALOFEXTERNALDOORS primary key (id)
);

/*==============================================================*/
/* Table: MaterialOfInternalDoors                               */
/*==============================================================*/
create table dict.MaterialOfInternalDoors (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_MATERIALOFINTERNALDOORS primary key (id)
);

/*==============================================================*/
/* Table: MaterialOfWalls                                       */
/*==============================================================*/
create table dict.MaterialOfWalls (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_MATERIALOFWALLS primary key (id)
);

/*==============================================================*/
/* Table: MaterialOfWindows                                     */
/*==============================================================*/
create table dict.MaterialOfWindows (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_MATERIALOFWINDOWS primary key (id)
);

/*==============================================================*/
/* Table: OV2AddDescription                                     */
/*==============================================================*/
create table main.OV2AddDescription (
   id                   SERIAL not null,
   objectValuation      INT4                 not null,
   addDescription       INT4                 not null,
   constraint PK_OV2ADDDESCRIPTION primary key (id)
);

/*==============================================================*/
/* Table: OV2Analogue                                           */
/*==============================================================*/
create table main.OV2Analogue (
   id                   SERIAL not null,
   objectValuation      INT4                 not null,
   analogue             INT4                 not null,
   constraint PK_OV2ANALOGUE primary key (id)
);

/*==============================================================*/
/* Table: OV2ConstitutiveDocs                                   */
/*==============================================================*/
create table main.OV2ConstitutiveDocs (
   id                   SERIAL not null,
   objectValuation      INT4                 not null,
   docType              INT4                 not null,
   docDescription       VARCHAR(250)         not null,
   constraint PK_OV2CONSTITUTIVEDOCS primary key (id)
);

/*==============================================================*/
/* Table: OV2Infrastructure                                     */
/*==============================================================*/
create table main.OV2Infrastructure (
   id                   SERIAL not null,
   objectValuation      INT4                 not null,
   infrastructure       INT4                 not null,
   constraint PK_OV2INFRASTRUCTURE primary key (id)
);

/*==============================================================*/
/* Table: OV2LandSiteAddDescription                             */
/*==============================================================*/
create table main.OV2LandSiteAddDescription (
   id                   SERIAL not null,
   objectValuation      INT4                 not null,
   landSiteAddDescription INT4                 not null,
   constraint PK_OV2LANDSITEADDDESCRIPTION primary key (id)
);

/*==============================================================*/
/* Table: OV2OtherExternalBuildings                             */
/*==============================================================*/
create table main.OV2OtherExternalBuildings (
   id                   SERIAL not null,
   objectValuation      INT4                 not null,
   otherExternalBuildings INT4                 not null,
   constraint PK_OV2OTHEREXTERNALBUILDINGS primary key (id)
);

/*==============================================================*/
/* Table: OV2RoomDescription                                    */
/*==============================================================*/
create table main.OV2RoomDescription (
   id                   SERIAL not null,
   roomType             INT4                 not null,
   floorType            INT4                 not null,
   wallsType            INT4                 not null,
   ceilingType          INT4                 not null,
   objectValuation      INT4                 not null,
   constraint PK_OV2ROOMDESCRIPTION primary key (id)
);

/*==============================================================*/
/* Table: OVActivities                                          */
/*==============================================================*/
create table main.OVActivities (
   id                   SERIAL not null,
   objectValuation      INT4                 not null,
   actionType           INT4                 not null,
   actionDate           TIMESTAMP            not null,
   creator              INT4                 not null,
   description          varchar(4000)        null,
   constraint PK_OVACTIVITIES primary key (id)
);

/*==============================================================*/
/* Table: OVHouse2Analogue                                      */
/*==============================================================*/
create table main.OVHouse2Analogue (
   id                   SERIAL not null,
   house                INT4                 not null,
   analogue             INT4                 not null,
   constraint PK_OVHOUSE2ANALOGUE primary key (id)
);

/*==============================================================*/
/* Table: OVHouse2ConstitutiveDocs                              */
/*==============================================================*/
create table main.OVHouse2ConstitutiveDocs (
   id                   INT4                 not null,
   objectValuation      INT4                 not null,
   docType              INT4                 not null,
   docDescription       VARCHAR(250)         not null,
   docBelonging         INT4                 not null,
   constraint PK_OVHOUSE2CONSTITUTIVEDOCS primary key (id)
);

/*==============================================================*/
/* Table: OVState                                               */
/*==============================================================*/
create table dict.OVState (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_OVSTATE primary key (id)
);

/*==============================================================*/
/* Table: OVTemplate                                            */
/*==============================================================*/
create table main.OVTemplate (
   id                   SERIAL not null,
   objectValuation      INT4                 not null,
   templateName         VARCHAR(250)         not null,
   creator              INT4                 not null,
   createDate           TIMESTAMP            not null,
   isDeleted            BOOL                 not null default false
      constraint CKC_ISDELETED_OVTEMPLA check (isDeleted in (true,false)),
   deleteDate           date                 null,
   constraint PK_OVTEMPLATE primary key (id)
);

/*==============================================================*/
/* Table: ObjFuncType                                           */
/*==============================================================*/
create table dict.ObjFuncType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_OBJFUNCTYPE primary key (id)
);

/*==============================================================*/
/* Table: ObjectSubType                                         */
/*==============================================================*/
create table dict.ObjectSubType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   objectType           INT4                 not null,
   constraint PK_OBJECTSUBTYPE primary key (id)
);

/*==============================================================*/
/* Table: ObjectType                                            */
/*==============================================================*/
create table dict.ObjectType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_OBJECTTYPE primary key (id)
);

/*==============================================================*/
/* Table: ObjectValuation                                       */
/*==============================================================*/
create table main.ObjectValuation (
   id                   SERIAL not null,
   createDate           TIMESTAMP            not null,
   state                INT4                 not null,
   blank                INT4                 not null,
   locationTerritory    INT4                 null,
   locationCityDistrict VARCHAR(250)         null,
   locationStreet       VARCHAR(250)         null,
   locationBuilding     VARCHAR(250)         null,
   locationFlat         VARCHAR(250)         null,
   localityCategory     INT4                 null,
   localityStructure    INT4                 null,
   localityStanding     INT4                 null,
   buildingMainClass    INT4                 null,
   buildingType         INT4                 null,
   maintenanceYear      INT4                 null,
   flatType             INT4                 null,
   marketType           INT4                 null,
   materialOfExternalDoors INT4                 null,
   materialOfInternalDoors INT4                 null,
   materialOfWindows    INT4                 null,
   materialOfWalls      INT4                 null,
   materialOfCover      INT4                 null,
   floorsQty            VARCHAR(250)         null,
   objectFloorNum       VARCHAR(250)         null,
   isSocleFloor         BOOL                 not null default false
      constraint CKC_ISSOCLEFLOOR_OBJECTVA check (isSocleFloor in (true,false)),
   isAtticFloor         BOOL                 not null default false
      constraint CKC_ISATTICFLOOR_OBJECTVA check (isAtticFloor in (true,false)),
   totalArea            numeric(12,2)        null,
   livingArea           numeric(12,2)        null,
   storeroomArea        numeric(12,2)        null,
   kitchenArea          numeric(12,2)        null,
   socleArea            numeric(12,2)        null,
   floorHeight          numeric(12,2)        null,
   cellarHeight         numeric(12,2)        null,
   constructiveDimension numeric(12,2)        null,
   roomQty              INT4                 null,
   roomPlanningType     INT4                 null,
   heatingType          INT4                 null,
   otherAutomaticSystems VARCHAR(250)         null,
   generalRoomCondition INT4                 null,
   otherObjectsNearby   VARCHAR(250)         null,
   distanceFromCentre   numeric(12,2)        null,
   distanceFromHighway  numeric(12,2)        null,
   distanceFromPark     numeric(12,2)        null,
   distanceFromRiver    numeric(12,2)        null,
   distanceFromBusStop  numeric(12,2)        null,
   distanceFromRailway  numeric(12,2)        null,
   distanceFromAirport  numeric(12,2)        null,
   distanceFromSeaport  numeric(12,2)        null,
   contractSum          numeric(12,2)        null,
   budgetCost           numeric(12,2)        null,
   inventoryCost        numeric(12,2)        null,
   addInfo              VARCHAR(250)         null,
   fdmuNum              VARCHAR(250)         null,
   statsMin             numeric(12,2)        null,
   statsMax             numeric(12,2)        null,
   statsMid             numeric(12,2)        null,
   statsMed             numeric(12,2)        null,
   currencyRate         numeric(12,2)        null,
   valuationCostUSD     numeric(12,2)        null,
   valuationCostUAH     numeric(12,2)        null,
   valuationDate        date                 null,
   currentUser          INT4                 null,
   creatorOrg           INT4                 null,
   reportMaker          INT4                 null,
   synchronizer         INT4                 null,
   valuator             INT4                 null,
   needsRetrospectiveValuation BOOL                 not null default false
      constraint CKC_NEEDSRETROSPECTIV_OBJECTVA check (needsRetrospectiveValuation in (true,false)),
   retrospectiveValuation VARCHAR(250)         null,
   corrections          INT4                 null,
   isManual             VARCHAR(250)         null,
   objFuncType          INT4                 null,
   objFuncId            INT4                 null,
   signer               INT4                 null,
   constraint PK_OBJECTVALUATION primary key (id)
);

/*==============================================================*/
/* Table: OrgType                                               */
/*==============================================================*/
create table dict.OrgType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_ORGTYPE primary key (id)
);

/*==============================================================*/
/* Table: Organization                                          */
/*==============================================================*/
create table main.Organization (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   orgType              INT4                 null,
   branchCode           VARCHAR(250)         null,
   organHead            VARCHAR(250)         null,
   location             INT4                 null,
   headOrgan            INT4                 null,
   address              VARCHAR(250)         null,
   certNumber           VARCHAR(250)         null,
   certDate             date                 null,
   isDeleted            BOOL                 not null default false
      constraint CKC_ISDELETED_ORGANIZA check (isDeleted in (true,false)),
   deleteDate           TIMESTAMP            null,
   bankReq              VARCHAR(250)         null,
   phone                VARCHAR(250)         null,
   email                VARCHAR(250)         null,
   constraint PK_ORGANIZATION primary key (id)
);

/*==============================================================*/
/* Table: OrganizationDocs                                      */
/*==============================================================*/
create table main.OrganizationDocs (
   id                   SERIAL not null,
   organization         INT4                 not null,
   docType              INT4                 not null,
   docNumber            VARCHAR(250)         not null,
   docDate              date                 not null,
   endDate              date                 null,
   file                 bytea                not null,
   fSize                INT4                 not null,
   addDate              TIMESTAMP            not null,
   mimeType             VARCHAR(250)         not null,
   fileName             VARCHAR(250)         not null,
   constraint PK_ORGANIZATIONDOCS primary key (id)
);

/*==============================================================*/
/* Table: OtherExternalBuildings                                */
/*==============================================================*/
create table dict.OtherExternalBuildings (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_OTHEREXTERNALBUILDINGS primary key (id)
);

/*==============================================================*/
/* Table: PaymentDeliveryType                                   */
/*==============================================================*/
create table dict.PaymentDeliveryType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_PAYMENTDELIVERYTYPE primary key (id)
);

/*==============================================================*/
/* Table: Plot                                                  */
/*==============================================================*/
create table main.Plot (
   id                   SERIAL not null,
   createDate           TIMESTAMP            not null,
   plotPurpose          INT4                 null,
   roadLocation         INT4                 null,
   roadType             INT4                 null,
   plotForm             VARCHAR(250)         null,
   plotIncline          numeric(12,2)        null,
   geologicalConditions VARCHAR(250)         null,
   plotDescription      VARCHAR(250)         null,
   plotQty              INT4                 null,
   plotArea             numeric(12,2)        null,
   usedArea             numeric(12,2)        null,
   cadastralNumber      VARCHAR(250)         null,
   usageLimitation      VARCHAR(250)         null,
   otherObjectsNearby   VARCHAR(250)         null,
   distanceFromRegCentre numeric(12,2)        null,
   distanceFromBusStation numeric(12,2)        null,
   constraint PK_PLOT primary key (id)
);

/*==============================================================*/
/* Table: PrintForms                                            */
/*==============================================================*/
create table main.PrintForms (
   id                   SERIAL not null,
   fileName             VARCHAR(250)         not null,
   code                 VARCHAR(250)         not null,
   file                 bytea                not null,
   constraint PK_PRINTFORMS primary key (id)
);

/*==============================================================*/
/* Table: ReportDeliveryType                                    */
/*==============================================================*/
create table dict.ReportDeliveryType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_REPORTDELIVERYTYPE primary key (id)
);

/*==============================================================*/
/* Table: RequestPriority                                       */
/*==============================================================*/
create table dict.RequestPriority (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_REQUESTPRIORITY primary key (id)
);

/*==============================================================*/
/* Table: RequestState                                          */
/*==============================================================*/
create table dict.RequestState (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_REQUESTSTATE primary key (id)
);

/*==============================================================*/
/* Table: RequestType                                           */
/*==============================================================*/
create table dict.RequestType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_REQUESTTYPE primary key (id)
);

/*==============================================================*/
/* Table: RoadType                                              */
/*==============================================================*/
create table dict.RoadType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_ROADTYPE primary key (id)
);

/*==============================================================*/
/* Table: Roles                                                 */
/*==============================================================*/
create table main.Roles (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_ROLES primary key (id)
);

/*==============================================================*/
/* Table: RoomPlanningType                                      */
/*==============================================================*/
create table dict.RoomPlanningType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_ROOMPLANNINGTYPE primary key (id)
);

/*==============================================================*/
/* Table: RoomType                                              */
/*==============================================================*/
create table dict.RoomType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_ROOMTYPE primary key (id)
);

/*==============================================================*/
/* Table: SupportRequest                                        */
/*==============================================================*/
create table main.SupportRequest (
   id                   SERIAL not null,
   objectValuation      INT4                 not null,
   state                INT4                 not null,
   priority             INT4                 not null,
   creator              INT4                 not null,
   createDate           TIMESTAMP            not null,
   subject              VARCHAR(250)         not null,
   description          varchar(4000)        not null,
   executor             INT4                 null,
   executionDate        TIMESTAMP            null,
   requestType          INT4                 not null,
   executorDescription  varchar(4000)        null,
   constraint PK_SUPPORTREQUEST primary key (id)
);

/*==============================================================*/
/* Table: TaxSystemType                                         */
/*==============================================================*/
create table dict.TaxSystemType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   appType              VARCHAR(250)         null,
   constraint PK_TAXSYSTEMTYPE primary key (id)
);

/*==============================================================*/
/* Table: Territory                                             */
/*==============================================================*/
create table dict.Territory (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         null,
   fullName             VARCHAR(250)         null,
   shortName            VARCHAR(250)         null,
   type                 INT4                 null,
   parent               INT4                 null,
   hierarchyLevel       INT4                 null,
   isLowestLevel        BOOL                 null default false
      constraint CKC_ISLOWESTLEVEL_TERRITOR check (isLowestLevel is null or (isLowestLevel in (true,false))),
   region               INT4                 null,
   rayon                INT4                 null,
   constraint PK_TERRITORY primary key (id)
);

/*==============================================================*/
/* Table: TerritoryType                                         */
/*==============================================================*/
create table dict.TerritoryType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   puppCode             VARCHAR(250)         null,
   shortName            VARCHAR(250)         null,
   isSuffix             BOOL                 not null default false
      constraint CKC_ISSUFFIX_TERRITOR check (isSuffix in (true,false)),
   constraint PK_TERRITORYTYPE primary key (id)
);

/*==============================================================*/
/* Table: UserDocs                                              */
/*==============================================================*/
create table main.UserDocs (
   id                   SERIAL not null,
   usr                  INT4                 not null,
   docType              INT4                 not null,
   docNumber            VARCHAR(250)         not null,
   docDate              date                 not null,
   endDate              date                 null,
   file                 bytea                not null,
   fSize                INT4                 not null,
   addDate              TIMESTAMP            not null,
   mimeType             VARCHAR(250)         not null,
   fileName             VARCHAR(250)         not null,
   constraint PK_USERDOCS primary key (id)
);

/*==============================================================*/
/* Table: UserInstructions                                      */
/*==============================================================*/
create table main.UserInstructions (
   id                   SERIAL not null,
   creator              INT4                 not null,
   createDate           date                 not null,
   actualDate           date                 null,
   constraint PK_USERINSTRUCTIONS primary key (id)
);

/*==============================================================*/
/* Table: Users                                                 */
/*==============================================================*/
create table main.Users (
   id                   SERIAL not null,
   userName             VARCHAR(250)         not null,
   lastName             VARCHAR(250)         null,
   firstName            VARCHAR(250)         null,
   middleName           VARCHAR(250)         null,
   shortFio             VARCHAR(250)         not null,
   fullFio              VARCHAR(250)         null,
   workplace            INT4                 not null,
   "position"           VARCHAR(250)         null,
   userPass             VARCHAR(250)         null,
   startDate            TIMESTAMP            null,
   endDate              TIMESTAMP            null,
   isDeleted            BOOL                 null default false
      constraint CKC_ISDELETED_USERS check (isDeleted is null or (isDeleted in (true,false))),
   certNumber           VARCHAR(250)         null,
   certDate             date                 null,
   constraint PK_USERS primary key (id)
);

/*==============================================================*/
/* Table: Users2Roles                                           */
/*==============================================================*/
create table main.Users2Roles (
   id                   SERIAL not null,
   usr                  INT4                 not null,
   userRole             INT4                 not null,
   startDate            date                 null,
   endDate              date                 null,
   constraint PK_USERS2ROLES primary key (id)
);

/*==============================================================*/
/* Table: ValuationPurpose                                      */
/*==============================================================*/
create table dict.ValuationPurpose (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_VALUATIONPURPOSE primary key (id)
);

/*==============================================================*/
/* Table: WallsType                                             */
/*==============================================================*/
create table dict.WallsType (
   id                   SERIAL not null,
   code                 VARCHAR(250)         not null,
   name                 VARCHAR(250)         not null,
   constraint PK_WALLSTYPE primary key (id)
);

alter table main.Analogue
	add constraint FK_ANALOGUE_REFERENCE_OBJFUNCT_objFuncType foreign key (objFuncType)
      references dict.ObjFuncType (id);

alter table main.Analogue
	add constraint FK_ANALOGUE_REFERENCE_LANDSITE_plotPurpose foreign key (plotPurpose)
      references dict.LandSitePurpose (id);

alter table main.Analogue
	add constraint FK_ANALOGUE_REFERENCE_TERRITOR_location foreign key (location)
      references dict.Territory (id);

alter table main.Analogue
	add constraint FK_ANALOGUE_REFERENCE_BUILDING_buildingType foreign key (buildingType)
      references dict.BuildingType (id);

alter table main.Analogue2Correction
	add constraint FK_ANALOGUE_REFERENCE_CORRECTI_correctionType foreign key (correctionType)
      references dict.CorrectionType (id);

alter table main.Applicant
	add constraint FK_APPLICAN_REFERENCE_APPLICAN_applicantType foreign key (applicantType)
      references dict.ApplicantType (id);

alter table main.Applicant
	add constraint FK_APPLICAN_REFERENCE_TERRITOR_appAddressTerritory foreign key (appAddressTerritory)
      references dict.Territory (id);

alter table main.Applicant
	add constraint FK_APPLICAN_REFERENCE_USERS_creator foreign key (creator)
      references main.Users (id);

alter table main.Applicant
	add constraint FK_APPLICAN_REFERENCE_ORGANIZA_creatorOrg foreign key (creatorOrg)
      references main.Organization (id);

alter table main.Applicant
	add constraint FK_APPLICAN_REFERENCE_TAXSYSTE_taxSystemType foreign key (taxSystemType)
      references dict.TaxSystemType (id);

alter table main.Applicant
	add constraint FK_APPLICAN_REFERENCE_CITIZENS_appCitizenship foreign key (appCitizenship)
      references dict.Citizenship (id);

alter table main.Attachment
	add constraint FK_ATTACHME_REFERENCE_ATTACHME_fileType foreign key (fileType)
      references dict.AttachmentType (id);

alter table main.Blank
	add constraint FK_BLANK_REFERENCE_VALUATIO_valuationPurpose foreign key (valuationPurpose)
      references dict.ValuationPurpose (id);

alter table main.Blank
	add constraint FK_BLANK_REFERENCE_COSTTYPE_costType foreign key (costType)
      references dict.CostType (id);

alter table main.Blank
	add constraint FK_BLANK_REFERENCE_APPLICAN_applicant foreign key (applicant)
      references main.Applicant (id);

alter table main.Blank
	add constraint FK_BLANK_REFERENCE_APPLICAN_ownerType foreign key (ownerType)
      references dict.ApplicantType (id);

alter table main.Blank
	add constraint FK_BLANK_REFERENCE_OBJECTTY_objectType foreign key (objectType)
      references dict.ObjectType (id);

alter table main.Blank
	add constraint FK_BLANK_REFERENCE_BLANKSTA_state foreign key (state)
      references dict.BlankState (id);

alter table main.Blank
	add constraint FK_BLANK_REFERENCE_OBJECTSU_objectSubType foreign key (objectSubType)
      references dict.ObjectSubType (id);

alter table main.Blank
	add constraint FK_BLANK_REFERENCE_PAYMENTD_paymentDeliveryType foreign key (paymentDeliveryType)
      references dict.PaymentDeliveryType (id);

alter table main.Blank
	add constraint FK_BLANK_REFERENCE_REPORTDE_reportDeliveryType foreign key (reportDeliveryType)
      references dict.ReportDeliveryType (id);

alter table main.Blank
	add constraint FK_BLANK_REFERENCE_ORGANIZA_creatorOrg foreign key (creatorOrg)
      references main.Organization (id);

alter table main.Blank
	add constraint FK_BLANK_REFERENCE_USERS_creator foreign key (creator)
      references main.Users (id);

alter table main.Blank2ValuationParts
	add constraint FK_BLANK2VA_REFERENCE_BLANK_blank foreign key (blank)
      references main.Blank (id);

alter table main.BlankActivities
	add constraint FK_BLANKACT_REFERENCE_BLANK foreign key (blank)
      references main.Blank (id);

alter table main.BlankActivities
	add constraint FK_BLANKACT_REFERENCE_USERS_creator foreign key (creator)
      references main.Users (id);

alter table main.BlankActivities
	add constraint FK_BLANKACT_REFERENCE_ACTIONTY_actionType foreign key (actionType)
      references dict.ActionType (id);

alter table main.Flat
	add constraint FK_FLAT_REFERENCE_MATERIAL_materialOfExternalDoors foreign key (materialOfExternalDoors)
      references dict.MaterialOfExternalDoors (id);

alter table main.Flat
	add constraint FK_FLAT_REFERENCE_MATERIAL_materialOfWalls foreign key (materialOfWalls)
      references dict.MaterialOfWalls (id);

alter table main.Flat
	add constraint FK_FLAT_REFERENCE_MATERIAL_materialOfInternalDoors foreign key (materialOfInternalDoors)
      references dict.MaterialOfInternalDoors (id);

alter table main.Flat
	add constraint FK_FLAT_REFERENCE_MATERIAL_materialOfWindows foreign key (materialOfWindows)
      references dict.MaterialOfWindows (id);

alter table main.Flat
	add constraint FK_FLAT_REFERENCE_GENERALR_generalRoomCondition foreign key (generalRoomCondition)
      references dict.GeneralRoomCondition (id);

alter table main.Flat
	add constraint FK_FLAT_REFERENCE_ROOMPLAN_roomPlanningType foreign key (roomPlanningType)
      references dict.RoomPlanningType (id);

alter table main.Flat
	add constraint FK_FLAT_REFERENCE_HEATINGT_heatingType foreign key (heatingType)
      references dict.HeatingType (id);

alter table main.Flat
	add constraint FK_FLAT_REFERENCE_ROOMTYPE_flatType foreign key (flatType)
      references dict.RoomType (id);

alter table main.Flat
	add constraint FK_FLAT_REFERENCE_MARKETTY_marketType foreign key (marketType)
      references dict.MarketType (id);

alter table main.Flat
	add constraint FK_FLAT_REFERENCE_BUILDING_buildingType foreign key (buildingType)
      references dict.BuildingType (id);

alter table main.Flat
	add constraint FK_FLAT_REFERENCE_BUILDING_buildingMainClass foreign key (buildingMainClass)
      references dict.BuildingMainClass (id);

alter table main.Flat
	add constraint FK_FLAT_REFERENCE_MATERIAL_materialOfCover foreign key (materialOfCover)
      references dict.MaterialOfCover (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_BUILDING_buildingMainClass foreign key (buildingMainClass)
      references dict.BuildingMainClass (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_MATERIAL_materialOfWalls foreign key (materialOfWalls)
      references dict.MaterialOfWalls (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_MATERIAL_materialOfCover foreign key (materialOfCover)
      references dict.MaterialOfCover (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_MATERIAL_materialOfInternalDoors foreign key (materialOfInternalDoors)
      references dict.MaterialOfInternalDoors (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_MATERIAL_materialOfWindows foreign key (materialOfWindows)
      references dict.MaterialOfWindows (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_MATERIAL_materialOfExternalDoors foreign key (materialOfExternalDoors)
      references dict.MaterialOfExternalDoors (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_GENERALR_generalRoomCondition foreign key (generalRoomCondition)
      references dict.GeneralRoomCondition (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_BUILDING_buildingTechCondition foreign key (buildingTechCondition)
      references dict.BuildingTechCondition (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_HEATINGT_heatingType foreign key (heatingType)
      references dict.HeatingType (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_ROOMPLAN_roomPlanningType foreign key (roomPlanningType)
      references dict.RoomPlanningType (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_ROADTYPE_roadType foreign key (roadType)
      references dict.RoadType (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_LANDSITE_roadLocation foreign key (roadLocation)
      references dict.LandSitePlacement (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_LANDSITE_plotPurpose foreign key (plotPurpose)
      references dict.LandSitePurpose (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_CORRECTI_corrections foreign key (corrections)
      references main.Corrections (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_OBJECTVA_ovLandLink foreign key (ovLandLink)
      references main.ObjectValuation (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_TERRITOR_landLocationTerritory foreign key (landLocationTerritory)
      references dict.Territory (id);

alter table main.House
	add constraint FK_HOUSE_REFERENCE_MARKETTY_marketType foreign key (marketType)
      references dict.MarketType (id);

alter table main.OV2AddDescription
	add constraint FK_OV2ADDDE_REFERENCE_OBJECTVA_objectValuation foreign key (objectValuation)
      references main.ObjectValuation (id);

alter table main.OV2AddDescription
	add constraint FK_OV2ADDDE_REFERENCE_ADDITION_addDescription foreign key (addDescription)
      references dict.AdditionalDescription (id);

alter table main.OV2Analogue
	add constraint FK_OV2ANALO_REFERENCE_OBJECTVA_objectValuation foreign key (objectValuation)
      references main.ObjectValuation (id);

alter table main.OV2Analogue
	add constraint FK_OV2ANALO_REFERENCE_ANALOGUE_analogue foreign key (analogue)
      references main.Analogue (id);

alter table main.OV2ConstitutiveDocs
	add constraint FK_OV2CONST_REFERENCE_CONSTITU_docType foreign key (docType)
      references dict.ConstitutiveDocType (id);

alter table main.OV2ConstitutiveDocs
	add constraint FK_OV2CONST_REFERENCE_OBJECTVA_objectValuation foreign key (objectValuation)
      references main.ObjectValuation (id);

alter table main.OV2Infrastructure
	add constraint FK_OV2INFRA_REFERENCE_INFRASTR_infrastructure foreign key (infrastructure)
      references dict.Infrastructure (id);

alter table main.OV2Infrastructure
	add constraint FK_OV2INFRA_REFERENCE_OBJECTVA_objectValuation foreign key (objectValuation)
      references main.ObjectValuation (id);

alter table main.OV2LandSiteAddDescription
	add constraint FK_OV2LANDS_REFERENCE_LANDSITE_landSiteAddDescription foreign key (landSiteAddDescription)
      references dict.LandSiteAddDescription (id);

alter table main.OV2LandSiteAddDescription
	add constraint FK_OV2LANDS_REFERENCE_OBJECTVA foreign key (objectValuation)
      references main.ObjectValuation (id);

alter table main.OV2OtherExternalBuildings
	add constraint FK_OV2OTHER_REFERENCE_OBJECTVA_objectValuation foreign key (objectValuation)
      references main.ObjectValuation (id);

alter table main.OV2OtherExternalBuildings
	add constraint FK_OV2OTHER_REFERENCE_OTHEREXT_otherExternalBuildings foreign key (otherExternalBuildings)
      references dict.OtherExternalBuildings (id);

alter table main.OV2RoomDescription
	add constraint FK_OV2ROOMD_REFERENCE_ROOMTYPE_roomType foreign key (roomType)
      references dict.RoomType (id);

alter table main.OV2RoomDescription
	add constraint FK_OV2ROOMD_REFERENCE_FLOORTYP_floorType foreign key (floorType)
      references dict.FloorType (id);

alter table main.OV2RoomDescription
	add constraint FK_OV2ROOMD_REFERENCE_WALLSTYP_wallsType foreign key (wallsType)
      references dict.WallsType (id);

alter table main.OV2RoomDescription
	add constraint FK_OV2ROOMD_REFERENCE_CEILINGT_ceilingType foreign key (ceilingType)
      references dict.CeilingType (id);

alter table main.OV2RoomDescription
	add constraint FK_OV2ROOMD_REFERENCE_OBJECTVA_objectValuation foreign key (objectValuation)
      references main.ObjectValuation (id);

alter table main.OVActivities
	add constraint FK_OVACTIVI_REFERENCE_ACTIONTY_actionType foreign key (actionType)
      references dict.ActionType (id);

alter table main.OVActivities
	add constraint FK_OVACTIVI_REFERENCE_USERS_creator foreign key (creator)
      references main.Users (id);

alter table main.OVActivities
	add constraint FK_OVACTIVI_REFERENCE_OBJECTVA_objectValuation foreign key (objectValuation)
      references main.ObjectValuation (id);

alter table main.OVHouse2Analogue
	add constraint FK_OVHOUSE2_REFERENCE_HOUSE_house foreign key (house)
      references main.House (id);

alter table main.OVHouse2Analogue
	add constraint FK_OVHOUSE2_REFERENCE_ANALOGUE_analogue foreign key (analogue)
      references main.Analogue (id);

alter table main.OVHouse2ConstitutiveDocs
	add constraint FK_OVHOUSE2_REFERENCE_OBJECTVA_objectValuation foreign key (objectValuation)
      references main.ObjectValuation (id);

alter table main.OVHouse2ConstitutiveDocs
	add constraint FK_OVHOUSE2_REFERENCE_DOCBELON_docBelonging foreign key (docBelonging)
      references dict.DocBelonging (id);

alter table main.OVHouse2ConstitutiveDocs
	add constraint FK_OVHOUSE2_REFERENCE_CONSTITU_docType foreign key (docType)
      references dict.ConstitutiveDocType (id);

alter table main.OVTemplate
	add constraint FK_OVTEMPLA_REFERENCE_OBJECTVA_objectValuation foreign key (objectValuation)
      references main.ObjectValuation (id);

alter table main.OVTemplate
	add constraint FK_OVTEMPLA_REFERENCE_USERS_creator foreign key (creator)
      references main.Users (id);

alter table dict.ObjectSubType
	add constraint FK_OBJECTSU_REFERENCE_OBJECTTY_objectType foreign key (objectType)
      references dict.ObjectType (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_BLANK_blank foreign key (blank)
      references main.Blank (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_OBJFUNCT_objFuncType foreign key (objFuncType)
      references dict.ObjFuncType (id);

alter table main.ObjectValuation
	add constraint fkUsers5_signer foreign key (signer)
      references main.Users (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_TERRITOR_locationTerritory foreign key (locationTerritory)
      references dict.Territory (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_LOCALITY_localityCategory foreign key (localityCategory)
      references dict.LocalityCategory (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_LOCALITY_localityStructure foreign key (localityStructure)
      references dict.LocalityStructure (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_LOCALITY_localityStanding foreign key (localityStanding)
      references dict.LocalityStanding (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_BUILDING_buildingMainClass foreign key (buildingMainClass)
      references dict.BuildingMainClass (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_MARKETTY_marketType foreign key (marketType)
      references dict.MarketType (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_MATERIAL_materialOfWalls foreign key (materialOfWalls)
      references dict.MaterialOfWalls (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_MATERIAL_materialOfCover foreign key (materialOfCover)
      references dict.MaterialOfCover (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_MATERIAL_materialOfExternalDoors foreign key (materialOfExternalDoors)
      references dict.MaterialOfExternalDoors (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_MATERIAL_materialOfInternalDoors foreign key (materialOfInternalDoors)
      references dict.MaterialOfInternalDoors (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_MATERIAL_materialOfWindows foreign key (materialOfWindows)
      references dict.MaterialOfWindows (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_ROOMPLAN_roomPlanningType foreign key (roomPlanningType)
      references dict.RoomPlanningType (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_HEATINGT_heatingType foreign key (heatingType)
      references dict.HeatingType (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_GENERALR_generalRoomCondition foreign key (generalRoomCondition)
      references dict.GeneralRoomCondition (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_OVSTATE_state foreign key (state)
      references dict.OVState (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_FLATTYPE_flatType foreign key (flatType)
      references dict.FlatType (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_BUILDING_buildingType foreign key (buildingType)
      references dict.BuildingType (id);

alter table main.ObjectValuation
	add constraint fkUsers1_currentUser foreign key (currentUser)
      references main.Users (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_ORGANIZA_creatorOrg foreign key (creatorOrg)
      references main.Organization (id);

alter table main.ObjectValuation
	add constraint fkUsers3_synchronizer foreign key (synchronizer)
      references main.Users (id);

alter table main.ObjectValuation
	add constraint fkUsers2_reportMaker foreign key (reportMaker)
      references main.Users (id);

alter table main.ObjectValuation
	add constraint fkUsers4_valuator foreign key (valuator)
      references main.Users (id);

alter table main.ObjectValuation
	add constraint FK_OBJECTVA_REFERENCE_CORRECTI_corrections foreign key (corrections)
      references main.Corrections (id);

alter table main.Organization
	add constraint FK_ORGANIZA_REFERENCE_TERRITOR_location foreign key (location)
      references dict.Territory (id);

alter table main.Organization
	add constraint FK_ORGANIZA_REFERENCE_ORGTYPE_orgType foreign key (orgType)
      references dict.OrgType (id);

alter table main.Organization
	add constraint FK_ORGANIZA_REFERENCE_ORGANIZA_headOrgan foreign key (headOrgan)
      references main.Organization (id);

alter table main.OrganizationDocs
	add constraint FK_ORGANIZA_REFERENCE_ORGANIZA foreign key (organization)
      references main.Organization (id);

alter table main.OrganizationDocs
	add constraint FK_ORGANIZA_REFERENCE_ATTACHME_docType foreign key (docType)
      references dict.AttachmentType (id);

alter table main.Plot
	add constraint FK_PLOT_REFERENCE_LANDSITE_plotPurpose foreign key (plotPurpose)
      references dict.LandSitePurpose (id);

alter table main.Plot
	add constraint FK_PLOT_REFERENCE_ROADTYPE_roadType foreign key (roadType)
      references dict.RoadType (id);

alter table main.Plot
	add constraint FK_PLOT_REFERENCE_LANDSITE foreign key (roadLocation)
      references dict.LandSitePlacement (id);

alter table main.SupportRequest
	add constraint FK_SUPPORTR_REFERENCE_REQUESTT_requestType foreign key (requestType)
      references dict.RequestType (id);

alter table main.SupportRequest
	add constraint FK_SUPPORTR_REFERENCE_REQUESTP_prioritet foreign key (priority)
      references dict.RequestPriority (id);

alter table main.SupportRequest
	add constraint FK_SUPPORTR_REFERENCE_REQUESTS_state foreign key (state)
      references dict.RequestState (id);

alter table main.SupportRequest
	add constraint FK_SUPPORTR_REFERENCE_OBJECTVA_objectValuation foreign key (objectValuation)
      references main.ObjectValuation (id);

alter table main.SupportRequest
	add constraint fkUsers2_executor foreign key (executor)
      references main.Users (id);

alter table main.SupportRequest
	add constraint fkUsers1_creator foreign key (creator)
      references main.Users (id);

alter table dict.Territory
	add constraint FK_TERRITOR_REFERENCE_TERRITOR_type foreign key (type)
      references dict.TerritoryType (id);

alter table dict.Territory
	add constraint fkTerritory3_rayon foreign key (rayon)
      references dict.Territory (id);

alter table dict.Territory
	add constraint fkTerritory2_region foreign key (region)
      references dict.Territory (id);

alter table dict.Territory
	add constraint fkTerritory1_parent foreign key (parent)
      references dict.Territory (id);

alter table main.UserDocs
	add constraint FK_USERDOCS_REFERENCE_ATTACHME foreign key (docType)
      references dict.AttachmentType (id);

alter table main.UserDocs
	add constraint FK_USERDOCS_REFERENCE_USERS_usr foreign key (usr)
      references main.Users (id);

alter table main.UserInstructions
	add constraint FK_USERINST_REFERENCE_USERS_creator foreign key (creator)
      references main.Users (id);

alter table main.Users
	add constraint FK_USERS_REFERENCE_ORGANIZA_workplace foreign key (workplace)
      references main.Organization (id);

alter table main.Users2Roles
	add constraint FK_USERS2RO_REFERENCE_USERS_usr foreign key (usr)
      references main.Users (id);

alter table main.Users2Roles
	add constraint FK_USERS2RO_REFERENCE_ROLES_userRole foreign key (userRole)
      references main.Roles (id);

