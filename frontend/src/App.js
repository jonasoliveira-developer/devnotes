import React,{useState, useEffect} from 'react'
import './App.css'
import './aside.css'
import './container.css'
import './main.css'

import api from './service/Api'

import Notes from './components/notes'



function App() {

  const [title , setTitle] = useState('')
  const [notes , setNotes] = useState('')
  const [allNotes, setAllNotes] = useState([])

  useEffect(() => {
    const getAllNotes = async () => {
      const response = await api.get('/annotations')
      setAllNotes(response.data)
    }
    getAllNotes()
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await api.post('/annotations', {
        title,
        notes,
        priority:false
    })
    setTitle('')
    setNotes('')
    setAllNotes([...allNotes, response.data])
  }

  useEffect(() => {
     const unableSubmitButton = () => {
        let btn = document.getElementById('btn_submit')
        btn.style.background= '#FFD3CA'
          if(title && notes) {
            btn.style.background = '#EB8F7A'
            btn.style.transition = 'all ease.7s'
          }
     }
     unableSubmitButton()

  },[title,notes])


  return (
    <div id="app">
     
        <aside>
          <strong>Caderno de Notas</strong>
          <form onSubmit={handleSubmit}>
              <div className="input-block">
                   <label htmlFor="title">Titulo da anotação</label>
                   <input
                   required
                    value={title}
                    onChange={e =>setTitle(e.target.value)}
                     />
              </div>  

              <div className="input-block">
                  <label htmlFor="nota">Anotações</label>
                  <textarea 
                  required
                  value={notes}
                  onChange={e=>setNotes(e.target.value)}
                  />
              </div>  
              <button type="submit" id="btn_submit">Salvar</button>
          </form>
        </aside>

        <main>
          <ul>
            {allNotes.map((data,key)=>(
                <Notes data={data} key={key} />
            ))}
              
            
          </ul>
        </main>
    </div>
    
  )
}

export default App;
