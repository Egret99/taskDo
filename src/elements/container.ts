function getDivContainer(elements: HTMLElement[]) {
    const div = document.createElement('div')
    div.classList.add("container")
    div.append(...elements)

    return div
}

export { getDivContainer }