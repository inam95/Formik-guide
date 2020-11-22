import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import React from "react";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: ""
  },
  phoneNumbers: ["", ""],
  phNumbers: [""]
};

const onSubmit = (data) => console.log(data);

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid").required("Required"),
  channel: Yup.string().required("Required")
});

function YoutubeForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnMount
    >
      <Form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" id="name" />
          <ErrorMessage name="name" component={TextError} />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <Field type="email" name="email" id="email" />
          <ErrorMessage name="email" component={TextError} />
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <Field
            type="text"
            name="channel"
            id="channel"
            placeholder="Channel name"
          />
          <ErrorMessage name="channel" component={TextError} />
        </div>
        <div className="form-control">
          <label htmlFor="comments">Comments</label>
          <Field
            as="textarea"
            rows={10}
            name="comments"
            id="comments"
            placeholder="Comments"
          />
          <ErrorMessage name="comments" component={TextError} />
        </div>
        <div className="form-control">
          <label htmlFor="address">Address</label>
          <Field name="address">
            {({ field, form, meta }) => {
              return (
                <div>
                  <input
                    type="text"
                    id="address"
                    {...field}
                    value={field.value}
                  />
                  {meta.touched && meta.error && <p>{meta.error}</p>}
                </div>
              );
            }}
          </Field>
          <ErrorMessage name="address" />
        </div>
        <div className="form-control">
          <label htmlFor="facebook">Facebook profile</label>
          <Field
            type="text"
            name="social.facebook"
            id="facebook"
            placeholder="Facebook"
          />
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter profile</label>
          <Field
            type="text"
            name="social.twitter"
            id="twitter"
            placeholder="Twitter"
          />
        </div>

        <div className="form-control">
          <label htmlFor="primaryPhone">PhoneNumber 1</label>
          <Field type="text" name="phoneNumbers[0]" id="primaryPhone" />
        </div>
        <div className="form-control">
          <label htmlFor="secondaryPhone">PhoneNumber 2</label>
          <Field type="text" name="phoneNumbers[1]" id="secondaryPhone" />
        </div>

        <div className="form-control">
          <label htmlFor="ph-list">List of phone numbers</label>
          <FieldArray name="phNumbers">
            {({ push, remove, form }) => {
              const {
                values: { phNumbers }
              } = form;

              console.log(phNumbers);
              return (
                <div>
                  {phNumbers.map((p, i) => (
                    <div key={i}>
                      <Field name={`phNumbers[${i}]`} value={phNumbers[i]} />
                      <button type="button" onClick={() => push()}>
                        +
                      </button>
                      {i > 0 && (
                        <button type="button" onClick={() => remove(i)}>
                          -
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default YoutubeForm;
