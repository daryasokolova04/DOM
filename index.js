const tasks = [
    {
        id: '1138465078061',
        completed: false,
        text: 'Посмотреть новый урок по JS',
    },
    {
        id: '1138465078062',
        completed: false,
        text: 'Выполнить тест',
    },
    {
        id: '1138465078063',
        completed: false,
        text: 'Выполнить дз',
    },
]


let darkMode = false

const changeColor = (darkMode) => {   
    const body = document.querySelector('body')
    const taskItems = document.querySelectorAll('.task-item')
    const buttons = document.querySelectorAll('button')
    const input = document.querySelector('input')

    if (darkMode) {
        body.style.backgroundColor = '#24292E'
        buttons.forEach((button) => {
            button.style.border = '1px solid #ffffff'
        })
        input.style.backgroundColor = '#24292E'
        input.style.color = '#fff'
        taskItems.forEach((item) => {
            item.style.color = '#fff'
        })
    }
    else {
        body.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        buttons.forEach((button) => {
            button.style.border = 'iinitial'
        })
        input.style.backgroundColor = 'initial'
        input.style.color = 'initial'
        taskItems.forEach((item) => {
            item.style.color = 'initial'
        })
    }
}

const postedTasks = []
prevTasks = document.querySelectorAll('.task-item')
prevTasks.forEach((task) => {
    const id = task.dataset.taskId
    const text = task.querySelector('.task-item__text').textContent
    task = {
        id: id,
        text: text,
        completed: false
    }
    tasks.push(task)
    postedTasks.push(task)
    
})

const tasksList = document.createElement('div')
tasksList.className = 'tasks-list'

const taskItems = document.querySelectorAll('.task-item')
taskItems.forEach((item) => {
    tasksList.append(item)
})

const body = document.querySelector('body')

const createTask = (task) => {
    const newTask = document.createElement('div')
    newTask.className = 'task-item'
    newTask.dataset.taskId = task.id

    const container = document.createElement('div')
    container.className = 'task-item__main-container'

    const content = document.createElement('div')
    content.className = 'task-item__main-content'

    const input = document.createElement('input')
    input.type = 'checkbox'
    input.className = 'checkbox-form__checkbox'
    input.id = `task-${task.id}`
    const label = document.createElement('label')
    label.htmlFor = input.id
    const span = document.createElement('span')
    span.className = 'task-item__text'
    span.textContent = task.text
    const button = document.createElement('button')
    button.className = 'task-item__delete-button default-button delete-button'
    button.dataset.deleteTaskId = task.id
    button.textContent = 'удалить'

    const form = document.createElement('form')
    form.className = 'checkbox-form'
    form.append(input, label)
    content.append(form, span)
    container.append(content, button)
    newTask.append(container)
    tasksList.append(newTask)
    changeColor(darkMode)

}

document.body.prepend(tasksList)

const createTaskBlock = document.createElement('form')
createTaskBlock.className = 'create-task-block'

const createTaskInput = document.createElement('input')
createTaskInput.className = 'create-task-block__input'
createTaskInput.placeholder = 'Введите задачу...'
createTaskInput.name = 'taskName'

const submitButton = document.createElement('button')
submitButton.type = 'submit'
submitButton.className = 'create-task-block__button'
submitButton.textContent = 'Создать'
createTaskBlock.append(createTaskInput, submitButton)

createTaskBlock.addEventListener('submit', (event) => {

    if (document.querySelector('.error-message-block')) {
        document.querySelector('.error-message-block').remove()
    }

    const {target} = event
    event.preventDefault()

    const errorBlock = document.createElement('span')
    errorBlock.className = 'error-message-block'
    text = target.taskName.value

    const res = tasks.find((task) => {
        return task.text === text
    })
    if (res) {
        errorBlock.textContent = 'Задача с таким названием уже существует'
        createTaskBlock.append(errorBlock)
    } else if (text === '') {
        errorBlock.textContent = 'Название задачи не должно быть пустым'
        createTaskBlock.append(errorBlock)
    } else {
        const newTask = {}
        newTask.id = Date.now().toString()
        newTask.text = text
        newTask.completed = false
        tasks.push(newTask)
        createTask(newTask)

    }
})


tasks.forEach((task) => {
    if (!postedTasks.includes(task)) {
        createTask(task)
    }
})

const createDeleteModal = (button) => {
    const modal = document.createElement('div')
        modal.className = 'modal-overlay'

        const deleteModal = document.createElement('div')
        deleteModal.className = 'delete-modal'

        const deleteModalQuestion = document.createElement('h3')
        deleteModalQuestion.className = 'delete-modal__question'
        deleteModalQuestion.textContent = 'Вы действительно хотите удалить эту задачу?'

        const deleteModalButtons = document.createElement('div')
        deleteModal.className = 'delete-modal__buttons'
        const cancelButton = document.createElement('button')
        cancelButton.className = 'delete-modal__button delete-modal__cancel-button'
        cancelButton.textContent = 'Отмена'

        const confirmButton = document.createElement('button')
        confirmButton.className = 'delete-modal__confirm-button delete-modal__button'
        confirmButton.textContent = 'Удалить'

        deleteModalButtons.append(cancelButton, confirmButton)
        deleteModal.append(deleteModalQuestion, deleteModalButtons)
        modal.append(deleteModal)
        document.body.append(modal)
        modal.classList.remove('modal-overlay_hidden')
    
        cancelButton.addEventListener('click', () => {
            modal.classList.add('modal-overlay_hidden')
        })

        confirmButton.addEventListener('click', () => {
            const taskToDelete = document.querySelector(`[data-task-id="${button.dataset.deleteTaskId}"]`)

            taskToDelete.remove()
            modal.classList.add('modal-overlay_hidden')
            const index = tasks.findIndex((obj) => {
                return obj.id === button.dataset.deleteTaskId
            })
            delete tasks[index]
        })
}


const allDeleteButtons = document.querySelectorAll('.task-item__delete-button')
allDeleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
        createDeleteModal(deleteButton)
    })
})

createTaskBlock.append(createTaskInput, submitButton)
document.body.prepend(createTaskBlock)


document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        darkMode = !darkMode
        changeColor(darkMode)
    }
})