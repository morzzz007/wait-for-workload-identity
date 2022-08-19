#! /usr/bin/env node

if (process.env.SKIP_WORKLOAD_IDENTITY_CHECK === "true") process.exit(0);

const http = require("http");
const retry = require("async-retry");

function getToken() {
  return new Promise((resolve, reject) => {
    const req = http
      .get(
        "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token",
        {
          headers: {
            "Metadata-Flavor": "Google",
          },
        },
        (res) => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            return reject(new Error(`StatusCode=${res.statusCode}`));
          }

          res.on("end", () => {
            resolve();
          });
        }
      )
      .on("error", (e) => {
        reject(new Error(e.message));
      });

    req.end();
  });
}

function start() {
  return retry(
    async (_bail, attempt) => {
      await getToken();
    },
    {
      retries: 10,
      factor: 1.4,
      minTimeout: 1 * 1000,
      randomize: true,
    }
  );
}

start()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.log(
      `Error during acquiring token for workload identity: ${e.message}`
    );
    process.exit(1);
  });
