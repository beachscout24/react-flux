import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import { toast } from "react-toastify";
import courseStore from "../stores/CourseStore";
import authorStore from "../stores/AuthorStore";
import * as courseActions from "../actions/courseActions";
import * as authorActions from "../actions/authorActions";

export default function ManageCoursePage(props) {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    title: "",
    authorId: null,
    category: "",
  });
  const [authors, setAuthors] = useState(authorStore.getAuthors);
  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug;
    if (courses.length === 0) courseActions.loadCourses();
    else if (slug) {
      const _course = courseStore.getCourseBySlug(slug);
      if (_course) setCourse(_course);
      else props.history.push("/bogus");
    }

    authorStore.addChangeListener(onChange);
    if (authors.length === 0) authorActions.loadAuthors();

    return () => {
      courseStore.removeChangeListener(onChange);
      authorStore.removeChangeListener(onChange);
    };
  }, [courses.length, props.history, props.match.params.slug, authors.length]);

  function onChange() {
    setCourses(courseStore.getCourses());
    setAuthors(authorStore.getAuthors());
  }

  function formIsValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title is Required";
    if (!course.authorId) _errors.authorId = "Author is Required";
    if (!course.category) _errors.category = "Category is Required";

    setErrors(_errors);
    // Form is Valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleChange({ target }) {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course Saved");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        authors={authors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}
