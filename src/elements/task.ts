import { getDivContainer } from "./container";
import { getButton, getCheckBox, getForm, getTextInput } from "./formElements";

function getTaskElement(contentText: string, done: boolean) {
    const deleteButton = getButton('Delete')
    const checkBox = getCheckBox()
    checkBox.name = 'status'
    checkBox.checked = done
    checkBox.onchange = () => changeStatus(checkBox.parentNode as HTMLDivElement)

    let content: HTMLElement
    if (contentText) {
        content = getContentDiv(contentText, done)
    } else {
        content = getTaskContentInput('')
    }

    const taskElement = getDivContainer([deleteButton, checkBox, content])
    taskElement.classList.add('taskItem')

    deleteButton.onclick = () => taskElement.remove()

    return taskElement
}

function getTaskContentInput(content: string) {
    const input = getTextInput('taskContent', 'Enter Your Task Here')
    input.value = content
    input.addEventListener('focusout', () => saveTask(input.parentNode as HTMLDivElement))
    input.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') saveTask(input.parentNode as HTMLDivElement)
    })

    return input
}

function getContentDiv(contentText: string, done: boolean) {
    const contentDiv = document.createElement('div')
    contentDiv.style.textDecoration = done ? 'line-through' : 'none'
    contentDiv.innerText = contentText
    contentDiv.onclick = () => editTaskContent(contentDiv)

    return contentDiv
}

function changeStatus(div: HTMLDivElement) {
    const taskContentElement = div.childNodes[2] as HTMLDivElement
    const statusElement = div.childNodes[1] as HTMLInputElement
    taskContentElement.style.textDecoration = statusElement.checked ? 'line-through' : 'none'
}

function editTaskContent(content: HTMLDivElement) {
    content.parentNode.append(getTaskContentInput(content.innerText))
    content.remove()
}

function saveTask(div: HTMLDivElement) {
    const taskContentElement = div.childNodes[2] as HTMLInputElement
    const taskContent = taskContentElement.value

    if (!taskContent) {
        div.remove()
        return
    }

    const statusElement = div.childNodes[1] as HTMLInputElement
    const status = statusElement.checked

    div.childNodes[2].remove()
    div.append(getContentDiv(taskContent, status))
}

export { getTaskElement }