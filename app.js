function ChangeTaskCategory(name) {
    if (name == page) {
        return
    }

    $(`#${page}`).css('display', 'none')
    $(`#${name}`).css('display', 'flex')
    page = name
}

$(function () {
    $('.mypage-title').text(Config.PageName)
    $('.mypage-year').text(Config.Year)
    $('.mainpage-title-description').text(Config.MainPageDesc)
})

$(function () {
    const $btn = document.getElementById('menu-nav-btn')

    $btn.addEventListener('click', () => {
        $btn.classList.toggle('active')
        if ($('.navbar-menu').hasClass('active')) {
            $('.navbar-menu').removeClass('active')
        } else {
            $('.navbar-menu').addClass('active')
        }
    })
})

$(function () {
    let $menuItem
    for (let i of Config.Menu) {
        if (!i.event) {
            $menuItem = $(`<li><a href="${i.fileName}.html" class="hoverline"><i class="fa-regular fa-${i.iconName || 'house'}" id="navIcon"></i> ${i.optionName}</a></li>`)
        } else {
            $menuItem = $(`<li><a class="hoverline" style="font-weight: 600;" onclick="ToggleCalculator()"><i class="fa-regular fa-${i.iconName || 'house'}"></i> ${i.optionName}</a></li>`)
        }
        $('.navbar-menu').append($menuItem)
    }
})


$(function () {
    $('.mainpage-page-informations').html(``)

    for (let [index, i] of Object.entries(PQuestions)) {
        setTimeout(() => {
            const $pageInfo = $(`<div class="mainpage-page-information" style="background: linear-gradient(150deg, ${i.color + '1a' || '#fff'}, #000000); border-color: ${i.color + 'b1' || '#fff'}; opacity: 0;">
                    <div class="mainpage-information-wrapper">
                        <div style="display: flex; align-items: center; gap: 1vh;">
                            <i class="fa-solid ${i.icon || 'fa-user'}" style="background-color: ${i.color + '4f' || '#fff'}; color: ${i.color || '#fff'};"></i>
                            <span style="color: ${i.color || '#fff'};">${i.title}</span>
                        </div>
                        <div class="line" style="opacity: 0.5;"></div>
                        <div class="mainpage-page-information-answer" style="color: ${i.color || '#fff'};">${i.description}</div>
                    </div>
                    <a href="${i.goTo}.html" class="mainpage-page-information-go" style="display: ${i.goTo ? 'flex' : 'none'}">Przejdź do funkcji</a>
                </div>`)

            $('.mainpage-page-informations').append($pageInfo)
            $pageInfo.addClass('fade-in-top')
        }, index * 100)
    }
})


function ToggleCalculator() {
    const $calculator = $('.calculator-calculator')
    if (!$calculator.is(':visible')) {
        $('.calculator-calculator').before('<div class="calculator-calculator-overlay"></div>')
        $('.app').css('filter', 'blur(1px)')
        $('.navbar-menu').removeClass('active')
        $('#menu-nav-btn').removeClass('active')
        $('.calculator-calculator').html(`<div class="calculator-calculator-nav">
            <span>Kalkulator</span>
            <i class="fa-solid fa-xmark calc-close-calc"></i>
        </div>
        <input type="text" class="calculator-display" readonly>
        <div class="caluclator-buttons">
            <button data-value="AC" class="operratorr">AC</button>
            <button data-value="DEL" class="operratorr">DEL</button>
            <button data-value="%" class="operratorr">%</button>
            <button data-value="/" class="operratorr">/</button>
            <button data-value="7">7</button>
            <button data-value="8">8</button>
            <button data-value="9">9</button>
            <button data-value="*" class="operratorr">*</button>
            <button data-value="4">4</button>
            <button data-value="5">5</button>
            <button data-value="6">6</button>
            <button data-value="-" class="operratorr">-</button>
            <button data-value="1">1</button>
            <button data-value="2">2</button>
            <button data-value="3">3</button>
            <button data-value="+" class="operratorr">+</button>
            <button data-value="0">0</button>
            <button data-value="00">00</button>
            <button data-value=".">.</button>
            <button data-value="=" class="operratorr">=</button>
        </div>
        <div class="calculator-calculator-info">Obszar poza kalkulatorem jest niedostępny</div>`)
        $('.calculator-calculator').show()
    } else {
        $('.calculator-calculator').hide()
        $('.calculator-calculator-overlay').remove()
        $('.app').css('filter', 'none')
    }

    $calculator.find('.calc-close-calc').on('click', function () {
        ToggleCalculator()
    })
    const display = document.querySelector('.calculator-display')
    const buttons = document.querySelectorAll('button')
    const singns = ['%', '*', '/', '-', '+', '=']
    let output = ''

    const calculate = (btnValue) => {
        if (btnValue === '=' && output !== '') {
            output = eval(output.replace('%', '/100'))
        } else if (btnValue === 'AC') {
            output = ''
        } else if (btnValue === 'DEL') {
            output = output.toString().slice(0, -1)
        } else {
            if (output === '' && singns.includes(btnValue)) return

            output += btnValue
        }
        display.value = output
    }

    buttons.forEach((button) => {
        button.addEventListener('click', e => calculate(e.target.dataset.value))
    })
}

