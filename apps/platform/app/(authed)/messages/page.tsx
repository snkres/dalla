'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Search,
  Phone,
  Video,
  MoreHorizontal,
  Send,
  Paperclip,
  Smile,
  ArrowLeft,
  Check,
  CheckCheck,
  Archive,
  Bell,
  Ban,
  Flag,
  Trash2,
  Info,
  Image as ImageIcon,
  FileText,
  MapPin,
  Calendar,
  Mic,
  InboxIcon,
  MessageSquare,
  Inbox,
} from 'lucide-react'
import { Input } from '@dallah/design-system'
import { Button } from '@dallah/design-system'
import { ScrollArea } from '@dallah/design-system'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@dallah/design-system'
import { Popover, PopoverContent, PopoverTrigger } from '@dallah/design-system'
import Image from 'next/image'
import { cn } from '@dallah/utils'

interface Conversation {
  id: number
  name: string
  lastMessage: string
  time: string
  unread: number
  avatar: string
  online: boolean
}

interface Message {
  id: number
  sender: string
  content: string
  time: string
  isSender: boolean
  status?: 'sending' | 'sent' | 'delivered' | 'read'
}

const conversations: Conversation[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    lastMessage: 'That sounds great! When can we...',
    time: '2m ago',
    unread: 2,
    avatar: '/avatars/1.webp',
    online: true,
  },
  {
    id: 2,
    name: 'TechCorp Inc.',
    lastMessage: 'Thank you for your proposal...',
    time: '1h ago',
    unread: 0,
    avatar: '/avatars/2.webp',
    online: false,
  },
]

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    content: "Hi! I saw your project posting and I'm very interested.",
    time: '10:30 AM',
    isSender: false,
  },
  {
    id: 2,
    sender: 'You',
    content:
      "Hello Sarah! Thanks for reaching out. I'd love to hear more about your experience.",
    time: '10:32 AM',
    isSender: true,
    status: 'read',
  },
  {
    id: 3,
    sender: 'Sarah Johnson',
    content: "I'm available for a call tomorrow if that works for you.",
    time: '10:33 AM',
    isSender: false,
  },
  {
    id: 4,
    sender: 'You',
    content: 'That sounds great! When can we...',
    time: '10:34 AM',
    isSender: true,
    status: 'sent',
  },
]

const emojiCategories = [
  {
    name: 'Smileys',
    emojis: [
      '😀',
      '😃',
      '😄',
      '😁',
      '😆',
      '😅',
      '😂',
      '🤣',
      '😊',
      '😇',
      '🙂',
      '🙃',
      '😉',
      '😌',
      '😍',
    ],
  },
  {
    name: 'Gestures',
    emojis: [
      '👍',
      '👎',
      '👌',
      '✌️',
      '🤞',
      '👊',
      '✊',
      '🤛',
      '🤜',
      '🤟',
      '🤘',
      '👋',
      '🖐️',
      '✋',
      '🖖',
    ],
  },
  {
    name: 'Animals',
    emojis: [
      '🐶',
      '🐱',
      '🐭',
      '🐹',
      '🐰',
      '🦊',
      '🐻',
      '🐼',
      '🐨',
      '🐯',
      '🦁',
      '🐮',
      '🐷',
      '🐸',
      '🐵',
    ],
  },
]

