console.log('%c:)', "color: darkred; background-color: black; font-size: 4em; font-weight: bold");

// stores product information
class Ware {
    // used to format price
    static formatter = new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: 'SEK',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    // this array stores all the registered wares of the website 
    static registeredWares = [];
    constructor(id, imageUrl, name, price, salePrice) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.name = name;
        this.price = price;
        this.salePrice = salePrice;
        this.cardContainer = null;
    }
    // creates Ware object and adds it to the registered wares array
    static Register(imageUrl, name, price, salePrice) {
        Ware.registeredWares[Ware.registeredWares.length] = new Ware(Ware.registeredWares.length, imageUrl, name, price, salePrice);
    }

    // creates an html element of this specific ware
    // and appends it inside a card container.
    // this is used to dynamically add ware to index.html 
    async createElement() {
        const self = this;
        return new Promise(function () {
            self.cardContainer = document.createElement("div");
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
            document.getElementById('card-container').appendChild(self.cardContainer);

        });
    }
    // this runs Ware.createElement() for every registered ware 
    static createElements() {
        const createElementThreads = [];
        for (let index = 0; index < Ware.registeredWares.length; index++) {
            createElementThreads.push(Ware.registeredWares[index].createElement());
        }
        for (let index = 0; index < createElementThreads.length; index++) {
            Promise.race(createElementThreads);
        }

    }
}

