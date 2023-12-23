# video-conferencing

### To Configure Husky, RUN

```bash
yarn
```

_Husky would be fired on commit_

## Folder Structure

- backend - This manages creation of rooms, participants and initiating calls. Written in Typescript.
- ConferenceApp - This is the auth layer of the application. It handles authorization and authentication of participants and users.

## How to contribute to the livekit backend
- Run `cd livekit`
- Run `yarn` in the /livekit
- Run `cd backend`
- Run `yarn` in /livekit/backend
- create .env in /livekit/backend
- copy and update the contents of .env.example
- Run `yarn dev`

PS: Check the /livekit/backend/TODO.md file for undone tasks.

To call the endpoints successfully, you need to run livekit locally.

[How to run livekit locally. Click to go to doc](https://docs.livekit.io/realtime/self-hosting/local/)