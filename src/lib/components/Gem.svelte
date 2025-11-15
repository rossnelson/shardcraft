<script lang="ts">
	import type { Gem as GemType } from "$lib/core/types";
	import { crossfade } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import { UI_SPRITES } from "$lib/utils/sprites";

	type Props = {
		gem: GemType;
		selected?: boolean;
		onclick?: () => void;
	};

	let { gem, selected = false, onclick }: Props = $props();

	const getGemImage = (type: string): string => {
		const normalizedType = type.toLowerCase();
		return `/assets/gems/original/icon_${normalizedType}_00.png`;
	};

	const [send, receive] = crossfade({
		duration: 400,
		easing: quintOut,
		fallback: (node) => {
			return {
				duration: 400,
				css: (t) => `
					transform: translateY(${(1 - t) * -100}px);
					opacity: ${t};
				`
			};
		}
	});

	const SCALE = 1.15;
	const tile = UI_SPRITES.tileDarkLarge;
</script>

<button
	class="gem"
	class:selected
	on:click={onclick}
	in:receive={{ key: gem.id }}
	out:send={{ key: gem.id }}
>
	<img src={getGemImage(gem.type)} alt={gem.type} draggable="false" />
</button>

<style>
	.gem {
		/* Sprite positioning: tile at (4, 244), size 56x56, scaled 1.15x = 64.4px */
		width: 64px;
		height: 64px;
		padding: 0;
		background-repeat: no-repeat;
		background-color: transparent;
		image-rendering: pixelated;
		border: none;
		cursor: pointer;
		transition: all 0.15s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.gem:hover {
		transform: scale(1.05);
		filter: brightness(1.1);
	}

	.gem:active {
		transform: scale(0.95);
	}

	.gem.selected::before {
		content: "";
		position: absolute;
		inset: -4px;
		border: 3px solid #ffd700;
		border-radius: 8px;
		box-shadow:
			0 0 16px rgba(255, 215, 0, 0.6),
			0 0 32px rgba(255, 215, 0, 0.3),
			inset 0 0 20px rgba(255, 215, 0, 0.2);
		pointer-events: none;
		animation: pulse 1s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
	}

	.gem img {
		width: 56px;
		height: 56px;
		object-fit: contain;
		pointer-events: none;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
	}

	.gem.selected img {
		filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
	}
</style>
