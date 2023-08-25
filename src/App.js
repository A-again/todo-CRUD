import React, { useState } from 'react'
import TodoSubject from './components/TodoSubject.js'
import './App.css'
import Createtodo from './components/Createtodo.js'
import Todo from './components/Todo.js'
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"
import { db } from './Firebase.js'

function App () {
  // 使用useState钩子初始化todos状态为空数组
  const [todos, setTodos] = useState([])
  console.log(todos)
  // 使用useEffect钩子在组件挂载后执行一次
  React.useEffect(() => {
    // 创建一个查询，获取Firestore数据库中"todos"集合的所有文档
    const q = query(collection(db, "todos"))

    // 开始监听查询的结果，当结果发生变化时，执行回调函数
    const unsub = onSnapshot(q, (querySnapshot) => {
      // 创建一个新的数组来存储todos
      let todosArray = []
      // 遍历查询结果中的每个文档
      querySnapshot.forEach((doc) => {
        // 将文档的数据和id添加到todos数组中
        todosArray.push({ ...doc.data(), id: doc.id })
      })
      // 使用setTodos函数更新todos状态
      setTodos(todosArray)
    })

    // 返回一个函数，该函数在组件卸载时执行，用于取消监听
    return () => unsub()
  }, [])

  // 定义一个异步函数，用于编辑一个todo
  const handleEdit = async (todo, Subject) => {
    // 更新Firestore数据库中对应的文档
    await updateDoc(doc(db, "todos", todo.id), { Subject: Subject })
  }

  // 定义一个异步函数，用于切换一个todo的完成状态
  const toggleComplete = async (todo) => {
    // 更新Firestore数据库中对应的文档
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed })
  }

  // 定义一个异步函数，用于删除一个todo
  const handleDelete = async (id) => {
    // 删除Firestore数据库中对应的文档
    await deleteDoc(doc(db, "todos", id))
  }

  // 渲染组件
  return (
    <div className="App">
      <TodoSubject />
      <Createtodo />
      {/* 遍历todos数组，为每个todo渲染一个Todo组件 */}
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          handleDelete={handleDelete}
          toggleComplete={toggleComplete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  )
}

export default App
