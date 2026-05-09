# Framer Motion Reference — Project Asset

## Source
GitHub: https://github.com/iamshaunjp/framer-motion

## Installation
```bash
pnpm add framer-motion
# framer-motion is already included in the web-static scaffold
```

## Core Patterns Used in This Project

### 1. Staggered Fade-Up (Section Entrance)
```tsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

// Usage:
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.h1 variants={fadeUp}>Headline</motion.h1>
  <motion.p variants={fadeUp}>Body text</motion.p>
</motion.div>
```

### 2. Scroll-Triggered Animation (useInView)
```tsx
const ref = useRef(null);
const inView = useInView(ref, { once: true, margin: '-80px' });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 40 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### 3. AnimatePresence (Tab/Filter Transitions)
```tsx
import { AnimatePresence } from 'framer-motion';

<AnimatePresence mode="wait">
  <motion.div
    key={currentItem}
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.4 }}
  >
    {content}
  </motion.div>
</AnimatePresence>
```

### 4. Mascot Float Animation (CSS + Framer)
```css
@keyframes mascot-bounce {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
.mascot-float {
  animation: mascot-bounce 3s ease-in-out infinite;
}
```

### 5. Navbar Entrance
```tsx
<motion.nav
  initial={{ y: -80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
```

### 6. Animated Counter (Stats)
```tsx
useEffect(() => {
  if (!inView) return;
  const duration = 1800;
  const steps = 60;
  const increment = targetValue / steps;
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= targetValue) {
      setCount(targetValue);
      clearInterval(timer);
    } else {
      setCount(Math.floor(current));
    }
  }, duration / steps);
  return () => clearInterval(timer);
}, [inView, targetValue]);
```

### 7. Layout Animation (Grid Filter)
```tsx
<motion.div layout className="grid grid-cols-3 gap-5">
  <AnimatePresence>
    {filteredItems.map(item => (
      <motion.div
        key={item.id}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      />
    ))}
  </AnimatePresence>
</motion.div>
```

## Best Practices
- Always use `once: true` in `useInView` for entrance animations (performance)
- Use `ease: 'easeOut'` for entrances, `ease: 'easeIn'` for exits
- Keep animation durations between 0.3s–0.8s for UI elements
- Use `staggerChildren` to create cascading effects without manual delays
- Respect `prefers-reduced-motion` for accessibility
- Use `layout` prop on grid containers for smooth filter transitions
