'use client';
import { formatChatMessageLinks, LiveKitRoom } from '@livekit/components-react';
import {
  ExternalE2EEKeyProvider,
  LogLevel,
  Room,
  RoomConnectOptions,
  RoomOptions,
  VideoPresets,
} from 'livekit-client';
import { useEffect, useMemo } from 'react';
import { DebugMode } from '@/lib/Debug';
import { decodePassphrase } from '@/lib/client-utils';
import CustomVideoConference from '@/components/CustomLiveKitComponents/CustomVideoConference';
import { useTokenStore, useCreateRoomStore } from '@/hooks/useAPIStore';
import useAxios from '@/hooks/useAxios';

const MeetingRoom = () => {
  const { setToken } = useTokenStore.getState();
  const { createRoomData } = useCreateRoomStore.getState();

  const { data, error, isLoading } = useAxios(
    'https://w3bvc.onrender.com/v1/livekit/token',
    'post',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        roomName: createRoomData.roomName || typeof window !== 'undefined' && localStorage.getItem('room'),
        userId: `web3-user-${Math.floor(Math.random() * 1000)}`,
      },
    }
  );

  if (!isLoading) {
    setToken(data as string);
  }

  const e2eePassphrase =
    typeof window !== 'undefined' && decodePassphrase(window.location.hash.substring(1));
  const worker =
    typeof window !== 'undefined' &&
    new Worker(new URL('livekit-client/e2ee-worker', import.meta.url));
  const keyProvider = new ExternalE2EEKeyProvider();

  const e2eeEnabled = !!(e2eePassphrase && worker);

  const roomOptions = useMemo((): RoomOptions => {
    return {
      publishDefaults: {
        videoSimulcastLayers: [VideoPresets.h540, VideoPresets.h216],
        red: !e2eeEnabled,
        // videoCodec: codec as VideoCodec | undefined,
      },
      adaptiveStream: { pixelDensity: 'screen' },
      dynacast: true,
      e2ee: e2eeEnabled
        ? {
            keyProvider,
            worker,
          }
        : undefined,
    };
  }, []);

  const room = useMemo(() => new Room(roomOptions), []);
  if (e2eeEnabled) {
    keyProvider.setKey(e2eePassphrase);
    room.setE2EEEnabled(true);
  }

  const connectOptions = useMemo((): RoomConnectOptions => {
    return {
      autoSubscribe: true,
    };
  }, []);
  return (
    <>
      {/*<PageHeader />*/}
      {!isLoading && (
        <section className="w-screen h-screen bg-body dark:bg-darkmode-body">
          <LiveKitRoom
            room={room}
            token={typeof window !== 'undefined' && data && (data as string)}
            connectOptions={connectOptions}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_HOST as string}
            audio={false}
            video={false}
          >
            {/*<VideoConference chatMessageFormatter={formatChatMessageLinks} />*/}

            <CustomVideoConference chatMessageFormatter={formatChatMessageLinks} />

            <DebugMode logLevel={LogLevel.info} />
          </LiveKitRoom>
        </section>
      )}
    </>
  );
};

export default MeetingRoom;
