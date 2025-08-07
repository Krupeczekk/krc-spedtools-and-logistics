

$(function () {
    let selectedCategory = Tasks.categoryName

    $('#tasks-menu-options').html(``)

    Tasks.forEach(category => {
        const $category = $(`<li class="spedcalc-selectmenu-option">${category.categoryName}</li>`)
        $('#tasks-menu-options').append($category)
    })

    const selectMenu = document.querySelector('.spedcalc-selectmenu')
    const selectButton = document.querySelector('.spedcalc-select-button')
    const selectOptions = document.querySelectorAll('.spedcalc-selectmenu-option')
    const selectBtnText = document.querySelector('.spedcalc-select-button-text')

    selectButton.addEventListener('click', () => selectMenu.classList.toggle('active'))

    selectOptions.forEach(option => {
        option.addEventListener('click', () => {
            let selectedOption = option.innerText
            selectBtnText.innerText = selectedOption

            selectMenu.classList.remove('active')
            $('#calculator-calc-type').text(selectedOption)
            selectedCategory = selectedOption
        })
    })

    let currentTask = null
    let lastIndex = -1
    let completedTasks = []

    $('.tasks-randomtask-btn').on('click', () => {

        const selectedTaskCategory = Tasks.find(c => c.categoryName === selectedCategory)
        if (!selectedTaskCategory || selectedTaskCategory.tasks.length == 0) {
            Notify('Nie masz wybranej kategorii zadania - wybierz ją!')
            return
        }

        let randomTaskIndex
        do {
            randomTaskIndex = Math.floor(Math.random() * selectedTaskCategory.tasks.length)
        } while (selectedTaskCategory.tasks.length > 1 && randomTaskIndex === lastIndex)

        lastIndex = randomTaskIndex
        currentTask = selectedTaskCategory.tasks[randomTaskIndex]

        $('.tasks-randomtask-btn').text('Następnie zadanie')

        $('.task').html(``)

        let title = currentTask.title
        if (completedTasks.includes(currentTask.title)) {
            title += ' - (Zadanie wykonane)'
        }

        let inputs = ''

        if (currentTask.correctAnswers) {
            let i = 0
            for (const [label] of Object.entries(currentTask.correctAnswers)) {
                inputs += `<div style="display: flex; flex-direction: column; gap: 0.5vh; width: 100%; align-items:start;">
        <span style="font-size: 0.8rem; color: #ffffff5d;">${label}</span>
        <input type="text" placeholder="Tu pisz..." id="user-result-${i}" data-key="${label}">
    </div>`
                i++
            }
        } else {
            inputs += `<input type="text" placeholder="Podaj wynik" id="user-result">`
        }

        $('.task').append(`
        <div class="task-container">
            <div class="task-title">${title}</div>
            <div class="task-calcplace-wrapper" style="display: ${currentTask.calcPlace ? 'flex' : 'none'};">
                <div style="font-size: 0.8rem; color: #6ebccfb2;">Miejsce na obliczenia</div>
                <textarea></textarea>
            </div>
            <div class="line"></div>
            ${inputs}
            <div class="tasks-getAnswer">Gotowe</div>
            <span id="tasks-result-msg"></span>
        </div>
    `)

        $('.tasks-getAnswer').on('click', () => {
            if (currentTask.correctAnswers) {
                const entries = Object.entries(currentTask.correctAnswers)
                let allCorrect = true

                entries.forEach(([label, correctVal], index) => {
                    const $input = $(`#user-result-${index}`)
                    const userResult = parseFloat($input.val())
                    if (userResult !== correctVal) {
                        allCorrect = false
                        $input.css('border', '1px solid #b61717')
                    } else {
                        $input.css('border', 'none')
                    }
                })

                if (allCorrect && !completedTasks.includes(currentTask.title)) {
                    completedTasks.push(currentTask.title)
                }

                $('#tasks-result-msg').text(allCorrect ? 'Dobra odpowiedź!' : 'Zła odpowiedź').css('color', allCorrect ? '#08f343' : '#cc1b1b')
            } else {
                userResult = parseFloat($(`#user-result`).val())
                const isCorrect = userResult === currentTask.correctAnswer
                if (isCorrect && !completedTasks.includes(currentTask.title)) {
                    completedTasks.push(currentTask.title)
                }
                $('#tasks-result-msg').text(isCorrect ? 'Dobra odpowiedź!' : 'Zła odpowiedź').css('color', isCorrect ? '#08f343' : '#cc1b1b')
            }
        })
    })
})