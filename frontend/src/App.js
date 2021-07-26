import React,{useState, useEffect} from 'react'
import './App.css'
import './aside.css'
import './container.css'
import './main.css'

import api from './service/Api'

import Notes from './components/notes'
import RadioButtom from './components/radioButton'



function App() {
  const [selectedValue, setSelectedValue] = useState('all')
  const [title , setTitle] = useState('')
  const [notes , setNotes] = useState('')
  const [allNotes, setAllNotes] = useState([])

  useEffect(() => {
    getAllNotes()

  },[])

  const getAllNotes = async () => {
    const response = await api.get('/annotations')
    setAllNotes(response.data)
  }

  const loadNotes = async (option) => {
      const params = {priority:option}
      const response = await api.get('/priorities', {params})

      setAllNotes(response.data)
  }

  const handleChange = (e) => {
      setSelectedValue(e.value)
        if(e.checked && e.value !== 'all'){
        loadNotes(e.value)
        }else{
          getAllNotes()
        }
  }

  const handleDelete = async (id) => {
      const noteDelete = await api.delete(`/annotations/${id}`)
      if(noteDelete) {
          setAllNotes(allNotes.filter(note => note._id !== id))
      }else {
          getAllNotes()
      }
  }

  const handleChangePriority = async(id) => {
       const changePriority = await api.post(`/priorities/${id}`) 

       if(changePriority && selectedValue !== 'all'){
          loadNotes(selectedValue)
       }
       else if(changePriority) {
         getAllNotes()
         
       }

       
  }

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

    if(selectedValue !== 'all'){
      setSelectedValue('all')
    }
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
                   maxLength="21"
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
          <RadioButtom
            selectedValue={selectedValue}
            handleChange={handleChange}
          />
        </aside>
       

        <main>
          <ul>
            {allNotes.map((data,key)=>(
                <Notes 
                data={data} 
                key={key} 
                handleDelete={handleDelete}
                handleChangePriority={handleChangePriority}
                />

            ))}
              
            
          </ul>
        </main>
    </div>
    
  )
}

export default App;
