function getTitle(content: string) {
    const header = document.createElement('h1')
    header.innerText = content

    return header
}

function getSubTitle(content: string) {
    const subHeader = document.createElement('h2')
    subHeader.innerText = content

    return subHeader
}

export { getTitle, getSubTitle }