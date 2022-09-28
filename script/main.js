import { products, arrWomenClothing, arrMensClothing, arrComputer, arrMobile, arrWatches, arrGadget, arrFeatured, arrTrending, arrHotSale, arrSale16Percent, arrSale25Percent, arrSale33Percent } from './arrayProduct.js';

$(".projector").html(renderProductsTopCategories('Projector'));
$(".google-glass").html(renderProductsTopCategories("Google Glass"));
$(".headphone").html(renderProductsTopCategories("Headphone"));
$(".light").html(renderProductsTopCategories('Light'));
$(".laptop").html(renderProductsTopCategories('Laptop'));

$(".sale16off").html(renderProductsHotSale(arrSale16Percent));
$(".sale25off").html(renderProductsHotSale(arrSale25Percent));
$(".sale33off").html(renderProductsHotSale(arrSale33Percent));

renderBar(arrSale16Percent);
renderBar(arrSale25Percent);
renderBar(arrSale33Percent);

$('.list-product-women-clothing').html(renderProducts(arrWomenClothing));
$('.list-product-men-clothing').html(renderProducts(arrMensClothing));
$('.list-product-mobile').html(renderProducts(arrMobile));
$('.list-product-computer').html(renderProducts(arrComputer));
$('.list-product-watches').html(renderProducts(arrWatches));

$('.list-gadget-products').html(renderGadget());

$(".slider-featured").html(renderSliderProducts(arrFeatured))
$(".slider-trending").html(renderSliderProducts(arrTrending))
$(".slider-hotsale").html(renderSliderProducts(arrHotSale))

let checkUpDown
let checkColor

$(".categories").click(function () {
  $(this).siblings(".dropdown-categories").fadeToggle();
  if (checkUpDown === undefined || checkUpDown === true) {
    $(".down").addClass("active-up");
    checkUpDown = false;
  }
  else {
    $(".down").removeClass("active-up");
    checkUpDown = true;
  }
})

$(".category a").click(function () {
  $(this).siblings(".dropdown-category").fadeToggle();
  if (checkColor === undefined || checkColor === true) {
    $(this).css("color", "#1f73d3")
    checkColor = false;
  }
  else {
    $(this).css("color", "#7b7b7b")
    checkColor = true;
  }
})

// click btn-home xs-sm-md
$(".btn-home").click(function (e) {
  e.preventDefault()
  $(".review-menu-icon").css("animation", "moveLeftToRight100 1s forwards");
  $(".show-review-menu-icon ").show();
})

//close review menu btn-home
$(".btn-close").click(function () {
  $(".review-menu-icon").css("animation", "moveLeftToRight100_back 1s forwards");
  setTimeout(
    function () {
      $(".show-review-menu-icon").hide();
    }, 1000);
})

// click btn-cart to show shopping cart
$(".btn-cart").click(function (e) {
  e.preventDefault()
  $(".shopping-cart-content ").css("animation", "moveRightToLeft100 1s forwards");
  $('.bg-black-cart').css({'opacity':'0.9','transition':'all 1s'});
  $(".show-shopping-cart").show();
})

//click btn-close-cart to close shopping cart
$(".btn-close-cart").click(function () {
  $(".shopping-cart-content").css("animation", "moveRightToLeft100_back 1s forwards");
  $('.bg-black-cart').css({'opacity':'0','transition':'all 1s'});
  setTimeout(
    function () {
      $(".show-shopping-cart").hide();
    }, 1000);
})

//click outside
$(document).click(function (event) {
  var $target = $(event.target);
  //click outside to close review menu btn-home
  if ($target.closest('.menu-icon-content').length === 0 && $target.closest('.show-review-menu-icon').length !== 0 &&
    $('.show-review-menu-icon').is(":visible")) {
    $(".review-menu-icon").css("animation", "moveLeftToRight100_back 1s forwards");
    setTimeout(
      function () {
        $(".show-review-menu-icon").hide();
      }, 1000);
  }

  //click outside to close search result
  if($target.closest('.form-input-search').length === 0  && $target.closest('.search-result').length === 0 && 
  $('.search-result').is(":visible")){
    $('.search-result').hide()
  }

  //click outside to close shopping cart
  if ($target.closest('.btn-cart').length === 0 && $target.closest('.bg-black-cart').length !== 0 &&
    $('.show-shopping-cart').is(":visible")) {
      $(".shopping-cart-content").css("animation", "moveRightToLeft100_back 1s forwards");
      $('.bg-black-cart').css({'opacity':'0','transition':'all 1s'});
      setTimeout(
        function () {
          $(".show-shopping-cart").hide();
        }, 1000);
  }
});

