class Ware {
    static formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    static wares = [];
    constructor(id, imageUrl, name, price, salePrice) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.name = name;
        this.price = price;
        this.salePrice = salePrice;
    }
    static AddToWares(imageUrl, name, price, salePrice) {
        Ware.wares[Ware.wares.length] = new Ware(Ware.wares.length, imageUrl, name, price, salePrice);
    }

    display() {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add('col', 'mb-5');
        {
            const card = document.createElement("div");
            card.classList.add('card', 'h-100');

            {
                const productImage = document.createElement("img");
                productImage.classList.add('card-img-top');

                productImage.src = this.imageUrl;
                productImage.alt = "...";
                card.appendChild(productImage);
            }
            {
                const productDetails = document.createElement("div");
                productDetails.classList.add('card-body', 'p-4');
                {
                    const textCenter = document.createElement('div');
                    textCenter.classList.add('text-center');
                    {
                        const productName = document.createElement("h5");
                        productName.classList.add('fw-bolder');
                        productName.appendChild(document.createTextNode(this.name));

                        textCenter.appendChild(productName);
                    }
                    {
                        const productPrice = document.createElement('div');
                        if (this.salePrice < this.price) {
                            {
                                const price = document.createElement('span');
                                price.classList.add('text-muted', 'text-decoration-line-through');
                                price.appendChild(document.createTextNode(Ware.formatter.format(this.price)));
                                
                                productPrice.appendChild(price);
                            }
                            {
                                const salePrice = document.createElement('span');
                                salePrice.appendChild(document.createTextNode(' ' + Ware.formatter.format(this.salePrice) + ' '));

                                productPrice.appendChild(salePrice);
                            }
                        } else {
                            const price = document.createElement('span');

                            price.appendChild(document.createTextNode(' ' + Ware.formatter.format(this.price) + ' '));

                            productPrice.appendChild(price);
                        }
                        textCenter.appendChild(productPrice);
                    }
                    productDetails.appendChild(textCenter);
                }
                card.appendChild(productDetails);
            }
            {
                const productActions = document.createElement("div");
                productActions.classList.add('card-footer', 'p-4', 'pt-0', 'border-top-0', 'bg-transparent');
                {
                    const textCenter = document.createElement('div');
                    textCenter.classList.add('text-center');
                    {
                        const button = document.createElement('a');
                        button.classList.add('btn', 'btn-outline-dark', 'mt-auto');
                        button.appendChild(document.createTextNode('Add to cart'));
                        button.onclick = () => Cart.addWare(this.id);
                        textCenter.appendChild(button);
                    }
                    productActions.appendChild(textCenter);
                }
                card.appendChild(productActions);
            }
            cardContainer.appendChild(card);
        }
        document.getElementById('card-container').appendChild(cardContainer);
    }
    displayInCart() {

    }
    static displayAll() {
        for (let index = 0; index < Ware.wares.length; index++) {
            Ware.wares[index].display();
        }
    }
}


class CartItem {
    ware;
    amount = 1;
    constructor(id, amount) {
        this.ware = Ware.wares[id];
        this.amount = amount;
    }
}

class Cart {
    static Num = document.getElementById('cart-num');
    static init() {
        let sum = 0;
        for (let index = 0; index < Ware.wares.length; index++) {
            const count = localStorage.getItem(`cartWare${index}`);
            const intCount = parseInt(count);
            if (count === null || intCount === NaN || intCount < 0) {
                localStorage.setItem(`cartWare${index}`, '0');
            } else {
                sum += intCount;
            }
        }
        this.Num.innerHTML = sum.toString();
    }
    static clear() {
        for (let index = 0; index < Ware.wares.length; index++) {
            localStorage.setItem(`cartWare${index}`, '0');
        }
    }
    static addWare(id) {
        
        const WareAmount = parseInt(localStorage.getItem(`cartWare${id}`)) + 1;
        localStorage.setItem(`cartWare${id}`, WareAmount.toString());
        alert(Ware.wares[id].name + ': ' + WareAmount.toString());
        this.Num.innerHTML = (parseInt(this.Num.innerHTML) + 1).toString();
        
    }
    static removeWare(id) {
        const WareAmount = parseInt(localStorage.getItem(`cartWare${id}`));
        if (WareAmount !== 0) {
            localStorage.setItem(`cartWare${id}`, Math.max(WareAmount - 1).toString());
            this.Num.innerHTML = (parseInt(this.Num.innerHTML) - 1).toString();
        }
    }

    static get items() {
        const userCart = [];

        for (let index = 0; index < Ware.wares.length; index++) {
            userCart.push(new CartItem(index, parseInt(localStorage.getItem(`cartWare${index}`))));
        }
        return userCart;
    }
}

Ware.AddToWares('paper.png', 'TestItem', 100, 50);
Cart.init();