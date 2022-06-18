import React from 'react'

const FormRowSelect = ({name,labelText,value,handleChange,arrayDisplay}) => {
  return (
    <div className='form-row'>
    <label htmlFor={name} className='form-label'>
        {labelText || name}
    </label>
    <select name={name} value = {value} 
                           onChange = {handleChange}
                           className = "form-select">

         {arrayDisplay.map((item,index)=>{
             return (
               <option key = {index} value = {item}>
                     {item}
               </option>
             )
         })}
     </select>
 </div>
  )
}

export default FormRowSelect
