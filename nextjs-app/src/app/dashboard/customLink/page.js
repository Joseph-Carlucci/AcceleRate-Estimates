"use client";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { getUserData, currentUser } from "@/lib/authHelpers";
import { getAuth } from "firebase/auth";

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

export default function CustomLinkPage() {
  const [customLink, setCustomLink] = React.useState("");

  React.useEffect(() => {
    const fetchCustomLink = async () => {
      const customLinkToken = await getUserData(
        "customLinkToken"
      );
      setCustomLink("accelerate-estimates.com/service/" + customLinkToken);
    };

    fetchCustomLink();
  }, []);
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
            <a href={customLink} target="_blank" rel="noopener noreferrer">
              {customLink}
            </a>
          </LinkText>
        </LinkBox>
      </DashboardContent>
    </DashboardContainer>
  );
}
