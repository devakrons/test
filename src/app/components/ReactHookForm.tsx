import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Define interfaces for form field and form configuration
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
  };
  options?: string[]; // For select fields
}

interface FormConfig {
  formTitle: string;
  fields: Field[];
}

interface DynamicFormProps {
  formConfig: FormConfig;
}

// Define types for form values
interface FormValues {
  [key: string]: any;
}

// DynamicForm Component with react-hook-form
const DynamicForm: React.FC<DynamicFormProps> = ({ formConfig }) => {
  // Create Yup validation schema dynamically
  const validationSchema = Yup.object().shape(
    formConfig.fields.reduce((schema, field) => {
      let validator: Yup.StringSchema | Yup.NumberSchema | Yup.DateSchema =
        Yup.string();

      if (field.type === "number") {
        validator = Yup.number().typeError("This field must be a number");
      } else if (field.type === "date") {
        validator = Yup.date()
          .typeError("This field must be a date")
          .transform((value, originalValue) => {
            // Ensure the date is correctly instantiated
            return originalValue ? new Date(originalValue) : value;
          });
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

      if (field.validation?.min && field.type === "date") {
        console.log("validator has been set for min date");
        validator = (validator as Yup.DateSchema).min(
          new Date(field.validation.min),
          `Minimum date is ${new Date(
            field.validation.min
          ).toLocaleDateString()}`
        );
      }

      if (field.validation?.max && field.type === "date") {
        validator = (validator as Yup.DateSchema).max(
          new Date(field.validation.max),
          `Maximum date is ${new Date(
            field.validation.max
          ).toLocaleDateString()}`
        );
      }

      return {
        ...schema,
        [field.name]: validator,
      };
    }, {} as Record<string, any>)
  );

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Submitted", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>{formConfig.formTitle}</h2>
      {formConfig.fields.map((field) => (
        <div key={field.name} style={{ marginBottom: "20px" }}>
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === "text" ||
          field.type === "email" ||
          field.type === "number" ||
          field.type === "date" ? (
            <input
              type={field.type}
              {...register(field.name)}
              id={field.name}
            />
          ) : field.type === "select" ? (
            <select {...register(field.name)} id={field.name}>
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : null}

          {/* Display validation errors */}
          {errors[field.name] && (
            <div style={{ color: "red" }}>
              {errors[field.name]?.message as string}
            </div>
          )}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
