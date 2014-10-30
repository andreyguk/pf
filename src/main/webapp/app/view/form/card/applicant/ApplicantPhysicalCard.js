/**
 * create new applicant physical person
 */
Ext.define('pf.view.form.card.applicant.ApplicantPhysicalCard', {
    extend: 'pf.view.form.card.applicant.Applicant',
    alias: 'widget.applicantPhysicalCard',
    itemId: 'applicantPhysicalCardId',
    title: loc.tltNewApplicant,
    biuldFields: function () {
        return [{
                xtype: 'hiddenfield',
                name: 'id'
            }, {
                xtype: 'combobox',
                fieldLabel: loc.lblApplicantType,
                itemId: 'applicantTypeId',
                name: 'applicantType',
                store: Ext.create('pf.store.common.ApplicantTypes'),
                queryMode: 'local',
                minChars: 3,
                readOnly: true,
                editable: true,
                displayField: 'name',
                valueField: 'id',
                afterLabelTextTpl: pf.utils.Validation.required,
                allowBlank: false
            }, {
                name: 'appPersonLastName',
                fieldLabel: loc.lblPersonLastName
            }, {
                name: 'appPersonFirstName',
                fieldLabel: loc.lblPersonFirstName
            }, {
                name: 'appPersonMiddleName',
                fieldLabel: loc.lblPersonMiddleName,
                afterLabelTextTpl: (this.applicantType == 2) ? '' : pf.utils.Validation.required,
                allowBlank: this.applicantType == 2
            }, {
                name: 'appPersonPassportSeries',
                fieldLabel: loc.lblPersonPassportSeries
            }, {
                name: 'appPersonPassportNumber',
                fieldLabel: loc.lblPersonPassportNumber
            }, {
                name: 'appPersonPassportIssueOrgan',
                fieldLabel: loc.lblPersonPassportIssueOrgan
            }, {
                xtype: 'datefield',
                name: 'appPersonPassportIssueDate',
                fieldLabel: loc.lblPersonPassportIssueDate,
                format: 'd.m.Y'
            }, {
                name: 'appINN',
                fieldLabel: loc.lblAppINN
            }, {
                name: 'appCitizenship',
                fieldLabel: loc.lblcitizenship,
                xtype: 'combobox',
                displayField: 'name',
                valueField: 'id',
                minChars: 3,
                store: Ext.create('pf.store.common.Citizenship'),
                hidden: !(this.applicantType == 2),
                allowBlank: !(this.applicantType == 2)
            }];
    }

});
