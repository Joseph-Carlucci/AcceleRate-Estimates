import React from "react";
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
  overflow-y: auto;
  padding: 20px;
`;

const LinkBox = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  position: relative;
`;

const LinkText = styled.p`
  font-size: 16px;
  color: #444;
  margin: 10px 0;
`;

const CustomLinkPage = () => {
  return (
    <DashboardContainer>
      <DashboardHeader>
        <PromptHeading>Custom Link</PromptHeading>
        <InfoText>Your personalized link to our automated software</InfoText>
      </DashboardHeader>
      <DashboardContent>
        <LinkBox>
          <LinkText>
            Here is your custom link to our automated software. You can display
            and use it however you'd like.
          </LinkText>
          <LinkText>
            <strong>Link:</strong>{" "}
            <a
              href="https://example.com/automated-software"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://example.com/automated-software
            </a>
          </LinkText>
        </LinkBox>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default CustomLinkPage;
