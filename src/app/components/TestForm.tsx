import React, { ReactNode } from "react";
import * as Yup from "yup";
import { useFormik, FormikValues } from "formik";

interface Layout {
  order?: number;
  width?: string;
  wrapperClassName?: string;
}

interface Field {
  type: "text" | "email" | "number" | "select" | "date";
  name: string;
  label: string;
  validation: {
    required?: boolean;
    minLength?: number;
    min?: number;
    max?: number;
    minDate?: string;
    maxDate?: string;
    regexPattern?: string;
    errorMessage?: string;
  };
  options?: string[];
  className?: string;
  layout?: Layout;
}

interface FormConfig {
  formTitle: string;
  formClassName?: string;
  fields: Field[];
}

interface DynamicFormProps {
  formConfig: FormConfig;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formConfig }) => {
  const formik = useFormik({
    initialValues: formConfig.fields.reduce(
      (values, field) => ({
        ...values,
        [field.name]: "",
      }),
      {} as FormikValues
    ),
    validationSchema: Yup.object(
      formConfig.fields.reduce((schema, field) => {
        let validator: Yup.StringSchema | Yup.NumberSchema | Yup.DateSchema =
          Yup.string();

        if (field.type === "number") {
          validator = Yup.number().typeError("This field must be a number");
        } else if (field.type === "date") {
          validator = Yup.date().typeError("This field must be a date");
        } else if (field.type === "email") {
          validator = Yup.string()
            .email(
              `${
                field?.validation?.errorMessage
                  ? field.validation.errorMessage
                  : "Invalid email format"
              }`
            ) // Custom email format validation
            .typeError("This field must be a valid email");
        } else {
          validator = Yup.string();
        }

        if (field.validation?.required) {
          validator = validator.required("This field is required");
        }

        if (field.validation?.minLength && field.type === "text") {
          validator = validator.min(
            field.validation.minLength,
            `Minimum length is ${field.validation.minLength}`
          );
        }
        if (field.validation?.min && field.type === "number") {
          validator = (validator as Yup.NumberSchema).min(
            field.validation.min,
            `Minimum value is ${field.validation.min}`
          );
        }
        if (field.validation?.max && field.type === "number") {
          validator = (validator as Yup.NumberSchema).max(
            field.validation.max,
            `Maximum value is ${field.validation.max}`
          );
        }

        if (field.validation?.minDate && field.type === "date") {
          validator = (validator as Yup.DateSchema).min(
            new Date(field.validation.minDate),
            `Minimum date is ${field.validation.minDate}`
          );
        }

        if (field.validation?.maxDate && field.type === "date") {
          validator = (validator as Yup.DateSchema).max(
            new Date(field.validation.maxDate),
            `Maximum date is ${field.validation.maxDate}`
          );
        }

        if (field.validation?.regexPattern && field.type === "text") {
          validator = (validator as Yup.StringSchema).matches(
            new RegExp(field.validation.regexPattern),
            "Invalid format"
          );
        }

        return {
          ...schema,
          [field.name]: validator,
        };
      }, {})
    ),
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });

  return (
    <form className={formConfig.formClassName} onSubmit={formik.handleSubmit}>
      <h2 className="my-4 mb-4 pl-6 font-bold text-lg">
        {formConfig.formTitle}
      </h2>
      <div className="flex flex-wrap">
        {formConfig.fields.map((field) => (
          <div
            // ${field.layout?.width === "1/2" ? "w-1/2" : "w-full"}
            className={`
              ${field.layout?.wrapperClassName || ""}
              `}
            key={field.name}
          >
            <div>
              <label className="mr-4 mb-1 block" htmlFor={field.name}>
                {field.label}
              </label>
              {field.type === "text" ||
              field.type === "email" ||
              field.type === "number" ||
              field.type === "date" ? (
                <input
                  className={field.className}
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  min={
                    field.type === "number" || field.type === "date"
                      ? field.validation.min
                      : undefined
                  }
                  max={
                    field.type === "number" || field.type === "date"
                      ? field.validation.max
                      : undefined
                  }
                />
              ) : field.type === "select" ? (
                <select
                  className={field.className}
                  name={field.name}
                  id={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" label="Select an option" />
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
            {formik.touched[field.name] && formik.errors[field.name] ? (
              <div className="text-red-600 text-sm">
                {formik.errors[field.name] as any}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-24 mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
