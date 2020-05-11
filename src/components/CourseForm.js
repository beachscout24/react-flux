import React from "react";
import TextInput from "../common/TextInput";
import PropTypes from "prop-types";

export default function CourseForm(props) {
  return (
    <form className="form-group" onSubmit={props.onSubmit}>
      <TextInput
        label="Title"
        name="title"
        id="title"
        value={props.course.title}
        error={props.errors.title}
        onChange={props.onChange}
      />

      <div className="form-group">
        <label htmlFor="author">Author</label>
        <div className="field">
          <select
            id="author"
            name="authorId"
            className="form-control selectpicker col-sm-4"
            onChange={props.onChange}
            value={props.course.authorId || ""}
          >
            <option value="" />
            <option value="">Idiot</option>;
          </select>
        </div>
        {props.errors.authorId && (
          <div className="alert alert-danger">{props.errors.authorId}</div>
        )}
      </div>

      <TextInput
        name="category"
        id="category"
        label="Category"
        onChange={props.onChange}
        value={props.course.category}
        error={props.errors.category}
      />
      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
