console.log('%c:)', "color: darkred; background-color: black; font-size: 4em; font-weight: bold");

class Ware {
    static formatter = new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: 'SEK',

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
        this.cardContainer = null;
    }
    static AddToWares(imageUrl, name, price, salePrice) {
        Ware.wares[Ware.wares.length] = new Ware(Ware.wares.length, imageUrl, name, price, salePrice);
    }
    async updateElement() {

    }
    async createElement() {
        const self = this;
        return new Promise(function () {
            self.cardContainer = document.createElement("div");
            document.getElementById('card-container').appendChild(self.cardContainer);
            self.cardContainer.classList.add('col', 'mb-5');
            {
                const card = document.createElement("div");
                card.classList.add('card', 'h-100');

                {
                    const productImage = document.createElement("img");
                    productImage.classList.add('card-img-top');

                    productImage.src = self.imageUrl;
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
                            productName.appendChild(document.createTextNode(self.name));

                            textCenter.appendChild(productName);
                        }
                        {
                            const productPrice = document.createElement('div');

                            const price = document.createElement('span');

                            price.appendChild(document.createTextNode(' ' + Ware.formatter.format(self.price) + ' '));

                            productPrice.appendChild(price);

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
                            button.appendChild(document.createTextNode('Lägg till i kundvagn'));
                            button.onclick = () => {
                                Cart.addWare(self.id);
                                document.getElementById('popup').hidden = false;
                                setTimeout(() => document.getElementById('popup').hidden = true, 1000);
                            }
                            textCenter.appendChild(button);
                        }
                        productActions.appendChild(textCenter);
                    }
                    card.appendChild(productActions);
                }
                self.cardContainer.appendChild(card);
            }


        });
    }
    static createElements() {
        const createElementThreads = [];
        for (let index = 0; index < Ware.wares.length; index++) {
            createElementThreads.push(Ware.wares[index].createElement());
        }
        for (let index = 0; index < createElementThreads.length; index++) {
            Promise.race(createElementThreads);
        }

    }
}

class CartItem {
    ware;
    amount = 1;
    constructor(id, amount) {
        this.ware = Ware.wares[id];
        this.amount = amount;
        this.cartCard = null;
    }

