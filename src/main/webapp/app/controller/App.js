Ext.define('pf.controller.App', {
    extend: 'pf.controller.Abstract',
    mixins: {
        systemMsg: 'pf.system.SystemMessage'
    },
    views: ['pf.view.main.MainToolBar', 'pf.view.main.container.Content', 'pf.view.main.container.Menu', 'pf.view.main.menu.MainMenu', 'pf.view.main.menu.ReportsMenu', 'pf.view.main.menu.StatisticsMenu', 'pf.view.main.container.Content', 'pf.view.form.card.CreateBlank', 'pf.view.form.list.UnpaidList', 'pf.view.form.list.PaidList', 'pf.view.form.list.AllBlanksList', 'pf.view.form.list.AccountedList', 'pf.view.form.list.NewList', 'pf.view.form.list.FinishedList', 'pf.view.form.list.ToSyncList', 'pf.view.form.list.InProcessList', 'pf.view.form.list.SynchedList', 'pf.view.form.list.ReadyList', 'pf.view.form.list.HandedList', 'pf.view.form.list.AllReportsList', 'pf.view.main.menu.AdminMenu', 'pf.view.form.common.organization.OrganizationList', 'pf.view.form.common.user.UserList',
        'pf.view.form.common.organization.OrganizationDeletedList', 'pf.view.form.common.user.UserDeletedList', 'pf.view.main.menu.IssueMenu', 'pf.view.form.card.profile.UsersProfile', 'pf.view.form.statistics.DailyReportFilter', 'pf.view.form.statistics.DailyReportBlanksFilter', 'pf.view.form.statistics.BlankSummary', 'pf.view.form.statistics.OVSummary', 'pf.view.form.statistics.ReadyOVSummary', 'pf.view.form.statistics.BranchBlanksReport', 'pf.view.form.statistics.BranchOVsReport', 'pf.view.form.statistics.SyncSummary', 'pf.view.form.statistics.SyncReport', 'pf.view.form.card.issue.IssuesList', 'pf.view.form.card.issue.IssueCard', 'pf.view.form.support.supportRequestList.NewIssueList', 'pf.view.form.support.supportRequestList.InProcessIssueList',
        'pf.view.form.support.supportRequestList.AllIssueList', 'pf.view.form.support.supportRequestList.ResolvedIssueList', 'pf.view.form.support.supportRequestList.RejectedIssueList', 'pf.view.form.support.dataUpdateList.ChangeOVStateList', 'pf.view.form.support.dataUpdateList.ChangeIsManualList', 'pf.view.form.support.dataUpdateList.ChangeOVCurUserList', 'pf.view.form.support.dataUpdateList.DeleteOVList', 'pf.view.form.support.dataUpdateList.DeleteBlankList', 'pf.view.form.support.UserInstructionsList', 'pf.view.form.support.dataUpdateList.ChangeOVValuationDateList'],
    refs: [{
            ref: 'content',
            selector: '[xtype=content]'
        }, {
            ref: 'menu',
            selector: '[xtype=menuContainer]'
        }, {
            ref: 'userDesc',
            selector: '[xtype=mainToolBar] label#lblUserDesc'
        }, {
            ref: 'userWorkplaceDesc',
            selector: '[xtype=mainToolBar] label#lblUserWorkplaceDesc'
        }],
    init: function () {
        this.listen({
            controller: {
                '#App': {
                    tokenchange: this.dispatch
                }
            },
            component: {
                'mainToolBar button': {
                    click: this.addHistory
                },
                'mainMenu menuitem': {
                    click: this.onMenuClick
                },
                'reportsMenu menuitem': {
                    click: this.onMenuClick
                },
                'adminMenu menuitem': {
                    click: this.onMenuClick
                },
                'issueMenu menuitem': {
                    click: this.onMenuClick
                },
                'statisticsMenu menuitem': {
                    click: this.onMenuClick
                }
            },
            global: {
                aftervalidateloggedin: this.setupApplication
            },
            proxy: {
                '#baseAjax': {
                    requestcomplete: this.handleAJAXResponse
                }
            },
            store: {
                '#storeUnpaidlId': {
                    load: this.onLoadInProcess
                },
                '#storePaidId': {
                    load: this.onLoadInProcess
                },
                '#storeAccountedId': {
                    load: this.onLoadInProcess
                },
                '#storeAllBlanksId': {
                    load: this.onLoadInProcess
                },
                '#storeNewId': {
                    load: this.onLoadInProcess
                },
                '#storeInProcessId': {
                    load: this.onLoadInProcess
                },
                '#storeFinishedId': {
                    load: this.onLoadInProcess
                },
                '#storeToSyncId': {
                    load: this.onLoadInProcess
                },
                '#storeSynchedId': {
                    load: this.onLoadInProcess
                },
                '#storeReadyId': {
                    load: this.onLoadInProcess
                },
                '#storeHandedId': {
                    load: this.onLoadInProcess
                },
                '#storeAllReportsId': {
                    load: this.onLoadInProcess
                },
                '#storeIssueUserId': {
                    load: this.onLoadInProcess
                },
                '#storeIssueAllId': {
                    load: this.onLoadInProcess
                }
            }
        });
    },
    /**
     * Entry point for our application. Will render the viewport, and do any
     * other setup required for our application
     */
    setupApplication: function () {
        var me = this;
        // create the viewport
        Ext.create('pf.view.Viewport');
        var user = pf.LoggedInUser.getCurrUserData();
        var userDesc = pf.LoggedInUser.getFIO();
        me.getUserDesc().setText(userDesc);
        me.getUserWorkplaceDesc().setText(user.get('workplaceName'));
        // init Ext.util.History on app launch; if there is a hash in the url,
        // our controller will load the appropriate content
        Ext.util.History.init(function () {
            var hash = document.location.hash;
            me.fireEvent('tokenchange', hash.replace('#', ''));
        })
        // add change handler for Ext.util.History;
        Ext.util.History.on('change', function (token) {
            me.fireEvent('tokenchange', token);
        });
    },
    addHistory: function (item, e, opts) {
        var me = this, token = item.itemId;
        Ext.util.History.add(token);
        me.fireEvent('tokenchange', token)
    },
    dispatch: function (token) {
        var me = this, content, menu;
        var viewport = Ext.ComponentQuery.query('viewport')[0];
        me.viewport = viewport;
        // switch on token to determine which content to create
        switch (token) {
            case 'menu/main':
                me.getCountBlanks();
                content = [];
                menu = [{
                        xtype: 'mainMenu'
                    }]
                break;
            case 'menu/reports':
                me.getCountOVs();
                content = [];
                menu = [{
                        xtype: 'reportsMenu'
                    }]
                break;
            case 'menu/admin':
                me.getCountIssues();
                content = [];
                menu = [{
                        xtype: 'adminMenu'
                    }]
                break;
            case 'menu/issues':
                me.getCountUserIssues();
                content = [];
                menu = [{
                        xtype: 'issueMenu'
                    }]
                break;
            case 'menu/statistics':
                content = [];
                menu = [{
                        xtype: 'statisticsMenu'
                    }]
                break;
        }
        if (content)
            me.updateContent(content, viewport);

        if (menu)
            me.updateMenu(menu, viewport);
    },
    /**
     * Updates center region
     * 
     * @param {Object} config
     */
    updateContent: function (config, viewreport) {
        var viewreportDom = viewreport.getEl();
        viewreportDom.mask('Завантаження', 'splashscreen');
        var contentContainer = Ext.widget('content');
        contentContainer.removeAll(false);
        Ext.defer(function () {
            contentContainer.add(config);
            viewreportDom.unmask();
        }, 10);

        viewreport.remove(viewreport.getComponent('contentId'));
        viewreport.add(contentContainer);
    },
    /**
     * Updates west region
     * 
     * @param {Object} config
     */
    updateMenu: function (config, viewreport) {
        var menuContainer = Ext.widget('menuContainer');
        menuContainer.removeAll(false);
        menuContainer.add(config);
        viewreport.remove(viewreport.getComponent('menuContainerId'));
        viewreport.add(menuContainer);
    },
    onMenuClick: function (menuItem) {
        var me = this, config;
        switch (menuItem.itemId) {
            case 'create':
                config = [{
                        xtype: 'createBlank'
                    }];
                break;

            case 'unpaid':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'unpaidTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlUnpaid,
                                layout: 'border',
                                itemId: 'tabId',
                                items: [{
                                        xtype: 'unpaidList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'paid':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'paidTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlPaid,
                                layout: 'border',
                                itemId: 'tabId',
                                items: [{
                                        xtype: 'paidList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'accounted':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'accountedTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlAccounted,
                                layout: 'border',
                                itemId: 'tabId',
                                items: [{
                                        xtype: 'accountedList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'allBlanks':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'allBlanksTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlAllBlanks,
                                layout: 'border',
                                itemId: 'tabId',
                                items: [{
                                        xtype: 'allBlanksList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'new':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'newTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlNew,
                                layout: 'border',
                                itemId: 'tabId',
                                items: [{
                                        xtype: 'newList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'inProcess':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'inProcessTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlinProcess,
                                layout: 'border',
                                itemId: 'tabId',
                                items: [{
                                        xtype: 'inProcessList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'finished':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'finishedTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttltoSync,
                                layout: 'border',
                                itemId: 'tabId',
                                items: [{
                                        xtype: 'finishedList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'toSync':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'toSyncTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttltoSync,
                                layout: 'border',
                                autoScroll: true,
                                itemId: 'tabId',
                                items: [{
                                        xtype: 'toSyncList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'synched':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'synchedTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlsynched,
                                layout: 'border',
                                itemId: 'tabId',
                                items: [{
                                        xtype: 'synchedList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'ready':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'readyTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlready,
                                layout: 'border',
                                itemId: 'tabId',
                                items: [{
                                        xtype: 'readyList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'handed':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'handedTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlhanded,
                                layout: 'border',
                                itemId: 'tabId',
                                items: [{
                                        xtype: 'handedList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'allReports':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'allTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlallReports,
                                layout: 'border',
                                itemId: 'tabId',
                                items: [{
                                        xtype: 'allReportsList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'mnuOrganizations':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'organizationsTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttOrganizations,
                                layout: 'border',
                                items: [{
                                        xtype: 'organizationList',
                                        region: 'center'
                                    }]
                            }, {
                                title: loc.ttOrganizationsDeleted,
                                layout: 'border',
                                items: [{
                                        xtype: 'organizationDeletedList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'mnuUsers':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'usersTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlUsers,
                                layout: 'border',
                                items: [{
                                        xtype: 'userList',
                                        region: 'center'
                                    }]
                            }, {
                                title: loc.ttlUsersDeleted,
                                layout: 'border',
                                items: [{
                                        xtype: 'userDeletedList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'dailyReport':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'dailyReportTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlDailyReport,
                                layout: 'border',
                                items: [{
                                        xtype: 'dailyReportFilter',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'dailyReportBlanks':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'dailyReportBlanksTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlDailyReportBlanks,
                                layout: 'border',
                                items: [{
                                        xtype: 'dailyReportBlanksFilter',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'blankStateSummary':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'blankSummaryTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlBlankStateSummary,
                                layout: 'border',
                                items: [{
                                        xtype: 'blankSummary',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'ovStateSummary':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'ovSummaryTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlOVStateSummary,
                                layout: 'border',
                                items: [{
                                        xtype: 'ovSummary',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'readyOVSummary':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'readyOVSummaryTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlReadyOVSummary,
                                layout: 'border',
                                items: [{
                                        xtype: 'readyOVSummary',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'branchBlanksReport':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'branchBlanksReportTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlBranchBlanksReport,
                                layout: 'border',
                                items: [{
                                        xtype: 'branchBlanksReport',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'branchOVsReport':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'dbranchOVsReportTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlBranchOVsReport,
                                layout: 'border',
                                items: [{
                                        xtype: 'branchOVsReport',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'syncSummary':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'syncSummaryTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlSyncSummary,
                                layout: 'border',
                                items: [{
                                        xtype: 'syncSummary',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'syncReport':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'syncReportTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlSyncReport,
                                layout: 'border',
                                items: [{
                                        xtype: 'syncReport',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'profile':
                Ext.widget('usersProfile').show()
                break;
            case 'listIssues':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'issuesTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlIssues,
                                layout: 'border',
                                items: [{
                                        xtype: 'issuesList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'createIssue':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'issuesCreateTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: loc.ttlIssuesCard,
                                layout: 'border',
                                items: [{
                                        xtype: 'issueCard',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'mnuChangeOVState':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'issuesInProcessTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: 'Заявки на зміну статусу звіту',
                                layout: 'border',
                                items: [{
                                        xtype: 'changeOVStateList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'mnuChangeOVCurUser':
                config = [{
                        xtype: 'tabpanel',
                        // itemId : 'issuesInProcessTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: 'Заявки на зміну поточного користувача звіту',
                                layout: 'border',
                                items: [{
                                        xtype: 'changeOVCurUserList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'mnuDeleteOV':
                config = [{
                        xtype: 'tabpanel',
                        // itemId : 'issuesInProcessTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: 'Заявки на видалення звіту',
                                layout: 'border',
                                items: [{
                                        xtype: 'deleteOVList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'mnuDeleteBlank':
                config = [{
                        xtype: 'tabpanel',
                        // itemId : 'issuesInProcessTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: 'Заявки на видалення анкети',
                                layout: 'border',
                                items: [{
                                        xtype: 'deleteBlankList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'mnuChangeValuationDate':
                config = [{
                        xtype: 'tabpanel',
                        // itemId : 'issuesInProcessTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: 'Заявки на зміну дати оцінки звіту',
                                layout: 'border',
                                items: [{
                                        xtype: 'changeOVValuationDateList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'mnuChangeIsManual':
                config = [{
                        xtype: 'tabpanel',
                        // itemId : 'issuesInProcessTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: 'Заявки на зміну способу формування звіту (ручне/автоматичне)',
                                layout: 'border',
                                items: [{
                                        xtype: 'changeIsManualList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'mnuEditBlank':
                config = [{
                        xtype: 'tabpanel',
                        // itemId : 'issuesInProcessTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: 'Заявки на редагування анкетних даних',
                                layout: 'border',
                                items: [{
                                        xtype: 'editBlankList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'mnuEditApplicant':
                config = [{
                        xtype: 'tabpanel',
                        // itemId : 'issuesInProcessTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: 'Заявки на редагування даних замовника',
                                layout: 'border',
                                items: [{
                                        xtype: 'editApplicantList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'mnuUsersIssue':
                config = [{
                        xtype: 'tabpanel',
                        itemId: 'mnuUsersIssueTabId',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: 'Нові',
                                layout: 'border',
                                items: [{
                                        xtype: 'newIssueList',
                                        region: 'center'
                                    }]
                            }, {
                                title: 'В роботі',
                                layout: 'border',
                                items: [{
                                        xtype: 'inProcessIssueList',
                                        region: 'center'
                                    }]
                            }, {
                                title: 'Відхилені',
                                layout: 'border',
                                items: [{
                                        xtype: 'rejectedIssueList',
                                        region: 'center'
                                    }]
                            }, {
                                title: 'Завершені',
                                layout: 'border',
                                items: [{
                                        xtype: 'resolvedIssueList',
                                        region: 'center'
                                    }]
                            }, {
                                title: 'Всі',
                                layout: 'border',
                                items: [{
                                        xtype: 'allIssueList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;
            case 'listUserManual':
                config = [{
                        xtype: 'tabpanel',
                        resizeTabs: true,
                        enableTabScroll: true,
                        items: [{
                                title: 'Інструкція користувача',
                                layout: 'border',
                                items: [{
                                        xtype: 'userInstructionsList',
                                        region: 'center'
                                    }]
                            }]
                    }];
                break;

        }
        if (config)
            this.updateContent(config, me.viewport);
    },
    onLoadInProcess: function (store) {
        switch (store.storeId) {
            case 'storeUnpaidlId':
                this.Unpaid = store.getTotalCount();
                var menu = Ext.ComponentQuery.query('#unpaid')[0]
                if (menu)
                    menu.setText(loc.mnuUpaid + '<b>' + ' (' + store.getTotalCount() + ')' + '<b/>');
                break;
            case 'storePaidId':
                this.Paid = store.getTotalCount();
                var menu = Ext.ComponentQuery.query('#paid')[0]
                if (menu)
                    menu.setText(loc.mnuPaid + '<b>' + ' (' + store.getTotalCount() + ')' + '<b/>');
                break;
            case 'storeAccountedId':
                this.Accounted = store.getTotalCount();
                var menu = Ext.ComponentQuery.query('#accounted')[0]
                if (menu)
                    menu.setText(loc.mnuAccounted + '<b>' + ' (' + store.getTotalCount() + ')' + '<b/>');
                break;
            case 'storeAllBlanksId':
                this.AllBlanks = store.getTotalCount();
                var menu = Ext.ComponentQuery.query('#allBlanks')[0]
                if (menu)
                    menu.setText(loc.mnuAllBlanks + '<b>' + ' (' + store.getTotalCount() + ')' + '<b/>');
                break;
            case 'storeNewId':
                this.New = store.getTotalCount();
                var menu = Ext.ComponentQuery.query('#new')[0];
                if (menu)
                    menu.setText(loc.mnuNew + '<b>' + ' (' + store.getTotalCount() + ')' + '<b/>');
                break;
            case 'storeInProcessId':
                this.inProssec = store.getTotalCount();
                var menu = Ext.ComponentQuery.query('#inProcess')[0];
                if (menu)
                    menu.setText(loc.mnuInProcess + '<b>' + ' (' + store.getTotalCount() + ')' + '<b/>');
                break;
            case 'storeFinishedId':
                this.finished = store.getTotalCount();
                var menu = Ext.ComponentQuery.query('#finished')[0]
                if (menu)
                    menu.setText(loc.mnuFinished + '<b>' + ' (' + store.getTotalCount() + ')' + '<b/>');
                break;
            case 'storeToSyncId':
                this.toSync = store.getTotalCount();
                var menu = Ext.ComponentQuery.query('#toSync')[0]
                if (menu)
                    menu.setText(loc.mnuToSync + '<b>' + ' (' + store.getTotalCount() + ')' + '<b/>');
                break;
            case 'storeSynchedId':
                this.synched = store.getTotalCount();
                var menu = Ext.ComponentQuery.query('#synched')[0]
                if (menu)
                    menu.setText(loc.mnuSynched + '<b>' + ' (' + store.getTotalCount() + ')' + '<b/>');
                break;
            case 'storeReadyId':
                this.ready = store.getTotalCount();
                var menu = Ext.ComponentQuery.query('#ready')[0]
                if (menu)
                    menu.setText(loc.mnuReady + '<b>' + ' (' + store.getTotalCount() + ')' + '<b/>');
                break;
            case 'storeHandedId':
                this.handed = store.getTotalCount();
                var menu = Ext.ComponentQuery.query('#handed')[0]
                if (menu)
                    menu.setText(loc.mnuHanded + '<b>' + ' (' + store.getTotalCount() + ')' + '<b/>');
                break;
            case 'storeAllReportsId':
                this.allReports = store.getTotalCount();
                var menu = Ext.ComponentQuery.query('#allReports')[0]
                if (menu)
                    menu.setText(loc.mnuAllReports + '<b>' + ' (' + store.getTotalCount() + ')' + '<b/>');
                break;
            case 'storeIssueUserId':
                var menu = Ext.ComponentQuery.query('#listIssues')[0]
                if (menu)
                    menu.setText(loc.mnuIssues + '<b>' + ' (' + store.getTotalCount() + ')' + '<b/>');
                break;
            case 'storeIssueAllId':
                var menu = Ext.ComponentQuery.query('#mnuUsersIssue')[0]
                if (menu)
                    menu.setText(loc.mnuIssues + '<b>' + ' (' + store.getTotalCount() + ')' + '<b/>');
                break;
        }

    },
    getCountBlanks: function () {
        var me = this, shortUrl = 'pf.proxy.common.Common.cls';
        var params = {
            action: 'getBlanksCount'
        };
        me.ajaxResponse('', params, shortUrl, me, me.setAmtInMainMenu);
    },
    setAmtInMainMenu: function (button, response) {
        var data = response.data[0], unpaid = 0, paid = 0, accounted = 0;
        unpaid = data.UNPAID, paid = data.PAID, accounted = data.ACCOUNTED;
        Ext.ComponentQuery.query('#unpaid')[0].setText(loc.mnuUpaid + '<b>' + ' (' + unpaid + ')' + '<b/>');
        Ext.ComponentQuery.query('#paid')[0].setText(loc.mnuPaid + '<b>' + ' (' + paid + ')' + '<b/>');
        Ext.ComponentQuery.query('#accounted')[0].setText(loc.mnuAccounted + '<b>' + ' (' + accounted + ')' + '<b/>');
    },
    getCountOVs: function () {
        var me = this, shortUrl = 'pf.proxy.common.Common.cls';
        var params = {
            action: 'getReportsCount'
        };
        me.ajaxResponse('', params, shortUrl, me, me.setAmtInReportsMenu);
    },
    setAmtInReportsMenu: function (button, response) {
        var data = response.data[0], newReports = 0, inProcess = 0, finished = 0, toSync = 0, synched = 0, ready = 0, handed = 0, allReports = 0;
        newReports = data.NEW, inProcess = data.IN_PROCESS, finished = data.FINISHED, toSync = data.TO_ADD_FDMU_NUM, synched = data.FDMU_NUM_ADDED, ready = data.READY, handed = data.HANDED, allReports = data.ALLREPORTS;
        Ext.ComponentQuery.query('#new')[0].setText(loc.mnuNew + '<b>' + ' (' + newReports + ')' + '<b/>');
        Ext.ComponentQuery.query('#inProcess')[0].setText(loc.mnuInProcess + '<b>' + ' (' + inProcess + ')' + '<b/>');
        Ext.ComponentQuery.query('#finished')[0].setText(loc.mnuFinished + '<b>' + ' (' + finished + ')' + '<b/>');
        Ext.ComponentQuery.query('#toSync')[0].setText(loc.mnuToSync + '<b>' + ' (' + toSync + ')' + '<b/>');
        Ext.ComponentQuery.query('#synched')[0].setText(loc.mnuSynched + '<b>' + ' (' + synched + ')' + '<b/>');
        Ext.ComponentQuery.query('#ready')[0].setText(loc.mnuReady + '<b>' + ' (' + ready + ')' + '<b/>');
        Ext.ComponentQuery.query('#handed')[0].setText(loc.mnuHanded + '<b>' + ' (' + handed + ')' + '<b/>');
        Ext.ComponentQuery.query('#allReports')[0].setText(loc.mnuAllReports + '<b>' + ' (' + allReports + ')' + '<b/>');
    },
    getCountUserIssues: function () {
        var me = this, shortUrl = 'pf.proxy.common.Common.cls';
        var params = {
            action: 'getCountUserIssues'
        };
        me.ajaxResponse('', params, shortUrl, me, me.setAmtInUserIssueMenu);
    },
    setAmtInUserIssueMenu: function (button, response) {
        var data = response.data[0], userIssues = 0, userIssues = data.USERISSUES;
        Ext.ComponentQuery.query('#listIssues')[0].setText(loc.mnuIssues + '<b>' + ' (' + userIssues + ')' + '<b/>');
    },
    getCountIssues: function () {
        var me = this, shortUrl = 'pf.proxy.common.Common.cls';
        var params = {
            action: 'getCountIssues'
        };
        me.ajaxResponse('', params, shortUrl, me, me.setAmtInIssueMenu);
    },
    setAmtInIssueMenu: function (button, response) {
        var data = response.data[0], issuesAll = 0, userIssues = data.ISSUESALL;
        Ext.ComponentQuery.query('#mnuUsersIssue')[0].setText(loc.mnuIssues + '<b>' + ' (' + userIssues + ')' + '<b/>');
    }

});