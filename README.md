# TankiOnlineDebugTool

Утилита для отладки игры "Танки Онлайн"

## Описание

Скрипт состоит из ядра - набора классов, констант и методов, предоставляющих ресурсы для модулей и модулей - самостоятельных мини-приложений, основывающихся наресурсах игры.
Каждый модуль или ядро может собираться отдельно.
Параметры взаимодействия определены в файле [moduleConnection.js](./config/moduleConnection.js)

## Модули и возможности

Модули, доступные в данный момент:

* [libHelper](#модуль-libhelper)
* [libWebpack](#модуль-libwebpack)
* [tankionlineLoader](#модуль-tankionlineloader)
* [tankionlineWebpack](#модуль-tankionlinewebpack)
* [tankionlineHooks](#модуль-tankionlinehooks)

### Модуль "libHelper"

Cодержит инструменты, которые могут использовать другие модули:

* [Ресурсы для работы с объектами](./src/modules/libHelper/units/objectHelper.js)
* [Ресурсы для работы со строками](./src/modules/libHelper/units/stringHelper.js)
* [Ресурсы для работы с ссылками](./src/modules/libHelper/units/linkHelper.js)
* [Ресурсы для работы с функциями](./src/modules/libHelper/units/functionHelper.js)

### Модуль "libWebpack"

Cодержит инструменты работы с webpack-содержимым:

* [Инструменты для работы с webpack-содержимым](./src/modules/libWebpack/units/WebpackModuleManager.js)
* [Инструменты для работы поиска элементов в модулях webpack](./src/modules/libWebpack/units/AdvancedWebpackModuleManager.js)

### Модуль "tankionlineLoader"

Обеспечивает запуск утилиты. [Файл конфигурации](./src/modules/tankionlineLoader/config.js) позволяет настраивать параметры запуска.

### Модуль "tankionlineWebpack"

Инициализирует и предоставляет объекты для работы с webpack-содержимым игры.

### Модуль "tankionlineHooks"

Обеспечитвает загрузку микропатчей игры, основанных на предоставляемых ресурсах.