    cartCard = null;
    async createElement() {
        /*
        <div style="border: 1px solid rgba(0,0,0,0.125);flex-direction: row;display: flex;width: fit-content;flex: inherit; flex-wrap: nowrap;align-items: center; margin-bottom: 1rem !important">
            <img class="cart-img" src="paper.png" alt="...">
            <div style="padding: 1rem !important" class="card-body p-4">
                <div style="padding: 1rem !important"  class="card-body p-4">
                    <div class="text-center" style="display: flex;">
                        <h5 class="fw-bolder">TestItem</h5>
                        <div><span class="text-muted text-decoration-line-through">$100.00</span><span> $50.00 </span></div>
                    </div>
                </div>
                <div style="padding: 1rem !important" class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center" style="display:flex; justify-content: center; align-items: center; flex-wrap: nowrap;">
                        <a class="btn btn-outline-dark mt-auto cart-btn">-</a>
                        <a class="btn btn-outline-dark cart-num">5000</a>
                        <a class="btn btn-outline-dark mt-auto cart-btn">+</a>
                    </div>
                </div>
            </div>
        </div>
        */
        const self = this;

        return new Promise(() => {
            self.cartCard = document.createElement("div");
            self.cartCard.style.border = "1px solid rgba(0,0,0,0.125)";
            self.cartCard.style.flexDirection = 'row';
            self.cartCard.style.display = 'flex';
            self.cartCard.style.width = 'fit-content';
            self.cartCard.style.flex = 'inherit';
            self.cartCard.style.flexWrap = 'nowrap';
            self.cartCard.style.alignItems = 'center';
            self.cartCard.style.marginBottom = '1rem';
            {
                const image = document.createElement("img");
                image.classList.add('cart-img');
                image.src = self.ware.imageUrl; // IMAGE
                image.alt = '...';
                {

                }
                self.cartCard.appendChild(image);
            }
            {
                const cartBody = document.createElement('div');
                cartBody.classList.add('card-body', 'p-4');
                cartBody.style.padding = "1rem !important";
                {
                    const cartBody2 = document.createElement('div');
                    cartBody2.classList.add('card-body', 'p-4');
                    cartBody2.style.padding = "1rem !important";
                    {
                        const textCenter = document.createElement('div');
                        textCenter.classList.add('text-center');
                        textCenter.style.display = 'flex';
                        textCenter.style.justifyContent = 'space-between';
                        {
                            const name = document.createElement('h5');
                            name.classList.add('fw-bolder');
                            {
                                name.appendChild(document.createTextNode(self.ware.name)); // NAME
                            }
                            textCenter.appendChild(name);
                        }
                        {
                            const div = document.createElement('div');
                            {

                                const price = document.createElement('span');
                                {
                                    price.appendChild(document.createTextNode(' ' + Ware.formatter.format(self.ware.price * self.amount) + ' ')); // price
                                }
                                div.appendChild(price);

                            }
                            textCenter.appendChild(div);
                        }
                        cartBody2.appendChild(textCenter);
                    }

                    cartBody.appendChild(cartBody2);
                }
                {
                    const cardFooter = document.createElement('div');
                    cardFooter.classList.add("card-footer", "p-4", "pt-0", "border-top-0", "bg-transparent");
                    cardFooter.style.padding = '1rem';
                    {
                        const textCenter = document.createElement('div');
                        textCenter.classList.add('text-center');
                        textCenter.style.display = "flex";
                        textCenter.style.justifyContent = 'center';
                        textCenter.style.alignItems = 'center';
                        textCenter.style.flexWrap = 'nowrap';
                        {
                            const minusButton = document.createElement('a');
                            minusButton.classList.add('btn', 'btn-outline-dark', 'mt-auto', 'cart-btn');
                            minusButton.onclick = () => {
                                Cart.removeWare(self.ware.id);

                                if (self.amount === 1) {
                                    alert('Are you sure you want to uninstall your operating system?');
                                    document.getElementById('cart-container').removeChild(self.cartCard);
                                } else {
                                    self.amount--;
                                }
                                self.cartCard.children[1].children[0].children[0].children[1].children[0].innerHTML = ' ' + Ware.formatter.format(self.ware.price * self.amount) + ' ';

                                self.cartCard.children[1].children[1].children[0].children[1].innerHTML = self.amount.toString();
                                document.getElementById('money').innerHTML = Ware.formatter.format(Cart.CalculateMoneySum());
                            }
                            {
                                minusButton.appendChild(document.createTextNode('-'))
                            }
                            textCenter.appendChild(minusButton);
                        }
                        {
                            const cartNum = document.createElement('a');
                            cartNum.classList.add('btn', 'btn-outline-dark', 'cart-num');
                            {
                                cartNum.appendChild(document.createTextNode(self.amount.toString()));
                            }
                            textCenter.appendChild(cartNum);
                        }
                        {
                            const plusButton = document.createElement('a');
                            plusButton.classList.add('btn', 'btn-outline-dark', 'mt-auto', 'cart-btn');
                            plusButton.onclick = () => {
                                Cart.addWare(self.ware.id);
                                self.amount++;


                                self.cartCard.children[1].children[0].children[0].children[1].children[0].innerHTML = ' ' + Ware.formatter.format(self.ware.price * self.amount) + ' ';
                                self.cartCard.children[1].children[1].children[0].children[1].innerHTML = self.amount.toString();
                                document.getElementById('money').innerHTML = Ware.formatter.format(Cart.CalculateMoneySum());
                            }
                            {
                                plusButton.appendChild(document.createTextNode('+'))
                            }
                            textCenter.appendChild(plusButton);
                        }
                        cardFooter.appendChild(textCenter);
                    }
                    cartBody.appendChild(cardFooter);
                }
                self.cartCard.appendChild(cartBody);
            }
            {
                const help2 = document.createElement('div');
                help2.style.cursor = 'pointer';
                help2.onclick = () => {
                    alert('Are you sure you want to uninstall your operating system?');
                    self.amount = 0;
                    Cart.clearWare(self.ware.id);
                    document.getElementById('cart-container').removeChild(self.cartCard);
                    document.getElementById('money').innerHTML = Ware.formatter.format(Cart.CalculateMoneySum());
                    
                };
                {
                    
                    const help = document.createElement('a');
                    help.style.cursor = 'default';
                    help.style.display = 'block';
                    help.style.rotate = '45deg';
                    help.style.fontSize = '2em';
                    {
                        help.appendChild(document.createTextNode('+'));
                    }
                    help2.appendChild(help);
                }
                self.cartCard.appendChild(help2);
            }
            document.getElementById('cart-container').appendChild(self.cartCard);
        });

    }
    async createCheckoutElement() {
        /* 
        <p>
            <a href="#">
                Paper
            </a> 
            <span class="price">
                $15
            </span>
        </p>
        */
        const self = this;
        return new Promise(() => {
            const pee = document.createElement('p');
            {
                const name = document.createElement('span');
                {
                    name.innerHTML = self.amount + 'x ' + self.ware.name;
                }
                pee.appendChild(name);
            }
            {
                const price = document.createElement('span');
                price.classList.add('price');
                {
                    price.innerHTML = Ware.formatter.format(self.ware.price * self.amount);
                }
                pee.appendChild(price);
            }
            document.getElementById('checkout-container').appendChild(pee);
        });
    }
}

