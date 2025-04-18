# EnerSavvy - Energy Management Tool

## Overview
EnerSavvy is a React-based web application designed to promote sustainable energy usage, aligning with SDG 7 (Affordable and Clean Energy). This project provides tools to calculate energy consumption, compare appliance efficiency, optimize usage, and offer personalized recommendations to help users reduce their electricity costs and environmental impact.

## Features
- **Energy Consumption Calculator**: Calculate the total cost of running appliances based on power usage, hours, days, and electricity rate.
- **Efficiency Comparator**: Compare old and new appliances to estimate potential savings.
- **Usage Optimizer**: Suggest optimized usage hours to lower energy bills.
- **Personalized Recommendations**: Provide tailored advice based on monthly electricity bills.

## Installation

1. **Clone the Repository**
  ```bash
  git clone https://github.com/SaiAshwathaSingari/SDT_Project.git
  cd SDT_Project
  ```

2. **Install Dependencies**
  Ensure you have Node.js and npm installed. Then run:
  ```bash
  npm install
  ```

3. **Start the Development Server**
  Launch the app in development mode:
  ```bash
  npm start
  ```
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The app will automatically reload if you make edits.

4. **Build for Production**
  To create an optimized production build:
  ```bash
  npm run build
  ```
  The build artifacts will be stored in the `build/` directory. You can serve it with a static server or deploy it.

## Usage
- Navigate through the main page to access the Calculator, Comparator, Optimizer, and Recommender modules.
- Enter sample inputs to test the functionality:
 - **Calculator**: Appliance Name: Refrigerator, Power: 150W, Hours/Day: 24, Days/Month: 30, Rate: 6/kWh
 - **Optimizer**: Power: 200W, Current Hours: 10, Optimized Hours: 6, Rate: 2000

## Project Structure
- `public/`: Static files and the main HTML template.
- `src/`: React components and application logic.
 - `components/`: Individual module components (Calculator, Comparator, etc.).
 - `App.js`: Main application component.
 - `index.js`: Entry point of the app.
- `package.json`: Project dependencies and scripts.

## Technologies Used
- **React**: For building the user interface.
- **CSS**: For styling (inline and modular).
- **Node.js & npm**: For development and dependency management.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Acknowledgments
- Inspired by SDG 7 goals for affordable and clean energy.
