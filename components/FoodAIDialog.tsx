"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Loader2, WandSparkles } from "lucide-react"

interface Recommendation {
  name: string
  address?: string
  city?: string
  tags?: string[]
  description?: string
}

export default function FoodAIDialog() {
  const [open, setOpen] = useState(false)
  const [location, setLocation] = useState("")
  const [preferences, setPreferences] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { t } = useTranslation()
  const [results, setResults] = useState<Recommendation[]>([])

  const onSubmit = async () => {
    setError(null)
    setLoading(true)
    setResults([])
    try {
      const res = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location,
          preferences,
        }),
      })

      if (!res.ok) {
        throw new Error(`请求失败: ${res.status}`)
      }

      const data = await res.json()
      const recs: Recommendation[] = data?.recommendations || []
      setResults(recs)
    } catch (e: any) {
      setError(e?.message || "AI推荐失败，请稍后再试")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Floating trigger */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            aria-label={t('bites.labels.ai_recommend')}
            className="fixed bottom-6 right-6 z-50 shadow-xl"
            onClick={() => setOpen(true)}
          >
            <WandSparkles className="mr-2 h-4 w-4" />
            {t('bites.labels.ai_recommend')}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{t('bites.ai_dialog.title')}</DialogTitle>
            <DialogDescription>{t('bites.ai_dialog.description')}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="bf-location">{t('bites.ai_dialog.labels.location')}</Label>
              <Input
                id="bf-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t('bites.ai_dialog.placeholders.location')}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bf-preferences">{t('bites.ai_dialog.labels.preferences')}</Label>
              <textarea
                id="bf-preferences"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder={t('bites.ai_dialog.placeholders.preferences')}
                className={cn(
                  "min-h-[90px] rounded-xl border border-white/20 bg-white/80 px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  "dark:bg-gray-800/80"
                )}
              />
            </div>


            <div className="flex items-center gap-3">
              <Button onClick={onSubmit} disabled={loading || !location.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> {t('bites.ai_dialog.actions.generating')}
                  </>
                ) : (
                  <>{t('bites.ai_dialog.actions.generate')}</>
                )}
              </Button>
              <DialogClose asChild>
                <Button variant="secondary">{t('bites.ai_dialog.actions.close')}</Button>
              </DialogClose>
            </div>

            {error && (
              <div className="text-sm text-red-600">{t('bites.ai_dialog.errors.generic')}</div>
            )}

            {results.length > 0 && (
              <Card>
                <CardContent className="space-y-4">
                  {results.map((r, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="font-semibold text-base">{r.name}</div>
                      {r.address && (
                        <div className="text-sm text-gray-600">{r.address}</div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {(r.tags || []).map((t, i) => (
                          <Badge key={i} variant="secondary">{t}</Badge>
                        ))}
                      </div>
                      {r.description && (
                        <div className="text-sm text-gray-700">{r.description}</div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}