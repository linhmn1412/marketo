import { products } from './arrayProduct.js';

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

// $('.product-search-item').hover(function(){
//     console.log("hjhj")
//     $('.product-meta').css("animation", "moveUp_meta 1s forwards");
//     $(this).siblings('.product-meta').show()
// })

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

$(".dropdown-category-list li").click(function () {
    $(".category-text").text($(this).text());
    $(".dropdown-category").hide();
    $(".category a").css("color", "#7b7b7b")
    checkColor = true
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

  const keySearchLocalStorage = localStorage.getItem("keySearch")
  const keySearch = keySearchLocalStorage ? keySearchLocalStorage: ''

  $('.key-search').text(keySearch)
  loadListProductSearch(listSearch)

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
      if (listSearch.length === 0) {
        $('.search-result').hide()
        $('.no-result').show()
      } else {
        $('.no-result').hide()
        $('.search-result').show()
        $('.list-products-search').html(renderProductSearch(listSearch,valueSearch).slice(0,6))
        localStorage.setItem("listSearch", JSON.stringify(listSearch))
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
    $('.no-result').hide()
    $('.search-result').show()
    $('.list-products-search').html(renderProductSearch(listSearch,valueSearch).slice(0,6))
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
                    <a id="${val.id}" class="product-item__left btn-product" href="/marketo/product/">
                    <img width="65" height="65" src="${val.image}" alt="" />
                  </a>
                  <div class="product-item__right pd-left-right-20">
                    <a id="${val.id}" class="name-product btn-product" href="/marketo/product/">${name}</a>
                    <span class="old-price">${val.price}</span>
                    <span class="new-price">${val.discountPrice}</span>
                  </div></li>`)
  
      
    })
    return rs
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
        <a id="${val.id}" class="product-item__left pd-10 btn-product" href="/marketo/product/">
        <img  width="65" height="60" src="${val.image}" alt="" />
      </a>
      <div class="product-item__right">
        <div class="product-infor pd-10">
          <a id="${val.id}" class="name-product btn-product" href="/marketo/product/">${val.productName}</a>
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


let check_clickWishList = false
localStorage.setItem("check_WishList",check_clickWishList)


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
      $('.cart-footer').hide()
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

  //add product to wish list
  $('.list-product-search').on("click",'.btn-wishlist',function(e){
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

 //add product to cart
 $('.list-product-search').on("click",'.btn-add',function(e){
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
})

function loadListProductSearch (arr = []){
    let rs = ''
    arr.map((val) => {
        rs +=

                    `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="product-search-item pd-10">
                    <div class="product-search-content ">
                        <a id="${val.id}" href="/marketo/product/" class="product-img btn-product"><img width="180" height="180" src="${val.image}" alt=""></a>
                        <div class="product-meta">
                            <ul class="list-meta flex-center-center ">
                                <li><a id="${val.id}" class="btn-add" href=""><i class="fa-solid fa-cart-shopping"></i></a></li>
                                <li><a id="${val.id}" class="btn-product" href="/marketo/product/"><i class="fa-solid fa-eye"></i></a></li>
                                <li><a id="${val.id}" class="btn-wishlist" href=""><i class="fa-regular fa-heart"></i></a></li>
                                <li><a href="#"><i class="fa-solid fa-repeat"></i></a></li>
                            </ul>
                        </div>
                        <div class="product-info">
                          <a id="${val.id}" href="/marketo/product/" class="product-name btn-product">${val.productName}</a>
                          <div class="product-price">
                            <span class="old-price">${val.price}</span>
                            <span class="new-price">${val.discountPrice}</span>
                          </div>
                        </div>
                    </div>
                    <div class="product-describe">
                        <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. </p>
                    </div>
                    </div>
                </div>`
    })

    $('.list-product-search').html(rs)
}