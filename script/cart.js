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
      $('.list-products-search').html(renderProductSearch(listSearch, valueSearch).slice(0,6))
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

//load list products to shopping cart on table
function loadListCart(arr = []) {
  let rs = ''
  arr.map((val) => {
    const total = val.quantity * (+val.discountPrice.slice(1))
    rs += `
        <tr class="cart-product-item">
                            <th style="width: 17.5%;" class="product-img">
                                <a id="${val.id}" class="btn-product" href="/marketo/product/"><img width="100" height="100" src="${val.image}" alt=""></a>
                            </th>
                            <th style="width: 24.5%;" class="product-name"><a id="${val.id}" class="btn-product" href="/marketo/product/">${val.productName}</a></th>
                            <th style="width: 11.5%;" class="product-price">${val.discountPrice}</th>
                            <th style="width: 25%;" class="product-quantity">
                                <div class="quantity">
                                    <input type="button" value="-" class="btn-decre" id="#input-${val.id}">
                                    <input type="number" value="${val.quantity}" id="input-${val.id}">
                                    <input type="button" value="+" class="btn-incre" id="#input-${val.id}">
                                </div>
                            </th>
                            <th style="width: 13%;" class="product-subtotal">${formatter.format(total)}</th>
                            <th style="width: 8%;"class="product-remove">
                                <button id="${val.id}" class="btn-remove"><i class="fa-solid fa-xmark"></i></button>
                            </th>
                        </tr>`
  })
  rs += `
      <tr class="table-footer">
                          <td colspan="6">
                            <div class="coupon">
                              <input type="text" placeholder="Coupon code">
                              <button>Apply coupon</button>
                            </div>
                            <button class="btn-update">Update Cart</button>
                          </td>
                        </tr>`
  $('.list-cart').html(rs)
}

//get data from local storage
const WishListLocalStorage = localStorage.getItem("wishList")
//convert data to array
const wishList = WishListLocalStorage ? JSON.parse(WishListLocalStorage) : []

const num = wishList.reduce((acc)=> {
  return acc + 1
},0)
$('.wishlist-num').text(num)

//get data from local storage
const listCartLocalStorage = localStorage.getItem("listCart")
//convert data to array
const listCart = listCartLocalStorage ? JSON.parse(listCartLocalStorage) : []
if (listCart.length === 0) {
  $('.list-products-cart').html(`<li><p>No products in the cart.</p><li>`)
  $('.cart-footer').hide()

  $(".element-noproduct").show()
}
else {
  $('.element-table-cart').show()
  $('.element-cart-totals').show()
  const num = listCart.reduce((acc, val) => {
    return acc + val.quantity
  }, 0)
  const subTotal = listCart.reduce((acc, val) => {
    return acc + val.quantity * (+val.discountPrice.slice(1))
  }, 0)
  $('.cart-num').text(num)
  loadListProductsCart(listCart)
  loadListCart(listCart)
  $('.cart-footer').show()
  $('.total-price').text(formatter.format(subTotal))
  $('.subtotal').text(formatter.format(subTotal))
  $('.total').text(formatter.format(subTotal))
}

