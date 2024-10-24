import React, { useState } from "react";
import styled from "@emotion/styled";

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
  padding: 20px;
`;

const SettingsBox = styled.div`
  background-color: #f9f9f9;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  max-height: 500px; /* Set max-height for the box */
  overflow-y: auto; /* Enable scrolling if content exceeds height */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  position: relative;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  position: relative;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const EditButton = styled.button`
  padding: 8px;
  font-size: 14px;
  color: #fff;
  background-color: #006400;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #008000;
  }
`;

const SaveButton = styled.button`
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #006400;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #008000;
  }
`;

const RedButton = styled.button`
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #d9534f;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #c9302c;
  }
`;

const ConfirmationBox = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

const ConfirmationContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
`;

const ConfirmationText = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
`;

const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ConfirmButton = styled.button`
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #d9534f;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 48%;

  &:hover {
    background-color: #c9302c;
  }
`;

const CancelButton = styled.button`
  padding: 10px;
  font-size: 16px;
  color: #333;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 48%;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const SettingsPage = () => {
  const [companyName, setCompanyName] = useState("Example Company");
  const [email, setEmail] = useState("example@company.com");
  const [password, setPassword] = useState("••••••••");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmingEndSubscription, setIsConfirmingEndSubscription] =
    useState(false);
  const [isEditingCompanyName, setIsEditingCompanyName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const handleSaveChanges = () => {
    alert("Settings saved successfully!");
  };

  const handleEndSubscription = () => {
    setIsConfirmingEndSubscription(true);
  };

  const confirmEndSubscription = () => {
    setIsConfirmingEndSubscription(false);
    alert("Subscription ended successfully.");
  };

  const cancelEndSubscription = () => {
    setIsConfirmingEndSubscription(false);
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <PromptHeading>Settings</PromptHeading>
        <InfoText>Manage your account settings here</InfoText>
      </DashboardHeader>
      <DashboardContent>
        <SettingsBox>
          <FormGroup>
            <Label>Company Name</Label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                readOnly={!isEditingCompanyName}
              />
              <EditButton
                onClick={() => setIsEditingCompanyName(!isEditingCompanyName)}
              >
                {isEditingCompanyName ? "Save" : "Edit"}
              </EditButton>
            </div>
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={!isEditingEmail}
              />
              <EditButton onClick={() => setIsEditingEmail(!isEditingEmail)}>
                {isEditingEmail ? "Save" : "Edit"}
              </EditButton>
            </div>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" value={password} readOnly />
            <SaveButton
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              style={{ marginTop: "10px" }}
            >
              {isChangingPassword ? "Cancel" : "Change Password"}
            </SaveButton>
          </FormGroup>
          {isChangingPassword && (
            <>
              <FormGroup>
                <Label>New Password</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormGroup>
              <SaveButton onClick={handleSaveChanges}>
                Submit New Password
              </SaveButton>
            </>
          )}
          <RedButton onClick={handleEndSubscription}>
            End Subscription
          </RedButton>
        </SettingsBox>
      </DashboardContent>
      {isConfirmingEndSubscription && (
        <ConfirmationBox>
          <ConfirmationContent>
            <ConfirmationText>
              Are you sure you want to end your subscription?
            </ConfirmationText>
            <ConfirmationButtons>
              <ConfirmButton onClick={confirmEndSubscription}>
                Yes, End Subscription
              </ConfirmButton>
              <CancelButton onClick={cancelEndSubscription}>
                Cancel
              </CancelButton>
            </ConfirmationButtons>
          </ConfirmationContent>
        </ConfirmationBox>
      )}
    </DashboardContainer>
  );
};

export default SettingsPage;
