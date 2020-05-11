import React, { useState, useEffect } from "react";
import courseStore from "../stores/CourseStore";
import authorStore from "../stores/AuthorStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";
import { loadAuthors } from "../actions/authorActions";

export default function CoursesPage(props) {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    courseStore.addChangeListener(onChangeCourses);
    if (courseStore.getCourses().length === 0) {
      loadCourses();
    }

    authorStore.addChangeListener(onChangeAuthors);
    if (authorStore.getAuthors().length === 0) {
      loadAuthors();
    }

    return () => {
      courseStore.removeChangeListener(onChangeCourses); // cleanup on unmount;
      authorStore.removeChangeListener(onChangeAuthors); // cleanup on unmount
    };
  }, []);

  function onChangeCourses() {
    setCourses(courseStore.getCourses());
  }

  function onChangeAuthors() {
    setAuthors(authorStore.getAuthors());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList
        courses={courses}
        deleteCourse={deleteCourse}
        authors={authors}
      />
    </>
  );
}
