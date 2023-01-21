/**
 * В этот файл вынесены инструменты сборки ядра
 */
const { Module } = require('./units/moduleManager');

/**
 * Функция создания содуля ядра
 * 
 * @function
 * 
 * @param {*} callback - Функция, вызываемая после создания пустого модуля ядра
 * @returns
 */
const moduleCreateCore = ((...args) => {
    // Создание модуля ядра
    const coreContext = new Module('core', {
        // Метка модуля как загруженного, для предотвращения инициализации
        loaded: true,
        // Информация о модуле
        info: {
            versionProduction: null,
            versionDevelopment: null
        }
    });
    // При импорте модуля будет возвращен объект модуля
    coreContext.exports = coreContext;
    
    // Специальные метки объекта
    Object.defineProperty(coreContext, '__isCore', {writable: false, value: true});
    Object.defineProperty(coreContext, '__isModule', {writable: false, value: true});
    Object.defineProperty(coreContext, '__dataType', {writable: false, value: 'Module'});
    
    // Вызов функции инициализации после создания модуля ядра
    args.map(callback => callback.call(coreContext, coreContext, coreContext));

    // Возврат модуля ядра
    return coreContext;
});

module.exports = { moduleCreateCore };