$(function () {
    $('.mainpage-authors').html(``)
    let styleSheet = $('<style></style>')
    $('head').append(styleSheet)

    for (let i of Authors) {
        let funcHTML = ``

        for (let iData of i.functions) {
            funcHTML += `<div class="mainpage-author-function">${iData}</div>`
        }

        let uniqueClass = `author-${i.name}`

        styleSheet.append(`.${uniqueClass}:hover { box-shadow: 0 0 3vh ${i.color + '7b'}; }`)

        let $author = $(`<div class="mainpage-author ${uniqueClass}">
                        <img src="images/spedlog-images/${i.imageName}.png" alt="" class="mainpage-author-logo" style="box-shadow: 0 0 2.5vh ${i.color};">
                        <div style="display: flex; flex-direction: column; gap: 1vh; align-items: center;">
                            <div class="mainpage-author-name">${i.name}</div>
                            <div class="mainpage-author-discord">${i.discord}</div>
                        </div>
                        <div class="mainpage-author-functions">
                            ${funcHTML}
                        </div>
                    </div>`)
        $('.mainpage-authors').append($author)
    }
})


$(function () {
    $('.mainpage-functions-list').html(``)
    const filteredMenu = Config.Menu.filter(func => func.optionName !== "Strona główna" && func.optionName !== "Kalkulator")

    let index = 0

    function ShowPageFunction(i) {
        const pFunc = filteredMenu[i]
        const newItem = $(`<a href="${pFunc.fileName}.html" class="function-link slide-in">${pFunc.optionName}</a>`)

        const oldItem = $('.mainpage-functions-list a')

        if (oldItem.length) {
            oldItem.removeClass('slide-in').addClass('slide-out')
            setTimeout(() => {
                oldItem.remove()
                $('.mainpage-functions-list').append(newItem)
            }, 1500)
        } else {
            $('.mainpage-functions-list').append(newItem)
        }
    }

    ShowPageFunction(index)

    setInterval(() => {
        index = (index + 1) % filteredMenu.length
        ShowPageFunction(index)
    }, 7500)
})


let canNotify = true

function Notify(text) {
    if (!canNotify) return

    canNotify = false

    const $notify = $(`<div class="notification-container">
            <div class="notify-title">
                <i class="fa-regular fa-bell"></i>
                <span>Powiadomienie</span>
            </div>
            <div class="notify-content">${text}</div>
            <div class="progress">
                <div class="bar"></div>
            </div>
        </div>`)

    const $bar = $notify.find('.bar')
    $bar.css('width', '100%')

    $('.notifications-container').append($notify)

    $bar.animate({
        width: 0
    }, 4000, () => { $notify.remove() })

    $notify.animate({
        opacity: 1,
    }, 500)

    setTimeout(() => {
        canNotify = true
    }, 1000)
}