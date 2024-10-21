import React from "react";
import styled from "styled-components";
import { FiActivity, FiUser, FiFileText, FiBarChart2 } from "react-icons/fi";

const DashboardContainer = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: #e0e0e0;
  min-height: 100vh;
  overflow-y: auto; /* Enables vertical scrolling */
`;

const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Greeting = styled.h1`
  font-size: 24px;
  color: #3fdc97;
`;

const WelcomeText = styled.p`
  font-size: 16px;
  color: #c0c0c0;
`;

const DashboardContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
  overflow-y: auto; /* Enables scrolling */
  height: calc(
    100vh - 120px
  ); /* Adjust height to allow for scrolling without affecting the border */
  padding-right: 10px; /* Space for scrollbar */
  border-top: 1px solid #333; /* Optional: Adds a top border */
  padding-top: 25px; /* Extra padding to make it more scrollable */
  padding-bottom: 100px; /* Extra padding to make it more scrollable */
`;

const Card = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }

  svg {
    font-size: 30px;
    color: #3fdc97;
    margin-bottom: 10px;
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const CardValue = styled.p`
  font-size: 24px;
  margin: 5px 0;
`;

const ActivityFeed = styled.div`
  background-color: #f0f0f0;
  color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  flex: 2;
  min-width: 300px;
  max-width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
`;

const ActivityItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #444;
`;

const ChartArea = styled.div`
  background-color: #f0f0f0;
  color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  flex: 2;
  min-width: 300px;
  max-width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

export default function MenuPage() {
  return (
    <DashboardContainer>
      <DashboardHeader>
        <UserInfo>
          <Greeting>Welcome!</Greeting>
          <WelcomeText>Here is your dashboard overview</WelcomeText>
        </UserInfo>
      </DashboardHeader>

      <DashboardContent>
        {/* Cards showing different metrics */}
        <Card>
          <FiUser />
          <CardTitle>Users</CardTitle>
          <CardValue>1,245</CardValue>
        </Card>
        <Card>
          <FiActivity />
          <CardTitle>Active Sessions</CardTitle>
          <CardValue>345</CardValue>
        </Card>
        <Card>
          <FiBarChart2 />
          <CardTitle>Revenue</CardTitle>
          <CardValue>$12,300</CardValue>
        </Card>
        <Card>
          <FiFileText />
          <CardTitle>Documents</CardTitle>
          <CardValue>85</CardValue>
        </Card>

        {/* Activity Feed */}
        <ActivityFeed>
          <h3>Recent Activity</h3>
          <ActivityItem>User John Doe logged in</ActivityItem>
          <ActivityItem>New file uploaded: Invoice.pdf</ActivityItem>
          <ActivityItem>Settings updated</ActivityItem>
          <ActivityItem>User profile updated</ActivityItem>
          <ActivityItem>Monthly report generated</ActivityItem>
        </ActivityFeed>

        {/* Placeholder for Chart Area */}
        <ChartArea>
          <h3>Sales Overview</h3>
          <p>Graph goes here...</p>
        </ChartArea>

        <Card>
          <FiUser />
          <CardTitle>Users</CardTitle>
          <CardValue>1,245</CardValue>
        </Card>
        <Card>
          <FiActivity />
          <CardTitle>Active Sessions</CardTitle>
          <CardValue>345</CardValue>
        </Card>
        <Card>
          <FiBarChart2 />
          <CardTitle>Revenue</CardTitle>
          <CardValue>$12,300</CardValue>
        </Card>
        <Card>
          <FiFileText />
          <CardTitle>Documents</CardTitle>
          <CardValue>85</CardValue>
        </Card>

        <Card>
          <FiUser />
          <CardTitle>Users</CardTitle>
          <CardValue>1,245</CardValue>
        </Card>
        <Card>
          <FiActivity />
          <CardTitle>Active Sessions</CardTitle>
          <CardValue>345</CardValue>
        </Card>
        <Card>
          <FiBarChart2 />
          <CardTitle>Revenue</CardTitle>
          <CardValue>$12,300</CardValue>
        </Card>
        <Card>
          <FiFileText />
          <CardTitle>Documents</CardTitle>
          <CardValue>85</CardValue>
        </Card>
      </DashboardContent>
    </DashboardContainer>
  );
}
