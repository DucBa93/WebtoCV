var goodsAPI = 'http://localhost:3000/goods'
function start() {

    getGoods(renderGoods)
    handleCreateGoods()
}

start()

function getGoods(callback) {
    fetch(goodsAPI)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}

function renderGoods(elements) {
    const listElementBlock = document.querySelector('.list-goods')
    var htmls = elements.map((item, index) => {
        return `
        <div class="item-search listItem-${item.id}">
        <div class="item-top">
            <i class="fa-regular fa-star"></i>
            <p class="maHH">${item.maPro}</p>
            <p class="name">${item.name}</p>
            <p class="type">${item.type}</p>
            <p class="sale">${item.sale}</p>
            <p class="cost">${item.cost}</p>
            <p class="remain">${item.remaining}</p>
        </div>
        <div class="item-spec">
            <h4>Thong tin</h4>
            <h2 class="name">${item.name}</h2>
            <div class="item-flex">
                <i style="color: green;" class="fa-solid fa-check"></i><span>Bán trực tiếp</span>
                <i style="color: red;" class="fa-solid fa-xmark"></i><span>Không tích điểm</span>
                <i style="color: red;" class="fa-solid fa-xmark"></i><span>Không là món thêm (Extra
                    topping)</span>
            </div>
            <div class="item-spec-bot">
                <div class="item-left">
                    <img class="img${item.id}" src="${item.image}" alt="">
                </div>
                <div class="item-right">
                    <div class="item-ma">
                        <span>Mã hàng hoá:</span>
                        <span class="bold ma-item-${item.id}">${item.maPro}</span>
                        <input type="text" name="" class="maEle${item.id} hide showInput${item.id}" id="">

                    </div>
                    <div class="item-name">
                        <span>Tên nguyên liệu:</span>
                        <span class="bold name-item-${item.id}">${item.name}</span>
                        <input type="text" name="" class="nameEle${item.id} hide showInput${item.id}" id="">

                    </div>
                    <div class="item-type">
                        <span>Loại thực đơn:</span>
                        <span class="bold type-item-${item.id}">${item.type}</span>
                        <input type="text" name="" class="typeEle${item.id} hide showInput${item.id}" id="">

                    </div>

                    <div class="item-typeGoods">
                        <span>Loại hàng:</span>
                        <span class="bold typeGoods-item-${item.id}">${item.typeGoods}</span>
                        <input type="text" name="" class="typeGoodsEle${item.id} hide showInput${item.id}" id="">

                    </div>

                    <div class="item-cost">
                        <span>Giá bán:</span>
                        <span class="bold cost-item-${item.id}">${item.sale}</span>
                        <input type="text" name="" class="costEle${item.id} hide showInput${item.id}" id="">

                    </div>
                    <div class="item-sale">
                        <span>Giá vốn:</span>
                        <span class="bold sale-item-${item.id}">${item.cost}</span>
                        <input type="text" name="" class="saleEle${item.id} hide showInput${item.id}" id="">

                    </div>
                    <div class="item-remain">
                        <span>Tồn kho:</span>
                        <span class="bold remain-item-${item.id}">${item.remaining}</span>
                        <input type="text" name="" class="remainEle${item.id} hide showInput${item.id} " id="">

                    </div>
                    
                </div>
            </div>
            <div class="item-button-gr">
                <button onClick=update(${item.id}) class="update">Cập nhật</button>
                <button class="savePut">Save</button>
                <button onClick=deleteGoods('${item.id}')  class="deletePro">Xoá</button>
            </div>
        </div>
    </div>
        `

    })
    listElementBlock.innerHTML = htmls.join('')


}

function createGoods(data, callback) {
    var options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    fetch(goodsAPI, options)
        .then(function (res) {
            res.json()
        })
        .then(callback)
}
function deleteGoods(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    }

    fetch(goodsAPI + '/' + id, options)
        .then(function (res) {
            res.json()
        })
        .then(function () {
            var elementItem = document.querySelector('.listItem-' + id)
            if (elementItem) {
                elementItem.remove()
            }
        })
}

function updateDataGoods(data, id, callback) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(goodsAPI + '/' + `${id}`, options)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data);
        })
}

function handleCreateGoods(id) {
    $('.addElement').click(function () {
        var maSP = $('.maSP').val()
        if (maSP == "") {
            maSP = $(`.ma-item-${id}`).text()
        }
        var name = $('.nameSP').val()
        var image = $('.img').val().split("\\").pop()
        var type = $('.typeSP').val()
        var typeGoods = $('.typeGoodsSP').val()
        var sale = $('.saleSP').val()
        var cost = $('.costSP').val()
        var remain = $('.remainSP').val()
        var formData = {
            maPro: maSP,
            name: name,
            image: `./image/${image}`,
            type: type,
            typeGoods: typeGoods,
            cost: cost,
            sale: sale,
            remaining: remain,
        }
        createGoods(formData, id)
    })
}

function update(id) {
    $(`.showInput${id}`).show()
    $('.savePut').show()

    $('.savePut').click(function () {
        var checkma = $(`.ma-item-${id}`).text()
        var checkname = $(`.name-item-${id}`).text()
        var checktype = $(`.type-item-${id}`).text()
        var checktypeGoods = $(`.typeGoods-item-${id}`).text()
        var checksale = $(`.sale-item-${id}`).text()
        var checkcost = $(`.cost-item-${id}`).text()
        var checkremain = $(`.remain-item-${id}`).text()

        var maPro = document.querySelector(`.maEle${id}`).value
        var imgPro = $(`.img${id}`).attr('src')
        var namePro = document.querySelector(`.nameEle${id}`).value
        var typePro = document.querySelector(`.typeEle${id}`).value
        var typeGoodsPro = document.querySelector(`.typeGoodsEle${id}`).value
        var costPro = document.querySelector(`.costEle${id}`).value
        var salePro = document.querySelector(`.saleEle${id}`).value
        var remainPro = document.querySelector(`.remainEle${id}`).value
        if (namePro == "") {
            namePro = checkname
        }
        if (maPro == "") {
            maPro = checkma
        }
        if (typePro == "") {
            typePro = checktype
        }
        if (salePro == "") {
            salePro = checksale
        }
        if (costPro == "") {
            costPro = checkcost
        }
        if (remainPro == "") {
            remainPro = checkremain
        }
        if (typeGoodsPro == "") {
            typeGoodsPro = checktypeGoods
        }



        var data = {
            maPro: maPro,
            name: namePro,
            image: imgPro,
            type: typePro,
            typeGoods: typeGoodsPro,
            cost: costPro,
            sale: salePro,
            remaining: remainPro,

        }


        updateDataGoods(data, id)
        $('.savePut').hide()
        $(`.showInput${id}`).hide()

    })

}

$('.hideForm').click(function () {
    $('.addPro-form').removeClass('showForm')
})

$('.hideTrans').click(function () {
    $('.transpot-ele-form').removeClass('trans-active')
})


function changeCS() {
    $('.changeBrand').addClass('showBrand')
}

$('.notify').click(function () {
    $('.tb-show').addClass('tb-active')

    $('.tb-number').text($('.tb-show-num-1').text())
})

$('.tb-cancel').click(function () {
    $('.tb-show').removeClass('tb-active')
})

$('.confirm').click(function () {
    $('.tb-show').removeClass('tb-active')
})

function add() {
    $('.addPro-form').addClass('showForm')
}

$(document).ready(function () {
    $('.search-input-goods').keyup(function () {
        var value = $(this).val().toLowerCase();
        $(".list-goods .item-search ").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    })



});