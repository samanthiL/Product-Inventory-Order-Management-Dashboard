Product Inventory & Order Management Dashboard

Project Overview

This is a mid-scale React application built to serve as a Product Inventory and Order Management Dashboard. It implements a modern front-end stack using React, TypeScript, Redux Toolkit, and Material UI to demonstrate core concepts in state management, API integration, and scalable component architecture.

The application fulfills all core functional and technical requirements  outlined in the assessment

Technical Stack

Framework: React and TypeScript.
UI/Styling: Material UI (MUI) for component consistency and professional design.
State Management: Redux Toolkit (RTK) with dedicated productSlice and orderSlice.
API Integration: Axios and createAsyncThunk.
Routing: React Router DOM.

 Core Features Implemented

Product Management
Product List Page: Displays product data using the MUI DataGrid. Features include client-side Pagination, multi-field Sorting, and advanced Search/Filtering.
Product Details Page: Allows the administrator to view detailed product information (image, price, description, ratings).
Updates: Enables modification of stock quantity and toggling the isActive status.
Form Handling: Updates are persisted via an API PUT request managed by a Redux Thunk.

Order Management
Order List Page: Displays order records in a fully customizable MUI Table.
Functionality: Supports multi-column Sorting and dynamic Filtering (by status and general search).
Reusability: Uses the reusable OrderStatusBadge component for clear status visualization.

 Prerequisites
Node.js (LTS recommended)
npm or yarn

Installation

1. Clone the repository:git clone 
                      cd product

2. Install dependencies:npm install
3. Start Mock API: Ensure your mock server (e.g., json-server) is running on http://localhost:3001 with the required /products and / orders endpoints in another command prompt.
  npm run api
4. Running the Application: npm run dev
5. The application will launch at http://localhost:5173.