"use client";
import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const DashboardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  color: #333;
  background-color: #ffffff;
  min-height: 100vh;
`;

const DashboardHeader = styled.header`
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  width: 100%;
  max-width: 800px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PromptHeading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #006400;
  margin-bottom: 10px;
`;

const InfoText = styled.p`
  font-size: 16px;
  color: #666;
`;

const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
  width: 100%;
  overflow-y: auto;
  padding: 20px;
`;

const ContainerBox = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
  margin-bottom: 20px;
  max-height: 500px;
  overflow-y: auto;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 20px;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  min-width: 200px;
  box-sizing: border-box;
`;

const InlineWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #444;
  font-weight: bold;
`;

const EditableInput = styled.input`
  background-color: #d3d3d3;
  color: #333;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  text-align: center;
  border: 1px solid #ccc;
  cursor: ${({ readOnly }) => (readOnly ? "default" : "text")};
  margin-right: 10px;
`;

const EditButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #006400;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  white-space: nowrap;

  &:hover {
    background-color: #004b2d;
  }
`;

const AddServiceButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #008000;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  align-self: center;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: #005c00;
  }
`;

const PricingConfigurationPage = () => {
  const [services, setServices] = useState([]);
  const [userData, setUserData] = useState({});
  const serviceRefs = useRef([]);
  const chargeRefs = useRef([]);

  useEffect(() => {
    // Fetch user data from Firestore for the logged-in user
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid); // Use the logged-in user's unique ID as the document ID
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);

            // Update the services list based on fetched data
            if (data.services) {
              const fetchedServices = data.services.map((service) => ({
                name: service.name,
                charge: parseFloat(service.rate) || 0.0,
                isEditingName: false,
                isEditingCharge: false,
              }));
              setServices(fetchedServices);
            }
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      } else {
        console.log("User is not logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditClick = (index, key) => {
    setServices((prevServices) =>
      prevServices.map((service, i) =>
        i === index ? { ...service, [key]: true } : service
      )
    );
    setTimeout(() => {
      if (key === "isEditingName") {
        serviceRefs.current[index]?.focus();
      } else {
        chargeRefs.current[index]?.focus();
      }
    }, 0);
  };

  const handleBlur = (index, key) => {
    setServices((prevServices) =>
      prevServices.map((service, i) =>
        i === index ? { ...service, [key]: false } : service
      )
    );
  };

  const handleServiceChange = (index, value) => {
    setServices((prevServices) =>
      prevServices.map((service, i) =>
        i === index ? { ...service, name: value } : service
      )
    );
  };

  const handleChargeChange = (index, value) => {
    setServices((prevServices) =>
      prevServices.map((service, i) =>
        i === index ? { ...service, charge: parseFloat(value) || 0 } : service
      )
    );
  };

  const formatCurrency = (value) => `$${value.toFixed(2)}`;

  const addService = () => {
    setServices((prevServices) => [
      ...prevServices,
      {
        name: "New Service",
        charge: 0.0,
        isEditingName: false,
        isEditingCharge: false,
      },
    ]);
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <UserInfo>
          <PromptHeading>Pricing Configuration</PromptHeading>
          <InfoText>Configure the pricing for your services</InfoText>
        </UserInfo>
      </DashboardHeader>
      <DashboardContent>
        <ContainerBox>
          {services.map((service, index) => (
            <RowWrapper key={index}>
              <BoxWrapper>
                <Label>Service {index + 1}</Label>
                <InlineWrapper>
                  <EditableInput
                    ref={(el) => (serviceRefs.current[index] = el)}
                    type="text"
                    value={service.name}
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                    readOnly={!service.isEditingName}
                    onBlur={() => handleBlur(index, "isEditingName")}
                  />
                  <EditButton
                    onClick={() => handleEditClick(index, "isEditingName")}
                  >
                    Edit
                  </EditButton>
                </InlineWrapper>
              </BoxWrapper>
              <BoxWrapper>
                <Label>Cost per square foot for Service {index + 1}</Label>
                <InlineWrapper>
                  <EditableInput
                    ref={(el) => (chargeRefs.current[index] = el)}
                    type="text"
                    value={
                      service.isEditingCharge
                        ? service.charge
                        : formatCurrency(service.charge)
                    }
                    onChange={(e) => handleChargeChange(index, e.target.value)}
                    readOnly={!service.isEditingCharge}
                    onBlur={() => handleBlur(index, "isEditingCharge")}
                  />
                  <EditButton
                    onClick={() => handleEditClick(index, "isEditingCharge")}
                  >
                    Edit
                  </EditButton>
                </InlineWrapper>
              </BoxWrapper>
            </RowWrapper>
          ))}
          <AddServiceButton onClick={addService}>
            Add More Services
          </AddServiceButton>
        </ContainerBox>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default PricingConfigurationPage;
