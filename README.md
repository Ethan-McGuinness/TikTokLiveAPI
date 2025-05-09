# TikTok Live API

A simple UI designed to work alongside the TikTok-Live-connector, allowing users to instantly input a TikTok username and receive real-time updates on live chat messages, gift interactions, and follower activity, all displayed through a clean and interactive dashboard.

# Tech Stack

## Frontend
• **React**: A widely used JavaScript library chosen for its efficient component-based structure, allowing for the building of a dynamic and responsive user interface.  
• **Vite**: A modern frontend build tool that allows for fast hot module replacement (HMR) and a highly optimized development experience, making it an excellent choice for older bundlers like Webpack.  
• **React Router DOM**: Used for client-side routing, allowing for seamless navigation between pages within the application.  
• **Recharts & Chart.js**: Implemented to render the interactive data visualizations used for displaying the data and analytics being collected in real time.  
• **CSS**: Used for styling components across the UI. Files were separated and imported to keep styles modular and manageable.  
• **JSX**: Components and pages were structured using .JSX files to clearly define React components and maintain separation between logic and presentation.  

## Backend
• **Node.js**: A JavaScript runtime used for building the backend server and handling asynchronous operations efficiently.  
• **Express.js**: A lightweight web application framework typically used for building APIs and handling HTTP requests.  
• **WebSocket (ws)**: Used for the real-time connection between the server and client, essential for live data updates.  
• **Body-Parser & CORS**: Middleware for parsing incoming JSON and enabling cross-origin requests.  

## Data Layer
• **Prisma ORM**: An object-relational mapping tool that provides a type-safe and intuitive API to interact with the database, simplifying query logic and ensuring data stays consistent.  
• **PostgreSQL**: A powerful open-source relational database used to store and manage user and stream data.  

## External Integrations
• **TikTok-Live-Connector**: A community-developed library that interacts with TikTok's unofficial live streaming infrastructure, enabling the system to retrieve live chat data and event information. It was chosen due to being one of the only viable options for integrating with TikTok Live, and thanks to its open-source nature, it was modified to better suit the specific needs of this system.

# Features

• **Real-Time Chat Feed**: Displays incoming live chat messages from TikTok streams as they happen, giving users up-to-the-minute interaction with viewers.  
• **Follower Tracking**: Monitors and displays new followers in real-time, providing live statistics on stream popularity.  
• **Gift Notifications**: Tracks and showcases gifts sent by viewers, alerting the streamer to interactions during live sessions.  
• **Interactive Analytics**: Utilizes Chart.js to provide visual insights into stream data such as viewer engagement, chat activity, and gift trends over time.  
• **Restricted Words Filtering**: Allows streamers to manage and filter specific words or phrases from the live chat, helping ensure a positive community environment.  

# Setup
1. **Clone the repository to your local machine**
git clone https://github.com/Ethan-McGuinness/TikTokLiveAPI.git

2. **Navigate into the project directory**
cd repository name

3. **install Dependencies**
    1 - cd frontend
    2 - npm intall
    3 - cd backend
    4 - npm install

4. **Run the project**
    1 - cd frontend
    2 - npm run dev
    3 - cd backend
    4 - node server.js

5. **Enjoy**

# User Guide
![Alt text](./Screenshot%202025-05-09%20021421.png)

1. **Navigate to the Dashboard**
- Once the application is loaded, you will be greated by the landing page, where you will be prompted to input a TikTok creators username.

2 **Input TikTok Username**
- Enter the desired TikTok username in the provided input field and hit enter.
- The system will automatically establish a connection to TikTok Live and start tracking live chat, gifts, and follower activity for that user.

3 **Monitor Live Interactions**
- **Chat Messages**: Real-time messages will appear in the chat section as they are sent by viewers.
- **Gifts**: Gifts sent by viewers will be displayed in the gift section, showing who sent them and what the gift was.
- **Followers**: New followers will appear in the followers section, showing a notification every time someone follows the stream.

4 **Access Features**
- Use the tabs to navigate between sections like **Restricted Words** (for managing inappropriate words in the chat) and **Analytics** (which displays visual data like viewer interaction, gifts, and follower trends)

**Disconnecting**:
- When you're done, click the **Disconnect** button to close the WebSocket connection.

![Alt text](./Screenshot%202025-05-09%20022950.png)

