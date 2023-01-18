
function getTextInput(name: string, placeHolder?: string) {
    const input = document.createElement('input')
    input.name = name
    input.type = 'text'
    if (placeHolder != null) { input.placeholder = placeHolder }

    return input
}

function getCheckBox() {
    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox'

    return checkBox
}

function getButton(content?: string, image?: string) {
    const button = document.createElement('button')
    if (image) {
        var img = new Image()
            img.src = `../../src/icons/${image}`
            img.style.width = '20px'
            button.appendChild(img)
    } else {
        button.innerText = content
    }

    return button
}

function getForm(elements: HTMLElement[]) {
    const form = document.createElement('form')
    form.append(...elements)

    return form
}

export { getTextInput, getCheckBox, getButton, getForm }