// stores a ware and an amount
class CartItem {
    ware;
    amount = 0;
    constructor(id, amount) {
        this.ware = Ware.registeredWares[id];
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
            self.cartCard.style.justifyContent = 'center';
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
                cartBody.classList.add('card-body');
                cartBody.style.padding = "1rem !important";
                {
                    const cartBody2 = document.createElement('div');
                    cartBody2.classList.add('card-body');
                    cartBody2.style.padding = "1rem !important";
                    {
                        const textCenter = document.createElement('div');
                        textCenter.classList.add('text-center');
                        textCenter.style.display = 'flex';
                        textCenter.style.justifyContent = 'space-between';
                        {
                            const name = document.createElement('h5');
                            name.classList.add('fw-bolder');
                            //name.style.fontSize = 'calc(12px + 2vw)';
                            {
                                name.appendChild(document.createTextNode(self.ware.name)); // NAME
                            }
                            textCenter.appendChild(name);
                        }
                        {
                            const div = document.createElement('div');
                            {

                                const price = document.createElement('span');
                                //price.style.fontSize = 'calc(12px + 1vw)';
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
                    cardFooter.classList.add("card-footer", "pt-0", "border-top-0", "bg-transparent");
                    cardFooter.style.padding = '1rem';
                    {
                        const textCenter = document.createElement('div');
                        textCenter.classList.add('text-center');
                        textCenter.style.display = "flex";
                        textCenter.style.justifyContent = 'center';
                        textCenter.style.alignItems = 'center';
                        textCenter.style.flexWrap = 'nowrap';
                        {
                            const pain62538572979 = document.createElement('div');
                            {
                                const minusButton = document.createElement('a');
                                minusButton.classList.add('btn', 'btn-outline-dark', 'mt-auto', 'cart-btn');
                                minusButton.onclick = () => {


                                    if (self.amount === 1) {
                                        document.getElementById(`popup-bruh-${self.ware.id}`).hidden = false;

                                    } else {
                                        Cart.removeWare(self.ware.id);
                                        self.amount--;
                                    }
                                    self.cartCard.children[1].children[0].children[0].children[1].children[0].innerHTML = ' ' + Ware.formatter.format(self.ware.price * self.amount) + ' ';

                                    self.cartCard.children[1].children[1].children[0].children[1].innerHTML = self.amount.toString();
                                    document.getElementById('money').innerHTML = Ware.formatter.format(Cart.CalculateMoneySum());
                                }
                                {
                                    minusButton.appendChild(document.createTextNode('-'))
                                }
                                pain62538572979.appendChild(minusButton);
                            }
                            {
                                /*
                                <span hidden id=`popup-${self.ware.id}` style="
                                color: rgb(24, 24, 24);
                                outline: none;
                                box-sizing: border-box;
                                display: block;
                                position:absolute;
                                z-index: 91;
                                transform: translate(-12%,6%);
                                ">
                                    <span style="
                                    z-index: 1;
                                    position: absolute;
                                    width: 100%;
                                    height: 100%;
                                    max-width: 0.75rem;
                                    max-height: 0.75rem;
                                    background-color: rgb(24, 24, 24);
                                    top: -0.0625rem;
                                    transform: rotate(45deg) translateY(-50%);
                                    left: calc(50% - 0.65525rem);
                                    outline: none;
                                    box-sizing: border-box;
                                    color: rgb(24, 24, 24);">
            
                                    </span>
                                    <span style="
                                    display: block;
                                    position: relative;
                                    white-space: normal;
                                    padding: 1.25rem;
                                    background-color: rgb(24, 24, 24);
                                    box-shadow: rgb(0 0 0 / 50%) 0px 0.25rem 0.625rem 0px;
                                    text-transform: none;
                                    text-align:center;
                                    outline: none;
                                    box-sizing: border-box;
                                    color: rgb(24, 24, 24);">
                                        <span style="
                                        display: block;
                                        color: rgb(255, 255, 255);
                                        font-size: 0.8125rem;
                                        line-height: 1.25rem;
                                        margin-top: -0.25rem;
                                        margin-bottom: -0.25rem;
                                        white-space: normal;
                                        text-transform: none;
                                        text-align: center;">
                                            <p color="white" type="body" style="
                                            margin: 0px;
                                            color: rgb(255, 255, 255);
                                            font-size: 0.8125rem;
                                            line-height: 1.25rem;
                                            outline: none;
                                            box-sizing: border-box;
                                            white-space: normal;
                                            text-transform: none;
                                            text-align: center;">
                                                Vill du verkligen<br>tömma kundvagnen?
                                            </p>
                                        </span>
                                        <div style="margin-top:1rem">
                                            <a class="btn btn-light" onclick = "
                                                {
                                                    document.getElementById('cart-container').innerHTML = '';
                                                    Cart.clear();
                                                    document.getElementById('empty-cart-popup').hidden = true;
                                                }">Ja</a>
                                            <a class="btn btn-light" onclick="document.getElementById('empty-cart-popup').hidden = true;">Nej</a>
                                        </div>
                                    </span>
                                </span>
                                */
                                const popup = document.createElement('span');
                                popup.hidden = true;
                                popup.id = `popup-bruh-${self.ware.id}`;
                                popup.style.color = 'rgb(24, 24, 24)';
                                popup.style.outline = 'none';
                                popup.style.boxSizing = 'border-box';
                                popup.style.display = 'block';
                                popup.style.position = 'absolute';
                                popup.style.zIndex = '1';
                                popup.style.transform = 'translate(-33%,10%)';
                                {
                                    const arrow = document.createElement('span');
                                    arrow.style.zIndex = '124';
                                    arrow.style.position = 'absolute';
                                    arrow.style.width = '100%';
                                    arrow.style.height = '100%';
                                    arrow.style.maxWidth = '0.75rem';
                                    arrow.style.maxHeight = '0.75rem';
                                    arrow.style.backgroundColor = 'rgb(24,24,24)';
                                    arrow.style.top = '-0.0625rem';
                                    arrow.style.transform = 'rotate(45deg) translateY(-50%)';
                                    arrow.style.left = 'calc(50% - 0.65525rem)';
                                    arrow.style.outline = 'none';
                                    arrow.style.boxSizing = 'border-box';
                                    arrow.style.color = 'rgb(24,24,24)';
                                    {

                                    }
                                    popup.appendChild(arrow);
                                }
                                {
                                    const spainWithoutTheI = document.createElement('span');
                                    spainWithoutTheI.style.display = 'block';
                                    spainWithoutTheI.style.position = 'relative';
                                    spainWithoutTheI.style.whiteSpace = 'normal';
                                    spainWithoutTheI.style.padding = '1.25rem';
                                    spainWithoutTheI.style.backgroundColor = 'rgb(24,24,24)';
                                    spainWithoutTheI.style.boxShadow = 'rgb(0 0 0 / 50%) 0px 0.25rem 0.625rem 0px';
                                    spainWithoutTheI.style.textTransform = 'none';
                                    spainWithoutTheI.style.textAlign = 'center';
                                    spainWithoutTheI.style.outline = 'none';
                                    spainWithoutTheI.style.boxSizing = 'border-box';
                                    spainWithoutTheI.style.color = 'rgb(24,24,24)';
                                    {
                                        const pain = document.createElement('span');
                                        pain.style.display = 'block';
                                        pain.style.color = 'rgb(255,255,255)';
                                        pain.style.fontSize = '0.8125rem';
                                        pain.style.lineHeight = '1.25rem';
                                        pain.style.marginTop = '-0.25rem';
                                        pain.style.marginBottom = '-0.25rem';
                                        pain.style.whiteSpace = 'normal';
                                        pain.style.textTransform = 'none';
                                        pain.style.textAlign = 'center';
                                        {
                                            const paragraph = document.createElement('p');
                                            paragraph.color = 'white';
                                            paragraph.style.margin = '0px';
                                            paragraph.style.color = 'rgb(255,255,255)';
                                            paragraph.style.fontSize = '0.8125rem';
                                            paragraph.style.lineHeight = '1.25rem';
                                            paragraph.style.outline = 'none';
                                            paragraph.style.boxSizing = 'border-box';
                                            paragraph.style.whiteSpace = 'normal';
                                            paragraph.style.textTransform = 'none';
                                            paragraph.style.textAlign = 'center';
                                            {
                                                paragraph.appendChild(document.createTextNode('Är du säker?'))
                                            }
                                            pain.appendChild(paragraph);
                                        }
                                        spainWithoutTheI.appendChild(pain);

                                    }
                                    {
                                        const buttonMaster = document.createElement('div');
                                        buttonMaster.style.marginTop = '1rem';
                                        {
                                            const yes = document.createElement('a');
                                            yes.style.margin = '0.125rem';
                                            yes.classList.add('btn', 'btn-light');
                                            yes.onclick = () => {
                                                Cart.removeWare(self.ware.id);
                                                popup.hidden = true;
                                                self.amount = 0;
                                                document.getElementById('cart-container').removeChild(self.cartCard);

                                                document.getElementById('money').innerHTML = Ware.formatter.format(Cart.CalculateMoneySum());
                                            }
                                            {
                                                yes.appendChild(document.createTextNode('Ja'));
                                            }
                                            buttonMaster.appendChild(yes);
                                        }
                                        {
                                            const no = document.createElement('a');
                                            no.classList.add('btn', 'btn-light');
                                            no.style.margin = '0.125rem';

                                            no.onclick = () => {
                                                popup.hidden = true;
                                            };
                                            {
                                                no.appendChild(document.createTextNode('Nej'));
                                            }
                                            buttonMaster.appendChild(no);
                                        }
                                        spainWithoutTheI.appendChild(buttonMaster);
                                    }
                                    popup.appendChild(spainWithoutTheI);
                                }
                                pain62538572979.appendChild(popup);
                            }
                            textCenter.appendChild(pain62538572979);
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
                const pain251551 = document.createElement('div');
                pain251551.style.zIndex = '1';
                {
                    const help2 = document.createElement('div');
                    help2.style.cursor = 'pointer';

                    help2.onclick = () => {
                        document.getElementById(`popup-${self.ware.id}`).hidden = false;
                    };
                    {

                        const help = document.createElement('a');
                        help.style.cursor = 'default';
                        help.style.display = 'block';
                        help.style.rotate = '45deg';
                        help.style.fontSize = 'calc(12px + 1.5vw)';
                        {
                            help.appendChild(document.createTextNode('+'));
                        }
                        help2.appendChild(help);
                    }
                    pain251551.appendChild(help2);
                }
                {
                    /*
                    <span hidden id=`popup-${self.ware.id}` style="
                    color: rgb(24, 24, 24);
                    outline: none;
                    box-sizing: border-box;
                    display: block;
                    position:absolute;
                    z-index: 91;
                    transform: translate(-12%,6%);
                    ">
                        <span style="
                        z-index: 1;
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        max-width: 0.75rem;
                        max-height: 0.75rem;
                        background-color: rgb(24, 24, 24);
                        top: -0.0625rem;
                        transform: rotate(45deg) translateY(-50%);
                        left: calc(50% - 0.65525rem);
                        outline: none;
                        box-sizing: border-box;
                        color: rgb(24, 24, 24);">
 
                        </span>
                        <span style="
                        display: block;
                        position: relative;
                        white-space: normal;
                        padding: 1.25rem;
                        background-color: rgb(24, 24, 24);
                        box-shadow: rgb(0 0 0 / 50%) 0px 0.25rem 0.625rem 0px;
                        text-transform: none;
                        text-align:center;
                        outline: none;
                        box-sizing: border-box;
                        color: rgb(24, 24, 24);">
                            <span style="
                            display: block;
                            color: rgb(255, 255, 255);
                            font-size: 0.8125rem;
                            line-height: 1.25rem;
                            margin-top: -0.25rem;
                            margin-bottom: -0.25rem;
                            white-space: normal;
                            text-transform: none;
                            text-align: center;">
                                <p color="white" type="body" style="
                                margin: 0px;
                                color: rgb(255, 255, 255);
                                font-size: 0.8125rem;
                                line-height: 1.25rem;
                                outline: none;
                                box-sizing: border-box;
                                white-space: normal;
                                text-transform: none;
                                text-align: center;">
                                    Vill du verkligen<br>tömma kundvagnen?
                                </p>
                            </span>
                            <div style="margin-top:1rem">
                                <a class="btn btn-light" onclick = "
                                    {
                                        document.getElementById('cart-container').innerHTML = '';
                                        Cart.clear();
                                        document.getElementById('empty-cart-popup').hidden = true;
                                    }">Ja</a>
                                <a class="btn btn-light" onclick="document.getElementById('empty-cart-popup').hidden = true;">Nej</a>
                            </div>
                        </span>
                    </span>
                    */
                    const popup = document.createElement('span');
                    popup.hidden = true;
                    popup.id = `popup-${self.ware.id}`;
                    popup.style.color = 'rgb(24, 24, 24)';
                    popup.style.outline = 'none';
                    popup.style.boxSizing = 'border-box';
                    popup.style.display = 'block';
                    popup.style.position = 'absolute';
                    popup.style.zIndex = '-599';
                    popup.style.transform = 'translate(-40%,-7.5%)';
                    {
                        const arrow = document.createElement('span');
                        arrow.style.zIndex = '124';
                        arrow.style.position = 'absolute';
                        arrow.style.width = '100%';
                        arrow.style.height = '100%';
                        arrow.style.maxWidth = '0.75rem';
                        arrow.style.maxHeight = '0.75rem';
                        arrow.style.backgroundColor = 'rgb(24,24,24)';
                        arrow.style.top = '-0.0625rem';
                        arrow.style.transform = 'rotate(45deg) translateY(-50%)';
                        arrow.style.left = 'calc(50% - 0.65525rem)';
                        arrow.style.outline = 'none';
                        arrow.style.boxSizing = 'border-box';
                        arrow.style.color = 'rgb(24,24,24)';
                        {

                        }
                        popup.appendChild(arrow);
                    }
                    {
                        const spainWithoutTheI = document.createElement('span');
                        spainWithoutTheI.style.display = 'block';
                        spainWithoutTheI.style.position = 'relative';
                        spainWithoutTheI.style.whiteSpace = 'normal';
                        spainWithoutTheI.style.padding = '1.25rem';
                        spainWithoutTheI.style.backgroundColor = 'rgb(24,24,24)';
                        spainWithoutTheI.style.boxShadow = 'rgb(0 0 0 / 50%) 0px 0.25rem 0.625rem 0px';
                        spainWithoutTheI.style.textTransform = 'none';
                        spainWithoutTheI.style.textAlign = 'center';
                        spainWithoutTheI.style.outline = 'none';
                        spainWithoutTheI.style.boxSizing = 'border-box';
                        spainWithoutTheI.style.color = 'rgb(24,24,24)';
                        {
                            const pain = document.createElement('span');
                            pain.style.display = 'block';
                            pain.style.color = 'rgb(255,255,255)';
                            pain.style.fontSize = '0.8125rem';
                            pain.style.lineHeight = '1.25rem';
                            pain.style.marginTop = '-0.25rem';
                            pain.style.marginBottom = '-0.25rem';
                            pain.style.whiteSpace = 'normal';
                            pain.style.textTransform = 'none';
                            pain.style.textAlign = 'center';
                            {
                                const paragraph = document.createElement('p');
                                paragraph.color = 'white';
                                paragraph.style.margin = '0px';
                                paragraph.style.color = 'rgb(255,255,255)';
                                paragraph.style.fontSize = '0.8125rem';
                                paragraph.style.lineHeight = '1.25rem';
                                paragraph.style.outline = 'none';
                                paragraph.style.boxSizing = 'border-box';
                                paragraph.style.whiteSpace = 'normal';
                                paragraph.style.textTransform = 'none';
                                paragraph.style.textAlign = 'center';
                                {
                                    paragraph.appendChild(document.createTextNode('Är du säker?'))
                                }
                                pain.appendChild(paragraph);
                            }
                            spainWithoutTheI.appendChild(pain);

                        }
                        {
                            const buttonMaster = document.createElement('div');
                            buttonMaster.style.marginTop = '1rem';
                            {
                                const yes = document.createElement('a');
                                yes.style.margin = '0.125rem';
                                yes.classList.add('btn', 'btn-light');
                                yes.onclick = () => {
                                    popup.hidden = true;
                                    self.amount = 0;
                                    Cart.clearWare(self.ware.id);
                                    document.getElementById('cart-container').removeChild(self.cartCard);
                                    document.getElementById('money').innerHTML = Ware.formatter.format(Cart.CalculateMoneySum());
                                }
                                {
                                    yes.appendChild(document.createTextNode('Ja'));
                                }
                                buttonMaster.appendChild(yes);
                            }
                            {
                                const no = document.createElement('a');
                                no.classList.add('btn', 'btn-light');
                                no.style.margin = '0.125rem';

                                no.onclick = () => {
                                    popup.hidden = true;
                                };
                                {
                                    no.appendChild(document.createTextNode('Nej'));
                                }
                                buttonMaster.appendChild(no);
                            }
                            spainWithoutTheI.appendChild(buttonMaster);
                        }
                        popup.appendChild(spainWithoutTheI);
                    }

                    pain251551.appendChild(popup);
                }
                self.cartCard.appendChild(pain251551);
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
        for (let index = 0; index < Ware.registeredWares.length; index++) {
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
        for (let index = 0; index < Ware.registeredWares.length; index++) {
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

        if (sum === 0) {
            const checkoutButton = document.getElementById('check-out-btn');
            if (checkoutButton !== null) {

                checkoutButton.onclick = null;
                checkoutButton.classList.remove('btn-success');
                checkoutButton.classList.add('btn-secondary');
            }
            const emptyCartBtn = document.getElementById('empty-cart-btn');
            if (emptyCartBtn !== null) {
                emptyCartBtn.hidden = true;
            }
        }


    }
    static clear() {
        for (let index = 0; index < Ware.registeredWares.length; index++) {
            localStorage.setItem(`cartWare${index}`, '0');
        }
        {
            this.Num.innerHTML = '0';
        }
        {
            const checkoutButton = document.getElementById('check-out-btn');
            if (checkoutButton !== null) {
                checkoutButton.onclick = null;
                checkoutButton.classList.remove('btn-success');
                checkoutButton.classList.add('btn-secondary');
            }
        }
        {
            const emptyCartBtn = document.getElementById('empty-cart-btn');
            if (emptyCartBtn !== null) {
                emptyCartBtn.hidden = true;
            }
        }
        {
            const MONEY = document.getElementById('money');
            if (MONEY !== null) {
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

            if (num === 0) {
                const checkoutButton = document.getElementById('check-out-btn');
                if (checkoutButton !== null) {

                    checkoutButton.onclick = null;
                    checkoutButton.classList.remove('btn-success');
                    checkoutButton.classList.add('btn-secondary');
                }
                const emptyCartBtn = document.getElementById('empty-cart-btn');
                if (emptyCartBtn !== null) {
                    emptyCartBtn.hidden = true;
                }
            }

        }
    }
    static addWare(id) {

        const num = parseInt(this.Num.innerHTML) + 1;
        const WareAmount = parseInt(localStorage.getItem(`cartWare${id}`)) + 1;
        localStorage.setItem(`cartWare${id}`, WareAmount.toString());

        this.Num.innerHTML = num.toString();


        if (num > 0) {
            const checkoutButton = document.getElementById('check-out-btn');
            if (checkoutButton !== null) {

                checkoutButton.onclick = () => location.href = 'checkout.html';;
                checkoutButton.classList.remove('btn-secondary');
                checkoutButton.classList.add('btn-success');
            }
            const emptyCartBtn = document.getElementById('empty-cart-btn');
            if (emptyCartBtn !== null) {
                emptyCartBtn.hidden = false;
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

        if (num === 0) {
            const checkoutButton = document.getElementById('check-out-btn');
            if (checkoutButton !== null) {

                checkoutButton.onclick = null;
                checkoutButton.classList.remove('btn-success');
                checkoutButton.classList.add('btn-secondary');
            }
            const emptyCartBtn = document.getElementById('empty-cart-btn');
            if (emptyCartBtn !== null) {
                emptyCartBtn.hidden = true;
            }
        }

    }

    static get items() {
        const userCart = [];

        for (let index = 0; index < Ware.registeredWares.length; index++) {
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

Ware.Register('paper.png', 'A0', 3);
Ware.Register('paper.png', 'A1', 1);
Ware.Register('paper.png', 'A2', 0.5);
Ware.Register('paper.png', 'A3', 0.25);
Ware.Register('paper.png', 'A4', 0.1);
Ware.Register('paper.png', 'A5', 0.1);
Ware.Register('paper.png', 'A6', 0.05);
Ware.Register('paper.png', 'A7', 0.05);
Ware.Register('paper.png', 'A8', 0.05);
Ware.Register('pen.png', 'Penna', 20);
Ware.Register('eraser.png', 'Sudd', 12);
Ware.Register('ruler.png', 'Linjal', 25);

Cart.init();