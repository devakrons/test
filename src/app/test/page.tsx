// "use client";
// import React, { useEffect, useState } from "react";
// import DynamicForm from "../components/TestForm";
// import formData from "../../data/formData.json";

// const TestPage = () => {
//   const [formConfig, setFormConfig] = useState();

//   useEffect(() => {
//     const fetchFormConfig = async () => {
//       const data = JSON.parse(JSON.stringify(formData));

//       setFormConfig(data[2]);
//     };

//     fetchFormConfig();
//   }, [formData]);

//   return (
//     <div className="p-20">
//       {formConfig ? (
//         <DynamicForm formConfig={formConfig} />
//       ) : (
//         <p>Loading form...</p>
//       )}
//     </div>
//   );
// };

// export default TestPage;

"use client";
import React, { useEffect, useState } from "react";
import DynamicForm from "../components/TestForm";
import formData from "../../data/formData.json";

const TestPage = () => {
  const [formConfig, setFormConfig] = useState();

  useEffect(() => {
    const fetchFormConfig = async () => {
      const data = JSON.parse(JSON.stringify(formData));

      setFormConfig(data[2]);
    };

    fetchFormConfig();
  }, []); // Removed formData from the dependency array

  return (
    <div className="p-20">
      {formConfig ? (
        <DynamicForm formConfig={formConfig} />
      ) : (
        <p>Loading form...</p>
      )}
    </div>
  );
};

export default TestPage;
