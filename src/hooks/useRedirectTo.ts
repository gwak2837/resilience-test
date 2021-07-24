import { useRouter } from 'next/router'
import { useEffect } from 'react'

function useRedirectTo(url: string, when: boolean) {
  const router = useRouter()

  useEffect(() => {
    if (when) {
      router.replace(url)
    }
  }, [router, url, when])
}

export default useRedirectTo
