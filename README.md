# Wait For Workload Identity

The GKE metadata server needs a few seconds before it can start accepting requests on a new Pod. Therefore, attempts to authenticate using Workload Identity within the first few seconds of a Pod's life may fail for applications and Google Cloud client libraries configured with a short timeout.

## How to use

Include `npx --yes @morz/wait-for-workload-identity` command before starting any worker process using workload identity.

Ex `npx --yes @morz/wait-for-workload-identity && node server/processes/workers/opt-in-changes-from-pubsub-to-rabbitmq`

## Escape hatch

Set `SKIP_WORKLOAD_IDENTITY_CHECK` env variable to `true`.