class Cart {
    static CalculateSum() {
        let sum = 0;
        for (let index = 0; index < Ware.wares.length; index++) {
            sum += parseInt(localStorage.getItem(`cartWare${index}`));
        }
        Cart.Num.innerHTML = sum.toString();
    }
    static CalculateMoneySum() {
        let sum = 0;
        for (let index = 0; index < Cart.items.length; index++) {

            const bruh = Cart.items[index];
            {
                sum += bruh.ware.price * bruh.amount;
            }

        }
        return sum;
    }
    static cart = Cart.items;
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
        if (Cart.Num !== null) {
            Cart.Num.innerHTML = sum.toString();
        }
        const checkoutButton = document.getElementById('check-out-btn');
        if (checkoutButton !== null && sum === 0) {
            
            checkoutButton.onclick = null;
            checkoutButton.classList.remove('btn-success');
            checkoutButton.classList.add('btn-secondary');
        }

    }
    static clear() {
        for (let index = 0; index < Ware.wares.length; index++) {
            localStorage.setItem(`cartWare${index}`, '0');
        }
        {
            this.Num.innerHTML = '0';
        }
        {
            const checkoutButton = document.getElementById('check-out-btn'); 
            if(checkoutButton !== null) {
                checkoutButton.onclick = null;
                checkoutButton.classList.remove('btn-success');
                checkoutButton.classList.add('btn-secondary');
            }
        }
        {
            const MONEY = document.getElementById('money');
            if(MONEY !== null) {
                MONEY.innerHTML = Ware.formatter.format(Cart.CalculateMoneySum());
            }
        }
    }
    static clearWare(id) {
        
        const WareAmount = parseInt(localStorage.getItem(`cartWare${id}`));
        const num = parseInt(this.Num.innerHTML) - WareAmount;
        localStorage.setItem(`cartWare${id}`, 0);

        this.Num.innerHTML = num.toString();

        {
            const checkoutButton = document.getElementById('check-out-btn');

            if(checkoutButton !== null && num === 0) {
                
                checkoutButton.onclick = null;
                checkoutButton.classList.remove('btn-success');
                checkoutButton.classList.add('btn-secondary');
            }
        }
    }
    static addWare(id) {

        const num = parseInt(this.Num.innerHTML) + 1;
        const WareAmount = parseInt(localStorage.getItem(`cartWare${id}`)) + 1;
        localStorage.setItem(`cartWare${id}`, WareAmount.toString());

        this.Num.innerHTML = num.toString();

        {
            const checkoutButton = document.getElementById('check-out-btn');

            if(checkoutButton !== null && num > 0) {
                
                checkoutButton.onclick = () => location.href = 'checkout.html';;
                checkoutButton.classList.remove('btn-secondary');
                checkoutButton.classList.add('btn-success');
            }
        }
    }
    static removeWare(id) {
        let num = parseInt(this.Num.innerHTML);
        const WareAmount = parseInt(localStorage.getItem(`cartWare${id}`));
        if (WareAmount !== 0) {
            localStorage.setItem(`cartWare${id}`, Math.max(WareAmount - 1).toString());
            num -= 1;
            this.Num.innerHTML = num.toString();
        }
        const checkoutButton = document.getElementById('check-out-btn');
        if (checkoutButton !== null && num === 0) {
            
            checkoutButton.onclick = null;
            checkoutButton.classList.remove('btn-success');
            checkoutButton.classList.add('btn-secondary');
        }
    }

    static get items() {
        const userCart = [];

        for (let index = 0; index < Ware.wares.length; index++) {
            const item = new CartItem(index, parseInt(localStorage.getItem(`cartWare${index}`)));
            userCart.push(item);
        }
        return userCart;
    }
    static assignElement(element, element2) {
        if (element) {
            const element = new Audio('https://klohger.github.io/media/JAVA_01.ogg');
            element.addEventListener("canplaythrough", (event) => {
                /* the audio is now playable; play it if permissions allow */
                element.play();
            });
            element2.innerHTML = ':)';
        } else {
            console.log(':(');
            location.href = 'index.html';
        }
    }
    static createElements() {
        Cart.cart = Cart.items.filter((value, index, arr) => {
            return value.amount !== 0;
        });

        const createElementThreads = [];
        for (let index = 0; index < Cart.cart.length; index++) {
            createElementThreads.push(Cart.cart[index].createElement());
        }
        for (let index = 0; index < createElementThreads.length; index++) {
            Promise.race(createElementThreads);
        }
    }
    static async createCheckoutElements() {
        Cart.cart = Cart.items.filter((value, index, arr) => {
            return value.amount !== 0;
        });
        const createElementThreads = [];
        for (let index = 0; index < Cart.cart.length; index++) {
            createElementThreads.push(Cart.cart[index].createCheckoutElement());
        }
        for (let index = 0; index < createElementThreads.length; index++) {
            Promise.race(createElementThreads);
        }
        document.getElementById('money').innerHTML = Ware.formatter.format(Cart.CalculateMoneySum());
    }
}

Ware.AddToWares('paper.png', 'A0', 3);
Ware.AddToWares('paper.png', 'A1', 1);
Ware.AddToWares('paper.png', 'A2', 0.5);
Ware.AddToWares('paper.png', 'A3', 0.25);
Ware.AddToWares('paper.png', 'A4', 0.1);
Ware.AddToWares('paper.png', 'A5', 0.1);
Ware.AddToWares('paper.png', 'A6', 0.05);
Ware.AddToWares('paper.png', 'A7', 0.05);
Ware.AddToWares('paper.png', 'A8', 0.05);
Ware.AddToWares('pen.png', 'Penna', 20);
Ware.AddToWares('eraser.png', 'Sudd', 12);
Ware.AddToWares('ruler.png', 'Linjal', 25);

Cart.init();