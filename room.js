var dataRoom = [
    {
        'id': 1,
        'name': 'Bàn 1',
        'note': 'Không có ghi chú',
        'area': 'Tầng 1',
        'chairNumber': 4,
        'status': 'Đang hoạt động',
        'stt': '1A'
    },
    {
        'id': 2,
        'name': 'Bàn 2',
        'note': 'Không có ghi chú',
        'area': 'Tầng 1',
        'chairNumber': 4,
        'status': 'Không hoạt động',
        'stt': '1A'
    },
    {
        'id': 3,
        'name': 'Bàn 3',
        'note': 'Không có ghi chú',
        'area': 'Tầng 1',
        'chairNumber': 4,
        'status': 'Đang hoạt động',
        'stt': '1A'
    },
    {
        'id': 4,
        'name': 'Bàn 4',
        'note': 'Không có ghi chú',
        'area': 'Tầng 1',
        'chairNumber': 4,
        'status': 'Đang hoạt động',
        'stt': '1A'
    },
    {
        'id': 5,
        'name': 'Bàn 5',
        'note': 'Không có ghi chú',
        'area': 'Tầng 1',
        'chairNumber': 4,
        'status': 'Đang hoạt động',
        'stt': '1A'
    },
    {
        'id': 6,
        'name': 'Bàn 6',
        'note': 'Không có ghi chú',
        'area': 'Tầng 1',
        'chairNumber': 4,
        'status': 'Đang hoạt động',
        'stt': '1A'
    },
    {
        'id': 7,
        'name': 'Bàn 7',
        'note': 'Không có ghi chú',
        'area': 'Tầng 1',
        'chairNumber': 4,
        'status': 'Đang hoạt động',
        'stt': '1A'
    },
    {
        'id': 8,
        'name': 'Bàn 8',
        'note': 'Không có ghi chú',
        'area': 'Tầng 1',
        'chairNumber': 4,
        'status': 'Đang hoạt động',
        'stt': '1A'
    },
    {
        'id': 9,
        'name': 'Bàn 9',
        'note': 'Không có ghi chú',
        'area': 'Tầng 1',
        'chairNumber': 4,
        'status': 'Đang hoạt động',
        'stt': '1A'
    },

]

const roomSpace = document.querySelector('.roomBody')
function showRoom() {
    roomSpace.innerHTML = ''
    dataRoom.forEach((item, index) => {
        roomSpace.innerHTML += `
        <div class="wrapper">
        <div class="item">
            <p>${item.name}</p>
            <p>${item.note}</p>
            <p>${item.area}</p>
            <p>${item.chairNumber}</p>
            <p>${item.status}</p>
            <p>${item.stt}</p>
        </div>
        <div class="btn-gr">
            <button onclick=update(${item.id}) class="update">Sửa</button>
            <button onclick=deleteRoom(${item.id}) class="Xoa">Xoá</button>
        </div>
    </div>
        `
    })
}

showRoom()

document.querySelector('.save').onclick = () => {
    const name = document.querySelector('.name').value
    const note = document.querySelector('.note').value
    const area = document.querySelector('.area').value
    const chair = document.querySelector('.chairNumber').value
    const status = document.querySelector('.status').value
    const stt = document.querySelector('.stt').value
    const id = dataRoom.length == 0 ? 0 : dataRoom[dataRoom.length - 1].id + 1
    const pro = {
        'id': id,
        'name': name,
        'note': note,
        'area': area,
        'chairNumber': chair,
        'status': status,
        'stt': stt
    }

    dataRoom.push(pro)
    addModal.style.display = 'none'
    $('.roomShow').removeClass('showRoomModal')

    showRoom()
}

const editModal = document.querySelector('#editModal')
function update(id) {
    const pro = dataRoom.find(item => item.id == id)
    editModal.style.display = 'block'
    editModal.innerHTML += `
    <div class="modal-content">
    <span onclick=closeTab() class="close">&times;</span>

    <div class="form">
        <label for="">Tên phòng / bàn</label>
        <br>
        <input value="${pro.name}" type="text" id="editname">
        <br>
        <label for="">Ghi chú</label>
        <br>
        <input value="${pro.note}" type="text" id="editnote">
        <br>
        <label for="">Khu vực</label>
        <br>
        <input value="${pro.area}" type="text" id="editarea">
        <br>
        <label for="">Số ghế</label>
        <br>
        <input value="${pro.chairNumber}" type="text" id="editchair">
        <br>
        <label for="">Trạng thái</label>
        <br>
        <select style="width: 100%; height: 44px; margin: 10px 0;" id="editstatus">
            <option ${pro.status == "Đang hoạt động" ? "selected" : ""} value="Đang hoạt động">Đang hoạt động</option>
            <option ${pro.status == "Không hoạt động" ? "selected" : ""} value="Không hoạt động">Không hoạt động</option>
        </select>
        <br>
        <label for="">Số thứ tự</label>
        <br>
        <input value="${pro.stt}" type="text" id="editstt">
        <br>
        <button onclick="editPro(${id})" id="addPro">Sửa</button>
    </div>
</div>
    `
}
function closeTab() {
    editModal.style.display = 'none'
    editModal.innerHTML = ''
}


function editPro(id) {
    const name = document.querySelector('#editname').value
    const note = document.querySelector('#editnote').value
    const area = document.querySelector('#editarea').value
    const chair = document.querySelector('#editchair').value
    const status = document.querySelector('#editstatus').value
    const stt = document.querySelector('#editstt').value

    const pro = {
        'id': id,
        'name': name,
        'note': note,
        'area': area,
        'chairNumber': chair,
        'status': status,
        'stt': stt
    }

    dataRoom = dataRoom.map(item => item.id == id ? pro : item)
    editModal.style.display = "none"
    showRoom()
    console.log(pro.chair);
}

function deleteRoom(id) {
    dataRoom = dataRoom.filter(item => item.id != id)
    showRoom()
}












function cancelAction() {
    $('.update-info').hide()
    $('.update').show()
    $('.Luu').remove()
    $('.Huy').remove()
}

$('.addRoom').click(function () {
    $('.roomShow').addClass('showRoomModal')
})

$('.closeRoom').click(function () {
    $('.roomShow').removeClass('showRoomModal')
})



$('.cancel').click(function () {
    $('.roomShow').removeClass('showRoomModal')

})

