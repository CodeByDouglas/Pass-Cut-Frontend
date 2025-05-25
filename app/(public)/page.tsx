'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // captura ?nome=...&IDbase=... da URL
  const nome = searchParams.get('nome') ?? ''
  const IDbase = searchParams.get('IDbase') ?? ''

  const [status, setStatus] = useState<'loading' | 'error'>('loading')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // só dispara se tivermos ambos os parâmetros
    if (!nome || !IDbase) {
      setError('Parâmetros faltando na URL.')
      setStatus('error')
      return
    }

    const doRedirecionamento = async () => {
      try {
        const res = await fetch(
          'https://jubilant-adventure-q79vr767pj7pf4v66-5000.app.github.dev/api/redirecionamento_inicial',
          {
            method: 'POST',
            credentials: 'include', // ⬅️ importantíssimo para cookies HttpOnly
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'gAAAAABoEvKq_srcpjfhkuK3LEAw7VY_5W2r-fCi3xbE9X8vr7jw0eyfQT9mGpJepyr5oNckeZ2WZAGViwJ7JwSXyF6ZoZYRX0f4D6dHs5Qztwpk4wBV9-xe7fBqMlhP0yBvvlcylBtbkPDKRn6z1T9mE7g3DQ5b2LENnVLOSxEWk-9v9yCvIOzPk3ofSXJW4DEM8D4sr6US0D80r9HVUDu-NLJFChn8YA==',
            },
            body: JSON.stringify({ nome, IDbase }),
          }
        )

        if (res.ok) {
          // cookie "token_estabelecimento" já foi definido pelo servidor
          router.push('/login')
        } else {
          const body = await res.json().catch(() => null)
          setError(
            body?.message || `Erro ${res.status}: ${res.statusText}`
          )
          setStatus('error')
        }
      } catch (err: any) {
        setError(err.message)
        setStatus('error')
      }
    }

    doRedirecionamento()
  }, [nome, IDbase, router])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando, aguarde…</p>
      </div>
    )
  }

  // exibe erro caso falhe
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <p className="text-red-600 mb-4">❌ {error}</p>
      <Button onClick={() => router.push('/')}>Voltar</Button>
    </div>
  )
}
