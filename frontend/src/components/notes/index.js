import React,{useState} from 'react'

import './style.css'
import './style.priority.css'

import { AiTwotoneDelete, AiOutlineExclamationCircle } from "react-icons/ai"

import api from '../../service/Api'


function Notes ({data, handleDelete , handleChangePriority}) {

    const [changeNote, setChangeNote] = useState('')

    const handleSave = async(e,notes) => {
        e.style.boxShadow ="none";
        e.style.cursor = 'default';
        if(changeNote && changeNote !== notes) {
            await api.post(`/contents/${data._id}`, {
                notes:changeNote
            })
        }

    }

    const handleEdit = (e,priority) => {
        e.style.cursor = 'text';
        e.style.borderRadius = "5px";

        if(priority) {
            e.style.boxShadow = "0 0 5px #FFF";
        }else{
            e.style.boxShadow = "0 0 5px gray";
        }
    }

  
    return (
        <>
         <li className={data.priority ? "notepads-info-priority" : "notepads-info"}>
                <div>
                  <strong>{data.title}</strong>
                  <div>
                     <AiTwotoneDelete  size="20"
                     onClick={()=> handleDelete(data._id)}
                     />
                  </div>
                </div>

                <textarea defaultValue={data.notes}

                    onChange={e =>setChangeNote(e.target.value)}
                    onBlur={e=>handleSave(e.target,data.notes)}
                    onClick={e=>handleEdit(e.target,data.priority)}
                />
                <span>
                    <AiOutlineExclamationCircle  size="20"
                        onClick={()=>handleChangePriority(data._id)}
                    />
                </span>
            </li>
            
        </>
    )
}

export default Notes