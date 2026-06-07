import http from "http";

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJucGFjaGlwdTJAZ2l0YW0uaW4iLCJleHAiOjE3ODA4MTM2MDEsImlhdCI6MTc4MDgxMjcwMSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImFiMzc2NDBkLTUzZDUtNGM4YS1hNDczLWZmNjIyNzk4NGZhZSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im5pa2hpdGEgc2hldHR5Iiwic3ViIjoiM2UwMmU5NDAtOGE4NC00YzQ4LWE1NTEtZGZmOWY4YmFiYWE1In0sImVtYWlsIjoibnBhY2hpcHUyQGdpdGFtLmluIiwibmFtZSI6Im5pa2hpdGEgc2hldHR5Iiwicm9sbE5vIjoiMjAyMzAwNjcwNSIsImFjY2Vzc0NvZGUiOiJ3Z0t0Z1oiLCJjbGllbnRJRCI6IjNlMDJlOTQwLThhODQtNGM0OC1hNTUxLWRmZjlmOGJhYmFhNSIsImNsaWVudFNlY3JldCI6IkZiekhTeUhtd0p3c1lGUXEifQ.bU-e2x6vQyW0R7WmRpmN5vUxnAY3EliBC-WidbaXtW0";

const TYPE_WEIGHT: { [key: string]: number } = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function getPriorityScore(n: any): number {
  const weight = TYPE_WEIGHT[n.Type] || 0;
  const time = new Date(n.Timestamp).getTime();
  return weight * 1e13 + time;
}

function fetchNotifications(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "4.224.186.213",
      port: 80,
      path: "/evaluation-service/notifications",
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    const req = http.request(options, (res: any) => {
      console.log("Status:", res.statusCode);
      let body = "";
      res.on("data", (chunk: any) => (body += chunk));
      res.on("end", () => {
        try {
          const data = JSON.parse(body);
          resolve(data.notifications || []);
        } catch (e) {
          console.log("Parse error:", e);
          resolve([]);
        }
      });
    });

    req.on("error", (e: any) => {
      console.log("Error:", e);
      reject(e);
    });

    req.end();
  });
}

async function main() {
  console.log("Fetching notifications...");
  const notifications = await fetchNotifications();
  console.log("Total:", notifications.length);

  const sorted = notifications.sort(
    (a: any, b: any) => getPriorityScore(b) - getPriorityScore(a)
  );

  const top10 = sorted.slice(0, 10);
  console.log("\nTop 10 Priority Notifications:\n");
  top10.forEach((item: any, i: number) => {
    console.log(`${i + 1}. [${item.Type}] ${item.Message} - ${item.Timestamp}`);
  });
}

main();