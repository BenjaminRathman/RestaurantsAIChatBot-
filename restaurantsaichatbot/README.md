# Restaurant AI Chatbot

A Next.js application featuring an AI-powered chatbot that helps customers with meal selection and upselling, alongside a restaurant menu display.

## Features

- Interactive AI chatbot for customer assistance
- Dynamic restaurant menu with category filtering
- Responsive design for all devices
- Real-time chat interface
- Beautiful UI with modern design

## Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- OpenAI API key

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd restaurant-ai-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the production application
- `npm start`: Start the production server
- `npm run lint`: Run ESLint for code linting

## Technologies Used

- Next.js 14
- React 18
- OpenAI API
- CSS Modules
- Modern JavaScript (ES6+)

## License

MIT
