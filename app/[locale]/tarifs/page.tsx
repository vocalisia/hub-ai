import { permanentRedirect } from 'next/navigation'

export default function TarifsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  permanentRedirect(`/${locale}/contact`)
}
