class CartItem {
    constructor(amount,id) {
        this.amount = amount;
        this.id = id;
    }
    toString() {
        return this.amount.toString() + ':' + this.id.toString();
    }
    static parse(string) {
        const struftts = string.split(':');
        return new CartItem(parseInt(struftts[0]),parseInt(struftts[1]))
    }
}

class Cart {
    static init() {
        Cart.length;
    }
    static get length() {
        const numItems = localStorage.getItem('numItems');
        if(numItems) {
            return parseInt(numItems);
        } else {
            Cart.clear();
            return 0;
        }
    }
    static clear() {
        localStorage.setItem('numItems',0);
    }
    static addItems(arr) {
        const cartLength = Cart.length;
        const newLength = cartLength + arr.length;
        
        for (let index = cartLength; index < newLength; index++) {
            localStorage.setItem(`cartItem${index}`, arr[index - cartLength].toString());
        }
        localStorage.setItem('numItems',newLength);
    }
    static addItem(item) {
        const userCartLength = Cart.length;
        const newLength = userCartLength + arr.length;
        for (let index = numItems; index < userCartLength; index++) {
            localStorage.setItem(`cartItem${index}`, arr[index]);
        }
    }
    static get items() {
        const numItems = Cart.length;
        const userCart = [];
        if (numItems) {
            for (let index = 0; index < numItems; index++) {
                userCart.push(CartItem.parse(localStorage.getItem(`cartItem${index}`)));
            }
        }
        return userCart;
    }
}

Cart.init();