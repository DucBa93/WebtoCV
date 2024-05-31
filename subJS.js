$(document).ready(function () {
    const showRoom = $('.item-row')
    console.log(showRoom.length);

    showRoom.map((item, index) => {
        index.onclick = (function () {
            $('.item-spec').toggleClass('spec-active')
        })

    })
    $('.deleteRoom').click(function () {
        $('.room-item1').remove()
    })


})