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

const RequestBox = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  position: relative;
`;

const RequestHeader = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  color: #aaa;
`;

const RequestDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailItem = styled.p`
  margin: 5px 0;
  color: #444;
`;

const ServiceRequestPage = () => {
  return (
    <DashboardContainer>
      <DashboardHeader>
        <PromptHeading>Service Requests</PromptHeading>
        <InfoText>Review the details of submitted service requests</InfoText>
      </DashboardHeader>
      <DashboardContent>
        <RequestBox>
          <RequestHeader>Request Submitted on October 23, 2024</RequestHeader>
          <RequestDetails>
            <DetailItem>
              <strong>Name:</strong> Liam Gilbert
            </DetailItem>
            <DetailItem>
              <strong>Service Requested:</strong> Lawn Mowing
            </DetailItem>
            <DetailItem>
              <strong>Estimate:</strong> $300 - $350
            </DetailItem>
            <DetailItem>
              <strong>Email:</strong> liamgilbert1018@gmail.com
            </DetailItem>
            <DetailItem>
              <strong>Address:</strong> 27 Hadley Rd. Framingham, MA
            </DetailItem>
          </RequestDetails>
        </RequestBox>
        <RequestBox>
          <RequestHeader>Request Submitted on October 20, 2024</RequestHeader>
          <RequestDetails>
            <DetailItem>
              <strong>Name:</strong> Emily Johnson
            </DetailItem>
            <DetailItem>
              <strong>Service Requested:</strong> Mulching
            </DetailItem>
            <DetailItem>
              <strong>Estimate:</strong> $150 - $200
            </DetailItem>
            <DetailItem>
              <strong>Email:</strong> emilyjohnson123@gmail.com
            </DetailItem>
            <DetailItem>
              <strong>Address:</strong> 45 Maple St. Newton, MA
            </DetailItem>
          </RequestDetails>
        </RequestBox>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default ServiceRequestPage;
