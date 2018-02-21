import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {createPost} from '../actions'

class PostsNew extends Component {
  renderField(field){
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`

    return(
      <div className={className}>
        <label>{field.label}</label> {/*this property is being passed in by the Field component*/}
        <input
          className='form-control'
          {...field.input} //The ... is jsx that will get all the properties available with fiel.input.. Refer to 134
          type='text'
        />
        <div className='text-help'>
          {field.meta.touched ? field.meta.error : ''} {/*will show empty string if field not touched*/}
        </div>
      </div>
    )
  }

  onSubmit(values){
    this.props.createPost(values, ()=>{
      this.props.history.push('/'); //sends us back to the main page
    });
  }

  render(){
    const {handleSubmit} = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field // Field component is responsible for event handling and state
          label='Title'
          name='title'
          component={this.renderField} //this is a function. No need to put () because Field will call that function for us
        />
        <Field
          label='Categories'
          name='categories' //this property is important for form validation. If name does not match errors property, it will not work
          component={this.renderField}
        />
        <Field
          label='Content'
          name='content'
          component={this.renderField}
        />
        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link to='/l' className='btn btn-danger'>Cancel</Link>
      </form>
    )
  }
}

function validate(values){
  const errors = {};


  if(!values.title){
    errors.title = "Enter a title!"
  }
  if(!values.categories){
    errors.categories = "Enter some categories!"
  }
  if(!values.content){
    errors.content = "Enter some content!"
  }

  return errors; // if errors is empty, the form is fine to submit. If errors has any properties, redux form assumes form is invalid
}

export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'})(
    connect(null, {createPost})(PostsNew)
  );
