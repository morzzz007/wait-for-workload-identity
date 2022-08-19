# Wait For Workload Identity

## How to use

Include `npx --yes @morz/wait-for-workload-identity` command before starting any worker process using workload identity.

Ex `npx --yes @morz/wait-for-workload-identity && node server/processes/workers/opt-in-changes-from-pubsub-to-rabbitmq`

## Escape hatch

Set `SKIP_WORKLOAD_IDENTITY_CHECK` env variable to `true`.