$(".dropdown-category-list li").click(function () {
  $(".category-text").text($(this).text());
  $(".dropdown-category").hide();
  $(".category a").css("color", "#7b7b7b")
  checkColor = true
})


$(document).ready(function () {
  //slider
  $(".owl-carousel#slider1").owlCarousel({
    items: 1,
    autoplay: true,
    loop: true,
    mouseDrag: false,
    autoplayTimeout: 10000,
  });
  $(".owl-carousel#slider-product").owlCarousel({
    items: 1,
  });

  $(".owl-carousel#slider2").owlCarousel({
    dots: false,
    nav: true,
    navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      769: {
        items: 3
      }
    }
  });

  //hide all tabs
  $(".tab-categories-item").hide();
  //display first tab
  $(".tab-categories-item:first-child").fadeIn();

  //click 
  $(".nav-tabs-categories a").click(function () {
    $(".nav-tabs-categories a").removeClass("active");
    $(this).addClass("active");
    //get id tab
    const id_categories = $(this).attr('href');
    $(".tab-categories-item").hide();
    $(id_categories).fadeIn();
    return false;
  })

  $(".tab-hotsale-item").hide();
  $(".tab-hotsale-item:first-child").fadeIn();
  $(".nav-tabs-hotsale a").click(function () {
    $(".nav-tabs-hotsale a").removeClass("active-2");
    $(this).addClass("active-2");
    //get id tab
    const id_tab = $(this).attr('href');
    $(".tab-hotsale-item").hide();
    $(id_tab).fadeIn();
    //Show product discount percentage
    const percent = id_tab.split("_")[1].concat("%");
    $(".percent-sale").text(percent);
    return false;
  })

  $(".tab-products-item").hide();
  $(".tab-products-item:first-child").fadeIn();
  $(".nav-tabs-products a").click(function () {
    $(".nav-tabs-products a").removeClass("active-3");
    $(this).addClass("active-3");
    //get id tab
    const id_tab = $(this).attr('href');
    $(".tab-products-item").hide();
    $(id_tab).fadeIn();
    return false;
  })

  //back to top 
  $('#backtop').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 2000);
  })

  //search name product
  
  $('.input-search').keyup(function () {
    const valueSearch = $('.input-search input').val();
    const categogySearch = $(".category-text").text();
    if (valueSearch) {
      if (categogySearch.includes('All Categories')) {
        const tmp = products.filter((val) => {
          return val.productName.toUpperCase().includes(valueSearch.toUpperCase())
        })
        listSearch.splice(0,listSearch.length)
        listSearch.push(...tmp)
      } else {
        const tmp = products.filter((val) => {
          return val.categories.includes(categogySearch)
        }).filter((val1) => {
          return val1.productName.toUpperCase().includes(valueSearch.toUpperCase())
        })
        listSearch.splice(0,listSearch.length)
        listSearch.push(...tmp)
      }
      if (listSearch.length === 0) {
        $('.search-result').hide()
        $('.no-result').show()
      } else {
        $('.no-result').hide()
        $('.search-result').show()
        $('.list-products-search').html(renderProductSearch(listSearch,valueSearch).slice(0,6))
        localStorage.setItem("listSearch", JSON.stringify(listSearch))
        localStorage.setItem("keySearch", valueSearch)
      }
    }
    else {
      $('.search-result').hide()
      $('.no-result').hide()
    }
  })
})


