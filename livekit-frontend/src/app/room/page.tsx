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
import { useMemo } from 'react';
import { DebugMode } from '@/lib/Debug';
import { decodePassphrase } from '@/lib/client-utils';
import CustomVideoConference from '@/components/CustomLiveKitComponents/CustomVideoConference';

const Preview = () => {
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
      <section className="w-screen h-screen bg-body dark:bg-darkmode-body">
        <LiveKitRoom
          room={room}
          token={
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM0MzE3MTcwMzYsImlzcyI6ImRldmtleSIsIm5hbWUiOiJ1c2VyMSIsIm5iZiI6MTcwMzcxNzAzNiwic3ViIjoidXNlcjEiLCJ2aWRlbyI6eyJyb29tIjoibXktZmlyc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.dw5daP5q9MScX67Hh3dtEm08LP0kJTFqsLUv8rxvcDE'
          }
          connectOptions={connectOptions}
          serverUrl={'ws://localhost:7880'}
          audio={true}
          video={true}
        >
          {/*<VideoConference chatMessageFormatter={formatChatMessageLinks} />*/}

          <CustomVideoConference chatMessageFormatter={formatChatMessageLinks} />

          <DebugMode logLevel={LogLevel.info} />
        </LiveKitRoom>
      </section>
    </>
  );
};

export default Preview;
