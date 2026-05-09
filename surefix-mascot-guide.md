# Sure-Fix Remodeling Mascot — Project Asset

## Description
A cartoon-style mascot character representing the Sure-Fix Remodeling brand. The character is a friendly, confident middle-aged man with grey hair, sunglasses, wearing a dark Sure-Fix branded quarter-zip jacket, blue jeans, and brown work boots. He is giving a thumbs-up gesture.

## File
- Filename: `sticker_v5_final.webp`
- Format: WebP with transparent background
- Uploaded to webdev storage: `/manus-storage/surefix-mascot_5cba77d6.webp`

## Usage in Code
```tsx
const MASCOT = '/manus-storage/surefix-mascot_5cba77d6.webp';

<img
  src={MASCOT}
  alt="Sure-Fix Remodeling mascot"
  className="w-72 xl:w-96 object-contain drop-shadow-2xl"
/>
```

## Float Animation (CSS)
```css
@keyframes mascot-bounce {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
.mascot-float {
  animation: mascot-bounce 3s ease-in-out infinite;
}
```

## Placement Guidelines
- **Hero section**: Right side of split layout, large (w-72 to w-96), with speech bubble
- **About section**: Right side, medium size (w-64 to w-80), with floating stat cards nearby
- **Contact section**: Above contact info cards, small (w-48), centered
- **Footer**: Not used (too small to be meaningful)

## Speech Bubble Pattern
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ delay: 1.2, duration: 0.5, ease: 'backOut' }}
  className="absolute top-8 right-0 bg-white rounded-2xl rounded-br-sm px-4 py-3 shadow-xl max-w-[200px] z-10"
>
  <p className="text-[#1a1f3e] text-sm font-bold leading-snug">
    "Ready to transform your home?"
  </p>
  <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white rotate-45 shadow-sm" />
</motion.div>
```

## Brand Alignment
- The mascot represents the owner/contractor — trustworthy, skilled, approachable
- Always pair with Sure-Fix brand colors: French Blue #394696, Brown Red #983631
- The thumbs-up gesture reinforces confidence and quality assurance
- Use the mascot to humanize technical or process-heavy sections
