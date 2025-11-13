"use client"

import { useState } from "react"
import { Send, Heart, MessageCircle, Share2, Flag, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  id: string
  author: string
  avatar: string
  role?: string
  content: string
  timestamp: string
  likes: number
  replies: Comment[]
  userLiked?: boolean
}

interface CommentsSectionProps {
  knowledgeId: string
}

const commentsData: Comment[] = [
  {
    id: "1",
    author: "Jean Leclerc",
    avatar: "J",
    role: "Expert",
    content:
      "Excellente description des techniques ancestrales ! J'ai moi-même testé cette méthode de semis et les résultats sont remarquables. À noter que la lune montante semble être le timing optimal.",
    timestamp: "Il y a 2 jours",
    likes: 12,
    replies: [
      {
        id: "1-1",
        author: "Marie Dubois",
        avatar: "M",
        role: "Auteur",
        content:
          "Merci Jean ! Ton expérience confirme exactement ce que j'ai documenté. Le timing lunaire est vraiment crucial.",
        timestamp: "Il y a 1 jour",
        likes: 5,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    author: "Sophie Martin",
    avatar: "S",
    content:
      "Je me posais la question sur l'impact climatique. Ces techniques fonctionnent-elles aussi bien avec les changements climatiques actuels ?",
    timestamp: "Il y a 1 jour",
    likes: 8,
    replies: [],
  },
]

export default function CommentsSection({ knowledgeId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(commentsData)
  const [newComment, setNewComment] = useState("")
  const [expandedReply, setExpandedReply] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Vous",
      avatar: "V",
      content: newComment,
      timestamp: "À l'instant",
      likes: 0,
      replies: [],
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            likes: c.userLiked ? c.likes - 1 : c.likes + 1,
            userLiked: !c.userLiked,
          }
        }
        return c
      }),
    )
  }

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return

    setComments(
      comments.map((c) => {
        if (c.id === parentId) {
          const reply: Comment = {
            id: Date.now().toString(),
            author: "Vous",
            avatar: "V",
            content: replyContent,
            timestamp: "À l'instant",
            likes: 0,
            replies: [],
          }
          return {
            ...c,
            replies: [reply, ...c.replies],
          }
        }
        return c
      }),
    )

    setReplyContent("")
    setExpandedReply(null)
  }

  const CommentCard = ({ comment, isReply }: { comment: Comment; isReply?: boolean }) => (
    <div
      className={`space-y-4 ${isReply ? "ml-4 md:ml-8 border-l-2 border-primary/20 dark:border-white/10 pl-4" : ""}`}
    >
      <div className="glass dark:bg-white/8 dark:border-white/15 rounded-lg p-4 space-y-3">
        {/* Author Info */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-white">
              {comment.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">{comment.author}</p>
                {comment.role && (
                  <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">{comment.role}</span>
                )}
              </div>
              <p className="text-xs text-foreground/60">{comment.timestamp}</p>
            </div>
          </div>

          {/* Options */}
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <p className="text-foreground/80">{comment.content}</p>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-2 border-t border-primary/20 dark:border-white/10">
          <button
            onClick={() => handleLikeComment(comment.id)}
            className={`flex items-center gap-1 text-sm transition-colors duration-200 ${
              comment.userLiked ? "text-red-500 font-semibold" : "text-foreground/60 hover:text-red-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${comment.userLiked ? "fill-current" : ""}`} />
            {comment.likes > 0 && <span>{comment.likes}</span>}
          </button>

          <button className="flex items-center gap-1 text-sm text-foreground/60 hover:text-primary transition-colors duration-200">
            <MessageCircle className="w-4 h-4" />
            Répondre
          </button>

          <button className="flex items-center gap-1 text-sm text-foreground/60 hover:text-primary transition-colors duration-200">
            <Share2 className="w-4 h-4" />
            Partager
          </button>

          <button className="flex items-center gap-1 text-sm text-foreground/60 hover:text-red-500 transition-colors duration-200 ml-auto">
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}

      {/* Reply Form */}
      {expandedReply === comment.id && (
        <div className="glass dark:bg-white/8 dark:border-white/15 rounded-lg p-4 space-y-3">
          <Textarea
            placeholder="Écrivez votre réponse..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="glass dark:bg-white/5 dark:border-white/10 min-h-24 resize-none"
          />
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setExpandedReply(null)
                setReplyContent("")
              }}
            >
              Annuler
            </Button>
            <Button
              size="sm"
              onClick={() => handleSubmitReply(comment.id)}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
              Répondre
            </Button>
          </div>
        </div>
      )}

      {/* Reply Button */}
      {expandedReply !== comment.id && (
        <button
          onClick={() => setExpandedReply(comment.id)}
          className="text-sm text-primary hover:text-primary/80 transition-colors pl-4"
        >
          + Répondre
        </button>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-foreground">Discussion Communautaire</h3>

      {/* New Comment Form */}
      <div className="glass dark:bg-white/8 dark:border-white/15 rounded-lg p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-white">
            V
          </div>
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="Partager votre avis, poser une question ou enrichir la discussion..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="glass dark:bg-white/5 dark:border-white/10 min-h-24 resize-none"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
                Publier
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
