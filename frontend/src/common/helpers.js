export const currencyFormat = (num = 0, isShowSuffix = false) => {
    if (!num || typeof num !== 'number') {
        return '';
    }
    
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.').replace(/\d(?=(\d{3})+\.)/g, '$&,') + (isShowSuffix ? 'đ' : '');
}

export function debounce(fn, ms = 1000) {
    let timer;

    return function() {
        const args = arguments;
        const context = this;

        if(timer) clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(context, args);
        }, ms)
    }
}