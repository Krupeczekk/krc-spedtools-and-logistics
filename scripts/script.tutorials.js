$(function () {
    $('.tutorials-tutorials-list').html(``)
    for (let [index, i] of Object.entries(Tutorials)) {
        setTimeout(() => {
            const tutorial = $(`<div class="tutorials-tutorial" style="opacity: 0;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div class="tutorial-title">${i.title}</div>
                    <i class="fa-solid fa-chevron-down tutorial-arrow"></i>
                </div>
                <div style="display: none;" class="tutorialDesc">
                    <div class="line"></div>
                    <div class="tutorial-desc"></div>
                </div>
            </div>`)

            tutorial.on('click', function () {
                const $wrapper = tutorial.find('.tutorialDesc')
                const $arrow = tutorial.find('.tutorial-arrow')
                if ($wrapper.is(':animated')) return
                $(this).find('.tutorialDesc').slideToggle()
                $arrow.toggleClass('ArrowActive')
            })
            const tutDesc = tutorial.find('.tutorial-desc')

            i.instructions.forEach((data, index) => {
                const instHtml = $(`<div class="tuto-desc-title"><span>${index + 1}</span> ${data.label}</div> <div>${data.description}</div>`)
                tutDesc.append(instHtml)
            });

            $('.tutorials-tutorials-list').append(tutorial)
            tutorial.addClass('fade-in-top')
        }, index * 100)
    }
})