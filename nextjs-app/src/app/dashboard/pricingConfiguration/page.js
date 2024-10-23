import React, { useState, useRef } from "react";
import styled from "@emotion/styled";

const DashboardContainer = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: #333; /* Dark text for readability */
  background-color: #ffffff; /* White background */
  min-height: 100vh;
  overflow-y: auto; /* Enables vertical scrolling */
`;

const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd; /* Light grey border */
  flex-wrap: wrap;
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
`;

const InfoText = styled.p`
  font-size: 16px;
  color: #666; /* Dark grey text */
`;

const DashboardContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  padding-right: 10px; /* Space for scrollbar */
  border-top: 1px solid #ddd; /* Light grey border */
  padding-top: 25px; /* Extra padding to make it more scrollable */
  padding-bottom: 100px; /* Extra padding to make it more scrollable */
`;

const ContainerBox = styled.div`
  background-color: #f9f9f9; /* Light grey for container */
  padding: 40px;
  border-radius: 10px;
  overflow-y: auto;
  height: calc(100vh - 230px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
`;

const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
  gap: 40px;
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
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
  color: #444; /* Slightly darker grey for labels */
  font-weight: bold;
`;

const EditableInput = styled.input`
  background-color: #d3d3d3; /* Light grey input field */
  color: #333; /* Dark text for input */
  padding: 10px;
  border-radius: 5px;
  width: calc(100% - 70px); /* Adjusting width to account for button space */
  text-align: center;
  border: 1px solid #ccc; /* Light grey border */
  cursor: ${({ readOnly }) => (readOnly ? "default" : "text")};
  margin-right: 10px; /* Space between input and button */
`;

const EditButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #006400; /* Dark green button */
  color: white;
  cursor: pointer;
  border-radius: 5px;
  white-space: nowrap; /* Prevents button from breaking into multiple lines */

  &:hover {
    background-color: #004b2d; /* Darker green on hover */
  }
`;

const EditableSelect = styled.select`
  background-color: #d3d3d3; /* Light grey input field */
  color: #333; /* Dark text for input */
  padding: 10px;
  border-radius: 5px;
  width: calc(100% - 70px); /* Adjusting width to account for button space */
  text-align: center;
  border: 1px solid #ccc; /* Light grey border */
  cursor: pointer;
  margin-right: 10px; /* Space between select and button */
`;

const PricingConfigurationPage = () => {
  const [service1, setService1] = useState("Service 1");
  const [service1Charge, setService1Charge] = useState(0.1);
  const [service2, setService2] = useState("Service 2");
  const [service2Charge, setService2Charge] = useState(0.15);
  const [isEditingService1, setIsEditingService1] = useState(false);
  const [isEditingService1Charge, setIsEditingService1Charge] = useState(false);
  const [isEditingService2, setIsEditingService2] = useState(false);
  const [isEditingService2Charge, setIsEditingService2Charge] = useState(false);

  const service1Ref = useRef(null);
  const service1ChargeRef = useRef(null);
  const service2Ref = useRef(null);
  const service2ChargeRef = useRef(null);

  const serviceOptions = [
    "Lawn Mowing",
    "Lawn Seeding and Sod Installation",
    "Fertilization and Weed Control",
    "Mulching",
    "Irrigation System Installation",
    "Lawn Aeration",
    "Hydroseeding",
    "Gravel or Stone Ground Covering",
    "Artificial Turf Installation",
    "Leaf Removal",
    "Snow Removal",
    "Soil Grading and Leveling",
    "Pesticide and Herbicide Spraying",
  ];

  const handleEditClick = (setEditing, ref) => {
    setEditing(true);
    setTimeout(() => ref.current && ref.current.focus(), 0);
  };

  const handleBlur = (setEditing) => {
    setEditing(false);
  };

  const handleServiceChange = (setService, setEditing, value) => {
    setService(value);
    setEditing(false);
  };

  const formatCurrency = (value) => `$${value.toFixed(2)}`;

  const getFilteredOptions = (currentService) => {
    const selectedServices = [service1, service2];
    return serviceOptions.filter(
      (option) =>
        !selectedServices.includes(option) || option === currentService
    );
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <UserInfo>
          <PromptHeading>Pricing Configuration</PromptHeading>
          <InfoText>Configure the pricing for your services</InfoText>
        </UserInfo>
      </DashboardHeader>
      <ContainerBox>
        <RowWrapper>
          <BoxWrapper>
            <Label>Service 1</Label>
            <InlineWrapper>
              {isEditingService1 ? (
                <EditableSelect
                  value={service1}
                  onChange={(e) =>
                    handleServiceChange(
                      setService1,
                      setIsEditingService1,
                      e.target.value
                    )
                  }
                  onBlur={() => handleBlur(setIsEditingService1)}
                >
                  {getFilteredOptions(service1).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </EditableSelect>
              ) : (
                <EditableInput
                  ref={service1Ref}
                  type="text"
                  value={service1}
                  readOnly
                />
              )}
              <EditButton
                onClick={() =>
                  handleEditClick(setIsEditingService1, service1Ref)
                }
              >
                Edit
              </EditButton>
            </InlineWrapper>
          </BoxWrapper>
          <BoxWrapper>
            <Label>Cost per square foot for Service 1</Label>
            <InlineWrapper>
              <EditableInput
                ref={service1ChargeRef}
                type="text"
                value={
                  isEditingService1Charge
                    ? service1Charge
                    : formatCurrency(service1Charge)
                }
                onChange={(e) =>
                  setService1Charge(parseFloat(e.target.value) || 0)
                }
                readOnly={!isEditingService1Charge}
                onBlur={() => handleBlur(setIsEditingService1Charge)}
              />
              <EditButton
                onClick={() =>
                  handleEditClick(setIsEditingService1Charge, service1ChargeRef)
                }
              >
                Edit
              </EditButton>
            </InlineWrapper>
          </BoxWrapper>
        </RowWrapper>
        <RowWrapper>
          <BoxWrapper>
            <Label>Service 2</Label>
            <InlineWrapper>
              {isEditingService2 ? (
                <EditableSelect
                  value={service2}
                  onChange={(e) =>
                    handleServiceChange(
                      setService2,
                      setIsEditingService2,
                      e.target.value
                    )
                  }
                  onBlur={() => handleBlur(setIsEditingService2)}
                >
                  {getFilteredOptions(service2).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </EditableSelect>
              ) : (
                <EditableInput
                  ref={service2Ref}
                  type="text"
                  value={service2}
                  readOnly
                />
              )}
              <EditButton
                onClick={() =>
                  handleEditClick(setIsEditingService2, service2Ref)
                }
              >
                Edit
              </EditButton>
            </InlineWrapper>
          </BoxWrapper>
          <BoxWrapper>
            <Label>Cost per square foot for Service 2</Label>
            <InlineWrapper>
              <EditableInput
                ref={service2ChargeRef}
                type="text"
                value={
                  isEditingService2Charge
                    ? service2Charge
                    : formatCurrency(service2Charge)
                }
                onChange={(e) =>
                  setService2Charge(parseFloat(e.target.value) || 0)
                }
                readOnly={!isEditingService2Charge}
                onBlur={() => handleBlur(setIsEditingService2Charge)}
              />
              <EditButton
                onClick={() =>
                  handleEditClick(setIsEditingService2Charge, service2ChargeRef)
                }
              >
                Edit
              </EditButton>
            </InlineWrapper>
          </BoxWrapper>
        </RowWrapper>
      </ContainerBox>
    </DashboardContainer>
  );
};

export default PricingConfigurationPage;
