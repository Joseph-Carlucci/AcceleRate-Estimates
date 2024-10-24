"use client";
import React, { useState } from "react";
import styled from "@emotion/styled";
import Header from "@/components/header.js";
import QuotesPage from "@/app/dashboard/quotes/page.js";
import ProfilePage from "@/app/dashboard/profile/page.js";
import SettingsPage from "@/app/dashboard/settings/page.js";
import PricingConfigurationPage from "@/app/dashboard/pricingConfiguration/page.js";
import ServiceRequestsPage from "@/app/dashboard/serviceRequests/page.js";
import AccountDropdown from "@/components/accountDropdown";
import CustomLinkPage from "@/app/dashboard/customLink/page.js";
import MenuPage from "@/app/dashboard/menu/page.js";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh; /* Fixed height for the entire layout */
  width: 100%; /* Ensures the width fills the container */
  overflow: hidden; /* Prevent scrolling on the entire layout */
`;

const SidebarContainer = styled.div`
  position: sticky;
  top: 0;
  flex-shrink: 0; /* Prevents the sidebar from shrinking */
  width: 20vw; /* Width of the sidebar (matches your Header width) */
  height: 100vh; /* Ensures the sidebar takes up the full height of the viewport */
  overflow-y: auto; /* Allows sidebar content to scroll if it overflows */
  background-color: #1e1e1e; /* Dark background for the sidebar */
`;

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Allows the main content to take up the remaining space */
  overflow: hidden; /* Prevents the main content container from scrolling */
  height: 100vh; /* Ensures it takes up the full viewport height */
`;

const TopBarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0; /* Prevents shrinking */
  border-bottom: 1px solid #ddd;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #ffffff; /* Dark background for the main content */
`;

const Title = styled.h1`
  margin-left: 3rem;
  color: #003300; /* Deeper green for a more elegant, modern feel */
  font-weight: 600; /* Slightly bolder for emphasis without losing refinement */
  font-size: 2rem; /* Larger font size for better visual hierarchy */
  text-align: left; /* Center align for a more balanced appearance */
  width: 100%;
  line-height: 1.4; /* Improved readability */
  letter-spacing: 0.05rem; /* Slight letter spacing for a more polished look */
`;

export default function RootLayout() {
  const [activeContent, setActiveContent] = useState("Custom Link");

  const renderContent = () => {
    switch (activeContent) {
      case "Menu":
        return <MenuPage />;
      case "Pricing Configuration":
        return <PricingConfigurationPage />;
      case "Service Requests":
        return <ServiceRequestsPage />;
      case "Custom Link":
        return <CustomLinkPage />;
      case "Settings":
        return <SettingsPage />;
      default:
        return <QuotesPage />;
    }
  };

  return (
    <LayoutContainer>
      {/* Sidebar */}
      <SidebarContainer>
        <Header onContentChange={setActiveContent} activeTab={activeContent} />
      </SidebarContainer>

      {/* Main Content Area */}
      <MainContentContainer>
        <TopBarContainer>
          <Title>AcceleRate</Title>
          <AccountDropdown />
        </TopBarContainer>
        <MainContent>{renderContent()}</MainContent>
      </MainContentContainer>
    </LayoutContainer>
  );
}
