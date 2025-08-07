$(function () {
    $('.definitions-container').html('')

    for (let [index, i] of Object.entries(Definitions)) {
        setTimeout(() => {
            const definition = $(`<div class="definition" style="opacity: 0;">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div class="definition-title">${i.title}</div>
                        <i class="fa-solid fa-chevron-down definition-arrow"></i>
                    </div>
                    <div class="definition-desc-wrappper" style="display:none">
                        <div class="line"></div>
                        <div class="definition-decription">${i.description}</div>
                    </div>
                </div>`)
            definition.on('click', function () {
                const $wrapper = definition.find('.definition-desc-wrappper')
                const $arrow = definition.find('.definition-arrow')

                if ($wrapper.is(':animated')) return

                $(this).find('.definition-desc-wrappper').slideToggle()
                $arrow.toggleClass('ArrowActive')
            })
            $('.definitions-container').append(definition)
            definition.addClass('fade-in-left')
        }, index * 50)
    }
})

$('.serach-clear').on('click', function () {
    const $defInput = document.getElementById('searchdefinition')
    $defInput.value = ''
    $defInput.dispatchEvent(new Event('input'))
})

document.getElementById('searchdefinition').addEventListener('input', function () {
    const filter = this.value.toLowerCase()
    const items = document.querySelectorAll('.definition')
    for (let item of items) {
        const text = item.querySelector('.definition-title').textContent.toLowerCase()
        if (text.includes(filter)) {
            item.style.display = ''
        } else {
            item.style.display = 'none'
        }
    }
})