//get data from local storage
const listSearchLocalStorage = localStorage.getItem("listSearch")
//convert data to array
const listSearch = listSearchLocalStorage ? JSON.parse(listSearchLocalStorage) : []
$('.form-input-search').on("click",'.btn-search', function(e){
  e.preventDefault()
  const valueSearch = $('.input-search input').val();
  const categogySearch = $(".category-text").text();
  if (valueSearch) {
    if (categogySearch.includes('All Categories')) {
      const tmp = products.filter((val) => {
        return val.productName.toUpperCase().includes(valueSearch.toUpperCase())
      })
      listSearch.splice(0,listSearch.length)
      listSearch.push(...tmp)
    } else {
      const tmp = products.filter((val) => {
        return val.categories.includes(categogySearch)
      }).filter((val1) => {
        return val1.productName.toUpperCase().includes(valueSearch.toUpperCase())
      })
      listSearch.splice(0,listSearch.length)
      listSearch.push(...tmp)
    }
  }else {
    if (categogySearch.includes('All Categories')) {
      listSearch.splice(0,listSearch.length)
      listSearch.push(...products)
    } else {
      const tmp = products.filter((val) => {
        return val.categories.includes(categogySearch)
      })
      listSearch.splice(0,listSearch.length)
  
      listSearch.push(...tmp)
    }
  }
  if (listSearch.length === 0) {
    $('.search-result').hide()
    $('.no-result').show()
  } else {
    $('.no-result').hide()
    $('.search-result').show()
    $('.list-products-search').html(renderProductSearch(listSearch,valueSearch).slice(0,6))
  }
  localStorage.setItem("listSearch", JSON.stringify(listSearch))
  localStorage.setItem("keySearch", valueSearch)
})


function renderProductSearch(arr = [],keySearch) {
  let rs = [];
  const regex = new RegExp(keySearch, 'gi')
  arr.map((val) => {
    let name = val.productName.replace(regex,(match)=> {
      return `<span style="color: red">${match}</span>`
    })
    rs.push(`
          <li class="product-item flex col-xs-6 col-sm-6">
                  <a id="${val.id}" class="product-item__left btn-product" href="./product/">
                  <img width="65" height="65" src="${val.image}" alt="" />
                </a>
                <div class="product-item__right pd-left-right-20">
                  <a id="${val.id}" class="name-product btn-product" href="./product/">${name}</a>
                  <span class="old-price">${val.price}</span>
                  <span class="new-price">${val.discountPrice}</span>
                </div></li>`)

    
  })
  return rs
}


function renderProductsTopCategories(category = '') {
  let items = "";
  products.filter((val) =>
    val.categories.includes(category)
  ).map((val) => {
    items += `
    <div class="tab-item-content flex pd-left-right-10 col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
    <a id="${val.id}" class="btn-product" href="./product/">
      <img width="125" height="125" src="${val.image}" alt="" />
    </a>
    <div class="tab-item-right pd-left-right-10">
      <div class="rated-heart flex-center-between mg-bottom-10">
        <div id="rated-${val.id}" class="star-rated">
        ${renderRated(val.rate)}
        </div>
        <a id="${val.id}" class="heart-product btn-wishlist" href=""><i class="fa-regular fa-heart"></i></a>
        </div>
      <a id="${val.id}" class="name-product btn-product" href="./product/">${val.productName}</a>
      <span class="price"> ${val.price} </span>
      <span class="discount-price"> ${val.discountPrice} </span>
    </div> 
  </div>`;

  });
  return items;
}

//show product reviews by star rating
function renderRated(rated) {
  let tmp = "";
  if (rated === 0) return '';
  else {
    if (Number.isInteger(rated)) {
      if (rated === 5) {
        for (let i = 0; i < 5; i++) {
          tmp += `<i class="fa-solid fa-star"></i>`;
        }
      }
      else {
        for (let i = 0; i < rated; i++) {
          tmp += `<i class="fa-solid fa-star"></i>`;
        }
        for (let i = 0; i < 5 - rated; i++) {
          tmp += `<i class="fa-regular fa-star"></i>`;
        }
      }
    }
    else {
      for (let i = 0; i < Math.floor(rated); i++) {
        tmp += `<i class="fa-solid fa-star"></i>`;
      }
      tmp += `<i class="fa-regular fa-star-half-stroke"></i>`
      for (let i = 0; i < 5 - Math.ceil(rated); i++) {
        tmp += `<i class="fa-regular fa-star"></i>`;
      }
    }
  }
  return tmp
}

