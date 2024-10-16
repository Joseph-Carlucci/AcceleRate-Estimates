import { useState } from "react";

function CompanyQs() {
  const [companyData, setCompanyData] = useState("");

  const handleDataChange = (e) => setCompanyData(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Company Data: ${companyData}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>How much do you charge per square foot?</label>
        <input
          style={{ color: "Black" }}
          type="number"
          value={companyData}
          onChange={handleDataChange}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default CompanyQs;
