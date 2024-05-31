
var elementsAPI = 'http://localhost:3000/products'


function start() {
    getElements(renderElements)
    handleCreateEle()
}

start()

function getElements(callback) {
    fetch(elementsAPI)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}

function renderElements(elements) {
    const listElementBlock = document.querySelector('.list-elements')
    var htmls = elements.map((item, index) => {
        return `
        <div class="listItem-${item.id}">
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
                    <img src="${item.image}" alt="">
                </div>
                <div class="item-right">
                    <div class="item-ma">
                        <span>Mã hàng hoá:</span>
                        <span class="bold">${item.maPro}</span>
                    </div>
                    <div class="item-name">
                        <span>Tên nguyên liệu:</span>
                        <span class="bold">${item.name}</span>
                    </div>
                    <div class="item-type">
                        <span>Loại thực đơn:</span>
                        <span class="bold">${item.type}</span>
                    </div>
                    <div class="item-cost">
                        <span>Giá bán:</span>
                        <span class="bold">${item.sale}</span>
                    </div>
                    <div class="item-sale">
                        <span>Giá vốn:</span>
                        <span class="bold">${item.cost}</span>
                    </div>
                    <div class="item-remain">
                        <span>Tồn kho:</span>
                        <span class="bold">${item.remaining}</span>
                    </div>
                </div>
            </div>
            <div class="item-button-gr">
                <button class="update">Cập nhật</button>
                <button onClick=deleteEle(${item.id})  class="deletePro">Xoá</button>
                <button class="transpot">Chuyển nguyên liệu</button>
            </div>
        </div>
    </div>
        `

    })
    listElementBlock.innerHTML = htmls.join('')

}

function add() {
    $('.addPro-form').addClass('showForm')
}

function createElement(data, callback) {
    var options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    fetch(elementsAPI, options)
        .then(function (res) {
            res.json()
        })
        .then(callback)
}

function deleteEle(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    }

    fetch(elementsAPI + '/' + id, options)
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


function handleCreateEle() {
    $('.addElement').click(function () {
        var maSP = $('.maSP').val()
        var name = $('.nameSP').val()
        var image = $('.img').val().split("\\").pop()
        var type = $('.typeSP').val()
        var sale = $('.saleSP').val()
        var cost = $('.costSP').val()
        var remain = $('.remainSP').val()

        var formData = {
            maPro: maSP,
            name: name,
            image: `./image/${image}`,
            type: type,
            sale: sale,
            cost: cost,
            remaining: remain
        }
        console.log(image);
        createElement(formData, function () {
            getElements(renderElements)
        })
    })
}

function handleDeleteEle() {
    $('.deletePro').click(function () {

    })
}

$('.hideForm').click(function () {
    $('.addPro-form').removeClass('showForm')
})