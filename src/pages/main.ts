import { getDivContainer } from "../elements/container";
import { getButton } from "../elements/formElements";
import { getTaskElement } from "../elements/task";
import { getTitle } from "../elements/titles";
import { login } from "./login";

type Task = {
    content: string;
    done: boolean
}

function main(name: string) {
    document.body.innerHTML = ''
    const tasks = extractTasks(name)
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

    const title = getTitle('TaskDo')
    const logoutButton = getButton('Logout')
    logoutButton.onclick = () => logout(name)

    const container = getDivContainer([greetingContainer, title, logoutButton])
    container.classList.add('nav')

    return container
}

function getContent(tasks: Task[]) {
    const addNewTaskButton = getButton('Add New Task')
    addNewTaskButton.onclick = createNewTask
    const taskElements = tasks.map(task => getTaskElement(task.content, task.done))
    const container = getDivContainer([addNewTaskButton, ...taskElements])
    container.id = 'taskList'

    return container
}

function extractTasks(name: string) {
    const tasksText: string = localStorage.getItem(name)
    const tasks: Task[] = []

    if (tasksText) {
        const taskTextList = tasksText.split(';')
        for (let taskText of taskTextList) {
            let [taskContent, taskDone] = taskText.split(',')
            tasks.push({
                content: taskContent,
                done: Number(taskDone) === 1
            })
        }
    }

    return tasks
}

function createNewTask() {
    const newTask = getTaskElement('', false)
    document.querySelector('#taskList').append(newTask)
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

    const tasksText = tasks.map(task => `${task.content},${task.done ? 1:0}`).join(';')
    localStorage.setItem(name, tasksText)
}

function logout(name: string) {
    saveTask(name)
    login()
}

export { main }