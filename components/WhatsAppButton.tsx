export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/41799394222"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous contacter sur WhatsApp au +41 79 939 42 22"
      data-whatsapp-floating="true"
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 9999,
        display: "grid",
        placeItems: "center",
        width: 56,
        height: 56,
        borderRadius: "50%",
        backgroundColor: "#25D366",
        color: "#fff",
        boxShadow: "0 8px 24px rgba(0,0,0,.28)",
      }}
    >
      <svg width="30" height="30" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.01 3.2A12.72 12.72 0 0 0 5.2 22.61L3.6 28.8l6.33-1.55A12.68 12.68 0 0 0 16 28.8h.01A12.8 12.8 0 0 0 16.01 3.2Zm0 23.46h-.01a10.55 10.55 0 0 1-5.36-1.47l-.38-.22-3.76.92 1-3.66-.25-.39a10.58 10.58 0 1 1 8.76 4.82Zm5.82-7.91c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.58-1.59a9.72 9.72 0 0 1-1.78-2.22c-.19-.32-.02-.5.14-.66.15-.15.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}
