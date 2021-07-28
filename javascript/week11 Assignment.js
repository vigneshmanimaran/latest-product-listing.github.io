let productsListUrl = 'https://my-json-server.typicode.com/vigneshmanimaran/json-database/db';
var productsList;
let htmlToReturn = "",
    reviews = "",
    lowStar = 0,
    i = 0.
isNew = '';
async function loadProducts(productsListUrl) {
    fetch('https://my-json-server.typicode.com/vigneshmanimaran/json-database/db')
        .then(response => response.json())
        .then(json => {
            productsList = json;
            productsList.Products.forEach((product) => {
                htmlToReturn = '<div class="col-xl-4 col-lg-4 col-md-6">' +
                    '<div class="single-product" id="product' + product.id + '">' +
                    '<div class="product-img">' +
                    '       <img src="images/product' + product.id + '.png" alt="">';
                isNew = '       <div class="new-product">' +
                    '           <span>New</span>' +
                    '       </div>'
                if (product.isNew == 'TRUE')
                    htmlToReturn += isNew;
                isNew = "";
                htmlToReturn += '       <div class="product-hover">' +
                    '            <div class="container">' +
                    '                <div class="row">' +
                    '                    <div class="col-4">' +
                    '                        <a href=""><img class="image" src="images/cart.png" alt=""></a>' +
                    '                    </div>' +
                    '                    <div class="col-4">' +
                    '                        <a href=""><img class="image1" src="images/view.png" alt=""></a>' +
                    '                    </div>' +
                    '                    <div class="col-4">' +
                    '                        <a href=""><img class="image2" src="images/wishlist.png" alt=""></a>' +
                    '                    </div>' +
                    '                </div>' +
                    '            </div>' +
                    '        </div>' +
                    '    </div>' +
                    '    <div class="product-caption">' +
                    '        <div class="product-rating">';
                lowStar = 6 - product.ratings;
                if (product.ratings == 5)
                    lowStar = 0;
                for (i = 1; i <= product.ratings; i++) {
                    reviews += '<i class="far fa-star"></i>';
                }
                for (i = 1; i <= lowStar; i++) {
                    reviews += '<i class="far fa-star low-star"></i>';
                }
                lowStar = 0;
                htmlToReturn += reviews + product.ratings + '/5';
                reviews = "";
                htmlToReturn += '        </div>' +
                    '        <h4><a href="#">' + product.name + '</a></h4>' +
                    '        <div class="price">' +
                    '            <ul>' +
                    '                <li>' + product.priceAfterDiscount + '</li>' +
                    '                <li class="discount">' + product.price + '</li>' +
                    '            </ul>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>' +
                    '</div>';
                document.querySelector('#productsListArea').innerHTML += htmlToReturn;
            });

            // javascript for bluring and showing cart icons
            document.querySelectorAll('.product-hover').forEach(product1 => {
                product1.classList.add('hide');
            })

            document.querySelectorAll('div[id^="product"]').forEach(product1 => {
                product1.addEventListener('mouseover', event => {
                    product1.querySelector('.product-img').classList.add('blur');
                    product1.querySelector('.product-img').querySelector('.product-hover').classList.remove('hide');
                    product1.querySelector('.product-img').querySelector('.product-hover').classList.add('show');
                })
                product1.addEventListener('mouseout', event => {
                    product1.querySelector('.product-img').classList.remove('blur');
                    product1.querySelector('.product-img').querySelector('.product-hover').classList.add('hide');
                    product1.querySelector('.product-img').querySelector('.product-hover').classList.remove('show');
                })
            });
           
            // javascript for hovering on image
            document.querySelectorAll('div[id^="product"]').forEach(product1 => {
                product1.addEventListener('mouseover', event => {
                    $(".image").hover(function () {
                        $(this).attr('src', 'images/Group 2584.png');
                    }, function () {
                        $(this).attr('src', 'images/cart.png');

                    });
                    $(".image1").hover(function () {
                        $(this).attr('src', 'images/Group 2583.png');
                    }, function () {
                        $(this).attr('src', 'images/view.png');
                    });
                    $(".image2").hover(function () {
                        $(this).attr('src', 'images/Group 2582.png');
                    }, function () {
                        $(this).attr('src', 'images/wishlist.png');
                    });
                })
            });

        })
}

loadProducts(productsListUrl);