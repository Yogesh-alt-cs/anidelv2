const config = {
  serverUrl: import.meta.env.VITE_APP_SERVERURL || "https://eren-world.onrender.com/api/v1",
  localUrl: import.meta.env.VITE_APP_LOCALURL || "http://localhost:3030/api/v1",
  proxyUrl: import.meta.env.VITE_APP_PROXYURL || "/api",
};

export default config;
