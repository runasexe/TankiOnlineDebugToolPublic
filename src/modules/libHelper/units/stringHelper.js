class FormatString {
    sourceString = null;

    constructor(sourceString) {
        this.sourceString = (sourceString || null);
    }

    formatValuePython(data) {
        return this.sourceString.replace(/{(\d+)}/g, ((match, number) => (typeof(data[number])) != 'undefined' ? data[number]: match));
    }

    formatValue(data) {
        return this.sourceString.replace(/%(\d+)/g, ((match, number) => (typeof(data[number])) != 'undefined' ? data[number]: match));
    }

    toString() {
        return this.sourceString;
    }
}

module.exports = {
    FormatString
};

