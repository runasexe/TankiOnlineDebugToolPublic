const { getValue } = require('/src/utils/context');
const defaultLangMutate = require('/config/defaultLocalizationMutate.json');

// TODO: Идет разработка транслятора
//  В планах, перевести на них все сообщения ядра (а затем и модулей, с индивидуальными трансляторами)

class Translator {
    languareData = null;
    languareCurrent = null;
    languareMutations = null;

    constructor(languare) {
        this.languareData = {};
        this.languareMutations = {};
        this.languareCurrent = (languare || (e => (e ? e.language : null))(getValue('navigator')) || 'default');
    }

    import(content) {
        let scanState = null;
        let currentData = null;
        for(let currentLanguare in content) {
            scanState = true;
            currentData = content[currentLanguare];
            while(scanState) {
                scanState = false;
                for(let keyName in currentData) {
                    if((typeof(currentData[keyName]) == 'string') || (typeof(currentData[keyName]) == 'number')) {
                        currentData[keyName.toLocaleLowerCase()] = currentData[keyName];
                        delete currentData[keyName];
                    } else if((typeof(currentData[keyName]) == 'object') && (currentData[keyName] !== null)) {
                        scanState = true;
                        for(let keyNameSecond in currentData[keyName]) {
                            currentData[keyName.toLocaleLowerCase() + '.' + keyNameSecond.toLocaleLowerCase()] = currentData[keyName][keyNameSecond];
                            delete currentData[keyName][keyNameSecond];
                        }
                    }
                }
            }
            this.languareData[currentLanguare] = (this.languareData[currentLanguare] || {});
            Object.assign(this.languareData[currentLanguare], currentData);
        }
    }

    mutate(mutateDictionary) {
        Object.assign(this.languareMutations, mutateDictionary);
        this.languare = this.languare
    }

    mutateUpdate(languare) {
        languare = (languare || this.languareCurrent);
        while(languare in this.languareMutations) {
            languare = this.languareMutations[languare];
        }
        this.languareCurrent = languare;
    }

    get languare() {
        return this.languareCurrent;
    }

    set languare(value) {
        this.mutateUpdate(value);
    }

    get(name) {
        this.languareData[this.languareCurrent] = (this.languareData[this.languareCurrent] || {});
        return (this.languareData[this.languareCurrent][name] || null);
    }

    set(name, value) {
        this.languareData[this.languareCurrent] = (this.languareData[this.languareCurrent] || {});
        this.languareData[this.languareCurrent][name] = value;
    }
};

const unitSignals = {
    init: ((coreContext) => {
        coreContext.i18n = new coreContext.Translator();
    }),
    load: ((coreContext) => {
        coreContext.i18n.mutate(defaultLangMutate);
        coreContext.i18n.mutateUpdate();
    })
};

module.exports = { Translator, unitSignals };

