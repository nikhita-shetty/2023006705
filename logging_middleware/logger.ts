const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJucGFjaGlwdTJAZ2l0YW0uaW4iLCJleHAiOjE3ODA4MTM2MDEsImlhdCI6MTc4MDgxMjcwMSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImFiMzc2NDBkLTUzZDUtNGM4YS1hNDczLWZmNjIyNzk4NGZhZSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im5pa2hpdGEgc2hldHR5Iiwic3ViIjoiM2UwMmU5NDAtOGE4NC00YzQ4LWE1NTEtZGZmOWY4YmFiYWE1In0sImVtYWlsIjoibnBhY2hpcHUyQGdpdGFtLmluIiwibmFtZSI6Im5pa2hpdGEgc2hldHR5Iiwicm9sbE5vIjoiMjAyMzAwNjcwNSIsImFjY2Vzc0NvZGUiOiJ3Z0t0Z1oiLCJjbGllbnRJRCI6IjNlMDJlOTQwLThhODQtNGM0OC1hNTUxLWRmZjlmOGJhYmFhNSIsImNsaWVudFNlY3JldCI6IkZiekhTeUhtd0p3c1lGUXEifQ.bU-e2x6vQyW0R7WmRpmN5vUxnAY3EliBC-WidbaXtW0";
type Stack = "frontend" | "backend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";
type Package =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "auth"
  | "config"
  | "middleware"
  | "utils";

export async function Log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
): Promise<void> {
  try {
    await fetch("http://4.224.186.213/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });
  } catch (error) {
    // silently fail
  }
}