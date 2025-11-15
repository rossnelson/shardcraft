<script lang="ts">
	import { game } from "$lib/stores/game";

	const handleStart = () => {
		game.start();
	};

	const handleReset = () => {
		game.reset();
	};
</script>

<div class="game-menu">
	{#if $game.state === "idle"}
		<div class="title-panel">
			<h1>ShardCraft</h1>
			<p>Match 3 or more gems to score points!</p>
		</div>
		<button class="btn-sprite btn-primary" onclick={handleStart}>
			<span>Start Game</span>
		</button>
	{:else}
		<button class="btn-sprite btn-secondary" onclick={handleReset}>
			<span>New Game</span>
		</button>
	{/if}
</div>

<style>
	.game-menu {
		text-align: center;
		margin-bottom: 24px;
	}

	.title-panel {
		background-image: url("/assets/ui/UI_Normal.png");
		background-position: -248px -40px;
		background-size: 550px 375px;
		image-rendering: pixelated;
		width: 240px;
		height: 120px;
		margin: 0 auto 16px auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 16px;
	}

	h1 {
		font-size: 32px;
		font-weight: bold;
		margin: 0 0 4px 0;
		color: #ffd700;
		text-shadow:
			2px 2px 0 rgba(0, 0, 0, 0.5),
			-1px -1px 0 rgba(139, 105, 20, 0.8);
		letter-spacing: 2px;
	}

	p {
		margin: 0;
		font-size: 11px;
		color: #d4a574;
		text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
	}

	.btn-sprite {
		position: relative;
		background-image: url("/assets/ui/UI_Normal.png");
		background-size: 440px 300px;
		image-rendering: pixelated;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
		padding: 0;
		display: inline-block;
	}

	.btn-primary {
		background-position: -84px -36px;
		width: 128px;
		height: 40px;
	}

	.btn-secondary {
		background-position: -84px -60px;
		width: 128px;
		height: 32px;
	}

	.btn-sprite span {
		display: block;
		padding: 8px 16px;
		font-size: 14px;
		font-weight: bold;
		color: #fff;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.btn-sprite:hover {
		transform: translateY(-2px);
		filter: brightness(1.1);
	}

	.btn-sprite:active {
		transform: translateY(0);
		filter: brightness(0.9);
	}
</style>
