interface ChatBubbleProps {
  text: string
}

export function ChatBubble({ text }: ChatBubbleProps) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-feature rounded-tl-md bg-[#F3F4F6] px-4 py-2.5">
        <p className="text-base text-ink">{text}</p>
      </div>
    </div>
  )
}
