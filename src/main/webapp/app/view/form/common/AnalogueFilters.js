/**
 * фильтры для аналогов
 */
Ext.define('pf.view.form.common.AnalogueFilters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.analogueFilters',
    flex: 2,
    title: 'Фільтри',
    buttonAlign: 'center',
    bodyStyle: {
        background: '#F0F0F0'
    },
    defaults: {
        bodyStyle: {
            background: '#F0F0F0',
            borderColor: '#F0F0F0'
        }
    },
    autoScroll: true,
    layout: 'anchor',
    initComponent: function () {
        Ext.apply(this, {
            buttons: [{
                    text: 'Застосувати фільтри',
                    action: 'setFilter'
                }, {
                    text: 'Очистити фільтри',
                    action: 'clearFilter'
                }],
            items: [{
                    columnWidth: 0.45,
                    items: [{
                            xtype: 'fieldset',
                            title: 'Дата пропозиції',
                            layout: {
                                type: 'hbox',
                                defaultMargins: {
                                    top: 0,
                                    right: 10,
                                    bottom: 0,
                                    left: 0
                                }

                            },
                            items: [{
                                    itemId: 'regDateStart',
                                    fieldLabel: 'з'
                                }, {
                                    itemId: 'regDateEnd',
                                    fieldLabel: 'по'

                                }]
                        },
                        // конец fieldseta Провадження
                        // начало fieldseta Заявник або потерпілий
                        {
                            xtype: 'fieldset',
                            title: 'Заявник або потерпілий',
                            defaultType: 'textfield',
                            defaults: {
                                layout: {
                                    type: 'hbox',
                                    defaultMargins: {
                                        top: 0,
                                        right: 10,
                                        bottom: 0,
                                        left: 0
                                    }
                                }
                            },
                            items: [{
                                    xtype: 'textfield',
                                    itemId: 'applicant',
                                    width: 450,
                                    fieldLabel: 'Заявник або потерпілий:',
                                    labelWidth: 165
                                }, {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Дата надходження заяви',
                                    labelWidth: 100,
                                    labelAlign: 'top',
                                    defaults: {
                                        xtype: 'datefield',
                                        startDay: 1,
                                        format: 'd.m.Y',
                                        labelWidth: 15
                                    },
                                    items: [{
                                            itemId: 'appDateStart',
                                            fieldLabel: 'з'
                                        }, {
                                            itemId: 'appDateEnd',
                                            fieldLabel: 'по'
                                        }]
                                }]
                        }
                        // конец fieldseta Заявник або потерпілий
                        // начало fieldseta Інше джерело

                    ]
                }]

        });
        this.callParent(arguments);
    }

});