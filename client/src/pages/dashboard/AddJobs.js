import React from 'react'
import { FormRow, Alert } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useAppContext } from '../../context/appContext';
import FormRowSelect from '../../components/FormRowSelect';
import { MdEscalatorWarning } from 'react-icons/md';


const AddJobs = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob ,
    
  } = useAppContext()
 
  // handleSubmit 
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!position || ! company || !jobLocation){
      displayAlert();
      return; 
    }
    if(isEditing){
      editJob()
      return ; 
    }
    // adJob 
    createJob();
    // console.log('create the job'); 
  }

  // handle Job input 
  const handleJobInput = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    handleChange({name, value});
    // console.log(`${name}: ${value}`)
  }


  return (
    <Wrapper>
    <form className='form'>
      <h3>{isEditing ? 'edit job' : 'add job'} </h3>
      {showAlert && <Alert />}

      {/* position */}
      <div className='form-center'>
        <FormRow
          type='text'
          name='position'
          value={position}
          handleChange={handleJobInput}
        />
        {/* company */}
        <FormRow
          type='text'
          name='company'
          value={company}
          handleChange={handleJobInput}
        />
        {/* location */}
        <FormRow
          type='text'
          labelText='location'
          name='jobLocation'
          value={jobLocation}
          handleChange={handleJobInput}
        />
        {/* job type */}
        {/* <div className='form-row'>
         // {name,labelText,value,handleChange,arrayDisplay}

           <label htmlFor='jobType' className='form-label'>Job type</label>
           <select name='jobType' value = {jobType} 
                                  onChange = {handleJobInput}
                                  className = "form-select">

                {jobTypeOptions.map((item,index)=>{
                    return (
                      <option key = {index} value = {item}>
                            {item}
                      </option>
                    )
                })}
            </select>
        </div> */}
        <FormRowSelect 
          name = 'jobType' 
          labelText="job type" 
          value = {jobType} 
          handleChange = {handleJobInput}
          arrayDisplay = {jobTypeOptions}
        />

        {/* job status */}
        
        <FormRowSelect 
          name = 'status' 
          labelText="job status" 
          value = {status} 
          handleChange = {handleJobInput}
          arrayDisplay = {statusOptions}
        />
      

        <div className='btn-container'>
          <button
            className='btn btn-block submit-btn'
            type='submit'
            onClick={handleSubmit}
          >
            submit
          </button>


          <button className='btn btn-block clear-btn'
            onClick={(e) => {
                e.preventDefault()
                clearValues();
            }}
          >
            clear
          </button>
        </div>

      

    
      </div>
    </form>
  </Wrapper>
  )
}

export default AddJobs
