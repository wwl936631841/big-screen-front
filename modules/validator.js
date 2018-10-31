Vue.prototype.validator = function (type) {
    switch (type) {
        case 'number':
            return /^(\-|\+)?\d+(\.\d+)?$/;///^[0-9]*$/;
        case 'integer':
            return /^\d*$/;
        case 'float':
            return /^[+-]?((0|([1-9]\d*))\.\d+)?$/;
        case 'mobile': // 手机号
            return /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        case 'phone': // 座机号
            return /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
        case 'telephone': // 手机号或座机号
            return /(^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$)|(^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)/;
    }
}