# Authentication Layer
- [ ] NAP 2, GraphCool

# Authorization Layer
- [ ] It has `oauth` management page.
- [ ] It can add new app and return `APP_ID`, `APP_SECRET`.
- [ ] It can add new client and return `CLIENT_ID`, `CLIENT_SECRET`.
- [ ] It will provide `access_token` for request.
- [ ] It will provide `access_token` that can be expire.
- [ ] It can revoke `APP_SECRET`.
- [ ] It can revoke `CLIENT_SECRET`.

# API Layer
- [ ] It will provide RESTful API that return overall health check.
- [ ] It will require `access_token` for access data.

# View Layer
- [ ] It will read data from `GraphCool`.
- [ ] It will show tree structure form loaded data.
- [ ] It will show service stateless `name`, `version`.
- [ ] It will show service stateful `timestamp`, `uptime`, `pid`.
- [ ] It will show service resource `cpu`, `ram`, `disk`.
- [ ] It will provide input field for add service url to `GraphCool`.

# Extra Layer
- [ ] SSL status, expires date.
- [ ] Header scan results.