import Select from 'react-select';
import { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '../../slices/categorySlice';


const options = [

    {value: '', label: ''}
]

const CategoryDropdown = (props) => {

const dispatch = useDispatch()

const categoryState = useSelector(state => state.category)
const { category, appError, serverError } = categoryState

useEffect(() => {

dispatch(fetchAllCategories())
}, [dispatch])

const allCategories = category?.map(categoryOption => {

    return {

        label: categoryOption?.title,
        value: categoryOption._id
    }
})

//handle change
const handleChange = (value) => {

props.onChange('category', value)
}

//blur
const handleBlur = () => {

    props.onBlur('category', true)
}

  return (
    <div style={{margin: '1rem 0'}}>
    <Select 
    options={ allCategories }
    id='category'
    value={props.label}
    onChange={handleChange}
    onBlur={handleBlur}
     
     />
  {/* error */}
  {props.error &&  <div style={{color: 'red', marginTop: '.5rem'}}>{props.error}</div>}

  </div>
 
  )
  
}
export default CategoryDropdown