"use strict";
let elForm = document.querySelector('.form')
let elInput = document.querySelector('.form-control')
let elList = document.querySelector('.list')

let elBtnAll = document.querySelector('.all_btn')
let elBtnComplated = document.querySelector('.completed_btn')
let elBtnUlcomplated = document.querySelector('.uncompleted_btn')
let elDeleteBtn = document.querySelector('.delete__btn')
let elResult = document.querySelector('.allresult')
let elComplatedResult = document.querySelector('.completed-result')
let elUncomplatedResult = document.querySelector('.uncomplated-result')


let todos = []
let istoriya = []


elList.addEventListener('click', function(evt){
    if(evt.target.matches('.delete-btn')){
        let btnTodoId = evt.target.dataset.todoId * 1
        let foundIndex = todos.findIndex((todo) => todo.id === btnTodoId)
        istoriya.push(todos[foundIndex])
        todos.splice(foundIndex, 1)

        // console.log(istoriya);
        elResult.textContent = todos.length
        elList.innerHTML = null
        renserTodos(todos, elList)
    }else if(evt.target.matches('.checkbox-btn')){
        let chekcTodoId = evt.target.dataset.checkId * 1

        let foundCheckTodo = todos.find(todo => todo.id === chekcTodoId)
        foundCheckTodo.isComplated = !foundCheckTodo.isComplated


        elList.innerHTML = null
        renserTodos(todos, elList)
    }
})

const renserTodos = function(arr, element){
    elComplatedResult.textContent = todos.filter(todo => todo.isComplated).length
    elUncomplatedResult.textContent = todos.filter(todo => !todo.isComplated).length
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
            // complet.push(todos[foundCheckTodo])
            // console.log(complet);
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

    elResult.textContent = todos.length

    elList.innerHTML = null
    elInput.value = null

    renserTodos(todos, elList)
})


elBtnAll.addEventListener('click', function(){
    elList.innerHTML = null
    renserTodos(todos, elList)
})

elBtnComplated.addEventListener('click', function(){

    let completed = (todos.filter(todo => todo.isComplated))

    elList.innerHTML = null

    renserTodos(completed, elList)
})

elBtnUlcomplated.addEventListener('click', function(){
    let unCompleted = todos.filter(todo => !todo.isComplated)
    elList.innerHTML = null
    renserTodos(unCompleted, elList)
})

elDeleteBtn.addEventListener('click', function(){
    let deleteTodo = istoriya

    elList.innerHTML = null
    renserTodos(deleteTodo, elList)
})