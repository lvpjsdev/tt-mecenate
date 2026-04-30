export interface SendCommentInputProps {
  /** Callback called on send button press. Parent implements optimistic update and API call. */
  onSend: (text: string) => Promise<void>;
}
