/* =========================================
   JUEGO POR DEFECTO
========================================= */

const defaultGame = {

    title: 'ULTRAKILL',

    image: 'img/ultrakill-logo.jpg',

    price: 19.99,

    oldPrice: 39.99

};


/* =========================================
   OBTENER DATOS DE LA URL
========================================= */

const params =
    new URLSearchParams(
        window.location.search
    );


const game = {

    title:
        params.get('title')
        || defaultGame.title,

    image:
        params.get('image')
        || defaultGame.image,

    price:
        Number(
            params.get('price')
            || defaultGame.price
        ),

    oldPrice:
        Number(
            params.get('oldPrice')
            || defaultGame.oldPrice
        )

};


/* =========================================
   FORMATO DE MONEDA
========================================= */

const currency = (value) => {

    return `$${Number(value).toFixed(2)}`;

};


/* =========================================
   ELEMENTOS DEL HTML
========================================= */

const gameTitle =
    document.getElementById(
        'checkoutGameTitle'
    );


const gameImage =
    document.getElementById(
        'checkoutGameImage'
    );


const summaryGameName =
    document.getElementById(
        'summaryGameName'
    );


const summaryOldPrice =
    document.getElementById(
        'summaryOldPrice'
    );


const summaryPrice =
    document.getElementById(
        'summaryPrice'
    );


const summaryTotal =
    document.getElementById(
        'summaryTotal'
    );


const summaryQuantity =
    document.getElementById(
        'summaryQuantity'
    );


const productInput =
    document.getElementById(
        'producto'
    );


const quantityInput =
    document.getElementById(
        'cantidad'
    );


const formPrice =
    document.getElementById(
        'formPrice'
    );


const formOldPrice =
    document.getElementById(
        'formOldPrice'
    );


const formTotal =
    document.getElementById(
        'formTotal'
    );


const formSubject =
    document.getElementById(
        'formSubject'
    );


/* =========================================
   MOSTRAR INFORMACIÓN DEL JUEGO
========================================= */

document.title =
    `Compra - ${game.title}`;


if (gameTitle) {

    gameTitle.textContent =
        game.title;

}


if (gameImage) {

    gameImage.src =
        game.image;

    gameImage.alt =
        game.title;

}


if (summaryGameName) {

    summaryGameName.textContent =
        game.title;

}


if (summaryOldPrice) {

    summaryOldPrice.textContent =
        currency(game.oldPrice);

}


if (summaryPrice) {

    summaryPrice.textContent =
        currency(game.price);

}


if (productInput) {

    productInput.value =
        game.title;

}


/* =========================================
   MÉTODO DE PAGO
========================================= */

const paymentSelect =
    document.getElementById(
        'metodo'
    );


const cardBrandLogo =
    document.getElementById(
        'cardBrandLogo'
    );


/* =========================================
   LOGOS
========================================= */

const logoMap = {


    visa:

        'data:image/svg+xml;charset=UTF-8,' +

        encodeURIComponent(`

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="84"
                height="52"
                viewBox="0 0 84 52"
            >

                <rect
                    width="84"
                    height="52"
                    rx="8"
                    fill="#1a1f71"
                />

                <text
                    x="42"
                    y="32"
                    text-anchor="middle"
                    fill="#ffffff"
                    font-size="22"
                    font-family="Arial"
                    font-weight="700"
                >
                    VISA
                </text>

            </svg>

        `),


    mastercard:

        'data:image/svg+xml;charset=UTF-8,' +

        encodeURIComponent(`

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="84"
                height="52"
                viewBox="0 0 84 52"
            >

                <rect
                    width="84"
                    height="52"
                    rx="8"
                    fill="#f6f6f6"
                />

                <circle
                    cx="32"
                    cy="26"
                    r="13"
                    fill="#eb001b"
                />

                <circle
                    cx="52"
                    cy="26"
                    r="13"
                    fill="#f79e1b"
                />

                <text
                    x="42"
                    y="48"
                    text-anchor="middle"
                    fill="#333"
                    font-size="7"
                    font-family="Arial"
                >
                    Mastercard
                </text>

            </svg>

        `),


    amex:

        'data:image/svg+xml;charset=UTF-8,' +

        encodeURIComponent(`

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="84"
                height="52"
                viewBox="0 0 84 52"
            >

                <rect
                    width="84"
                    height="52"
                    rx="8"
                    fill="#0a3d91"
                />

                <text
                    x="42"
                    y="32"
                    text-anchor="middle"
                    fill="#ffffff"
                    font-size="16"
                    font-family="Arial"
                    font-weight="700"
                >
                    AMEX
                </text>

            </svg>

        `),


    paypal:

        'data:image/svg+xml;charset=UTF-8,' +

        encodeURIComponent(`

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="84"
                height="52"
                viewBox="0 0 84 52"
            >

                <rect
                    width="84"
                    height="52"
                    rx="8"
                    fill="#f5f7fb"
                />

                <text
                    x="42"
                    y="31"
                    text-anchor="middle"
                    fill="#0070ba"
                    font-size="13"
                    font-family="Arial"
                    font-weight="700"
                >
                    PayPal
                </text>

            </svg>

        `)

};


/* =========================================
   CAMBIAR LOGO
========================================= */

function updateCardLogo() {

    if (!paymentSelect || !cardBrandLogo) {

        return;

    }


    const value =
        paymentSelect.value;


    cardBrandLogo.src =
        logoMap[value]
        || logoMap.visa;


    cardBrandLogo.alt =
        value;

}


if (paymentSelect) {

    paymentSelect.addEventListener(
        'change',
        updateCardLogo
    );

}


updateCardLogo();


/* =========================================
   ACTUALIZAR TOTAL
========================================= */

function updateTotal() {

    if (!quantityInput) {

        return;

    }


    let quantity =
        Number(
            quantityInput.value
        );


    if (
        !quantity ||
        quantity < 1
    ) {

        quantity = 1;

        quantityInput.value = 1;

    }


    const total =
        game.price * quantity;


    if (summaryQuantity) {

        summaryQuantity.textContent =
            quantity;

    }


    if (summaryPrice) {

        summaryPrice.textContent =
            currency(game.price);

    }


    if (summaryTotal) {

        summaryTotal.textContent =
            currency(total);

    }


    if (formPrice) {

        formPrice.value =
            currency(game.price);

    }


    if (formOldPrice) {

        formOldPrice.value =
            currency(game.oldPrice);

    }


    if (formTotal) {

        formTotal.value =
            currency(total);

    }

}


if (quantityInput) {

    quantityInput.addEventListener(
        'input',
        updateTotal
    );

}


updateTotal();


/* =========================================
   FORMSPREE
========================================= */

const checkoutForm =
    document.querySelector(
        '.checkout-form'
    );


if (checkoutForm) {


    checkoutForm.addEventListener(
        'submit',
        function () {


            /*
             * Actualizar información
             * justo antes de enviar.
             */

            updateTotal();


            /*
             * Asunto del correo.
             */

            if (formSubject) {

                formSubject.value =
                    `Nueva compra - ${game.title}`;

            }


            /*
             * Producto.
             */

            if (productInput) {

                productInput.value =
                    game.title;

            }


            /*
             * No usamos preventDefault().
             *
             * Esto permite que el formulario
             * se envíe directamente a Formspree.
             */

        }
    );

}
