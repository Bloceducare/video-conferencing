import {
  CarouselLayout,
  ConnectionStateToast,
  FocusLayout,
  FocusLayoutContainer,
  GridLayout,
  isTrackReference,
  LayoutContextProvider,
  MessageDecoder,
  MessageEncoder,
  MessageFormatter,
  ParticipantTile,
  RoomAudioRenderer,
  TrackReferenceOrPlaceholder,
  useCreateLayoutContext,
  usePinnedTracks,
  useTracks,
  VideoConferenceProps,
  WidgetState,
} from '@livekit/components-react';
import { RoomEvent, Track } from 'livekit-client';
import { isEqualTrackRef, isWeb, log } from '@livekit/components-core';
import { HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';
import CustomControlBar from '@/components/CustomLiveKitComponents/CustomControlBar';
import useDynamicColor from '@/hooks/useDynamicColor';
import CustomChat from '@/components/CustomLiveKitComponents/CustomVideoConference/CustomChat';

/**
 * The `VideoConference` ready-made component is your drop-in solution for a classic video conferencing application.
 * It provides functionality such as focusing on one participant, grid view with pagination to handle large numbers
 * of participants, basic non-persistent chat, screen sharing, and more.
 *
 * @remarks
 * The component is implemented with other LiveKit components like `FocusContextProvider`,
 * `GridLayout`, `ControlBar`, `FocusLayoutContainer` and `FocusLayout`.
 * You can use these components as a starting point for your own custom video conferencing application.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <VideoConference />
 * <LiveKitRoom>
 * ```
 * @public
 */
export default function CustomVideoConference({
  chatMessageFormatter,
  chatMessageDecoder,
  chatMessageEncoder,
  ...props
}: VideoConferenceProps) {
  const [widgetState, setWidgetState] = useState<WidgetState>({
    showChat: false,
    unreadMessages: 0,
  });
  const lastAutoFocusedScreenShareTrack = useRef<TrackReferenceOrPlaceholder | null>(null);

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { updateOnlyOn: [RoomEvent.ActiveSpeakersChanged], onlySubscribed: false }
  );

  const widgetUpdate = (state: WidgetState) => {
    log.debug('updating widget state', state);
    setWidgetState(state);
  };

  const layoutContext = useCreateLayoutContext();

  const screenShareTracks = tracks
    .filter(isTrackReference)
    .filter((track) => track.publication.source === Track.Source.ScreenShare);

  const focusTrack = usePinnedTracks(layoutContext)?.[0];
  const carouselTracks = tracks.filter((track) => !isEqualTrackRef(track, focusTrack));

  useEffect(() => {
    // If screen share tracks are published, and no pin is set explicitly, auto set the screen share.
    if (
      screenShareTracks.some((track) => track.publication.isSubscribed) &&
      lastAutoFocusedScreenShareTrack.current === null
    ) {
      log.debug('Auto set screen share focus:', { newScreenShareTrack: screenShareTracks[0] });
      layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: screenShareTracks[0] });
      lastAutoFocusedScreenShareTrack.current = screenShareTracks[0];
    } else if (
      lastAutoFocusedScreenShareTrack.current &&
      !screenShareTracks.some(
        (track) =>
          track.publication.trackSid ===
          lastAutoFocusedScreenShareTrack.current?.publication?.trackSid
      )
    ) {
      log.debug('Auto clearing screen share focus.');
      layoutContext.pin.dispatch?.({ msg: 'clear_pin' });
      lastAutoFocusedScreenShareTrack.current = null;
    }
  }, [
    screenShareTracks
      .map((ref) => `${ref.publication.trackSid}_${ref.publication.isSubscribed}`)
      .join(),
    focusTrack?.publication?.trackSid,
  ]);

  const dynamicColor = useDynamicColor();

  const chatBoxStyle = {
    display: widgetState.showChat ? 'grid' : 'none',
    borderRadius: '8px',
    backgroundColor: dynamicColor.body,
  };

  return (
    <div
      data-lk-theme="default"
      className="lk-video-conference p-2 sm:p-4 md:p-8 md:flex md:gap-4"
      {...props}
    >
      {isWeb() && (
        <LayoutContextProvider
          value={layoutContext}
          // onPinChange={handleFocusStateChange}
          onWidgetChange={widgetUpdate}
        >
          <div className="lk-video-conference-inner">
            {!focusTrack ? (
              <div className="lk-grid-layout-wrapper">
                <GridLayout tracks={tracks}>
                  <ParticipantTile />
                </GridLayout>
              </div>
            ) : (
              <div className="lk-focus-layout-wrapper">
                <div className={'flex flex-col'}>
                  {focusTrack && <FocusLayout trackRef={focusTrack} className={'flex-1'} />}
                  <div className="p-4">
                    <CarouselLayout tracks={carouselTracks} orientation="horizontal">
                      <ParticipantTile />
                    </CarouselLayout>
                  </div>
                </div>
              </div>
            )}
            <CustomControlBar controls={{ chat: true }} variation="minimal" />
          </div>
          <CustomChat
            style={chatBoxStyle}
            messageFormatter={chatMessageFormatter}
            messageEncoder={chatMessageEncoder}
            messageDecoder={chatMessageDecoder}
          />
        </LayoutContextProvider>
      )}

      <RoomAudioRenderer />

      <ConnectionStateToast />
    </div>
  );
}
