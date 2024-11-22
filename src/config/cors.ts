// CORS options
const whitelist = [
  'https://www.yoursite.com',
  'http://127.0.0.1:5000',
  'http://localhost:5000',
  'http://localhost:5173',
  'https://my-daily-tasks-app.netlify.app',
];

const corsOptions = {
  // origin: "http://localhost:3000", // Allow only requests from this origin
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  // methods: 'GET,POST',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // Allow Cookie header
  credentials: true,
};

export default corsOptions;
