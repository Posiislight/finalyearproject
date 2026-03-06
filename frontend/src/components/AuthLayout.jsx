import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import {
	ChevronLeftIcon,
	Grid2x2PlusIcon,
} from 'lucide-react';

export function AuthLayout({ children, quote = "This Platform has helped me to save time and serve my clients faster than ever before.", author = "Ali Hassan" }) {
	return (
		<main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2 bg-black">
			<div className="bg-black relative hidden h-full flex-col border-r border-white/5 p-10 lg:flex">
				<div className="from-black absolute inset-0 z-10 bg-gradient-to-t to-transparent" />
				<div className="z-10 flex items-center gap-2">
					<Grid2x2PlusIcon className="size-6 text-primary" />
					<p className="text-xl font-semibold text-white font-poppins">RecruitAI</p>
				</div>
				<div className="z-10 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-xl text-white/90 italic">
							&ldquo;{quote}&rdquo;
						</p>
						<footer className="font-mono text-sm font-semibold text-primary">
							~ {author}
						</footer>
					</blockquote>
				</div>
				<div className="absolute inset-0">
					<FloatingPaths position={1} />
					<FloatingPaths position={-1} />
				</div>
			</div>
			<div className="relative flex min-h-screen flex-col justify-center p-4 bg-black">
				<div
					aria-hidden
					className="absolute inset-0 isolate contain-strict -z-10 opacity-60"
				>
					<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,255,255,0.06)_0,hsla(0,0%,55%,.02)_50%,rgba(255,255,255,0.01)_80%)] absolute top-0 right-0 h-320 w-140 -translate-y-87.5 rounded-full" />
				</div>
				<Button variant="ghost" className="absolute top-7 left-5 text-white/70 hover:text-white" asChild>
					<Link to="/">
						<ChevronLeftIcon className='size-4 me-2' />
						Home
					</Link>
				</Button>
				<div className="mx-auto space-y-4 sm:w-sm w-full max-w-md">
					<div className="flex items-center gap-2 lg:hidden mb-8">
						<Grid2x2PlusIcon className="size-6 text-primary" />
						<p className="text-xl font-semibold text-white">RecruitAI</p>
					</div>
                    {children}
				</div>
			</div>
		</main>
	);
}

function FloatingPaths({ position }) {
	const paths = Array.from({ length: 36 }, (_, i) => ({
		id: i,
		d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
			380 - i * 5 * position
		} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
			152 - i * 5 * position
		} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
			684 - i * 5 * position
		} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
		color: `rgba(59, 130, 246, ${0.1 + i * 0.03})`,
		width: 0.5 + i * 0.03,
	}));

	return (
		<div className="pointer-events-none absolute inset-0">
			<svg
				className="h-full w-full text-primary"
				viewBox="0 0 696 316"
				fill="none"
			>
				<title>Background Paths</title>
				{paths.map((path) => (
					<motion.path
						key={path.id}
						d={path.d}
						stroke="currentColor"
						strokeWidth={path.width}
						strokeOpacity={0.05 + path.id * 0.01}
						initial={{ pathLength: 0.3, opacity: 0.6 }}
						animate={{
							pathLength: 1,
							opacity: [0.3, 0.6, 0.3],
							pathOffset: [0, 1, 0],
						}}
						transition={{
							duration: 20 + Math.random() * 10,
							repeat: Number.POSITIVE_INFINITY,
							ease: 'linear',
						}}
					/>
				))}
			</svg>
		</div>
	);
}