$(document).ready(function (e) {
  //increase quantity
  $(".list-cart").on("click", '.btn-incre', function () {
    const id = $(this).attr('id')
    const num = +$(id).val() + 1
    $(id).val(num)
  })
  //decrease quantity
  $(".list-cart").on("click", '.btn-decre', function () {
    const id = $(this).attr('id')
    if (+$(id).val() === 1) return
    const num = +$(id).val() - 1
    $(id).val(num)
  })

  //click remove product on table
  let removeProduct 
  $(".list-cart").on("click", '.btn-remove', function () {
    const id_product = +$(this).attr('id')
    removeProduct = listCart.find((val) => val.id === id_product)
    const idx = listCart.findIndex((val) => val.id === id_product);
    $('.wait-update').show()
    setTimeout(
      function(){
      $('.element-update-cart').hide()
      $('.wait-update').hide()
      $('.element-remove-undo').show()
      const name = removeProduct.productName
      $('.name-removed').text(name)
      const num = +$('.cart-num').text()
      $('.cart-num').text(num - +removeProduct.quantity)
      const subTotal = +$('.subtotal').text().slice(1).split(',').join('') - (+removeProduct.discountPrice.slice(1)) * removeProduct.quantity
      $('.total-price').text(formatter.format(subTotal))
      $('.subtotal').text(formatter.format(subTotal))
      $('.total').text(formatter.format(subTotal))
      listCart.splice(idx, 1)
      if (listCart.length === 0) {
        $('.list-products-cart').html(`<li><p>No products in the cart.</p><li>`)
        $('.cart-footer').hide()

        $('.element-table-cart').hide()
        $('.element-cart-totals').hide()
        $(".element-noproduct").show()         
      }
      else {
        loadListCart(listCart)
        loadListProductsCart(listCart)
      }

      localStorage.setItem("listCart", JSON.stringify(listCart))
    }, 2000)
  })

  $('.btn-undo').on("click", function(e){
    e.preventDefault()
    $('.wait-update').show()
    setTimeout(
      function(){
        $('.wait-update').hide()
        $(".element-noproduct").hide() 
        $('.element-remove-undo').hide()
        $('.element-table-cart').show()
        $('.element-cart-totals').show()
        const num = +$('.cart-num').text()
        $('.cart-num').text(num + +removeProduct.quantity)
        const subTotal = +$('.subtotal').text().slice(1).split(',').join('') + (+removeProduct.discountPrice.slice(1)) * removeProduct.quantity
        $('.total-price').text(formatter.format(subTotal))
        $('.subtotal').text(formatter.format(subTotal))
        $('.total').text(formatter.format(subTotal))
        listCart.push(removeProduct)
        //product.splice(0,product.length)
        loadListCart(listCart)
        loadListProductsCart(listCart)
        localStorage.setItem("listCart", JSON.stringify(listCart))
      }, 2000
    )
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
      loadListCart(listCart)
      loadListProductsCart(listCart)
    }
    //save data
    localStorage.setItem("listCart", JSON.stringify(listCart))
  })

  //click update to change quantity products
  $('.list-cart').on("click", '.btn-update', function () {
    $('.wait-update').show()
    $('.element-remove-undo').hide()
    setTimeout(
      function () {
        $('.element-update-cart').show()
        $('.wait-update').hide()
        const tmpProducts = []
        listCart.map((val) => {
          const quantity = +$('#input-' + val.id).val()
          if (quantity < 0 || quantity === 0) {
            alert(`Value must be greater than 0`)
            return ''
          }
          else {
            tmpProducts.push({ ...val, "quantity": quantity })
          }
          return tmpProducts
        })
        listCart.splice(0,listCart.length)
        listCart.push(...tmpProducts)
        if (listCart.length !== 0) {
          const num = listCart.reduce((acc, val) => {
            return acc + val.quantity
          }, 0)
          $('.cart-num').text(num)
          const subTotal = listCart.reduce((acc, val) => {
            const tmpTotal = (+val.discountPrice.slice(1).split(',').join('')) * val.quantity
            return acc + tmpTotal
          }, 0)
          $('.total-price').text(formatter.format(subTotal))
          $('.subtotal').text(formatter.format(subTotal))
          $('.total').text(formatter.format(subTotal))
          loadListCart(listCart)
          loadListProductsCart(listCart)
          localStorage.setItem("listCart", JSON.stringify(listCart))
        }
      }, 2000)
  })

  //get data from local storage
  const productLocalStorage = localStorage.getItem("product")
  //convert data to array
  const reviewProduct = productLocalStorage ? JSON.parse(productLocalStorage) : {}
  // click image and name product to show review product 
  $(document).on("click", '.btn-product', function () {
    const id_product = +$(this).attr('id')
    const reviewProduct = products.find((val) => val.id === id_product)
    //save data to local storage
    localStorage.setItem("product", JSON.stringify(reviewProduct))
  })
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