interface PopupMenuItem {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

const getRandomAvatar = (seed: number | string) => {
  const styles = ['micah', 'avataaars', 'bottts', 'adventurer', 'lorelei']
  const randomStyle = styles[Math.floor(Math.random() * styles.length)]
  return `https://randomuser.me/api/portraits/men/${seed}.jpg`
}

const getConversationsWithRandomAvatars = () => {
  return conversations.map((convo) => ({
    ...convo,
    avatar: getRandomAvatar(convo.id),
  }))
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null)
  const [messageInput, setMessageInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileView, setIsMobileView] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeEmojiCategory, setActiveEmojiCategory] = useState('Smileys')
  const [isLoading, setIsLoading] = useState(true)
  const [messageFilter, setMessageFilter] = useState('all')
  const [hasConversations, setHasConversations] = useState(false)
  const [randomConversations, setRandomConversations] = useState<
    Conversation[]
  >([])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      setIsMobileView(isMobile)
      setShowSidebar(!isMobile || (isMobile && !selectedConversation))
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [selectedConversation])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleSendMessage = useCallback(() => {
    if (!messageInput.trim() || !selectedConversation) return

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'You',
      content: messageInput,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isSender: true,
      status: 'sending',
    }

    setMessages((prev) => [...prev, newMessage])
    setMessageInput('')

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg,
        ),
      )

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg,
          ),
        )

        if (Math.random() > 0.3) {
          setTimeout(
            () => {
              const responseMessage: Message = {
                id: messages.length + 2,
                sender: selectedConversation.name,
                content: generateResponse(),
                time: new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
                isSender: false,
              }

              setMessages((prev) => [...prev, responseMessage])
            },
            1000 + Math.random() * 1000,
          )
        }
      }, 500)
    }, 500)
  }, [messageInput, selectedConversation, messages])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation)

    if (isMobileView) {
      setShowSidebar(false)
    }
  }

  const handleBackToList = () => {
    if (isMobileView) {
      setShowSidebar(true)
    }
  }

  const generateResponse = () => {
    const responses = [
      `Yes, I'd be happy to discuss the details further.`,
      `Could you provide more information about the project requirements?`,
      `I'm available for a call tomorrow if that works for you.`,
      `I've attached my portfolio for your review.`,
      `What's your timeline for this project?`,
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const renderMessageStatus = (status: string) => {
    switch (status) {
      case 'sending':
        return <span className="animate-pulse">...</span>
      case 'sent':
        return <Check className="h-3 w-3" />
      case 'delivered':
        return <CheckCheck className="h-3 w-3" />
      case 'read':
        return <CheckCheck className="h-3 w-3 text-[#3A97A0]" />
      default:
        return null
    }
  }

  const handleStartConversation = () => {
    setIsLoading(true)

    const conversationsWithAvatars = getConversationsWithRandomAvatars()
    setRandomConversations(conversationsWithAvatars)

    setTimeout(() => {
      setHasConversations(true)
      setIsLoading(false)

      if (!isMobileView) {
        setSelectedConversation(conversationsWithAvatars[0])
      } else {
        setSelectedConversation(null)
      }
    }, 1000)
  }

  const handleActionClick = (action: string) => {
    if (action === 'Start a conversation') {
      handleStartConversation()
    } else {
      alert(`${action} functionality will be implemented soon!`)
    }
  }

  const moreOptionsItems: PopupMenuItem[] = [
    {
      icon: <Info className="h-3.5 w-3.5" />,
      label: 'Contact Info',
      onClick: () => handleActionClick('Contact Info'),
    },
    {
      icon: <Bell className="h-3.5 w-3.5" />,
      label: 'Mute Notifications',
      onClick: () => handleActionClick('Mute Notifications'),
    },
    {
      icon: <Archive className="h-3.5 w-3.5" />,
      label: 'Archive Chat',
      onClick: () => handleActionClick('Archive Chat'),
    },
    {
      icon: <Ban className="h-3.5 w-3.5" />,
      label: 'Block User',
      onClick: () => handleActionClick('Block User'),
    },
    {
      icon: <Flag className="h-3.5 w-3.5" />,
      label: 'Report',
      onClick: () => handleActionClick('Report'),
    },
    {
      icon: <Trash2 className="h-3.5 w-3.5 text-red-500" />,
      label: 'Delete Chat',
      onClick: () => handleActionClick('Delete Chat'),
    },
  ]

  const attachmentItems: PopupMenuItem[] = [
    {
      icon: <ImageIcon className="h-3.5 w-3.5" />,
      label: 'Photo & Video',
      onClick: () => handleActionClick('Send Photo/Video'),
    },
    {
      icon: <FileText className="h-3.5 w-3.5" />,
      label: 'Document',
      onClick: () => handleActionClick('Send Document'),
    },
    {
      icon: <MapPin className="h-3.5 w-3.5" />,
      label: 'Location',
      onClick: () => handleActionClick('Send Location'),
    },
    {
      icon: <Calendar className="h-3.5 w-3.5" />,
      label: 'Schedule',
      onClick: () => handleActionClick('Schedule Message'),
    },
    {
      icon: <Mic className="h-3.5 w-3.5" />,
      label: 'Voice Message',
      onClick: () => handleActionClick('Send Voice Message'),
    },
  ]

  const filterItems: PopupMenuItem[] = [
    {
      icon: (
        <div className="flex h-3.5 w-3.5 items-center justify-center">All</div>
      ),
      label: 'All Messages',
      onClick: () => setMessageFilter('all'),
    },
    {
      icon: <InboxIcon className="h-3.5 w-3.5" />,
      label: 'Unread',
      onClick: () => setMessageFilter('unread'),
    },
  ]

  const handleEmojiSelect = (emoji: string) => {
    setMessageInput((prev) => prev + emoji)
  }

  const getFilteredConversations = () => {
    const activeConversations =
      randomConversations.length > 0 ? randomConversations : conversations

    let filtered = activeConversations.filter(
      (conversation) =>
        conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conversation.lastMessage
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    )

    if (messageFilter === 'unread') {
      filtered = filtered.filter((conversation) => conversation.unread > 0)
    } else if (messageFilter === 'archived') {
      // TODO: would have an 'archived' field in your conversation data
      filtered = []
    }

    return filtered
  }

  const renderPopupMenu = (items: PopupMenuItem[]) => (
    <div className="py-1">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className="flex w-full items-center gap-2 px-3 py-2 text-xs text-gray-700 transition-colors hover:bg-[#BEDDF1]/15"
        >
          <span className="text-gray-600">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  )

  const renderEmojiPicker = () => (
    <div className="w-64 p-2">
      <div className="mb-2 flex border-b">
        {emojiCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveEmojiCategory(category.name)}
            className={cn(
              'flex-1 py-2 text-center text-xs',
              activeEmojiCategory === category.name
                ? 'border-b-2 border-[#3A97A0] text-[#3A97A0]'
                : 'text-gray-500',
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {emojiCategories
          .find((c) => c.name === activeEmojiCategory)
          ?.emojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => handleEmojiSelect(emoji)}
              className="rounded p-1 text-lg hover:bg-[#BEDDF1]/15"
            >
              {emoji}
            </button>
          ))}
      </div>
    </div>
  )

  return (
    <div className="flex h-[calc(100vh-5.2rem)] overflow-hidden rounded-xl bg-white shadow-sm">
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            className={cn(
              'flex w-80 flex-col border-r border-gray-100',
              isMobileView
                ? 'absolute z-10 h-full w-full bg-white md:w-80'
                : '',
            )}
            initial={{
              x: isMobileView ? -300 : 0,
              opacity: isMobileView ? 0 : 1,
            }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="border-b border-gray-100 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-medium text-gray-800">
                  Messages
                </h2>
                <TooltipProvider>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full hover:bg-[#BEDDF1]/15"
                      >
                        <MoreHorizontal className="h-3.5 w-3.5 text-gray-600" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      side="bottom"
                      align="end"
                      className="w-48 rounded-md p-1 shadow-md"
                    >
                      {renderPopupMenu(filterItems)}
                    </PopoverContent>
                  </Popover>
                </TooltipProvider>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search messages"
                  className="h-9 pl-9 text-xs focus-visible:ring-[#3A97A0]/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              {isLoading ? (
                <div className="space-y-3 p-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex animate-pulse items-center gap-3"
                    >
                      <div className="h-9 w-9 rounded-full bg-gray-200"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-2 w-24 rounded bg-gray-200"></div>
                        <div className="h-2 w-32 rounded bg-gray-200"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : hasConversations ? (
                // Show conversations list
                getFilteredConversations().map((conversation) => (
                  <motion.button
                    key={conversation.id}
                    whileHover={{ backgroundColor: 'rgba(190, 221, 241, 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleConversationSelect(conversation)}
                    className={cn(
                      'flex w-full items-center gap-3 border-b border-gray-50 p-3 text-left transition-colors',
                      selectedConversation?.id === conversation.id
                        ? 'bg-[#BEDDF1]/10'
                        : '',
                    )}
                  >
                    <div className="relative flex-shrink-0">
                      <Image
                        src={conversation.avatar}
                        alt={conversation.name}
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-center justify-start space-x-2">
                        <span className="text-xs font-medium text-gray-800">
                          {conversation.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {conversation.time}
                        </span>
                      </div>
                      <p className="truncate text-xs text-gray-500">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="h-4.5 w-4.5 flex flex-shrink-0 items-center justify-center rounded-full bg-[#3A97A0] px-2 py-1 text-xs text-white">
                        <span className="text-xs">{conversation.unread}</span>
                      </div>
                    )}
                  </motion.button>
                ))
              ) : (
                // Empty state
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-[#BEDDF1]/20 p-4">
                    <Inbox className="h-8 w-8 text-[#3A97A0]" />
                  </div>
                  <h3 className="mb-1 text-sm font-medium text-gray-800">
                    No messages yet
                  </h3>
                  <p className="mb-4 text-xs text-gray-500">
                    When you start or receive messages, they'll appear here
                  </p>
                  <Button
                    variant="default"
                    size="sm"
                    className="!bg-[#3A97A0] text-xs hover:!bg-[#2b7278]"
                    onClick={() => handleActionClick('Start a conversation')}
                  >
                    Start a conversation
                  </Button>
                </div>
              )}
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content area - only show conversation content if one is selected and we have conversations */}
      {(!isMobileView || !showSidebar) && (
        <motion.div
          className="flex flex-1 flex-col overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {selectedConversation && hasConversations ? (
            // Conversation view
            <>
              <div className="flex items-center justify-between border-b border-gray-100 p-3">
                <div className="flex items-center gap-3">
                  {isMobileView && !showSidebar && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleBackToList}
                      className="h-7 w-7 rounded-full hover:bg-[#BEDDF1]/15 md:hidden"
                    >
                      <ArrowLeft className="h-3.5 w-3.5 text-gray-600" />
                    </Button>
                  )}
                  <Image
                    src={selectedConversation.avatar}
                    alt={selectedConversation.name}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-sm font-medium text-gray-800">
                      {selectedConversation.name}
                    </h3>
                    {selectedConversation.online && (
                      <span className="text-xs text-green-500/80">Online</span>
                    )}
                  </div>
                </div>
                <TooltipProvider>
                  <div className="flex items-center gap-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full hover:bg-[#BEDDF1]/15"
                        >
                          <MoreHorizontal className="h-3.5 w-3.5 text-gray-600" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        side="bottom"
                        align="end"
                        className="w-48 rounded-md p-1 shadow-md"
                      >
                        {renderPopupMenu(moreOptionsItems)}
                      </PopoverContent>
                    </Popover>
                  </div>
                </TooltipProvider>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {messages.map((message, index) => {
                    const showAvatar =
                      index === 0 ||
                      messages[index - 1].isSender !== message.isSender
                    const isConsecutive =
                      index > 0 &&
                      messages[index - 1].isSender === message.isSender

                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className={cn(
                          'flex',
                          message.isSender ? 'justify-end' : 'justify-start',
                          isConsecutive ? 'mt-1' : 'mt-3',
                        )}
                      >
                        {!message.isSender && showAvatar && (
                          <div className="mr-2 mt-auto">
                            <Image
                              src={selectedConversation.avatar}
                              alt={selectedConversation.name}
                              width={25}
                              height={25}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                          </div>
                        )}
                        <div
                          className={cn(
                            'max-w-[70%] rounded-xl px-3 py-2',
                            message.isSender
                              ? 'rounded-br-sm bg-[#3A97A0] text-white'
                              : 'rounded-bl-sm bg-[#BEDDF1]/10 text-gray-800',
                          )}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div
                            className={cn(
                              'mt-1 flex items-center justify-end gap-1',
                              'text-[10px] opacity-70',
                            )}
                          >
                            <span>{message.time}</span>
                            {message.isSender && message.status && (
                              <span className="ml-1">
                                {renderMessageStatus(message.status)}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="border-t border-gray-100 p-3">
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full hover:bg-[#BEDDF1]/15"
                      >
                        <Paperclip className="h-3.5 w-3.5 text-gray-600" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      side="top"
                      align="start"
                      className="w-48 rounded-md p-1 shadow-md"
                    >
                      {renderPopupMenu(attachmentItems)}
                    </PopoverContent>
                  </Popover>

                  <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                    className="h-8 flex-1 text-xs focus-visible:ring-[#3A97A0]/20"
                  />

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full hover:bg-[#BEDDF1]/15"
                      >
                        <Smile className="h-3.5 w-3.5 text-gray-600" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      side="top"
                      align="end"
                      className="rounded-md p-1 shadow-md"
                    >
                      {renderEmojiPicker()}
                    </PopoverContent>
                  </Popover>

                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className={cn(
                      'h-8 w-8 rounded-full bg-[#3A97A0] transition-colors duration-200 hover:bg-[#2b7278]',
                      'disabled:cursor-not-allowed disabled:bg-gray-300',
                    )}
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            // Empty conversation state
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              {isMobileView && !showSidebar && (
                <div className="absolute left-3 top-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBackToList}
                    className="h-7 w-7 rounded-full hover:bg-[#BEDDF1]/15 md:hidden"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 text-gray-600" />
                  </Button>
                </div>
              )}
              <div className="mb-4 rounded-full bg-[#BEDDF1]/20 p-5">
                <MessageSquare className="h-10 w-10 text-[#3A97A0]" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-800">
                Your messages
              </h3>
              <p className="mb-1 max-w-xs text-sm text-gray-600">
                {hasConversations
                  ? 'Select a conversation from the sidebar to start messaging'
                  : 'Select a conversation or start a new one to begin messaging'}
              </p>
              <p className="text-xs text-gray-500">
                Connect with others through secure, real-time messages
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
