import React from "react";
import styled from "@emotion/styled";
import Tab from "./tab.js";
import { signOut } from "@/lib/authHelpers";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

const HeaderContainer = styled.header`
  background-color: #1a1a1a; /* Match with main dark background */
  color: #dcdcdc; /* Softer grey for text */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the left */
  justify-content: flex-start;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5); /* Subtle shadow for depth */
  width: 20vw;
  min-height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.05); /* Subtle border */
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Tighter layout */
  width: 100%;
  padding: 0;
  font-size: 16px; /* Adjusted for a more modern feel */
`;

const LogoutButton = styled.button`
  padding: 10px 18px; /* Adjusted padding */
  color: #ffffff; /* White for better contrast */
  background-color: #8b1e1e; /* Dark, muted red */
  border: none;
  border-radius: 6px; /* Slightly rounded for a modern touch */
  font-weight: 500; /* Lighter font weight */
  font-size: 15px; /* Slightly smaller font */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin-top: auto; /* Push the button to the bottom */
  width: 100%; /* Full width for consistency */
  text-align: center;

  &:hover {
    background-color: #731919; /* Slightly darker on hover */
    transform: scale(1.02); /* Subtle scaling effect */
  }

  &:active {
    transform: scale(0.98); /* Slight shrink on click */
  }
`;

export default function Header({ onContentChange, activeTab }) {
  const handleTabClick = (content) => {
    onContentChange(content);
  };

  function getActive(tabName) {
    return tabName === activeTab;
  }

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <HeaderContainer>
      <Nav>
        <Tab
          name="Pricing Configuration"
          isActive={getActive("Pricing Configuration")}
          onClick={handleTabClick}
        />
        <Tab
          name="Service Requests"
          isActive={getActive("Service Requests")}
          onClick={handleTabClick}
        />
        <Tab
          name="Custom Link"
          isActive={getActive("Custom Link")}
          onClick={handleTabClick}
        />
        <Tab
          name="Settings"
          isActive={getActive("Settings")}
          onClick={handleTabClick}
        />
      </Nav>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </HeaderContainer>
  );
}