function renderProductsHotSale(arr1 = []) {
  let rs = '';
  arr1.map((val) => {
    rs += `
        <div class="tab-item-content col-lg-4 col-md-6 col-sm-12 col-xs-12">
        <a id="${val.id}" class="btn-product" href="./product/">
          <img class="pd-10" width="100%" height="100%" src="${val.image}" alt="" />
        </a>
        <div class="sale-lable a-center">
          <span class="percent-sale">15%</span>
          <p>Offer</p>
        </div>
        <a id="${val.id}" class="name-product btn-product" href="./product/">${val.productName}</a>
        <div class="price-product flex-center-center">
          <span class="price"> ${val.price} </span>
          <span class="discount-price pd-left-10"> ${val.discountPrice}</span>
        </div>
        <div id="quantity-${val.id}"  class="quatity-product flex-center-between mg-bottom-10">
          <span>Already Sold: ${val.soldPd}</span>
          <span>Available: ${val.available}</span>
        </div>
        <div id="bar-${val.id}" class="bar">
          <div class="bar-none"><div class="bar-yellow"></div></div>
        </div>
        <hr id="hr-${val.id}">
        <p>Hurry up! <span>Offers ends in:</span> </p>
        <div class="timer flex-wrap">
        <div class="time-item" id="days-${val.id}" ></div>
        <div class="time-item" id="hours-${val.id}"></div>
        <div class="time-item" id="minutes-${val.id}"></div>
        <div class="time-item" id="seconds-${val.id}"></div>
        </div>
      </div>`;
    //set time countdown
    setInterval(function () {
      makeTimer(val.timeSale, "#days-" + val.id, "#hours-" + val.id, "#minutes-" + val.id, "#seconds-" + val.id);
    }, 1000);
  });
  return rs;
}

//show number of sold products by bar
function renderBar(arr3 = []) {
  arr3.map((val) => {

    const id_quantity = "#quantity-" + val.id;
    const id_bar = "#bar-" + val.id;
    const if_hr = "#hr-" + val.id;
    //hide bar if number of sold products and number of avaiable products are zero
    if (val.soldPd === 0 && val.available === 0) {
      $(id_quantity).hide();
      $(id_bar).hide();
      $(if_hr).hide();
    }
    //number of sold products is zero
    else if (val.soldPd === 0) {
      $(id_bar).siblings(".bar-yellow").css("width", "0%");
    }
    //calculate the percentage of sold products 
    else {
      const width = String(Math.ceil((val.soldPd / (val.soldPd + val.available)) * 100)).concat("%");
      $(id_bar).find(".bar-yellow").css("width", width);
    }
  })
}

function renderProducts(arr4 = []) {
  let rs = '';
  arr4.map((val) => {
    rs += `
    <div class="product-item col-lg-3 col-md-4 col-sm-6 col-xs-12">
      <a id="${val.id}" class="pd-left-right-20 btn-product" href="./product/">
        <img width="120" height="120" src="${val.image}" alt="" />
      </a>
      <a id="${val.id}" class="name-product btn-product" href="./product/">${val.productName}</a>
      <div class="price">
      <span class="old-price"> ${val.price}</span>
      <span class="new-price pd-left-10"> ${val.discountPrice}</span>
      </div>
    </div> 
    `
  })
  return rs;
}

function renderGadget() {
  let rs = '';
  arrGadget.map((val) => {
    rs += `
    <div class="gadget-item mg-bottom-30 col-md-6 col-sm-12 col-xs-12">
      <div class="gadget-item__content flex">
                <a id="${val.id}" href="./product/" class="pd-10 btn-product">
                  <img width="100%" height="100%" src="${val.image}" alt="" />
                </a>
                <div class="item-right">
                  <div class="rated-heart flex-center-between mg-bottom-10">
                    <div id="rated-${val.id}" class="star-rated">
                    ${renderRated(val.rate)}
                    </div>
                    <a id="${val.id}" class="heart-product btn-wishlist" href=""><i class="fa-regular fa-heart"></i></a>
                    </div>
                  <a id="${val.id}" class="name-product btn-product" href="./product/">${val.productName}</a>
                  <span class="price">${val.price}</span>
                  <span class="discount-price">${val.discountPrice}</span>
                  <a id="${val.id}" class="btn-add" href="#">Add to cart</a>
                </div> 
        </div>
      </div>`
  })
  return rs;
}


