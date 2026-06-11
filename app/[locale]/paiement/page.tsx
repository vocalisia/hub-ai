import { permanentRedirect } from 'next/navigation'

export default function PaiementPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  permanentRedirect(`/${locale}/contact`)
}
