/**
 * Аналоги об'єкту оцінки
 * 
 */
Ext.define('pf.view.form.list.AnalogueList', {
    extend: 'Ext.window.Window',
    alias: 'widget.analogueList', 
    plain: true,
    modal: true,
    layout: 'fit',
    closable: false,
    buttonAlign: 'center',
    border: false,
    autoShow: false,
    titleCollapse: false,
    title: "Аналог об'єкту оцінки",
    requires: ['pf.view.form.common.AnalogueFilters'],
    initComponent: function () {
        var me = this, fields = [], store, selModel = Ext.create('Ext.selection.CheckboxModel'), ovFuncType;
        me.height = Ext.getBody().getViewSize().height * 0.8;
        me.width = Ext.getBody().getViewSize().width * 0.8;

        store = Ext.create('pf.store.common.Analogue');
        if ((me.ovName == 'pf.view.form.card.ov.land.TabAdditionalInfo') || (me.ovName == 'pf.view.form.card.ov.house.TabLand')) {
            ovFuncType = '03';
        } else if (me.ovName == 'pf.view.form.card.ov.flat.TabAdditionalInfo') {
            ovFuncType = '02';
        } else if (me.ovName == 'pf.view.form.card.ov.house.TabAdditionalInfo') {
            ovFuncType = '04';
        }
        store.ovFuncType = ovFuncType;
        store.objTerritory = me.objTerritory;
        fields = [{
                xtype: 'rownumberer'
            }, {
                header: 'id',
                dataIndex: 'id',
                hidden: true,
                hideable: false
            }, {
                text: 'Дата пропозиції',
                dataIndex: 'proposeDate',
                flex: 1
            }, {
                text: 'Населений пункт',
                dataIndex: 'location',
                flex: 3
            }, {
                text: 'Район',
                dataIndex: 'rayon',
                flex: 2
            }, {
                text: 'Адреса',
                dataIndex: 'address',
                flex: 2
            }, {
                text: 'Площа, кв.м.',
                dataIndex: 'area',
                flex: 1
            }];
        if (me.ovName == 'pf.view.form.card.ov.land.TabAdditionalInfo') {
            fields.push({
                text: 'Цільове призначення </br> земельної ділянки',
                dataIndex: 'plotPurposeName',
                flex: 1
            })
        } else if (me.ovName == 'pf.view.form.card.ov.flat.TabAdditionalInfo') {
            fields.push({
                text: 'Кількість кімнат',
                dataIndex: 'roomQty',
                flex: 1
            }, {
                text: 'Номер поверху',
                dataIndex: 'floorNum',
                flex: 1
            }, {
                text: 'Кількість поверхів<br/>(в будинку)',
                dataIndex: 'floorsQty',
                flex: 1
            })
        } else if (me.ovName == 'pf.view.form.card.ov.house.TabAdditionalInfo') {
            fields.push({
                text: 'Приватизована <br/> земельна ділянка ',
                dataIndex: 'isPrivateLand',
                flex: 1,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var value = (value) ? 'Так' : 'Ні';
                    return value
                }
            }, {
                text: 'Площа <br/> земельної ділянки',
                dataIndex: 'plotArea',
                flex: 1
            })
        }
        fields.push({
            text: 'Вартість, дол.',
            dataIndex: 'costAll',
            flex: 1
        }, {
            text: 'Вартість, дол./кв.м.',
            dataIndex: 'costMetre',
            flex: 1
        }, {
            header: 'Наявність </br> скриншоту',
            dataIndex: 'isScreenExist',
            flex: 1,
            renderer: function (value, metaData, record, row, col, store, gridView) {
                var value = (value) ? 'Так' : 'Ні';
                return value
            }
        })

        var filters = [{
                xtype: 'checkboxgroup',
                columns: 1,
                itemId: 'isScreenExist',
                vertical: true,
                items: [{
                        boxLabel: "Тільки з скриншотом",
                        name: 'isScreenExist',
                        inputValue: 'true',
                        uncheckedValue: 'false'
                    }]
            }, {
                xtype: 'fieldset',
                margin: '5 5 5 5',
                title: 'Дата пропозиції',
                layout: 'hbox',
                defaults: {
                    xtype: 'datefield',
                    startDay: 1,
                    format: 'd.m.Y',
                    labelWidth: 15,
                    margin: '5 5 5 0'
                },
                items: [{
                        itemId: 'proposeDateStart',
                        fieldLabel: 'з'
                    }, {
                        itemId: 'proposeDateEnd',
                        fieldLabel: 'по'
                    }]

            }, {
                xtype: 'container',
                anchor: '100%',
                layout: {
                    type: 'hbox'
                },
                defaults: {
                    margin: '5 5 5 5'
                },
                items: [{
                        xtype: 'fieldset',
                        flex: 1,
                        title: 'Населений пункт',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            flex: 1,
                            margin: '5 5 5 5'
                        },
                        items: [{
                                itemId: 'location'
                            }]
                    }, {
                        xtype: 'fieldset',
                        flex: 1,
                        title: 'Район',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            flex: 1,
                            margin: '5 5 5 5'
                        },
                        items: [{
                                itemId: 'rayon'
                            }]
                    }, {
                        xtype: 'fieldset',
                        flex: 1,
                        title: 'Адреса',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            margin: '5 5 5 5',
                            flex: 1
                        },
                        items: [{
                                itemId: 'address'
                            }]
                    }]
            }, {
                xtype: 'container',
                anchor: '100%',
                layout: {
                    type: 'hbox'
                },
                defaults: {
                    margin: '5 5 5 5'
                },
                items: [{
                        xtype: 'fieldset',
                        title: 'Площа кв.м',
                        flex: 1,
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 15,
                            margin: '5 5 5 0'
                        },
                        items: [{
                                itemId: 'areaStart',
                                fieldLabel: 'від'
                            }, {
                                itemId: 'areaEnd',
                                fieldLabel: 'до'
                            }]
                    }, {
                        xtype: 'fieldset',
                        title: 'Вартість, дол.',
                        flex: 1,
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 15,
                            margin: '5 5 5 0'
                        },
                        items: [{
                                itemId: 'costAllStart',
                                fieldLabel: 'від'
                            }, {
                                itemId: 'costAllEnd',
                                fieldLabel: 'до'
                            }]
                    }, {
                        xtype: 'fieldset',
                        flex: 1,
                        title: 'Вартість, дол./кв.м.',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 15,
                            margin: '5 5 5 0'
                        },
                        items: [{
                                itemId: 'costMetreStart',
                                fieldLabel: 'від'
                            }, {
                                itemId: 'costMetreEnd',
                                fieldLabel: 'до'
                            }]
                    }]
            }]
        if (me.ovName == 'pf.view.form.card.ov.land.TabAdditionalInfo') {
            filters.push({
                xtype: 'fieldset',
                title: 'Цільове призначення  земельної ділянки',
                anchor: '60%',
                layout: 'hbox',
                items: [{
                        xtype: 'combobox',
                        flex: 1,
                        margin: '5 5 5 5',
                        labelAlign: 'top',
                        msgTarget: 'side',
                        editable: false,
                        queryMode: 'local',
                        store: Ext.create('pf.store.common.LandSitePurpose'),
                        name: 'plotPurpose',
                        itemId: 'plotPurposeId',
                        minChars: 3,
                        displayField: 'name',
                        valueField: 'code'
                    }]
            })
        } else if (me.ovName == 'pf.view.form.card.ov.flat.TabAdditionalInfo') {
            filters.push({
                xtype: 'container',
                anchor: '100%',
                layout: {
                    type: 'hbox'
                },
                defaults: {
                    margin: '5 5 5 5'
                },
                items: [{
                        xtype: 'fieldset',
                        title: 'Кількість кімнат',
                        flex: 1,
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 15,
                            margin: '5 5 5 0'
                        },
                        items: [{
                                itemId: 'roomQtyStart',
                                fieldLabel: 'від'
                            }, {
                                itemId: 'roomQtyEnd',
                                fieldLabel: 'до'
                            }]
                    }, {
                        xtype: 'fieldset',
                        title: 'Номер поверху',
                        flex: 1,
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 15,
                            margin: '5 5 5 0'
                        },
                        items: [{
                                itemId: 'floorNumStart',
                                fieldLabel: 'від'
                            }, {
                                itemId: 'floorNumEnd',
                                fieldLabel: 'до'
                            }]
                    }, {
                        xtype: 'fieldset',
                        flex: 1,
                        title: 'Кількість поверхів (в будинку)',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 15,
                            margin: '5 5 5 0'
                        },
                        items: [{
                                itemId: 'floorsQtyStart',
                                fieldLabel: 'від'
                            }, {
                                itemId: 'floorsQtyEnd',
                                fieldLabel: 'до'
                            }]
                    }]
            })
        }

        Ext.apply(me, {
            tbar: [{
                    text: loc.btnAdd,
                    iconCls: 'add',
                    itemId: 'newAnalogue'
                }],
            buttons: [{
                    text: loc.btnOK,
                    itemId: 'selectedRecors',
                    cls: 'btnSave',
                    iconCls: 'save'
                }, {
                    text: loc.btnExit,
                    scope: this,
                    handler: this.close,
                    cls: 'btnExit',
                    iconCls: 'exit'
                }],
            items: [{
                    xtype: 'panel',
                    layout: 'border',
                    items: [{
                            region: 'center',
                            flex: 1,
                            layout: 'fit',
                            border: false,
                            xtype: 'grid',
                            itemId: 'gridAnalogueListId',
                            selModel: selModel,
                            store: store,
                            listeners: {
                                scope: this,
                                afterRender: function (grid) {
                                    grid.getSelectionModel().deselectAll();
                                }
                            },
                            plugins: [{
                                    ptype: 'filterbar',
                                    renderHidden: false,
                                    showShowHideButton: false,
                                    showClearAllButton: false
                                }, {
                                    ptype: 'selectedBar',
                                    noSelectionMsg: 'Не вибрано жодного запису!',
                                    pageSize: 10
                                }],
                            columnLines: true,
                            dockedItems: [{
                                    xtype: 'pagingtoolbar',
                                    store: store,
                                    dock: 'bottom',
                                    displayInfo: true,
                                    plugins: [{
                                            ptype: 'pageSize'
                                        }]
                                }],
                            columns: fields
                        }, {
                            region: 'north',
                            flex: 1,
                            layout: 'anchor',
                            collapsible: true,
                            collapsed: true,
                            title: 'Фільтри',
                            xtype: 'panel',
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
                            layout : 'anchor',
                                    buttons: [{
                                            text: 'Застосувати фільтри',
                                            itemId: 'setFilter'
                                        }, {
                                            text: 'Очистити фільтри',
                                            itemId: 'clearFilter'
                                        }],
                            items: filters
                        }]
                }]
        }), this.callParent(arguments);
    }
});