function renderSliderProducts(arr = []) {
  let rs = ''
  for (let i = 0; i < arr.length; i += 3) {
    const subArr = arr.slice(i, i + 3);
    const htmlSub = subArr
      .map((val) => {
        return `
      <div class="product-item flex col-sm-12 col-xs-12">
        <a id="${val.id}" class="product-item__left btn-product" href="./product/">
          <img width="100%" height="100%" src="${val.image}" alt="" />
        </a>
        <div class="product-item__right pd-left-right-20">
          <a id="${val.id}"  class="name-product btn-product" href="./product/">${val.productName}</a>
          <span class="old-price"> ${val.price}</span>
          <span class="new-price"> ${val.discountPrice}</span>
        </div>
      </div> `;
      })
      .join("");

    rs += `<div class="slider-item">
      ${htmlSub}
    </div>`;

  }
  return rs
}

//code countdown 
function makeTimer($time, $id1, $id2, $id3, $id4) {
  let endTime = new Date($time);
  endTime = (Date.parse(endTime) / 1000);

  let now = new Date();
  now = (Date.parse(now) / 1000);

  let timeLeft = endTime - now;

  let days = Math.floor(timeLeft / 86400);
  let hours = Math.floor((timeLeft - (days * 86400)) / 3600);
  let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
  let seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

  if (hours < "10") { hours = "0" + hours; }
  if (minutes < "10") { minutes = "0" + minutes; }
  if (seconds < "10") { seconds = "0" + seconds; }

  // return [ days + "<span>Days</span>",hours + "<span>Hours</span>",minutes + "<span>Minutes</span>",seconds + "<span>Seconds</span>"];
  $($id1).html(days + "<span>Days</span>");
  $($id2).html(hours + "<span>Hours</span>");
  $($id3).html(minutes + "<span>Minutes</span>");
  $($id4).html(seconds + "<span>Seconds</span>");

}

//format currency
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

//load list products to shopping cart icon
function loadListProductsCart(arr = []){
  let rs =''
  arr.map((val)=> {
      rs += `
      <li class="product-item flex pd-10 ">
      <a id="${val.id}" class="product-item__left pd-10 btn-product" href="./product/">
      <img  width="65" height="60" src="${val.image}" alt="" />
    </a>
    <div class="product-item__right">
      <div class="product-infor pd-10">
        <a id="${val.id}" class="name-product btn-product" href="./product/">${val.productName}</a>
      <span class="quantity-product">${val.quantity}</span>
      <span>x</span>
      <span class="price">${val.discountPrice}</span>
      </div>
      <div class="remove-product">
        <button id="${val.id}" class="btn-remove"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
  </li>`
    })
  $('.list-products-cart').html(rs)
}

//get data from local storage
const WishListLocalStorage = localStorage.getItem("wishList")
//convert data to array
const wishList = WishListLocalStorage ? JSON.parse(WishListLocalStorage) : []

const num = wishList.reduce((acc)=> {
  return acc + 1
},0)
$('.wishlist-num').text(num)

$('.btn-wishlist-icon').click( function(e){
  check_clickWishList = false
})

