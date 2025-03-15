import React from 'react'
import { useReducer } from 'react'
import {useCreateOrderMutation} from'../state/orderApi'


const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}


const reducer = (state,action) =>{
  switch(action.type){
    case 'UPDATE_INPUT':{
      let {name ,value, type, checked} = action.payload 
      value =(type == 'checkbox'? checked :value)
      return { ...state, [name]: value };
    }
    case 'SET_ERROR':
      return { ...state, error: action.message };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'RESET_FORM':
      return { ...initialFormState }; 
    default: 
      return state;
    
  }
}
                        


export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState)
  const [createOrder, {isLoading, error }] = useCreateOrderMutation()
  const onChange = ({target:{name, value}}) =>{
  dispatch({type:'UPDATE_INPUT', payload: {name, value} })
  }
  const handleTextChange = (e)=> {
    const {name, value} = e.target;
    dispatch({type:'UPDATE_INPUT',payload: {name ,value}})   
  }
  const handleCheckboxChange = (e)=>{
    const {name, checked ,type }=e.target;
      dispatch({type:'UPDATE_INPUT',payload: { name, checked, type}})
  }
  const onSubmit = evt => {
    evt.preventDefault()
    const {fullName , size , ...toppingselection } = state
   
    let toppings = [];
    Object.keys(toppingselection).forEach(key => {
      if (toppingselection[key]) {
        toppings.push(key);  
      }
    });
    let newOrder = {fullName, size , toppings}
    console.log ('order',newOrder)
    
    createOrder (newOrder)
    .unwrap()
    .then(data =>{
      dispatch({ type:'RESET_FORM'
      })
      
    })    
   .catch(err => {
    console.log (err)
   })
  console.log ('formstate',state)
};
    
    
   console.log(error) 
                   
  return (
    <form onSubmit={onSubmit}>
      <h2>Pizza Form</h2>
      
      {isLoading && <div className='pending'>Order in progress...</div>}
      {error && <div className='failure'>{error.data.message} </div>}
      

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            onChange = {onChange}
            name="fullName"
            value={state.fullName}
            placeholder="Type full name"
            type="text"
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select onChange={handleTextChange} data-testid="sizeSelect" value={state.size} id="size" name="size">
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input onChange={handleCheckboxChange} checked= {state['1']} data-testid="checkPepperoni" name="1" type="checkbox" />
          Pepperoni<br /></label>
        <label>
          <input onChange={handleCheckboxChange}  checked= {state['2']} data-testid="checkGreenpeppers" name="2" type="checkbox" />
          Green Peppers<br /></label>
        <label>
          <input onChange={handleCheckboxChange}  checked= {state['3']} data-testid="checkPineapple" name="3" type="checkbox" />
          Pineapple<br /></label>
        <label>
          <input onChange={handleCheckboxChange} checked= {state['4']}  data-testid="checkMushrooms" name="4" type="checkbox" />
          Mushrooms<br /></label>
        <label>
          <input onChange={handleCheckboxChange} checked= {state['5']} data-testid="checkHam" name="5" type="checkbox" />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
