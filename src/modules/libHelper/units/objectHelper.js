class ObjectHelper {
    static getPropertyName(object, propertyNameStart, resultOnce) {
        const objectNames = Object.getOwnPropertyNames(object);
        const resultList = objectNames.filter((propertyName) => propertyName.startsWith(propertyNameStart));
        if(resultOnce) {
            if(resultList.length) {
                return resultList[0];
            }
            return null;
        }
        return resultList;
    }

    static getProperty(object, propertyNameStart, resultOnce) {
        const objectNames = Object.getOwnPropertyNames(object);
        const resultList = objectNames
            .filter((propertyName) => propertyName.startsWith(propertyNameStart))
            .map((propertyName) => object[propertyName]);
        if(resultOnce) {
            if(resultList.length) {
                return resultList[0];
            }
            return null;
        }
        return resultList;
    }
};

module.exports = {
    ObjectHelper
};

