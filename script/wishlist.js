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
  $('.bg-black-cart').css({ 'opacity': '0.9', 'transition': 'all 1s' });
  $(".show-shopping-cart").show();
})

//click btn-close-cart to close shopping cart
$(".btn-close-cart").click(function () {
  $(".shopping-cart-content").css("animation", "moveRightToLeft100_back 1s forwards");
  $('.bg-black-cart').css({ 'opacity': '0', 'transition': 'all 1s' });
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
  if ($target.closest('.form-input-search').length === 0 && $target.closest('.search-result').length === 0 &&
    $('.search-result').is(":visible")) {
    $('.search-result').hide()
  }

  //click outside to close shopping cart
  if ($target.closest('.btn-cart').length === 0 && $target.closest('.bg-black-cart').length !== 0 &&
    $('.show-shopping-cart').is(":visible")) {
    $(".shopping-cart-content").css("animation", "moveRightToLeft100_back 1s forwards");
    $('.bg-black-cart').css({ 'opacity': '0', 'transition': 'all 1s' });
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

//format currency
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

//get data from local storage
const listCartLocalStorage = localStorage.getItem("listCart")
//convert data to array
const listCart = listCartLocalStorage ? JSON.parse(listCartLocalStorage) : []
if (listCart.length === 0) {
  $('.list-products-cart').html(`<li><p>No products in the cart.</p><li>`)
  $('.cart-footer').hide()
}
else {
  $('.cart-footer').show()
  const num = listCart.reduce((acc, val) => {
    return acc + val.quantity
  }, 0)
  const subTotal = listCart.reduce((acc,val)=> {
    return acc + val.quantity*(+val.discountPrice.slice(1))
  },0)
  $('.cart-num').text(num)
  loadListProductsCart(listCart)
  $('.total-price').text(formatter.format(subTotal))
  $('.total-price').text(formatter.format(subTotal))
}

//load list products to shopping cart on table
function loadWishList(arr = []) {
  let rs = ''
  arr.map((val) => {
    rs += `
        <tr class="wishlist-product-item">
                            <th style="width: 19%;" class="product-img">
                                <a id="${val.id}" class="btn-product" href="/marketo/product/"><img width="100" height="100" src="${val.image}" alt=""></a>
                            </th>
                            <th style="width: 23%;" class="product-name"><a id="${val.id}" class="btn-product" href="/marketo/product/">${val.productName}</a></th>
                            <th style="width: 16.5%;" class="product-price">
                            <span class="old-price">${val.price}</span>
                                <span class="new-price">${val.discountPrice}</span>
                            </th>
                            <th style="width: 18%;" class="product-stock">
                                <span class="stock-status">In Stock</span>
                            </th>
                            <th style="width: 15%;" class="product-add"><a id="${val.id}" class="btn-add" href="#">Add to cart</th>
                            <th style="width: 8%;"class="product-remove">
                        <button id="${val.id}" class="btn-remove"><i class="fa-solid fa-xmark"></i></button>
                    </th>
                        </tr>`
                        
  })
  $('.list-wishlist').html(rs)
}

//get data from local storage
const WishListLocalStorage = localStorage.getItem("wishList")
//convert data to array
const wishList = WishListLocalStorage ? JSON.parse(WishListLocalStorage) : []

const checkWishListLocal = localStorage.getItem("check_WishList")
let checkWishList = checkWishListLocal 
console.log(checkWishList)

if(wishList.length === 0){
    $('.element-noproduct').show()
}else {
  $('.element-table-wishlist').show()
  loadWishList(wishList)
  if(checkWishList === 'true'){
    $('.element-product-already').show()
    checkWishList = false
    localStorage.setItem("check_WishList",checkWishList)
  }
  else{
    $('.element-product-already').hide()
  }
}
const num = wishList.reduce((acc)=> {
  return acc + 1
},0)
$('.wishlist-num').text(num)


$(document).ready(function (e) {

  //click remove product on table
  $(".list-wishlist").on("click", '.btn-remove', function () {
    const id_product = +$(this).attr('id')
    //const removeProduct = wishList.find((val) => val.id === id_product)
    const idx = wishList.findIndex((val) => val.id === id_product);
    $('.wait-update').show()
    setTimeout(
      function(){
      $('.wait-update').hide()
      $('.element-product-already').hide()
      $('.element-add-cart').hide()
      $('.element-remove-product').show()
      const num = +$('.wishlist-num').text()
      $('.wishlist-num').text(num - 1)
      wishList.splice(idx, 1)
      if (wishList.length === 0) {
        $('.element-table-wishlist').hide()
        $('.element-noproduct').show()      
      }
      else {
        loadWishList(wishList)
      }

      localStorage.setItem("wishList", JSON.stringify(wishList))
    }, 2000)

  })

//add product to cart
$(".list-wishlist").on("click", '.btn-add', function (e){
  e.preventDefault()
  $(".shopping-cart-content ").css("animation", "moveRightToLeft100 1s forwards");
  $('.bg-black-cart').css({'opacity':'0.9','transition':'all 1s'});
  $(".show-shopping-cart").show();
  $('.element-product-already').hide()
  $('.element-remove-product').hide()
  setTimeout(function(){
      $(".shopping-cart-content").css("animation", "moveRightToLeft100_back 1s forwards");
      $('.bg-black-cart').css({'opacity':'0','transition':'all 1s'});
      $('.element-add-cart').show()
      setTimeout(
        function () {
          $(".show-shopping-cart").hide();
        }, 1000);
  },2000)
  if(listCart.length === 0){
    $('.cart-footer').show()
  }
  //update quantity of cart
  const num_cart = +$('.cart-num').text()
  $('.cart-num').text(num_cart + 1)
  //get id to push product into array
  const id_product = +$(this).attr('id')
  const product = products.find((val) => val.id === id_product)
  const idx_cart = listCart.findIndex((val) => val.id === product.id);
  const idx_wishlist = wishList.findIndex((val) => val.id === id_product);
    if(idx_cart === -1) {
      listCart.push({...product, "quantity": 1})
      const subTotal = +$('.total-price').text().slice(1).split(',').join('') + +product.discountPrice.slice(1)
      $('.total-price').text(formatter.format(subTotal))
    }
    else {
      listCart[idx_cart].quantity += 1
      const subTotal = +$('.total-price').text().slice(1).split(',').join('') + +product.discountPrice.slice(1)
      $('.total-price').text(formatter.format(subTotal))
    }
  //Show products added
  loadListProductsCart(listCart)
  const num_wishlist = +$('.wishlist-num').text()
      $('.wishlist-num').text(num_wishlist - 1)
      wishList.splice(idx_wishlist, 1)
      if (wishList.length === 0) {
        $('.element-table-wishlist').hide()
        $('.element-noproduct').show()      
      }
      else {
        loadWishList(wishList)
      }

      localStorage.setItem("wishList", JSON.stringify(wishList))
  //save data to local storage
  localStorage.setItem("listCart",JSON.stringify(listCart))

})

  //click remove product on icon
  $('.list-products-cart').on("click", '.btn-remove', function () {
    //get id product
    const id_product = +$(this).attr('id')
    //get obj product
    const product = listCart.find((val) => val.id === id_product)
    //get location in array
    const idx = listCart.findIndex((val) => val.id === id_product);
    //set number icon shopping cart
    const num = +$('.cart-num').text()
    $('.cart-num').text(num - +product.quantity)
    //set total
    const subTotal = +$('.total-price').text().slice(1).split(',').join('') - (+product.discountPrice.slice(1).split(',').join('') ) * product.quantity
    $('.total-price').text(formatter.format(subTotal))
    $('.subtotal').text(formatter.format(subTotal))
    $('.total').text(formatter.format(subTotal))
    //remove
    listCart.splice(idx, 1)
    if (listCart.length === 0) {
      $('.list-products-cart').html(`<li><p>No products in the cart.</p><li>`)
      $('.cart-footer').hide()

      $('.element-table-cart').hide()
      $('.element-cart-totals').hide()
      $(".element-noproduct").show()
    }
    else {
      //render product
      loadListProductsCart(listCart)
    }
    //save data
    localStorage.setItem("listCart", JSON.stringify(listCart))
  })

  // click image and name product to show review product 
  $(document).on("click", '.btn-product', function () {
    const id_product = +$(this).attr('id')
    const reviewProduct = products.find((val) => val.id === id_product)
    //save data to local storage
    localStorage.setItem("product", JSON.stringify(reviewProduct))
  })
})

  //get data from local storage
  const nameWishlistLocalStorage = localStorage.getItem("nameWishlist")
  //convert data to array
  const nameWishlist = nameWishlistLocalStorage ? JSON.parse(nameWishlistLocalStorage) : ''
  if(nameWishlist === ''){
    $('.my-wishlist-title').text('My Wishlist')
    $('.input-name-wishlist').val('My Wishlist')
  }
  else{
    $('.my-wishlist-title').text(nameWishlist)
  $('.input-name-wishlist').val(nameWishlist)
  }

$('.btn-edit').click(function(e){
  e.preventDefault()
  $('.my-wishlist-form').show()
})

$('.btn-save').click(function(){
  $('.my-wishlist-title').show()
  const name = $('.input-name-wishlist').val()
  $('.my-wishlist-title').text(name)
  localStorage.setItem("nameWishlist", JSON.stringify(name))
})

$('.btn-del').click(function(){
  $('.input-name-wishlist').val("")
  $('.my-wishlist-form').hide()
  $('.my-wishlist-title').hide()
  localStorage.setItem("nameWishlist", JSON.stringify(""))
})
//load list products to shopping cart icon
function loadListProductsCart(arr = []) {
  let rs = ''
  arr.map((val) => {
    rs += `
      <li class="product-item flex pd-10 ">
      <a id="${val.id}" class="product-item__left pd-10 btn-product" href="/marketo/product/">
      <img width="65" height="60" src="${val.image}" alt="" />
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

