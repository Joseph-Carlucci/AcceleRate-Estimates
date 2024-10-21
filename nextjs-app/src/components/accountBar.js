import React from "react";
import styled from "@emotion/styled";
import AccountDropdown from "./accountDropdown";

const AccountBarContainer = styled.header`
  background-color: #2b2b2b; /* Dark grey for a modern look */
  color: #ffffff;
  padding: 10px 20px; /* Consistent padding for a sleek look */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Slight shadow for depth */
  display: flex;
  flex-direction: row;
  justify-content: flex-end; /* Aligns dropdown to the right */
  align-items: center;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1); /* Subtle bottom border */
  position: sticky;
  top: 0;
  height: 80px; /* Adjusted for a more streamlined header */
  width: 100%;
`;

export default function AccountBar() {
  return (
    <AccountBarContainer>
      <AccountDropdown />
    </AccountBarContainer>
  );
}
