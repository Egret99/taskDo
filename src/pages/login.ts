import { getDivContainer } from '../elements/container'
import { getButton, getForm, getTextInput } from '../elements/formElements'
import { getTitle, getSubTitle } from '../elements/titles'
import { main } from './main'

function login() {
    document.body.innerHTML = ''

    const title = getTitle('TaskDo')
    const subTitle = getSubTitle('Manage You Task Checklist Easily')
    const titleDiv = getDivContainer([title, subTitle])
    titleDiv.id = 'loginTitle'

    const nameInput = getTextInput('userName', 'Your Name');
    const submitButton = getButton('Lets Start');
    const form = getForm([nameInput, submitButton]);
    form.classList.add('container')
    form.onsubmit = formSubmit
    
    const pageContainer = getDivContainer([titleDiv, form])
    pageContainer.id = 'loginPage'
    document.body.append(pageContainer)
}

function validateName(name: string) {
    if (!name) { return false }
    return true
}

function formSubmit (e: SubmitEvent) {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const value = target.userName.value

    if (!validateName(value)) { alert("The username cannot be empty.") }
    else {main(value)}
}

export { login }