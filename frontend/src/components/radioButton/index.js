import React from "react"
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'

import './style.css'

function RadioButtom ({selectedValue, handleChange}) {
  
const CustumRadio = withStyles({
    root: {
      color: '#FFD3CA', '&$checked': { color: '#EB8F7A', },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);


    return (
        <div className="radioOptions">
            <div>
                <CustumRadio 
                checked={selectedValue === 'all'}
                onChange={e => handleChange(e.target)}
                value="all"
                />
                <span>Todos</span>
            </div>

            <div>
                <CustumRadio 
                checked={selectedValue === 'true'}
                onChange={e => handleChange(e.target)}
                value="true"
                />
                <span>Prioridades</span>
            </div>
            
            <div>
                <CustumRadio 
                checked={selectedValue === 'false'}
                onChange={e => handleChange(e.target)}
                value="false"
                />
                <span>Normal</span>
            </div>
        </div>
    )
}


export default RadioButtom