import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions";

export class StreamCreate extends Component {
  renderInput = formProps => {
    console.log(formProps);
    const className = `field ${
      formProps.meta.error && formProps.meta.touched ? "error" : ""
    }`;
    return (
      <div className={className}>
        <label>{formProps.label}</label>
        <input {...formProps.input} autoComplete="off" />
        {this.renderError(formProps.meta)}
      </div>
    );
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    //console.log(this.props);
    return (
      <div>
        <form
          className="ui form error"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field
            name="title"
            component={this.renderInput}
            label="Enter Title"
          />
          <Field
            name="description"
            component={this.renderInput}
            label="Enter Description"
          />
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

const Validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    // only ran if the user did not enter a title
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    // only ran if the user did not enter a description
    errors.description = "You must enter a description";
  }

  return errors;
};

const formWrapped = reduxForm({
  form: "streamCreate",
  validate: Validate
})(StreamCreate);

export default connect(
  null,
  {
    createStream
  }
)(formWrapped);
