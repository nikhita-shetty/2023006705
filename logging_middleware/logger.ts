const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNTc0MzQOL CJpYXQi0jE3NDM1NzQwNDQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ5Y2JiNjk5LTZhMjctNDRh NS04ZDU5LThiMWJ1ZmE4MTZkYSIsInN1YiI6InJhbWtyaXNobmFAYWJjLmVkdSJ9LCJ1bWFpbCI6InJ hbWtyaXNobmFAYWJjLmVkdSIsIm5hbWUiOiJyYW0ga3Jpc2huYSIsInJvbGx0byI6ImFhMWJiIiwiYW NjZXNzQ29kZSI6InhnQXNOQyIsImNsaWVudElEIjoiZDljYmI2OTktNmEyNy00NGE1LThkNTktOGIXY mVmYTgxNmRhIiwiY2xpZW50U2VjcmV0IjoidFZKYWFhUkJTZVhjU1h1TSJ9.YApD98gq0IN_OWw7JMf muUfK1m4hLTm7AICLDCLAzVg"; 
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