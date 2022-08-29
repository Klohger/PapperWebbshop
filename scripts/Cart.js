class CartItem {
    constructor(amount,id) {
        this.amount = amount;
        this.id = id;
    }
    serialize() {
        return this.amount.toString() + '\n' + this.id.toString();
    }
    static deSerialize(string) {
        const struftts = string.split('\n');
        return new CartItem(parseInt(struftts[0]),parseInt(struftts[1]))
    }
}

class Paper extends CartItem {
    constructor(amount,id,color) {
        this.amount = amount;
        this.id = id;
        this.color = color;
    }
    serialize() {
        return this.amount.toString() + '\n' + this.id.toString() + '\n' + this.color + '\n';
    }
    static deSerialize(string) {
        const struftts = string.split('\n');
        return new CartItem(parseInt(struftts[0]),parseInt(struftts[1]),struftts[2]);
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
            localStorage.setItem(`cartItem${index}`, arr[index - cartLength].serialize());
        }
        localStorage.setItem('numItems',newLength);
    }
    static get items() {
        const numItems = Cart.length;
        const userCart = [];
        if (numItems) {
            for (let index = 0; index < numItems; index++) {
                userCart.push(CartItem.deSerialize(localStorage.getItem(`cartItem${index}`)));
            }
        }
        return userCart;
    }
}

Cart.init();