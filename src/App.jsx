import { useEffect, useState } from 'react'
import './App.scss'
import emptyLogo from'./assets/empty1.png'

function App() {
  // todolist
  const [todoList, setTodoList] = useState([]);
  const [selectedList, setSelectList] = useState([]);
  useEffect(() => {
    setSelectList(todoList);
  }, [])

  // 待完成數量
  const [undo, setUndo] = useState(0);
  useEffect(() => {
    const obj = todoList.filter((item) => !item.status)
    setUndo(obj.length)
    
    // selectList 計算
    changeTab('', '');
  }, [todoList]);

  // 新增 todo
  const [newTodo, setNewTodo] = useState('')
  const changeNewTodo = (e) => {
    setNewTodo(e.target.value);
  }
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      addNewTodo(e);
    }
  }
  const addNewTodo = (e) => {
    e.preventDefault();
    if (!newTodo) {
      return alert('請輸入新增待辦');
    }
    const obj = {
      id: new Date(),
      content: newTodo,
      status: false
    }

    setTodoList([...todoList, obj]);
    setNewTodo('');
  }

  // 刪除 todo
  const deleteTodo = (e, id) => {
    e.preventDefault();
    const obj = todoList.filter((todo) => todo.id !== id);
    setTodoList(obj);
  }

  // 編輯 todo 狀態
  const editTodoStatus = (id) => {
    const obj = [...todoList];
    obj.forEach((item) => {
      if (item.id === id) {
        item.status = !item.status;
      }
    })
    setTodoList(obj);
  }

  // 刪除所有已完成項目
  const removeAllDone = (e) => {
    e.preventDefault();
    const obj = todoList.filter((todo) => !todo.status);
    setTodoList(obj);
  }

  // 切換分頁 tab
  const [tab, setTab] = useState('');
  const changeTab = (e, tab) => {
    if (e) e.preventDefault();
    setTab(tab);
    let obj = []
    if (tab === '') {
      obj = todoList;
    } else if (tab === 'undo') {
      obj = todoList.filter((todo) => !todo.status);
    } else if (tab === 'done') {
      obj = todoList.filter((todo) => todo.status);
    }

    setSelectList(obj);
  }

  return (
    <>
      <div id="todoListPage" className="bg-half">
        <nav>
            <h1><a href="#">ONLINE TODO LIST</a></h1>
        </nav>
        <div className="conatiner todoListPage vhContainer">
            <div className="todoList_Content">
                <div className="inputBox">
                    <input type="text" placeholder="請輸入待辦事項" onChange={changeNewTodo} value={newTodo} onKeyDown={handleEnter} />
                    <a href="#" onClick={(e) => addNewTodo(e)}>
                        <i className="fa fa-plus"></i>
                    </a>
                </div>
                {
                  todoList.length ? (
                    <div className="todoList_list">
                      <ul className="todoList_tab">
                          <li><a href="#" className={ tab === '' ? "active" : ''} onClick={(e) => changeTab(e, '')}>全部</a></li>
                          <li><a href="#" className={ tab === 'undo' ? "active" : ''} onClick={(e) => changeTab(e, 'undo')}>待完成</a></li>
                          <li><a href="#" className={ tab === 'done' ? "active" : ''} onClick={(e) => changeTab(e, 'done')}>已完成</a></li>
                      </ul>
                    <div className="todoList_items">
                      {
                        selectedList.length ? (
                          <ul className="todoList_item">
                            {
                              selectedList.map((todo) => {
                                return (
                                  <li key={todo.id}>
                                    <label className="todoList_label">
                                        <input className="todoList_input" type="checkbox" value={todo.status}
                                        checked={todo.status} onChange={() => editTodoStatus(todo.id)}/>
                                        <span>{todo.content}</span>
                                    </label>
                                    <a href="#" onClick={(e) => deleteTodo(e, todo.id)}>
                                        <i className="fa fa-times"></i>
                                    </a>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        ) : (
                          <div className="text-center">
                            <p className="empty-margin-bottom">目前尚無{ tab === 'done' ? '已完成': '待完成'}事項</p>
                          </div>
                        )
                      }
                      
                      <div className="todoList_statistics">
                              <p> {undo} 個待完成項目</p>
                              <a href="#" onClick={(e) => removeAllDone(e)}>清除已完成項目</a>
                          </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center empty-margin-top">
                      <p className="empty-margin-bottom">目前尚無待辦事項</p>
                      <img src={emptyLogo} alt="" style={{maxWidth: '240px'}}/>
                    </div>
                  )
                }
            </div>
        </div>
    </div>
    </>
  )
}

export default App
