const unitSignals = {
    load:((moduleContext, coreContext) => {
		moduleContext.hooks['BattleMessagesHook'] = {
            enabled: true,
            callback: ((webpackData, hookInfo) => {
                const FormatString = coreContext.modules.require("libHelper").FormatString;
                const FunctionHelper = coreContext.modules.require("libHelper").FunctionHelper;
                const ObjectHelper = coreContext.modules.require("libHelper").ObjectHelper;
            
                // Патч отсутствующих сообщений в бою
                const eventData = {
                    notifyFlagDropped: {
                        playerMessage: new FormatString("%0 потерял флаг"),
                        defaultMessage: new FormatString("Флаг потерян") // TODO: Такое бывает?
                    },
                    notifyFlagReturned: {
                        playerMessage: new FormatString("%0 возвратил флаг"),
                        defaultMessage: new FormatString("Флаг возвращен")
                    }
                };
            
                const CaptureFlagComponent = webpackData.getExports('tanks.client.battle.objects.modes.ctf.component.CaptureFlagComponent', true);
                const BattleTeam = webpackData.getExports('projects.tanks.multiplatform.battleservice.model.battle.team.BattleTeam', true);
                const TeamRelation = webpackData.getExports('tanks.client.lobby.redux.battle.hud.TeamRelation', true);
                const BattleMessageType = webpackData.getExports('tanks.client.lobby.redux.battle.hud.BattleMessageType', true);
                const BattleMessagesComponent = webpackData.getExports('tanks.client.battle.hud.BattleMessagesComponent', true);
                const LocalizedComponent = webpackData.getExports('com.alternativaplatform.redux.react.LocalizedComponent', true);
                
                // Патч локализации
                const getLocalizedKeyByBattleMessage = BattleMessagesComponent.prototype.getLocalizedKeyByBattleMessage_0;
                BattleMessagesComponent.prototype.getLocalizedKeyByBattleMessage_0 = (function(battleMessage, ...args) {
                    if(battleMessage instanceof FormatString) {
                        return battleMessage;
                    }
                    return getLocalizedKeyByBattleMessage.call(this, battleMessage, ...args);
                });
                
                // Патч локализации
                const getTextPropertyNameList = ObjectHelper.getPropertyName(LocalizedComponent.prototype, 'getText_');
                getTextPropertyNameList.map((propertyName) => {
                    let originalFunciton = LocalizedComponent.prototype[propertyName];
                    LocalizedComponent.prototype[propertyName] = (function(...args) {
                        if((!args.length) || !(args[0] instanceof FormatString)) {
                            return originalFunciton.apply(this, args);
                        }
                        return (args[0]).formatValue(args.slice(1));
                    });
                });
            
                /*
                // Изучение сообщений
                ObjectHelper.pathFunctionSimpleBefore(
                    CaptureFlagComponent.prototype,
                    ObjectHelper.getPropertyName(CaptureFlagComponent.prototype, 'notifyFlagFacedOff', true),
                    (function (...args) {
                        moduleContext.logger.info("CaptureFlagComponent.prototype.notifyFlagFacedOff(%O, %O)", this, args);
                }));
            
                // Изучение сообщений
                ObjectHelper.pathFunctionSimpleBefore(
                    CaptureFlagComponent.prototype,
                    ObjectHelper.getPropertyName(CaptureFlagComponent.prototype, 'notifyFlagExiled', true),
                    (function (...args) {
                        moduleContext.logger.info("CaptureFlagComponent.prototype.notifyFlagExiled(%O, %O)", this, args);
                }));
            
                // Изучение сообщений
                ObjectHelper.pathFunctionSimpleBefore(
                    CaptureFlagComponent.prototype,
                    ObjectHelper.getPropertyName(CaptureFlagComponent.prototype, 'notifyReadyToFaceOff', true),
                    (function (...args) {
                        moduleContext.logger.info("CaptureFlagComponent.prototype.notifyReadyToFaceOff(%O, %O)", this, args);
                }));
                */
            
                const getTypePropertyName = ObjectHelper.getPropertyName(BattleMessageType.Companion.__proto__, 'getType', true);
                for(const eventName in eventData) {
                    FunctionHelper.pathFunctionSimpleBefore(
                        CaptureFlagComponent.prototype,
                        ObjectHelper.getPropertyName(CaptureFlagComponent.prototype, eventName, true),
                        (function (flagObject, battleEntityObject) {
                            // moduleContext.logger.info("CaptureFlagComponent.prototype." + eventName + "(flagOwner: %O, playerTeam: %O)", this, flagObject.teamType.name, this.gameMode_0.possesedTankTeam.name);
                            function teamCompare(teamFirst, teamSecond) {
                                return ((teamFirst === teamSecond) && (teamFirst !== BattleTeam.NONE));
                            }
                            function getTeamRelationEx(teamFirst, teamSecond, isAlly) {
                                return ((isAlly == teamCompare(teamFirst, teamSecond)) ? TeamRelation.ALLY : TeamRelation.ENEMY);
                            }
                            function getTeamRelation(gameMode, flagTeamOwner, isAlly) {
                                if(gameMode && gameMode.possesedTankTeam) {
                                    return getTeamRelationEx(gameMode.possesedTankTeam, flagTeamOwner, isAlly)
                                }
                                return null;
                            }
                            const teamRelation = getTeamRelation(this.gameMode_0, flagObject.teamType, false);
                            if(battleEntityObject) {
                                this.addBattleLogMessage_0(
                                    eventData[eventName].playerMessage,
                                    battleEntityObject, (
                                        (teamRelation !== null)
                                        ? BattleMessageType.Companion[getTypePropertyName].call(BattleMessageType.Companion, teamRelation, false)
                                        : BattleMessageType.WHITE
                                    )
                                );
                            } else {
                                this.addBattleLogMessage_1(
                                    eventData[eventName].defaultMessage, (
                                        (teamRelation !== null)
                                        ? BattleMessageType.Companion[getTypePropertyName].call(BattleMessageType.Companion, teamRelation, false)
                                        : BattleMessageType.WHITE
                                    )
                                );
                            }
                            
                    }));
                }
            })
        };
    })
};

module.exports = {
    unitSignals
};

