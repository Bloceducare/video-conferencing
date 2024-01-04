import * as React from 'react';
import { ChatMessage, ChatOptions } from '@livekit/components-core';
import { useChat } from '@livekit/components-react';
import { useMaybeLayoutContext } from '@livekit/components-react';
import { cloneSingleChild } from '../others/utils';
import { ChatEntry } from '@livekit/components-react';
import { ChatProps } from '@livekit/components-react';
import { FiSend } from 'react-icons/fi';
import './CustomChat.css';

export default function CustomChat({
  messageFormatter,
  messageDecoder,
  messageEncoder,
  channelTopic,
  ...props
}: ChatProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const ulRef = React.useRef<HTMLUListElement>(null);

  const chatOptions: ChatOptions = React.useMemo(() => {
    return { messageDecoder, messageEncoder, channelTopic };
  }, [messageDecoder, messageEncoder, channelTopic]);

  const { send, chatMessages, isSending } = useChat(chatOptions);

  const layoutContext = useMaybeLayoutContext();
  const lastReadMsgAt = React.useRef<ChatMessage['timestamp']>(0);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (inputRef.current && inputRef.current.value.trim() !== '') {
      if (send) {
        await send(inputRef.current.value);
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    }
  }

  React.useEffect(() => {
    if (ulRef) {
      ulRef.current?.scrollTo({ top: ulRef.current.scrollHeight });
    }
  }, [ulRef, chatMessages]);

  React.useEffect(() => {
    if (!layoutContext || chatMessages.length === 0) {
      return;
    }

    if (
      layoutContext.widget.state?.showChat &&
      chatMessages.length > 0 &&
      lastReadMsgAt.current !== chatMessages[chatMessages.length - 1]?.timestamp
    ) {
      lastReadMsgAt.current = chatMessages[chatMessages.length - 1]?.timestamp;
      return;
    }

    const unreadMessageCount = chatMessages.filter(
      (msg) => !lastReadMsgAt.current || msg.timestamp > lastReadMsgAt.current
    ).length;

    const { widget } = layoutContext;
    if (unreadMessageCount > 0 && widget.state?.unreadMessages !== unreadMessageCount) {
      widget.dispatch?.({ msg: 'unread_msg', count: unreadMessageCount });
    }
  }, [chatMessages, layoutContext?.widget]);

  return (
    <div {...props} className="lk-chat md:flex md:flex-col sm:gap-6">
      <ul
        className="lk-list lk-chat-messages border-2 border-border dark:border-darkmode-border flex-1 h-full rounded-xl"
        ref={ulRef}
      >
        {props.children
          ? chatMessages.map((msg, idx) =>
              cloneSingleChild(props.children, {
                entry: msg,
                key: idx,
                messageFormatter,
              })
            )
          : chatMessages.map((msg, idx, allMsg) => {
              const hideName = idx >= 1 && allMsg[idx - 1].from === msg.from;
              // If the time delta between two messages is bigger than 60s show timestamp.
              const hideTimestamp = idx >= 1 && msg.timestamp - allMsg[idx - 1].timestamp < 60_000;

              return (
                <ChatEntry
                  key={idx}
                  hideName={hideName}
                  hideTimestamp={!hideName ? false : hideTimestamp} // If we show the name always show the timestamp as well.
                  entry={msg}
                  messageFormatter={messageFormatter}
                  className={'lk-chat-entry'}
                />
              );
            })}
      </ul>

      <div className=" border-2 border-border dark:border-darkmode-border h-[74px] grid items-center px-4 rounded-xl">
        <form
          className="bg-border dark:bg-darkmode-border rounded-full flex items-center gap-2 w-full"
          onSubmit={handleSubmit}
        >
          <input
            className="lk-chat-form-input border-none bg-transparent py-2.5 px-4 flex-1 focus-visible:ring-0 text-darkmode-border dark:text-border"
            disabled={isSending}
            ref={inputRef}
            type="text"
            placeholder="Enter a message..."
          />
          <button
            type="submit"
            className=" lk-chat-form-button rounded-full bg-dark my-1 mx-2 w-10 h-10"
            disabled={isSending}
          >
            <FiSend size={20} className={'mx-auto'} />
          </button>
        </form>
      </div>
    </div>
  );
}
