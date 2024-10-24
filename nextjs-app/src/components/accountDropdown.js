"use client";
import React, { useState, useEffect, useRef, useCallback, useId } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  padding: 1rem;
`;

const AccountDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  padding: 0;
  z-index: 1000; /* Ensures it appears in front of other elements */
`;

const AccountButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #2e2e2e;
  color: #eaeaea;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover,
  &.active {
    background-color: #3c3c3c;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .username {
    font-weight: 500;
    margin-right: 8px;
  }

  .icon {
    width: 16px;
    height: 16px;
    fill: #eaeaea;
    transition: transform 0.3s;
    &.rotate {
      transform: rotate(180deg);
    }
  }
`;

const DropdownMenu = styled.div`
  margin-top: 0.5rem; /* Adds space between dropdown button and account button */
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s, transform 0.3s;
  z-index: 1000; /* Ensures it appears in front of other elements */
  pointer-events: none; /* Prevents interaction when hidden */

  visibility: hidden; /* Hides from screen readers when not visible */

  &.open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto; /* Allows interaction when visible */
    visibility: visible; /* Makes it visible to screen readers */
  }
`;

const DropdownItem = styled.a`
  width: 100%;
  display: block;
  padding: 0.5rem 1rem;
  color: #eaeaea;
  text-decoration: none;
  background-color: #1e1e1e;
  transition: background-color 0.3s;
  text-align: center; /* Center the text */
  &:hover {
    background-color: #3c3c3c;
  }
`;

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonId = useId(); // Accessible ID for button

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  return (
    <Container>
      <AccountDropdownContainer ref={dropdownRef}>
        <AccountButton
          id={buttonId}
          onClick={toggleDropdown}
          className={isOpen ? "active" : ""}
          aria-expanded={isOpen}
          aria-controls={`${buttonId}-menu`}
          tabIndex="0"
        >
          <img src="/path/to/avatar.jpg" alt="User Avatar" className="avatar" />
          <span className="username">Username</span>
          <svg
            className={`icon ${isOpen ? "rotate" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </AccountButton>
        <DropdownMenu
          id={`${buttonId}-menu`}
          role="menu"
          aria-labelledby={buttonId}
          className={isOpen ? "open" : ""}
        >
          <DropdownItem href="/logout" role="menuitem">
            Logout
          </DropdownItem>
        </DropdownMenu>
      </AccountDropdownContainer>
    </Container>
  );
};

export default AccountDropdown;
