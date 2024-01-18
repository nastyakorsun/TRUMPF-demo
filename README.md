# TRUMPF-demo

This README provides essential information for setting up and running Playwright tests for the TRUMPF project.

## Requirements

Before beginning, ensure you have the following:

- A GitHub account with full access to the TRUMPF project repository. If you don't have access, please contact the project administrator.
- Visual Studio Code installed on your computer. Download it from [here](https://code.visualstudio.com/download). While other editors might work, our support is limited to Visual Studio Code.
- Node.js and npm installed. Follow the instructions on the [official site](https://nodejs.org/en/) for installation.


## Setup Instructions

1. **Clone the Repository**:
   - Navigate to the TRUMPF project's GitHub page: `https://github.com/your-organization/TRUMPF-project`.
   - Click the green 'Code' button and copy the HTTPS URL.

2. **Prepare Your Workspace**:
   - Choose a suitable location on your computer to clone the repository. Avoid paths with special characters or umlauts.

3. **Clone Using Visual Studio Code**:
   - Open Visual Studio Code.
   - Use the 'Clone Git Repository' option to clone the repository. Paste the copied URL when prompted.
   - Select your preferred workspace folder and wait for the cloning process to complete.

4. **Install Dependencies**:
   - In Visual Studio Code, open the terminal (Terminal > New Terminal).
   - Run the following commands:
     ```bash
     npm install
     npm install playwright
     ```

## Running Tests

To execute the tests:

- Run individual test files:
  ```bash
  npx playwright test tests/{test_file_name}.test.ts 
- or node tests//{test_file_name}
