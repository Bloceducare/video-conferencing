1. Create a service to save rooms created.
2. Check that roomName exists before token is generated
3. Check that user exists before token is generated
4. List rooms

```javascript
roomService.listRooms().then((rooms: Room[]) => {
  console.log('existing rooms', rooms);
});
```

5. Delete a room
Deleting a room causes all Participants to be disconnected.


```javascript
// delete a room
roomService.deleteRoom('myroom').then(() => {
  console.log('room deleted');
});
```

6. List Participants

```javascript
const res = await roomService.listParticipants(roomName);
```

7. Get details on a Participant

```javascript
const res = await roomService.getParticipant(roomName, identity);
```

8. Updating permissions
You can modify a participant's permissions on-the-fly using UpdateParticipant. When there's a change in permissions, connected clients will be notified through the ParticipantPermissionChanged event.

This comes in handy, for instance, when transitioning an audience member to a speaker role within a room.

Note that if you revoke the CanPublish permission from a participant, all tracks they've published will be automatically unpublished.


```javascript
// promotes an audience member to a speaker
await roomService.updateParticipant(roomName, identity, undefined, {
  canPublish: true,
  canSubscribe: true,
  canPublishData: true,
})


// and later move them back to audience
await roomService.updateParticipant(roomName, identity, undefined, {
  canPublish: false,
  canSubscribe: true,
  canPublishData: true,
})
```

9. Updating metadata
You can modify a Participant's metadata whenever necessary. Once changed, connected clients will receive a ParticipantMetadataChanged event.


```javascript
const data = javascriptON.stringify({
  some: "values",
})

await roomService.updateParticipant(roomName, identity, data)
```

10. Remove a Participant
RemoteParticipant will forcibly disconnect the participant from the room. However, this action doesn't invalidate the participant's token.

To prevent the participant from rejoining the same room, consider the following measures:

Generate access tokens with a short TTL (Time-To-Live).
Refrain from providing a new token to the same participant via your application's backend.

```javascript
await roomService.removeParticipant({
  room: roomName,
  identity: identity,
});
```

11. Mute/unmute a Participant's Track
To mute a particular Track from a Participant, first get the TrackSid from GetParticipant (above), then call MutePublishedTrack:


```javascript
await roomService.mutePublishedTrack(roomName, identity, 'track_sid', true);
```

You may also unmute the track by setting muted to false.



