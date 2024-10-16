"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { addUserData } from "@/lib/authHelpers";

function CompanyQs() {
  const [companyData, setCompanyData] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is signed in
      } else {
        router.push("/signup"); // Redirect to signup if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleDataChange = (e) => setCompanyData(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Company Data: ${companyData}`);
    addUserData(user, { rate: companyData });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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