let check_clickWishList = false
localStorage.setItem("check_WishList",check_clickWishList)
//add product to wish list
$('.btn-wishlist').click( function(e){
   //get id to push product into array
   if($(this).attr('href') === ""){
    e.preventDefault()
    check_clickWishList = true
   const id_product = +$(this).attr('id')
   const product = products.find((val) => val.id === id_product)
   const idx = wishList.findIndex((val) => val.id === product.id);
   if(idx === -1) {
    $(this).html(`<i class="fa-solid fa-heart"></i>`)
    $('.show-success p').text(`Product has been successfully added to wishlist`)
    $('.show-success').show()
    setTimeout(function(){
      $('.show-success').hide()
    },2500)
    wishList.push({...product})
    $(this).attr("href","/marketo/wishlist/")
      //update quantity of wishlist
    const num = +$('.wishlist-num').text()
    $('.wishlist-num').text(num + 1)
      //save data to local storage
    localStorage.setItem("wishList",JSON.stringify(wishList))
    }
    else {
      $(this).html(`<i class="fa-solid fa-heart"></i>`)
      $('.noted-suscces').css("background-color","#007bff")
      $('.show-success p').text(`The product is already in your wishlist!`)
      $('.show-success').show()
      setTimeout(function(){
        $('.show-success').hide()
      },2500)
      $(this).attr("href","/marketo/wishlist/")
    }
    localStorage.setItem("check_WishList",check_clickWishList)
  }
})


//get data from local storage
const listCartLocalStorage = localStorage.getItem("listCart")
//convert data to array
const listCart = listCartLocalStorage ? JSON.parse(listCartLocalStorage) : []
//check quantity of array
if(listCart.length === 0){
  $('.list-products-cart').html(`<li><p>No products in the cart.</p><li>`)
  $('.cart-footer').hide()
}
else {
  const num = listCart.reduce((acc,val)=> {
    return acc + val.quantity
  },0)
  const subTotal = listCart.reduce((acc,val)=> {
    return acc + val.quantity*(+val.discountPrice.slice(1))
  },0)
  $('.cart-num').text(num)
  loadListProductsCart(listCart)
  $('.cart-footer').show()
  $('.total-price').text(formatter.format(subTotal))
}

//add product to cart
$('.btn-add').click( function(e){
  e.preventDefault()
  $('.show-success p').text(`Product Added Successfully`)
  $('.show-success').show()
  setTimeout(function(){
    $('.show-success').hide()
  },2500)
  if(listCart.length === 0){
    $('.cart-footer').show()
  }
  //update quantity of cart
  const num = +$('.cart-num').text()
  $('.cart-num').text(num + 1)
  //get id to push product into array
  const id_product = +$(this).attr('id')
  const product = products.find((val) => val.id === id_product)
  const idx = listCart.findIndex((val) => val.id === product.id);

    if(idx === -1) {
      listCart.push({...product, "quantity": 1})
      const subTotal = +$('.total-price').text().slice(1).split(',').join('') + +product.discountPrice.slice(1)
      $('.total-price').text(formatter.format(subTotal))
    }
    else {
      listCart[idx].quantity += 1
      const subTotal = +$('.total-price').text().slice(1).split(',').join('') + +product.discountPrice.slice(1)
      $('.total-price').text(formatter.format(subTotal))
    }
  //Show products added
  loadListProductsCart(listCart)
  //save data to local storage
  localStorage.setItem("listCart",JSON.stringify(listCart))

})
$(document).ready(function(){
  $('.list-products-cart').on("click",'.btn-remove',function(){
    const id_product = +$(this).attr('id')
    const product = listCart.find((val) => val.id === id_product)
    const idx = listCart.findIndex((val) => val.id === id_product);
    const num = +$('.cart-num').text()
    $('.cart-num').text(num - +product.quantity)
    const subTotal = +$('.total-price').text().slice(1).split(',').join('') - (+product.discountPrice.slice(1))*product.quantity
    $('.total-price').text(formatter.format(subTotal))
    listCart.splice(idx,1)
    if(listCart.length === 0){
      $('.list-products-cart').html(`<li><p>No products in the cart.</p><li>`)
      $('.total-money').hide()
      $('.viewcart-checkout').hide()

    }
    else {
      loadListProductsCart(listCart)
    }
    localStorage.setItem("listCart",JSON.stringify(listCart))
    })

  //get data from local storage
  const productLocalStorage = localStorage.getItem("product")
  //convert data to array
  const reviewProduct = productLocalStorage ? JSON.parse(productLocalStorage) : {}
  // click image and name product to show review product 
  $(document).on("click",'.btn-product',function(){
    const id_product = +$(this).attr('id')
    const reviewProduct = products.find((val) => val.id === id_product)
    //save data to local storage
    localStorage.setItem("product",JSON.stringify(reviewProduct))
  })
})

