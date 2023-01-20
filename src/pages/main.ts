import { resolveProjectReferencePath } from "typescript";
import { getDivContainer } from "../elements/container";
import { getButton } from "../elements/formElements";
import { getTaskElement } from "../elements/task";
import { getTitle } from "../elements/titles";
import { login } from "./login";

type Task = {
    content: string;
    done: boolean
}

async function main(name: string) {
    document.body.innerHTML = ''
    const tasks: Task[] = await extractTasks(name)
    const navBar = getNavBar(name, tasks.length)
    const content = getContent(tasks)
    
    document.body.append(navBar, content)
}

function getNavBar(name: string, numOfTasks: number) {
    const greeting = document.createElement('div')
    greeting.innerText = `Hi ${name}`
    const tasksPending = document.createElement('div')
    tasksPending.innerText = `${numOfTasks} tasks pending`
    const greetingContainer = getDivContainer([greeting, tasksPending])
    greetingContainer.id = 'mainGreeting'

    const title = getTitle('TaskDo')
    title.id = 'mainTitle'
    const logoutButton = getButton('Logout')
    logoutButton.onclick = () => logout(name)
    logoutButton.id = 'logoutButton'

    const container = getDivContainer([greetingContainer, title, logoutButton])
    container.id = 'nav'

    return container
}

function getContent(tasks: Task[]) {
    const addNewTaskButton = getButton('+ Add New Task')
    addNewTaskButton.onclick = createNewTask
    addNewTaskButton.id = 'taskContentAddNewButton'
    const taskElements = tasks.map(task => getTaskElement(task.content, task.done))
    const tasksDiv = getDivContainer([...taskElements])
    tasksDiv.id = 'taskList'
    const container = getDivContainer([addNewTaskButton, tasksDiv])
    container.id = 'taskContent'

    return container
}

function extractTasks(name: string) {
    return new Promise<Task[]>((resolve, reject) => {
        const req = new XMLHttpRequest()
        req.open("GET", `http://localhost:3000?name=${name}`)

        req.onload = () => {
            if (req.status != 200) {
                reject(req.statusText)
            } else {
                const tasks = JSON.parse(req.response)
                resolve(tasks)
            }
        }

        req.send()
    })
}

function createNewTask() {
    const newTask = getTaskElement('', false)
    document.querySelector('#taskList').append(newTask)
    const input = newTask.childNodes[2] as HTMLInputElement
    input.focus()
}

function saveTask(name: string) {
    const taskElements = document.querySelectorAll('.taskItem')
    const tasks: Task[] = []
    taskElements.forEach(el => {
        const statusElement = el.childNodes[1] as HTMLInputElement
        const taskContentElement = el.childNodes[2] as HTMLDivElement
        if (taskContentElement.innerText) {
            tasks.push({
                content: taskContentElement.innerText,
                done: statusElement.checked
            })
        }
    })

    const req = new XMLHttpRequest()
    req.open("POST", `http://localhost:3000/${name}`)
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(tasks))
}

function logout(name: string) {
    saveTask(name)
    login()
}

export { main }