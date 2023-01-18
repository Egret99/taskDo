import { getDivContainer } from '../elements/container'
import { getButton, getForm, getTextInput } from '../elements/formElements'
import { getTitle, getSubTitle } from '../elements/titles'
import { main } from './main'

function login() {
    document.body.innerHTML = ''

    const title = getTitle('TaskDo')
    const subTitle = getSubTitle('Manage You Task Checklist Easily')
    const titleDiv = getDivContainer([title, subTitle])
    document.body.append(titleDiv)

    const nameInput = getTextInput('userName', 'Your Name');
    const submitButton = getButton('Lets Start');
    const form = getForm([nameInput, submitButton]);
    form.onsubmit = formSubmit
    document.body.append(form)
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