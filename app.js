(function () {
    // Base Settings
    let userSelectedBlock = null
    let userResponse = null

    let userSelectIsClicked = false

    // UI
    const userSelects = document.querySelectorAll('.table__content-user .table__content-item')
    const botSelects = document.querySelectorAll('.table__content-bot .table__content-item')
    const userScore = document.querySelector('.user__score p')
    const botScore = document.querySelector('.bot__score p')
    const restartBtn = document.querySelector('.table__content-btn')
    const instructionBtn = document.querySelector('.table__content-instruction')
    const instruction = document.querySelector('.table__instruction')
    const instructionClose = document.querySelector('.table__instruction-close')
    const overlay = document.querySelector('.table__overlay')

    // Events
    userSelects.forEach(e => e.addEventListener('click', userClickHandler))
    restartBtn.addEventListener('click', restartGame)
    instructionBtn.addEventListener('click', showInstriction)
    instructionClose.addEventListener('click', closeInstruction)
    overlay.addEventListener('click', closeInstruction)


    function userClickHandler () {
        if (!userSelectIsClicked) {
            userSelectIsClicked = true 

            removeDrawClass(botSelects, userSelects)
            removeWinClass(botSelects, userSelects)
            removeLoseClass(botSelects, userSelects)

            userSelectedBlock = this
            this.classList.add('win')
            userResponse = this.getAttribute('data-symbol')

            startBotAnimation(createBotResponse)
        }
    }
    
    function createBotResponse () {
        const botSelectedItem = botSelects[random(0, botSelects.length)]
        const id = botSelectedItem.getAttribute('id')
        const botResponse = botSelectedItem.getAttribute('data-symbol')

        botSelects[id].classList.add('win')

        const botAndUserResponse = {
            botResponse: { block: botSelectedItem, key: botResponse },
            userResponse: { block: userSelectedBlock, key: userResponse }
        }

        defineWinner(botAndUserResponse)
    }

    function defineWinner (response) {
        const { botResponse, userResponse } = response  
        const combination = userResponse.key + botResponse.key 

        switch (combination) {
            // Проверка на ничью
            case 'ss':
                draw(botResponse.block, userResponse.block)
                break;
            case 'pp':
                draw(botResponse.block, userResponse.block)
                break;
            case 'ww':
                draw(botResponse.block, userResponse.block)
                break;

            // Проверка на победу
            case 'sp':
                win(botResponse.block, userResponse.block)
                break;
            case 'pw': 
                win(botResponse.block, userResponse.block)
                break;
            case 'ws':
                win(botResponse.block, userResponse.block)
                break;

            // Проверка на проигрыш
            case 'sw':
                lose(botResponse.block, userResponse.block)
                break;
            case 'ps':
                lose(botResponse.block, userResponse.block)
                break;
            case 'wp':
                lose(botResponse.block, userResponse.block)
                break;
        }

        userSelectIsClicked = false
    }

    function restartGame () {
        userScore.innerHTML = 0
        botScore.innerHTML = 0

        removeDrawClass(botSelects, userSelects)
        removeLoseClass(botSelects, userSelects)
        removeWinClass(botSelects, userSelects)
    }
    
    function showInstriction () {
        instruction.classList.add('active')
        overlay.classList.add('active__overlay')
    }

    function closeInstruction () {
        instruction.classList.remove('active')
        overlay.classList.remove('active__overlay')
    }

    function startBotAnimation (callback) {
        let bostSelectsIdx = 0
        let animationCounter = 0

        const animationInterval = setInterval(() => {
            if (bostSelectsIdx === botSelects.length) {
                bostSelectsIdx = 0
                animationCounter++
            }

            removeWinClass(botSelects)
            botSelects[bostSelectsIdx].classList.add('win')

            if (animationCounter === 5) {
                clearInterval(animationInterval)
                removeWinClass(botSelects)

                callback(botSelects)
            }
            bostSelectsIdx++
        }, 100)
    }

    function draw (botBlock, userBlock) {
        botBlock.classList.add('draw')
        userBlock.classList.add('draw')
    }

    function win (botBlock, userBlock) {
        botBlock.classList.add('lose')
        userBlock.classList.add('win')
        +userScore.innerHTML++
    }

    function lose (botBlock, userBlock) {
        botBlock.classList.add('win')
        userBlock.classList.add('lose')
        +botScore.innerHTML++
    }

    function removeWinClass (botSelcets, userSelects) {
        if (!userSelects) userSelects = []
        const selects = [...botSelcets, ...userSelects]

        selects.forEach(s => s.classList.remove('win'))
    }

    function removeLoseClass (botSelects, userSelects) {
        const selects = [...botSelects, ...userSelects]
        selects.forEach(s => s.classList.remove('lose'))
    }

    function removeDrawClass (botSelects, userSelects) {
        const selects = [...botSelects, ...userSelects]
        selects.forEach(s => s.classList.remove('draw'))
    }

    function random (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
})()