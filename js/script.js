"use strict";
let elForm = document.querySelector('.form')
let elInput = document.querySelector('.form-control')
let elList = document.querySelector('.list')

let elAll = document.querySelector('.all_btn')
let elComplated = document.querySelector('.completed_btn')
let elUlcomplated = document.querySelector('.uncompleted_btn')


let todos = []



elList.addEventListener('click', function(evt){
    if(evt.target.matches('.delete-btn')){
        let btnTodoId = evt.target.dataset.todoId * 1
        let foundIndex = todos.findIndex((todo) => todo.id === btnTodoId)
        todos.splice(foundIndex, 1)

        elList.innerHTML = null
        renserTodos(todos, elList)
    }else if(evt.target.matches('.checkbox-btn')){
        let chekcTodoId = evt.target.dataset.checkId * 1

        let foundCheckTodo = todos.find(todo => todo.id === chekcTodoId)
        foundCheckTodo.isComplated = !foundCheckTodo.isComplated
        console.log(foundCheckTodo);

        elList.innerHTML = null
        renserTodos(todos, elList)
    }
})

const renserTodos = function(arr, element){
    arr.forEach(function(todo){
        let newItem = document.createElement('li')
        let newCheckBox = document.createElement('input')
        let newDeleteBtn = document.createElement('button')
        newItem.textContent = todo.title
        newCheckBox.type = 'checkbox'
        newDeleteBtn.textContent = 'Delete'
        newDeleteBtn.classList.add('delete-btn')
        newCheckBox.classList.add('checkbox-btn')

        newDeleteBtn.dataset.todoId = todo.id
        newCheckBox.dataset.checkId = todo.id

        if(todo.isComplated){
            newCheckBox.checked = true
            newItem.style.textDecoration = 'line-through'
        }

        element.appendChild(newItem)
        newItem.appendChild(newCheckBox)
        newItem.appendChild(newDeleteBtn)
    })
}

elForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    let inputValue = elInput.value

    const newTodo = {
        id: todos[todos.length - 1]?.id + 1 || 0,
        title: inputValue,
        isComplated: false,
    }

    todos.push(newTodo)

    elList.innerHTML = null
    elInput.value = null

    renserTodos(todos, elList)
})