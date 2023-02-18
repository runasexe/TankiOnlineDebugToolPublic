const { TankiOnlineHook } = require('./../hookManager');

class TankiOnlineHookBattleMessages extends TankiOnlineHook {
    constructor(defaultEnabled, options) {
        super('BattleMessages', options);

        this.isSupportEnabled = true;
        this.isEnabled = defaultEnabled;
    }
    processInject() {
        const hookInfo = this;

        const libHelper = hookInfo.coreContext.modules.require("libHelper");

        const getExportObject = ((objectPath, ...args) => {
            const exportData = this.webpackData.getExports(objectPath, ...args);
            if((typeof(exportData) == 'undefined') || (exportData === null)) {
                hookInfo.moduleContext.logger.error("Can't get object: \"%s\"", objectPath);
            }
            return exportData;
        })

        const CaptureFlagComponent = getExportObject('tanks.client.battle.objects.modes.ctf.component.CaptureFlagComponent', true);
        if(!CaptureFlagComponent) { return; }

        const BattleTeam = getExportObject('projects.tanks.multiplatform.battleservice.model.battle.team.BattleTeam', true);
        if(!BattleTeam) { return; }

        const TeamRelation = getExportObject('tanks.client.lobby.redux.battle.hud.TeamRelation', true);
        if(!TeamRelation) { return; }

        const BattleMessageType = getExportObject('tanks.client.lobby.redux.battle.hud.BattleMessageType', true);
        if(!BattleMessageType) { return; }

        const BattleMessagesComponent = getExportObject('tanks.client.battle.hud.BattleMessagesComponent', true);
        if(!BattleMessagesComponent) { return; }

        const LocalizedComponent = getExportObject('com.alternativaplatform.redux.react.LocalizedComponent', true);
        if(!LocalizedComponent) { return; }

        /**
         * Сообщения для событий
         */
        const getEventData = (() => (hookInfo.params.notifyMessages));

        // Патч локализации
        const getLocalizedKeyByBattleMessage = BattleMessagesComponent.prototype.getLocalizedKeyByBattleMessage_0;
        BattleMessagesComponent.prototype.getLocalizedKeyByBattleMessage_0 = (function (battleMessage, ...args) {
            if (battleMessage instanceof libHelper.FormatString) {
                return battleMessage;
            }
            return getLocalizedKeyByBattleMessage.call(this, battleMessage, ...args);
        });

        // Патч локализации
        const getTextPropertyNameList = libHelper.ObjectHelper.getPropertyName(LocalizedComponent.prototype, 'getText_');
        getTextPropertyNameList.map((propertyName) => {
            let originalFunciton = LocalizedComponent.prototype[propertyName];
            LocalizedComponent.prototype[propertyName] = (function (...args) {
                if ((!args.length) || !(args[0] instanceof libHelper.FormatString)) {
                    return originalFunciton.apply(this, args);
                }
                return (args[0]).formatValue(args.slice(1));
            });
        });

        // Изучение сообщений
        libHelper.FunctionHelper.pathFunctionSimpleBefore(
            CaptureFlagComponent.prototype,
            libHelper.ObjectHelper.getPropertyName(CaptureFlagComponent.prototype, 'notifyFlagFacedOff', true),
            (function (...args) {
                hookInfo.moduleContext.logger.info("CaptureFlagComponent.prototype.notifyFlagFacedOff(%O, %O)", this, args);
            })
        );

        // Изучение сообщений
        libHelper.FunctionHelper.pathFunctionSimpleBefore(
            CaptureFlagComponent.prototype,
            libHelper.ObjectHelper.getPropertyName(CaptureFlagComponent.prototype, 'notifyFlagExiled', true),
            (function (...args) {
                hookInfo.moduleContext.logger.info("CaptureFlagComponent.prototype.notifyFlagExiled(%O, %O)", this, args);
            })
        );

        // Изучение сообщений
        libHelper.FunctionHelper.pathFunctionSimpleBefore(
            CaptureFlagComponent.prototype,
            libHelper.ObjectHelper.getPropertyName(CaptureFlagComponent.prototype, 'notifyReadyToFaceOff', true),
            (function (...args) {
                hookInfo.moduleContext.logger.info("CaptureFlagComponent.prototype.notifyReadyToFaceOff(%O, %O)", this, args);
            })
        );

        const getTypePropertyName = libHelper.ObjectHelper.getPropertyName(BattleMessageType.Companion.__proto__, 'getType', true);
        for (const eventName in getEventData()) {
            libHelper.FunctionHelper.pathFunctionSimpleBefore(
                CaptureFlagComponent.prototype,
                libHelper.ObjectHelper.getPropertyName(CaptureFlagComponent.prototype, eventName, true),
                (function (flagObject, battleEntityObject) {
                    if (!hookInfo.isEnabled) {
                        return;
                    }
                    hookInfo.moduleContext.logger.info("CaptureFlagComponent.prototype." + eventName + "(flagOwner: %O, playerTeam: %O)", this, flagObject.teamType.name, this.gameMode_0.possesedTankTeam.name);
                    function teamCompare(teamFirst, teamSecond) {
                        return ((teamFirst === teamSecond) && (teamFirst !== BattleTeam.NONE));
                    }
                    function getTeamRelationEx(teamFirst, teamSecond, isAlly) {
                        return ((isAlly == teamCompare(teamFirst, teamSecond)) ? TeamRelation.ALLY : TeamRelation.ENEMY);
                    }
                    function getTeamRelation(gameMode, flagTeamOwner, isAlly) {
                        if (gameMode && gameMode.possesedTankTeam) {
                            return getTeamRelationEx(gameMode.possesedTankTeam, flagTeamOwner, isAlly)
                        }
                        return null;
                    }
                    const teamRelation = getTeamRelation(this.gameMode_0, flagObject.teamType, false);
                    if (battleEntityObject) {
                        this.addBattleLogMessage_0(
                            getEventData()[eventName].playerMessage,
                            battleEntityObject, (
                            (teamRelation !== null)
                                ? BattleMessageType.Companion[getTypePropertyName].call(BattleMessageType.Companion, teamRelation, false)
                                : BattleMessageType.WHITE
                        )
                        );
                    } else {
                        this.addBattleLogMessage_1(
                            getEventData()[eventName].defaultMessage, (
                            (teamRelation !== null)
                                ? BattleMessageType.Companion[getTypePropertyName].call(BattleMessageType.Companion, teamRelation, false)
                                : BattleMessageType.WHITE
                        )
                        );
                    }

                })
            );
        }
    }
}

const unitSignals = {
    load: ((moduleContext, coreContext) => {
        const defaultEnabled = true;

        const libHelper = coreContext.modules.require("libHelper");

        moduleContext.hooks.register(new TankiOnlineHookBattleMessages(defaultEnabled, {
            notifyMessages: {
                notifyFlagDropped: {
                    playerMessage: new libHelper.FormatString("%0 потерял флаг"),
                    defaultMessage: new libHelper.FormatString("Флаг потерян") // TODO: Такое бывает?
                },
                notifyFlagReturned: {
                    playerMessage: new libHelper.FormatString("%0 возвратил флаг"),
                    defaultMessage: new libHelper.FormatString("Флаг возвращен")
                }
            }
        }), moduleContext);
    })
};

module.exports = {
    unitSignals,
    TankiOnlineHookBattleMessages
};

