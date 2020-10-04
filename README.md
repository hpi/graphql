## The One

### Setup

`npm install`

### Running

`node src` / `npm start`

Environment variables (`PORT=3010 node src`):
- PORT (default is 4000)
- DEBUG (no default, usually you would want `qnzl*`)


Once the server is up you can access it at `localhost:[port]/graphql`

The schema is self-documenting and documentation can be  accessed through the "Docs" tab on the right-side

### Deploying

I use Supervisor and nginx on my server. I have included both config files in `infra/`, if you change the IPs in `deploy` and `provision`, you should be able to `provision` then `deploy`.

It is a bit of a finnicky system and I am working on a better system.

In addition, if you change `.profile-prod` then run `scripts/writeProfile`, it will re-write the supervisor environment variables for you, otherwise you can change them by hand to point to the correct APIs.
